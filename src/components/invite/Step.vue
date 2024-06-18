<script lang="ts" setup>
// 邀请升级进度
const tempo = ref('20%')
const leftSilde = ref(0)
function sildeRight() {
  leftSilde.value = leftSilde.value + 400
  console.log('object', leftSilde.value)
}
</script>

<template>
  <div class="step">
    <scroll-view scroll-x scroll-with-animation :scroll-left="20">
      <div class="container">
        <template v-for="i in 3" :key="i">
          <div class="medal flex-center" :style="{ marginRight: i !== 3 ? '48rpx' : '0' }">
            <div class="icon i-icons-medal-lv1" />
            <div class="icon shadows i-icons-medal-lv1" />
            <div>艺术字</div>
          </div>
        </template>

        <div class="progress" :style="{ width: `${(3 - 1) * 400 + (3 - 1) * 48}rpx` }">
          <div class="progress-bar" :style="{ width: tempo }" />
          <div class="i-svg-invite-ellipse elllipse absolute" :style="{ left: `calc(${tempo} - 10rpx)` }" />
        </div>
      </div>
    </scroll-view>
    <div class="i-icons-left left-arrows" />
    <div class="i-icons-right right-arrows" @click="sildeRight" />
  </div>
</template>

<style lang="scss" scoped>
.step {
  position:relative;
  .right-arrows{
    position:absolute;
    width: 64rpx;
    height: 64rpx;
    left: 676rpx;
    top: 50%;
    transform: translateY(-50%)
  }
  .left-arrows{
    position:absolute;
    width: 64rpx;
    height: 64rpx;
    left: 10rpx;
    top: 50%;
    transform: translateY(-50%)
  }
}
.container {
  margin-bottom: 80rpx;
  display: flex;
  flex-wrap: nowrap;
  overflow-y: scroll;
  position: relative;
  overflow: auto;

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
    transition: width 0.3s ease-in-out
  }

  .progress {
    z-index: 6;
    position: absolute;
    top: 210rpx;
    left: 200rpx;
    right: 200rpx;
    height: 16rpx;
    background: linear-gradient(134deg, rgba(190, 190, 190, 0.2) 0%, rgba(190, 190, 190, 0.8) 34%, rgba(190, 190, 190, 0.8) 70%, rgba(190, 190, 190, 0.2) 100%);

    .progress-bar {
      background: #F5B922;
      height: 16rpx;
    }
    .elllipse{
      width: 32rpx;
      height: 32rpx;
      top: calc(-18rpx + 8rpx);
    }
  }
}
</style>
