<script setup lang="ts">

</script>

<template>
  <div class="bottom">
    <div class="left">
      <div class="number">
        数量
      </div>
      <div class="counter">
        <div class="reduce">
          -
        </div>
        <div class="count">
          5
        </div>
        <div class="plus">
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
      </div>
    </div>

    <div />
  </div>
</template>

<style lang="scss" scoped>
$btn1 :polygon(88.264% 78.538%, 97.557% 39.269%, 97.557% 39.269%, 98.5% 34.141%, 98.996% 28.82%, 99.076% 23.477%, 98.771% 18.285%, 98.111% 13.418%, 97.127% 9.049%, 95.85% 5.349%, 94.311% 2.493%, 92.54% 0.652%, 90.568% 0%, 12.766% 0%, 12.766% 0%, 10.695% 0.491%, 8.731% 1.912%, 6.899% 4.186%, 5.226% 7.235%, 3.739% 10.983%, 2.463% 15.353%, 1.425% 20.267%, 0.651% 25.647%, 0.167% 31.417%, -0% 37.5%, -0% 62.5%, -0% 62.5%, 0.167% 68.583%, 0.651% 74.353%, 1.425% 79.733%, 2.463% 84.647%, 3.739% 89.016%, 5.226% 92.765%, 6.899% 95.814%, 8.731% 98.088%, 10.695% 99.509%, 12.766% 100%, 74.288% 100%, 74.288% 100%, 75.948% 99.762%, 77.576% 99.059%, 79.164% 97.905%, 80.699% 96.318%, 82.173% 94.311%, 83.575% 91.901%, 84.896% 89.103%, 86.124% 85.933%, 87.25% 82.406%, 88.264% 78.538%);
$btn :polygon(10.964% 19.077%, 2.051% 53.983%, 2.051% 53.983%, 1.147% 58.541%, 0.671% 63.271%, 0.594% 68.021%, 0.887% 72.635%, 1.52% 76.961%, 2.463% 80.846%, 3.688% 84.134%, 5.165% 86.673%, 6.863% 88.309%, 8.754% 88.889%, 83.381% 88.889%, 83.381% 88.889%, 85.367% 88.453%, 87.251% 87.19%, 89.008% 85.168%, 90.613% 82.457%, 92.04% 79.126%, 93.263% 75.242%, 94.259% 70.874%, 95.002% 66.091%, 95.466% 60.962%, 95.626% 55.556%, 95.626% 33.333%, 95.626% 33.333%, 95.466% 27.926%, 95.002% 22.797%, 94.259% 18.015%, 93.263% 13.647%, 92.04% 9.763%, 90.613% 6.431%, 89.008% 3.721%, 87.251% 1.699%, 85.367% 0.436%, 83.381% 0%, 24.37% 0%, 24.37% 0%, 22.778% 0.211%, 21.216% 0.837%, 19.693% 1.862%, 18.22% 3.273%, 16.807% 5.057%, 15.462% 7.199%, 14.195% 9.686%, 13.017% 12.504%, 11.937% 15.639%, 10.964% 19.077%);

.bottom {
  box-sizing: border-box;
  padding: 32rpx;
  height: 144rpx;
  width: 100%;
  position: fixed;
  bottom: 0;
  background-color: rgba($color: #fff, $alpha: .2);
  display: flex;
  color: #f5f5f5;

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
      padding: 28rpx;
      box-sizing: border-box;
      font-size: 32rpx;
    }
  }

  .right {
    display: flex;
    align-items: center;
    color: #000;

    .confirm {
      position: relative;
      width: 186rpx;
      height: 64rpx;
      line-height: 64rpx;
      font-size: 28rpx;
      font-weight: 400;
      margin-right: 40rpx;
      color: #000;
      text-align: center;
      z-index: 10;
      padding-left: 50rpx;

      // background:#A7F522;
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

  }
}
</style>
