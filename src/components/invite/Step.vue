<script lang="ts" setup>
const props = withDefaults(defineProps<{
  levelall: Levelall[]
}>(), {
  levelall: () => [],
})
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

// 升级轮播滑动值
const elSlide = ref(0)
onReady(() => {
  // 元素信息
  const query = uni.createSelectorQuery().in(getCurrentInstance())
  query
    .select('#scrollview')
    .fields({ size: true, scrollOffset: true }, (data: any) => {
      elSlide.value = data.scrollWidth - data.width
    })
    .exec()
})

// 邀请升级进度
const tempo = ref('15%')

// 横向滚动条位置
const leftSlide = ref(0)

// 手动滑动距离
const autoSlide = ref(0)

// 是否滑倒最左边了
const isTouchLeft = ref(false)

// 是否滑倒最右边了
const isTouchRight = ref(false)

// 向右滑动
function slideRight() {
  if (autoSlide.value) {
    leftSlide.value = autoSlide.value
  }
  if (leftSlide.value >= elSlide.value) {
    leftSlide.value = elSlide.value
  }
  else {
    leftSlide.value += 200
  }
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
function sliding(event: any) {
  autoSlide.value = event.detail.scrollLeft
  isTouchLeft.value = autoSlide.value < 10
  isTouchRight.value = autoSlide.value > elSlide.value - 10
}
</script>

<template>
  <div class="step">
    <scroll-view id="scrollview" class="scroll" scroll-x scroll-with-animation :scroll-left="leftSlide" @scroll="sliding">
      <div class="container">
        <template v-for="(item, index) in props.levelall" :key="index">
          <div class="medal flex-center" style="width: 400rpx;height: 600rpx;" :style="{ marginRight: item.level !== list.length ? '48rpx' : '0' }">
            <div class="icon" :class="`i-svg-medal-lv${item.level}`" />
            <div class="icon shadows" :class="`i-svg-medal-lv${item.level}`" />
            <div class="dec mt--12">
              <div class="preforman">
                积分{{ item.performanceMin }}-{{ item.performanceMax }}
              </div>
              <div class="ratio mt-3">
                周期内推广升级
              </div>
              <div class="mt-1">
                <span class="ratio">获取佣金返利最高达</span>
                <span class="retiobe ml-1">{{ Number(item.rebateRatio) * 100 }}%</span>
              </div>
            </div>
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
    <template v-if="!isTouchRight">
      <div class="i-icons-right right-arrows" @click="slideRight" />
    </template>
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
      opacity: 0.2;
      margin-top: 12rpx;
    }
    .dec {
      .preforman {
        color: #901CCB;
        font-weight: bold;
        font-size:28rpx;
        font-style:normal;
      }
      .ratio {
        color: #FFFFFF;
        font-weight: bold;
        font-size:22rpx;
        font-style:normal;
      }
      .retiobe {
        color: #FFFFFF;
        font-weight: bold;
        font-size:28rpx;
        font-style:normal;
      }
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
