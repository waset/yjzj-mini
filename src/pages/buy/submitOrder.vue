<script lang="ts" setup>
const { nowAddress } = storeToRefs(useAddressStore())
const { getAddressList, setNowAddress } = useAddressStore()
const { products } = storeToRefs(useBuyStore())
const { detail } = storeToRefs(useProductStore())
const { canUseCouponNum } = storeToRefs(useSubmitOrderStore())
const { getCouponList, submitOrderReq, canUseCoupon, buyType } = useSubmitOrderStore()
const page = ref<number>(1)

//  显示隐藏 卡片渐变边框
const showborder = ref<boolean>(true)

// 合计数量
const totalNumber = ref<number>(0)
// 实付金额
const DEFAULT_PAYMENT = 0
const payment = ref<number>(DEFAULT_PAYMENT)
// 控制备注弹出层显示
const showPop = ref<boolean>(false)

// 下单参数
const submitOrderParams = ref<submitOrderReq>({
  inviteCode: '',
  details: [],
  userTicketID: 0,
  userAddressID: 0,
  payType: 'wechat',
  payMethod: 'mp',
  remark: '',
})
// 设置备注信息
const writeMarkFn = (data: string): void => {
  submitOrderParams.value.remark = data
  showPop.value = false
}
// 当前商品列表
const nowGoods = ref<BuyProduct[]>([])
// 下单
// 优惠券金额  用于显示在提交订单页面
const couponPrice = ref<string>('')

// 配置详情展示
const allocationShow = ref<boolean>(false)
// 配置详情列表
const allocationList = ref<any[]>([])
// 配置外设列表
const nowgoodsPer = ref<any[]>([])

// 查看 配置单
const checkAllocation = (index: number) => {
  allocationList.value = nowGoods.value[index].params
  nowgoodsPer.value = nowGoods.value[index].perihera
  allocationShow.value = true
}

// 提交订单 去支付
const submitOrderFn = async () => {
  // 提交订单接口
  try {
    submitOrderParams.value.userAddressID = nowAddress.value.id
    if (submitOrderParams.value.userAddressID === 0) {
      uni.showToast({
        title: '请选择收货地址~',
        icon: 'error',
      })
      return
    }

    await submitOrderReq(submitOrderParams.value)
  }
  catch (error) {

  }
}

// 接受参数  选择优惠券的id 和金额
onLoad(async (options) => {
  if (options?.id) {
    submitOrderParams.value.userTicketID = Number(options?.id)
    couponPrice.value = options?.couponPrice
  }
  if (!nowAddress.value.address) {
    await getAddressList(1, 100)
    await setNowAddress()
  }
})
onShow(async () => {
  try {
    // 获取优惠列表
    await getCouponList(page.value, 15)
    await canUseCoupon(nowAddress.value.id, [detail?.value?.id || 0], undefined)
  }
  catch (error) {
    console.error('Failed to fetch coupon list:', error)
  }
})
onMounted(async () => {
  // 商品详情进入
  if (buyType === 'buy') {
    if (!detail.value) {
      return
    }
    nowGoods.value.push({ ...detail.value, quantity: 1, delete: false, select: false })
    submitOrderParams.value.details.push({ id: detail.value.id || 0, number: 1, relationType: 1 })
    submitOrderParams.value.inviteCode = detail.value.inviteCode

    if (product_is_diy(detail.value)) {
      submitOrderParams.value.details[0].relationType = 2
      submitOrderParams.value.details[0].id = detail.value.alloaction
    }
    totalNumber.value = 1
    payment.value = Number(detail.value.sellPrice)
  }
  else {
    // 购物车进入
    // 产品id 数组
    const productIDs = ref<number[]>([])
    // const productConfigIDs = ref<string[]>([])
    // 给请求 添加商品
    const arr = ref<{ [key: string]: number }[]>([])
    // 循环购物车的列表
    products.value.forEach((item) => {
      // 如果是购物车中的选中状态
      if (item.select) {
        // 放进当前商品列表
        nowGoods.value.push(item)
        // 总数量  用于展示
        totalNumber.value += (item.quantity | item.number)
        //  总金额 用于展示
        payment.value += Number(item.sellPrice) * (item.quantity | item.number)
        // 产品id 列表 用于提交订单时的参数
        productIDs.value.push(item.id)

        if (item.alloaction) {
          arr.value.push({
            id: item.alloaction as number,
            number: (item.quantity | item.number),
            relationType: 2,
          })
        }
        else {
          arr.value.push({
            id: item.id,
            number: (item.quantity | item.number),
            relationType: 1,
          })
        }
      }
    })
    submitOrderParams.value.details = arr.value
    // 查询可用的优惠券
    await canUseCoupon(nowAddress.value.id, productIDs.value, undefined)
  }
})

const paym = computed(() => {
  const { cloned } = useCloned(payment.value)

  return (cloned.value - Number(couponPrice.value))
})
</script>

<template>
  <navbar-back text="提交订单" />
  <div class="body">
    <div class="addressBox" @click="Jump('/pages/me/address/index', { back: true })">
      <buys-address-card />
    </div>

    <div class="productBox">
      <buys-submit-goods-item :list="nowGoods" :goods="detail" :showborder="showborder" @checked="checkAllocation" />
    </div>

    <div class="CouponsAndNotes">
      <div class="counpons" @click="Jump('/pages/buy/selectCoupon')">
        <div>优惠券</div>
        <div class="beColor">
          <template v-if="couponPrice !== ''">
            <div class="red">
              -￥{{ couponPrice }}
            </div>
          </template>

          <template v-if="couponPrice === ''">
            <template v-if="canUseCouponNum === 0">
              <div class="text">
                暂无可用
              </div>
            </template>
            <template v-else>
              <div class="text">
                待使用
                <div class="badge">
                  {{ canUseCouponNum }}
                </div>
              </div>
            </template>
          </template>

          <div class="icon i-icons-right" />
        </div>
      </div>
      <div class="notes" @click="showPop = true">
        <div>备注</div>
        <div class="beColor mark">
          <div class="text1">
            {{ submitOrderParams.remark || '无备注' }}
          </div>
          <div class="icon i-icons-right" />
        </div>
      </div>
    </div>
    <buys-settlement-card :number="totalNumber" :totalpay="payment" :pay="paym" :coupon="couponPrice" />
    <buys-bottom-submit :number="totalNumber" :pay="paym" @submit-order="submitOrderFn" />

    <common-popup :show="showPop" name="备注" height="75%" @close="showPop = false">
      <div>
        <buys-submit-remark @write-mark="writeMarkFn" />
      </div>
    </common-popup>

    <common-popup :show="allocationShow" name="配置详情" @close="allocationShow = false">
      <div>
        <buys-submit-allocation-card :nowgoods-per="nowgoodsPer" :allocation-list="allocationList" />
      </div>
    </common-popup>
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;

$Be: #BEBEBE;

.body {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  padding: 32rpx 0;

  overflow: hidden;

  gap: 32rpx;

  .addressBox {
    width: 686rpx;
    // margin: 32rpx auto
  }

  .productBox {
    display: flex;
    flex-direction: column;

    gap: 16rpx;
  }

  .bottomBox {
    width: 100%;
  }

  .top-wrap {
    height: $top-height;
  }

  .body-wrap {
    flex: 1;
  }

  .bottom-wrap {
    height: $bottom-height;
  }

  .CouponsAndNotes {
    width: 686rpx;
    height: auto;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // margin: 32rpx auto;
    font-size: 28rpx;
    box-sizing: border-box;
    padding: 0 32rpx;

    gap: 32rpx;

    .counpons {
      display: flex;
      justify-content: space-between;
    }

    .notes {
      // margin-top: 32rpx;
      display: flex;
      justify-content: space-between;
      height: 100%;
      align-items: center;

    }

    .beColor {
      color: #BEBEBE;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .red {
        color: #F53F3F;
      }

      .text {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .badge {
          width: 32rpx;
          height: 32rpx;
          border-radius: 50%;
          background-color: #F53F3F;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 20rpx;
          margin-left: 8rpx;
        }

      }

      .text1 {
        max-width: 400rpx;
        max-height: 80rpx;
        font-size: 28rpx;
        overflow: hidden;
        word-break: break-all; // 如果文本为一段很长的英文，使用后能使一个单词能够在换行时进行拆分
        text-overflow: ellipsis; // 当对象内文本溢出时显示省略标记（…）
        display: -webkit-box; // 将对象作为弹性伸缩盒子模型显示
        -webkit-line-clamp: 2;
        /* 控制显示的行数，表示展示X行后多余的缩略展示 */
        -webkit-box-orient: vertical; // 设置或检索伸缩盒对象的子元素的排列方式

      }

      .icon {
        font-size: 32rpx;
        width: 32rpx;
        height: 32rpx;
      }
    }

  }

}
</style>
