<template>
  <div class="step">
    <div class="medal flex-center">
      <div class="icon i-icons-medal-lv1" />
      <div class="icon shadows i-icons-medal-lv1" />
      <div>艺术字</div>
    </div>
    <div class="medal flex-center">
      <div class="icon i-icons-medal-lv1" />
      <div class="icon shadows i-icons-medal-lv1" />
      <div>艺术字</div>
    </div>
    <div class="medal flex-center">
      <div class="icon i-icons-medal-lv1" />
      <div class="icon shadows i-icons-medal-lv1" />
      <div>艺术字</div>
    </div>
    <div class="progress">
      <div class="progress-bar" :style="{ width: '20%' }" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step {
  margin-bottom: 80rpx;
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  position: relative;
  width: 100%;

  .medal {
    flex-shrink: 0;
    width: 400rpx;
    padding: 132rpx 0 104rpx;
    flex-direction: column;

    .icon {
      width: 214rpx;
      height: 174rpx;
      z-index: 9;
    }

    .shadows {
      transform: rotateY(180deg);
      opacity: 0.3;
      margin-top: 12rpx;
    }
  }

  .progress {
    z-index: 6;
    position: absolute;
    top: 210rpx;
    left: 200rpx;
    right: 200rpx;
    width: 100%;
    height: 16rpx;
    background: linear-gradient(134deg, rgba(190, 190, 190, 0.2) 0%, rgba(190, 190, 190, 0.8) 34%, rgba(190, 190, 190, 0.8) 70%, rgba(190, 190, 190, 0.2) 100%);

    .progress-bar {
      background: #F5B922;
      height: 16rpx;
    }
    .progress-img {
      width: 20px;
      height: 20px;
      background-image: url('dot.png');
      background-size: cover;
      position: absolute;
      top: 0;
      transform: translateX(-50%);
    }
  }
}
</style>
