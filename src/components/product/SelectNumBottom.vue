<script setup lang="ts">
const totalnumber = ref<number>(1)

// 计算
const calculate = (str: string) => {
  if (str === 'reduce') {
    if (totalnumber.value > 1)
      totalnumber.value -= 1
    else
      return ''
  }
  else {
    totalnumber.value += 1
  }
}
</script>

<template>
  <div class="bottom">
    <div class="center">
      <div class="left">
        <div class="number">
          数量
        </div>
        <div class="counter">
          <div class="reduce" @click="calculate('reduce')">
            -
          </div>
          <div class="count">
            {{ totalnumber }}
          </div>
          <div class="plus" @click="calculate('plus')">
            +
          </div>
        </div>
      </div>
      <div class="right">
        <div class="cancel">
          取消
        </div>
        <div class="confirm">
          确定
          <div class="confirm2" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  padding: 32rpx 0;
  padding-bottom: env(safe-area-inset-bottom);
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: rgba($color: #fff, $alpha: .2);
  color: #f5f5f5;

  .center {
    position: relative;
    display: flex;
    color: #f5f5f5;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    box-sizing: border-box;
  }

  .left {
    width: 272rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .counter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 196rpx;
      height: 80rpx;
      background-color: rgba($color: #fff, $alpha: .2);
      border-radius: 40rpx;
      z-index: 99;
      padding: 28rpx 10rpx;
      box-sizing: border-box;
      font-size: 32rpx;
      margin-left: 16rpx;

      .plus,
      .reduce {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    }
  }

  .right {
    display: flex;
    align-items: center;
    color: #000;
    position: relative;
    width: 392rpx;

    .confirm,
    .cancel,
    .confirm2 {
      position: absolute;
      right: 32rpx;
      width: 186rpx;
      height: 64rpx;
      line-height: 64rpx;
      font-size: 28rpx;
      font-weight: 400;
      // margin-right: 40rpx;
      color: #000;
      text-align: center;
      z-index: 10;
      padding-left: 50rpx;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        left: 26rpx;
        right: 0;
        bottom: 0;
        border-radius: 30rpx;
        height: 64rpx;
        background: #A7F522;
        transform: skewX(-30deg);
        z-index: -1;
        border-top-left-radius: 20rpx;
      }

      &::before {
        content: "";
        position: absolute;
        top: 0;
        right: -20rpx;
        width: 162rpx;
        height: 64rpx;
        border-radius: 25rpx;
        background: #A7F522;
        z-index: -1;

      }

    }

    .confirm2 {
      position: absolute;
      top: 8rpx;
      left: 8rpx;
      z-index: -2;

      &::after {
        background-color: #57683B;
      }

      &::before {
        background-color: #57683B;
      }
    }

    .cancel {
      left: 6rpx;
      padding-left: 60rpx;
      padding-right: 50rpx;

      &::after {
        left: 24rpx;
        border-radius: 30rpx;
        height: 64rpx;
        background: #ffffff;
        transform: skewX(-30deg);
        z-index: -1;
        border-bottom-right-radius: 20rpx;
      }

      &::before {

        right: 21rpx;
        width: 162rpx;
        height: 64rpx;
        border-radius: 25rpx;
        background: #ffffff;
        z-index: -1;

      }
    }

  }
}
</style>
