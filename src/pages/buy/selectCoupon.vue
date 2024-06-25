<script lang="ts" setup>
const { couponList } = storeToRefs(useSubmitOrderStore())

const selectId = ref<number>(0)
const price = ref<string>('0')

// 选择优惠券
const selectItem = (index: number) => {
  selectId.value = couponList.value[index]?.ticketInfo?.id ?? 0
  price.value = couponList.value[index]?.ticketInfo?.discountPrice ?? '0'
}

const confirm = () => {
  Jump('/pages/buy/submitOrder', { id: selectId.value, couponPrice: price.value }, 1)
}
</script>

<template>
  <navbar-back text="我的优惠券" />
  <div class="body">
    <buys-coupon-search />
    <div v-if="couponList.length === 0">
      <common-empty text="当前暂无优惠券" icon="i-svg-nocoupon" />
    </div>
    <div v-for="(item, index) in couponList" :key="index" class="itembox" @click="selectItem(index)">
      <buys-coupon-item :coupn="item" :maxwidth="476" />
      <div v-if="selectId !== item.ticketInfo.id" class="circle" />
      <div v-if="selectId === item.ticketInfo.id" class="circle2">
        <div class="i-icons-correct" />
      </div>
    </div>
    <div class="confirm">
      <div>
        优惠金额：￥{{ price }}
      </div>
      <div class="confirmBtn" @click="confirm">
        确认
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;
$Be: #BEBEBE;

.i-background-product-detail {
  width: 100%;
  height: 100%;
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .itembox {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    box-sizing: border-box;

    .circle,
    .circle2 {
      border-radius: 50%;
      border: 2rpx solid #fff;
      width: 40rpx;
      height: 40rpx;
      box-sizing: border-box;

    }

    .circle2 {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      font-size: 28rpx;
      background-color: #A7F522;
      border: 0;
    }
  }

  .confirm {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 144rpx;
    background-color: rgba($color: #fff, $alpha: 0.2);
    backdrop-filter: blur(48rpx);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32rpx;
    box-sizing: border-box;

    .confirmBtn {

      background-color: #A7F522;
      font-size: 28rpx;
      border-radius: 8rpx;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 192rpx;
      height: 80rpx;
    }

    .confirmBtn:active {
      background-color: #8fdf06;

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
