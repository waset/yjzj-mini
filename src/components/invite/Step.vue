<script lang="ts" setup>
const props = defineProps<{
  levelall: Levelall[]
  user: UserInfo
}>()

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

// 邀请等级 0是未成为邀请人
const myLevel = computed(() => props.user.promoter?.levelLevel || 0)

/**
 * @description 计算当前段位升级的百分比
 * @returns {string} 百分比字符串，如 "50.00%"
 */
const percentage = computed(() => {
  // 计算当前等级与总等级比例
  const gap = ((myLevel.value - 1) / (props.levelall.length - 1)) * 100

  // 如果用户不是推广者状态 返回 0%
  if (!props.user.promoterStatus) {
    return '0%'
  }

  // 查找当前用户推广者等级对应的区间
  const interval = props.levelall.find((item) => {
    return item.level === props.user.promoter.levelLevel
  })

  if (!interval) {
    return '0%'
  }

  // 计算当前段升级所需积分范围
  const max = interval.performanceMax
  const min = interval.performanceMin
  const point = max - min

  // 计算当前段升级已有积分占当前段升级所需积分的比例
  const bonusPoint = (Number(props.user.promoter.cycleOrderAmount) - min) / point

  // 计算当前升级占总段升级所需积分的比例
  const bonusPointPercent = bonusPoint / (props.levelall.length - 1)

  // 计算最终升级百分比并返回格式化字符串
  const upgradePercentage = ((gap + bonusPointPercent) * 100).toFixed(2)
  return `${upgradePercentage}%`
})

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
// const tempo = ref('15%')

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
  <div class="step-view">
    <scroll-view
      id="scrollview" class="scroll" scroll-x scroll-with-animation :scroll-left="leftSlide"
      @scroll="sliding"
    >
      <div class="container">
        <template v-for="(item, index) in props.levelall" :key="index">
          <div
            class="medal flex-center" style="width: 400rpx;height: 600rpx;"
            :style="{ marginRight: item.level !== list.length ? '48rpx' : '0' }"
          >
            <div class="icon" :class="`${list[item.level]?.icon}`" />
            <div class="icon shadows" :class="`${list[item.level]?.icon}`" />
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
          <div class="progress-bar" :style="{ width: `${percentage}` }" />
          <div class="i-svg-invite-ellipse elllipse absolute" :style="{ left: `calc(${percentage} - 10rpx)` }" />
          <!-- 进度信息 没有加入不显示 -->
          <div v-if="myLevel !== 0" class="inviteinfo flex-center" :style="{ left: `calc(${percentage} + 10rpx)` }">
            <div class="flex items-center">
              <image :src="ImageUrl(props.user.avatar)" mode="scaleToFill" class="avatar mr-2" />
              <span class="nickname">{{ props.user.nickname }}</span>
              <span class="level ml-2">
                当前等级
                <span class="lever-name">{{ props.user.promoter.levelName }}</span>
              </span>
            </div>
            <div class="point mt-2">
              积分：{{ props.user.promoter.cycleOrderAmount ? props.user.promoter.cycleOrderAmount : 0 }}
            </div>
            <div class="i-svg-notch horn absolute" />
          </div>
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
.step-view {
  position: relative;
  width: 100%;
  overflow: scroll;

  .scroll {
    width: 100%;
  }

  .inviteinfo {
    margin: 92rpx auto -100rpx auto;
    width: 366rpx;
    height: 140rpx;
    background: linear-gradient(90deg, rgba(254, 233, 160, 0) 0%, rgba(254, 233, 160, 0.5) 53%, rgba(254, 233, 160, 0) 100%);
    flex-direction: column;
    position: absolute;
    top: -300rpx;
    transform: translateX(-50%);

    .horn {
      width: 28rpx;
      height: 16rpx;
      left: 50%;
      bottom: -14rpx;
      transform: translateX(-50%);
    }

    .avatar {
      width: 48rpx;
      height: 48rpx;
      border-radius: 48rpx;
    }

    .nickname {
      font-size: 28rpx;
    }

    .point {
      font-weight: 600;
      font-size: 28rpx;
      color: #FFDF6D;
    }

    .level {
      font-size: 24rpx;
    }

    .lever-name {
      font-style: italic;
    }
  }

  .right-arrows {
    position: absolute;
    width: 64rpx;
    height: 64rpx;
    left: 676rpx;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
  }

  .left-arrows {
    position: absolute;
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
        font-size: 28rpx;
        font-style: normal;
      }

      .ratio {
        color: #FFFFFF;
        font-weight: bold;
        font-size: 22rpx;
        font-style: normal;
      }

      .retiobe {
        color: #FFFFFF;
        font-weight: bold;
        font-size: 28rpx;
        font-style: normal;
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

    .elllipse {
      width: 32rpx;
      height: 32rpx;
      top: calc(-18rpx + 8rpx);
    }
  }
}
</style>
