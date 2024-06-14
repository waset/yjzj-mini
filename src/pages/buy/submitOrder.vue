<script lang="ts" setup>
const { nowAddress } = storeToRefs(useAddressStore())
const { getCouponList, submitOrderReq } = useSubmitOrderStore()
const page = ref<number>(1)
onShow(async () => {
  await getCouponList(page.value, 15)
})
//  显示隐藏 卡片渐变边框
const showborder = ref<boolean>(true)
// 提交商品的列表
const goodslist = ref<goodsListInfo[]>([
  {
    name: '天选5Pro 14代酷睿i9',
    price: 33333333,
    number: 2,
  },
  {
    name: '天选5Pro 14代酷睿i9',
    price: 3333,
    number: 3,
  },
])

// 合计数量
const totalNumber = ref<number>(0)
// 实付金额
const payment = ref<number>(4399)
// 控制备注弹出层显示
const showPop = ref<boolean>(false)

// 设置弹出层关闭
const setShowFn = (data: boolean) => {
  showPop.value = data
}

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
  payMethod: 'wechat',
  cartIDs: [
    '111',
  ],
  remark: '',
})
// 设置备注信息
const writeMarkFn = (data: string): void => {
  submitOrderParams.value.remark = data
}
// 下单
const submitOrderFn = async () => {
  await submitOrderReq(submitOrderParams.value)
}
</script>

<template>
  <navbar-back text="提交订单" />
  <div class="body">
    <div class="addressBox" @click="Jump('/pages/me/address/addressIndex')">
      <buys-addressCard />
    </div>
    <buys-goodsItemCard :list="goodslist" :showborder="showborder" />
    <div class="CouponsAndNotes">
      <div class="counpons" @click="Jump('/pages/buy/selectCoupon')">
        <div>优惠券</div>
        <div class="beColor">
          <div class="text">
            待使用
            <div class="badge">
              2
            </div>
          </div>
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
    <buys-settlementCard :number="totalNumber" :pay="payment" />
    <buys-bottomSubmit :number="totalNumber" :pay="payment" @submit-order="submitOrderFn" />
    <buys-popup-markpopup :showpop="showPop" @set-show="setShowFn" @write-mark="writeMarkFn" />
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
