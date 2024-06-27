const { products } = storeToRefs(useBuyStore())
export const useSubmitOrderStore = defineStore('submitOrder', {
  state: (): {
    couponList: couponList[]
    canUseCouponNum: number
    provider: string
    buyType: 'buy' | 'car'
  } => ({
    couponList: [],
    canUseCouponNum: 0,
    provider: '',
    buyType: 'buy',
  }),
  getters: {
  },
  actions: {
    changeBuyType(type: 'buy' | 'car') {
      this.buyType = type
    },

    countdown(timeStamp: string) {
      // 转换为时间戳
      // 获取当前时间戳
      // 转换的时间戳加上十分钟的时间
      // 转换的减去当前时间戳
      // 在转换为是时分秒
      // 转换为时间戳

      function convertToTimestamp(dateStr: string) {
        // 定义正则表达式以匹配输入格式
        const regex = /^(\d{4})-(\d{2})-(\d{2})\s(\d{2}):(\d{2}):(\d{2})$/
        const match = dateStr.match(regex)

        // 验证输入字符串是否符合预期格式
        if (!match) {
          throw new Error('Invalid date format')
        }

        // 提取日期和时间部分
        const year = Number.parseInt(match[1], 10)
        const month = Number.parseInt(match[2], 10) - 1 // 月份从0开始
        const day = Number.parseInt(match[3], 10)
        const hours = Number.parseInt(match[4], 10)
        const minutes = Number.parseInt(match[5], 10)
        const seconds = Number.parseInt(match[6], 10)

        // 创建Date对象并返回时间戳
        const date = new Date(year, month, day, hours, minutes, seconds)
        return date.getTime()
      }

      function convertMillisecondsToHMS(milliseconds: number) {
        // 将毫秒转换为秒
        let seconds = Math.floor(milliseconds / 1000)
        // 计算小时数
        const hours = Math.floor(seconds / 3600)
        seconds %= 3600
        // 计算分钟数
        const minutes = Math.floor(seconds / 60)
        seconds %= 60
        // 返回一个对象，包含小时、分钟和秒
        return {
          hours,
          minutes,
          seconds,
        }
      }

      // 毫秒转时分秒
      function formatMillisecondsToHMS(milliseconds: number) {
        const hms = convertMillisecondsToHMS(milliseconds)
        return `${hms.hours.toString().padStart(2, '0')}:${hms.minutes.toString().padStart(2, '0')}:${hms.seconds.toString().padStart(2, '0')}`
      }

      const nowTime = Date.now()
      const outTime = convertToTimestamp(timeStamp) + (10 * 60 * 1000)

      const remainingTime = outTime - nowTime
      return remainingTime > 0 ? formatMillisecondsToHMS(remainingTime) : '已过期'
    },

    // 获取卡券列表
    async getCouponList(page: number, pageSize: number) {
      try {
        const { data, code } = await http.post<couponList[]>('/web/user/ticket/list', { page, pageSize }, { auth: true })
        if (code === 200)
          this.couponList = data
      }
      catch {
        uni.showToast({
          title: '网络错误,请稍后重试',
          icon: 'error',
        })
      }
    },
    // 获取可用卡券
    async canUseCoupon(userAddressID: number, productIDs?: number[], productConfigIDs?: string[]) {
      try {
        const { data, code } = await http.post<couponList[]>('/web/user/ticket/can/use/list', { productIDs, productConfigIDs, userAddressID }, { auth: true })
        if (code === 200) {
          this.canUseCouponNum = 0
          data.forEach((item) => {
            if (item.ticketInfo.status === 1) {
              this.canUseCouponNum += 1
            }
          })
        }
      }
      catch {

      }
    },

    // 获取卡券
    async getCoupon(params: couponReq) {
      try {
        const { data, code } = await http.post<couponList[]>('/web/user/ticket/list', params, { auth: true })
        if (code === 200)
          this.couponList = data
      }
      catch {
        uni.showToast({
          title: '网络错误,请稍后重试',
          icon: 'error',
        })
      }
    },
    //  下单
    async submitOrderReq(params: submitOrderReq) {
      try {
        const { code, data, msg } = await http.post('/web/order/add', { ...params }, { auth: true })
        if (code === 200) {
          // TODO wxpay.then->支付成功回调，fail->支付失败回调
          products.value = products.value.filter(element => !element.select)
          this.wxpay(data.jsapiPayParams).then(() => {
            // 支付成功跳转的订单列表
            Jump('/pages/order/list')
          }).catch(() => {
            // 支付失败提示
            uni.showToast({
              title: '支付失败',
              icon: 'error',

              duration: 2000,
              // 跳转订单列表
              success: () => {
                const pages = getCurrentPages()
                const page = pages[pages.length - 1]
                const nowpage = page.route
                if (nowpage !== 'pages/order/list') {
                  setTimeout(() => {
                    Jump('/pages/order/list')
                  }, 1000)
                }
              },
            })
          })
        }
        else if (code === 500 && msg === '有未支付订单') {
          uni.showToast({
            title: msg,
            icon: 'error',
            success: () => {
              const pages = getCurrentPages()
              const page = pages[pages.length - 1]
              const nowpage = page.route
              if (nowpage !== 'pages/order/list') {
                setTimeout(() => {
                  Jump('/pages/order/list')
                }, 1000)
              }
            },
          })
        }
        else {
          return uni.showToast({
            title: '下单失败,请重试',
            icon: 'error',
          })
        }
      }
      catch (error) {
        console.error('提交订单失败:', error)
      }
    },
    // 支付
    async wxpay(orderInfo: any) {
      return new Promise((resolve, reject) => {
        uni.showLoading({ title: '支付中' })
        uni.getProvider<UniNamespace.GetProviderOptions>({
          service: 'payment',
          success: (res) => {
            uni.requestPayment<UniNamespace.RequestPaymentOptions>({
              provider: res.provider[0],
              ...orderInfo,
              // 微信、支付宝订单数据 【注意微信的订单信息，键值应该全部是小写，不能采用驼峰命名 】
              success: (res) => {
                resolve(res)
              },
              fail: (err) => {
                reject(err)
              },
              complete: () => {
                uni.hideLoading()
              },
            })
          },
        })
      })
    },
    // 订单详情
    async orderInfo(id: string) {
      const { data } = await http.post<orderinfoData>('/web/order/info', { NO: id }, { auth: true })

      return data
    },
    // 继续支付
    async continuePay(id: number) {
      const { data } = await http.post('/web/order/pay/continue', { id }, { auth: true })

      return this.wxpay(data.jsapiPayParams)
    },
    // 取消支付
    async cancelPay(id: number) {
      const { code } = await http.post<cancelPayRes>('/web/order/pay/cancel', { id }, { auth: true })

      return code
    },
    // 取消订单（退款）
    async refund(id: number) {
      const { code } = await http.post<cancelPayRes>('/web/order/cancel', { id }, { auth: true })

      return code
    },

  },

  persist: true,
})
