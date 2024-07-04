<script lang="ts" setup>
const props = defineProps<{
  number: number
  pay: number
}>()

const emits = defineEmits<{
  (e: 'submitOrder'): void
}>()
const submitOrder = () => {
  emits('submitOrder')
}
</script>

<template>
  <div class="bottomSubmit">
    <div class="align">
      <div class="numAndProce">
        <span class="fs24" style="color: #BEBEBE;">共</span>
        <span class="fs24" style="color: #EDA522;">{{ props.number }}</span>
        <span class="fs24" style="color: #BEBEBE;">件</span>
        <span class="fs24">|</span>
        <span class="fs24">合计：</span>
        <span class="fs32">￥{{ props.pay }}</span>
      </div>
      <div class="submitBtn" @click="submitOrder">
        <div class="submitBtnCopy" />
        立即下单
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.fs24 {
  font-size: 24rpx;
  margin-right: 10rpx;
}

.fs32 {
  font-size: 32rpx;
  font-weight: 600;
  color: #A7F522;
}

.bottomSubmit {
  position: fixed;
  left: 0;
  bottom: 0;
  height: calc(128rpx + env(safe-area-inset-bottom));
  width: 100%;
  background-color: rgba($color: #fff, $alpha: 0.2);
  backdrop-filter: blur(48rpx);
  padding: 32rpx;
  box-sizing: border-box;
  .align {
    height: 64rpx;
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }
  .numAndProce {
    display: flex;
    align-items: center;
  }

  .submitBtn,
  .submitBtnCopy {
    position: relative;
    width: 230rpx;
    height: 64rpx;
    line-height: 64rpx;
    font-size: 28rpx;
    font-weight: 400;
    margin-right: 40rpx;
    color: #000;
    text-align: center;
    z-index: 10;
    padding-left: 50rpx;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 20rpx;
      height: 64rpx;
      background: #A7F522;
      transform: skewX(-30deg);
      z-index: -1;
    }

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: -40rpx;
      width: 254rpx;
      height: 64rpx;
      border-radius: 20rpx;
      background: #A7F522;
      z-index: -1;
    }

    &::after:active {
      background-color: #beff4d;
    }

    &::before:active {
      background-color: #beff4d;
    }
  }

  .submitBtnCopy {
    position: absolute;
    top: 8rpx;
    left: 8rpx;
    z-index: -2;

    &::after {

      background: #5F6F45;
      z-index: -2;
    }

    &::before {

      background: #5F6F45;
      z-index: -2;
    }
  }

}
</style>
