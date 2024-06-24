export const useSubmitOrderStore = defineStore('submitOrder', {
  state: (): {
    couponList: couponList[]
    canUseCouponNum: number
    provider: string
    buyType: string

  } => ({
    couponList: [],
    canUseCouponNum: 0,
    provider: '',
    buyType: '',

  }),
  getters: {
  },
  actions: {
    changeBuyType(type: string) {
      this.buyType = type
    },

    countdown(timeStamp: string) {
      // 转换为时间戳
      // 获取当前时间戳
      // 转换的时间戳加上十分钟的时间
      // 转换的减去当前时间戳
      // 在转换为是时分秒

      // 转换为时间戳
      const convertToTimestamp = (dateTimeStr: string): number => {
        const isoDateTimeStr = dateTimeStr.replace(' ', 'T')
        const date = new Date(isoDateTimeStr)
        const timestamp = date.getTime()
        return timestamp
      }

      // 时间戳转换时间
      const formatTimestamp = (timestamp: number): string => {
        const pad = (num: number): string => (`0${num}`).slice(-2)
        const date = new Date(timestamp)
        return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
      }
      const nowTime = Date.now()
      const outTime = convertToTimestamp(timeStamp) + (10 * 60 * 1000)
      const remainingTime = outTime - nowTime
      return remainingTime > 0 ? formatTimestamp(remainingTime) : '已过期'
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
            if (item.status === 1) {
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
          await this.wxpay(data.jsapiPayParams)
        }
        if (code === 500 && msg === '有未支付订单') {
          Jump('/pages/buy/orderInfo')
        }
        if (code !== 200) {
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
                Jump('/pages/buy/orderInfo')
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
    async orderInfo() {
      const { data } = await http.post<orderinfoData>('/web/order/info', { NO: 'DD202406191012561025' }, { auth: true })

      return data
    },
    // 继续支付
    async continuePay(id: number) {
      const { data } = await http.post('/web/order/pay/continue', { id }, { auth: true })

      this.wxpay(data.jsapiPayParams)
    },
    // 取消支付
    async cancelPay(id: number) {
      await http.post<cancelPayRes>('/web/order/pay/cancel', { id }, { auth: true })
    },

  },

  persist: true,
})
