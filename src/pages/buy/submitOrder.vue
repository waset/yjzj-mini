<script lang="ts" setup>
const { nowAddress } = storeToRefs(useAddressStore())
const { products } = storeToRefs(useBuyStore())
const { canUseCouponNum } = storeToRefs(useSubmitOrderStore())
const { getCouponList, submitOrderReq, canUseCoupon } = useSubmitOrderStore()
const page = ref<number>(1)

//  显示隐藏 卡片渐变边框
const showborder = ref<boolean>(true)

// 合计数量
const totalNumber = ref<number>(0)
// 实付金额
const payment = ref<number>(0)
// 控制备注弹出层显示
const showPop = ref<boolean>(false)

// 下单参数
const submitOrderParams = ref<submitOrderReq>({
  inviteCode: '',
  details: [
    {
      id: 0,
      number: 0,
      relationType: 0,
    },
  ],
  userTicketID: 0,
  userAddressID: nowAddress.value.id,
  payType: 'wechat',
  payMethod: 'mp',
  remark: '',
})
// 设置备注信息
const writeMarkFn = (data: string): void => {
  submitOrderParams.value.remark = data
  showPop.value = false
}
const nowGoods = ref<BuyProduct[]>([])
// 下单
const couponPrice = ref<string>('')
const submitOrderFn = async () => {
  await submitOrderReq(submitOrderParams.value)
}
// 接受参数  选择优惠券的id 和金额
onLoad((options) => {
  if (options?.id) {
    submitOrderParams.value.userTicketID = Number(options?.id)
    couponPrice.value = options?.couponPrice
  }
})
onShow(async () => {
  try {
    // 获取优惠券列表
    await getCouponList(page.value, 15)
  }
  catch (error) {
    console.error('Failed to fetch coupon list:', error)
  }
})
onMounted(async () => {
  // 产品id 数组
  const productIDs = ref<number[]>([])
  // const productConfigIDs = ref<string[]>([])
  // 给请求 添加商品
  const arr = ref<{ [key: string]: number }[]>([])
  products.value.forEach((item) => {
    if (item.select) {
      nowGoods.value.push(item)
      totalNumber.value += item.quantity
      payment.value += Number(item.tagPrice)
      productIDs.value.push(item.id)

      arr.value.push({
        id: item.id,
        number: item.quantity,
        relationType: 1,
      })
    }

    // productConfigIDs.value.push(item.id)
  })

  submitOrderParams.value.details = arr.value

  await canUseCoupon(nowAddress.value.id, productIDs.value, undefined)
})
</script>

<template>
  <navbar-back text="提交订单" />
  <div class="body">
    <div class="addressBox" @click="Jump('/pages/me/address/index', {}, 1)">
      <buys-address-card />
    </div>
    <buys-submit-goods-item :list="nowGoods" :showborder="showborder" />
    <div class="CouponsAndNotes">
      <div class="counpons" @click="Jump('/pages/buy/selectCoupon', {}, 1)">
        <div>优惠券</div>
        <div class="beColor">
          <template v-if="couponPrice !== ''">
            <div class="red">
              -￥{{ couponPrice }}
            </div>
          </template>

          <template v-if="couponPrice === ''">
            <div class="text">
              待使用
              <div class="badge">
                {{ canUseCouponNum }}
              </div>
            </div>
          </template>

          <div class="i-icons-right" />
        </div>
      </div>
      <div class="notes" @click="showPop = true">
        <div>备注</div>
        <div class="beColor mark">
          <div class="text1">
            {{ submitOrderParams.remark || '无备注' }}
          </div>
          <div class="i-icons-right" />
        </div>
      </div>
    </div>
    <buys-settlement-card :number="totalNumber" :pay="payment" :coupon="couponPrice" />
    <buys-bottom-submit :number="totalNumber" :pay="payment" @submit-order="submitOrderFn" />

    <common-popup :show="showPop" name="备注" height="70%" @close="showPop = false">
      <div>
        <buys-submit-remark @write-mark="writeMarkFn" />
      </div>
    </common-popup>
    <!-- <buys-popup-markpopup :showpop="showPop" @set-show="setShowFn" @write-mark="writeMarkFn" /> -->
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;

$Be: #BEBEBE;

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .addressBox {
    width: 686rpx;
    margin: 32rpx auto
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
    height: 112rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin: 32rpx auto;
    font-size: 28rpx;
    box-sizing: border-box;
    padding-left: 32rpx;

    .counpons {
      display: flex;
      justify-content: space-between;
    }

    .notes {
      margin-top: 32rpx;
      display: flex;
      justify-content: space-between;

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

      .i-icons-right {
        font-size: 32rpx;
        width: 32rpx;
        height: 32rpx;
      }
    }

  }

}
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
