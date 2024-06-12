<script lang="ts" setup>
// const { couponList } = storeToRefs(useSubmitOrderStore())
const { getCouponList } = useSubmitOrderStore()
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
// 备注展示
const mark = ref<string>('')
// 合计数量
const totalNumber = ref<number>(0)
// 实付金额
const payment = ref<number>(4399)
// 控制备注弹出层显示
const showPop = ref<boolean>(false)

// 地址新增 弹出层
const AddressshowPop = ref<boolean>(false)

// 设置弹出层关闭
const setShowFn = (data: boolean) => {
  showPop.value = data
}

// 设置备注信息
const writeMarkFn = (data: string): void => {
  mark.value = data
}
</script>

<template>
  <navbar-home text="提交订单" />
  <div class="body">
    <div class="addressBox" @click="Jump('/pages/me/address/myAddress')">
      <buys-addressCard :width="622" />
    </div>
    <buys-goodsItemCard :list="goodslist" :showborder="showborder" />
    <div class="CouponsAndNotes">
      <div class="counpons" @click="Jump('/pages/buy/coupon')">
        <div>优惠券</div>
        <div class="beColor">
          待使用
          <div class="i-icons-right" />
        </div>
      </div>
      <div class="notes" @click="showPop = true">
        <div>备注</div>
        <div class="beColor mark">
          <div class="text1">
            {{ mark || '无备注' }}
          </div>
          <div class="i-icons-right" />
        </div>
      </div>
    </div>
    <buys-settlementCard :number="totalNumber" :pay="payment" />
    <buys-bottomSubmit :number="totalNumber" :pay="payment" />

    <buys-popup-markpopup :showpop="showPop" @set-show="setShowFn" @write-mark="writeMarkFn" />
    <buys-popup-address :showpop="AddressshowPop" @set-show="AddressshowPop = false" />
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
