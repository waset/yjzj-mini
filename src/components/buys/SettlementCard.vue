<script lang="ts" setup>
const props = defineProps<{
  totalpay: number
  number: number
  pay: number
  coupon: string
}>()
</script>

<template>
  <div class="settlementCard">
    <div class="trapezoid" />
    <div class="circle" />
    <div class="title">
      结算信息
    </div>

    <div class="row">
      <div class="BEC">
        商品数量
      </div>
      <div>x {{ props.number }}</div>
    </div>

    <div class="row">
      <div class="BEC">
        合计金额
      </div>
      <div>￥{{ (props.totalpay).toFixed(2) }}</div>
    </div>

    <div class="row">
      <div class="BEC">
        活动优惠
      </div>
      <div>
        0
      </div>
    </div>

    <div class="row">
      <div class="BEC ">
        卡券优惠
      </div>
      <div v-if="props.coupon === ''">
        0
      </div>
      <div v-if="props.coupon !== ''" class="coupon">
        -{{ props.coupon }}
      </div>
    </div>

    <div class="row ">
      <div class="BEC">
        优惠
      </div>
      <div>0</div>
    </div>

    <div class="lines" />

    <div class="row2">
      <div style="color: #fff;">
        实付金额
      </div>
      <div style="color: #a7f522;font-weight: bold;">
        ￥{{ props.pay.toFixed(2) }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$max-width: 686rpx;
$Be: #BEBEBE;

.settlementCard {
  position: relative;
  padding: 0 32rpx 32rpx 32rpx;

  border-radius: 32rpx;
  width: 686rpx;
  background-image: linear-gradient(135deg, #4C4A4B, rgba(#0D0D0D, 0.8), rgba(#0D0D0D, 0.9), #373737);

  .circle {
    position: absolute;
    width: 44rpx;
    height: 44rpx;
    border-radius: 20rpx;
    top: 30rpx;
    right: 36rpx;
    border: 3rpx;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(135deg, #000, #000), linear-gradient(135deg, #000, #fff);
  }

  .row {
    margin: 0 auto;
    width: 622rpx;
    height: 56rpx;
    font-size: 28rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 0 32rpx;
    margin-top: 16rpx;

    .BEC {
      color: $Be;
    }
    .coupon {
      color: #F53F3F;

    }
  }

  .row2 {
    margin: 32rpx auto 0;
    padding-bottom: 32rpx;
    width: 622rpx;
    height: 56rpx;
    font-size: 32rpx;
    font-weight: normal;
    color: #A7F522;
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    box-sizing: border-box;
    justify-content: space-between;
  }

  .lines {

    width: 622rpx;
    height: 2rpx;
    margin: 0 auto;
    background: linear-gradient(135deg, rgba(#BEBEBE, 0.1), rgba(#BEBEBE, 0.4), rgba(#BEBEBE, 0.4), rgba(#BEBEBE, 0.1));
    margin-top: 16rpx;
  }

  .trapezoid {
    position: relative;
    width: 290rpx;
    height: 28px;
    margin: 0 auto;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: perspective(40px) rotateX(-10deg);
      transform-origin: top;
      background: #444444;
      border-bottom-left-radius: 10rpx;
      border-bottom-right-radius: 10rpx;
    }

  }

  .title {
    color: #fff;
    font-size: 32rpx;
    font-weight: 600;
    margin-top: 20rpx;
    margin-left: 32rpx;
    margin-bottom: 40rpx;
  }

}
</style>
