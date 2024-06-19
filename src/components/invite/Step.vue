<script lang="ts" setup>
interface listType {
  lv: number
  icon: string
}

const list = ref<listType[]>([
  { lv: 1, icon: 'i-svg-medal-lv1' },
  { lv: 2, icon: 'i-svg-medal-lv2' },
  { lv: 3, icon: 'i-svg-medal-lv3' },
  { lv: 4, icon: 'i-svg-medal-lv4' },
  { lv: 5, icon: 'i-svg-medal-lv5' },
])

// 邀请升级进度
const tempo = ref('15%')

// 横向滚动条位置
const leftSlide = ref(0)

// 手动滑动距离
const autoSlide = ref(0)

// 是否滑倒最左边了
const isTouchLeft = ref(false)

// 向右滑动
function slideRight() {
  if (autoSlide.value) {
    leftSlide.value = autoSlide.value
  }
  leftSlide.value += 200
  autoSlide.value = 0
}

// 向左滑动
function slideLeft() {
  if (autoSlide.value) {
    leftSlide.value = autoSlide.value
  }
  if (leftSlide.value < 200) {
    leftSlide.value = 0
  }
  else {
    leftSlide.value -= 200
  }
  autoSlide.value = 0
}

// 滑动时触发事件
async function sliding(event: any) {
  autoSlide.value = event.detail.scrollLeft
  isTouchLeft.value = autoSlide.value < 10
}
</script>

<template>
  <div class="step">
    <scroll-view class="scroll scrollview" scroll-into-view="ell" scroll-x scroll-with-animation :scroll-left="leftSlide" @scroll="sliding">
      <div class="container">
        <template v-for="(item, index) in list" :key="index">
          <div class="medal flex-center" style="width: 400rpx;height: 600rpx;" :style="{ marginRight: item.lv !== list.length ? '48rpx' : '0' }">
            <div class="icon" :class="item.icon" />
            <div class="icon shadows" :class="item.icon" />
            <div>艺术字</div>
          </div>
        </template>
        <!-- 进度条 -->
        <div class="progress" :style="{ width: `${(list.length - 1) * 400 + (list.length - 1) * 48}rpx` }">
          <div class="progress-bar" :style="{ width: tempo }" />
          <div class="i-svg-invite-ellipse elllipse absolute" :style="{ left: `calc(${tempo} - 10rpx)` }" />
        </div>
        <!-- 进度信息 -->
        <div class="inviteinfo flex-center" :style="{ left: `calc(${tempo} - 10rpx + 25%)` }">
          <div class="flex">
            <span>零零</span>
            <span class="ml-2">当前等级</span>
          </div>
          <div class="mt-2">
            积分：2000
          </div>
          <div class="i-svg-notch horn absolute" />
        </div>
      </div>
    </scroll-view>
    <template v-if="!isTouchLeft">
      <div class="i-icons-left left-arrows" @click="slideLeft" />
    </template>
    <div class="i-icons-right right-arrows" @click="slideRight" />
  </div>
</template>

<style lang="scss" scoped>
.step {
  position:relative;
  width: 100%;
  overflow: scroll;
  .scroll {
    width: 100%;
  }
  .inviteinfo {
    margin:92rpx auto -100rpx auto;
    width: 366rpx;
    height: 140rpx;
    background: linear-gradient(90deg, rgba(254, 233, 160, 0) 0%, rgba(254, 233, 160, 0.5) 53%, rgba(254, 233, 160, 0) 100%);
    flex-direction: column;
    position: absolute;
    top: -100rpx;
    .horn {
      width: 28rpx;
      height: 16rpx;
      left: 50%;
      bottom: -14rpx;
      transform: translateX(-50%);
    }
  }
  .right-arrows{
    position:absolute;
    width: 64rpx;
    height: 64rpx;
    left: 676rpx;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
  .left-arrows{
    position:absolute;
    width: 64rpx;
    height: 64rpx;
    left: 10rpx;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }
}
.container {
  margin-bottom: 80rpx;
  display: flex;
  position: relative;

  .medal {
    flex-shrink: 0;
    width: 400rpx;
    padding: 132rpx 0 104rpx;
    flex-direction: column;
    background: linear-gradient(180deg, rgba(254, 233, 160, 0) 0%, rgba(254, 233, 160, 0.1) 53%, rgba(254, 233, 160, 0) 100%);
    // transition: width 0.3s ease-in-out;
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
