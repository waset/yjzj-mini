<script setup lang="ts">
interface CarouselProps {
  /**
   * 轮播图数据
   */
  list: any[]
  /**
   * 是否显示面板指示器
   * @default false
   */
  indicator?: boolean
  /**
   * 指示器激活的颜色
   * @default "#fff"
   */
  indicatorActiveColor?: string
  /**
   * 指示器非激活颜色
   * @default "rgba(255, 255, 255, 0.35)"
   */
  indicatorInactiveColor?: string
  /**
   * 指示器样式，可通过bottom，left，right进行定位
   */
  indicatorStyle?: Record<string, any> | string | undefined
  /**
   * 指示器模式
   * @default "line"
   */
  indicatorMode?: 'line' | 'dot'
  /**
   * 是否自动切换
   * @default true
   */
  autoplay?: boolean
  /**
   * 当前所在滑块的 index
   * @default 0
   */
  current: number
  /**
   * 当前所在滑块的 item-id ，不能与 current 被同时指定
   */
  currentItemId?: string
  /**
   * 滑块自动切换时间间隔（ms）
   * @default 3000
   */
  interval?: string | number
  /**
   * 滑块切换过程所需时间（ms），nvue不支持
   * @default 300
   */
  duration?: string | number
  /**
   * 播放到末尾后是否重新回到开头
   * @default false
   */
  circular?: boolean
  /**
   * 前边距，可用于露出前一项的一小部分，nvue和支付宝不支持
   * @default 0
   */
  previousMargin?: string | number
  /**
   * 后边距，可用于露出后一项的一小部分，nvue和支付宝不支持
   * @default 0
   */
  nextMargin?: string | number
  /**
   * 当开启时，会根据滑动速度，连续滑动多屏，支付宝不支持
   * @default false
   */
  acceleration?: boolean
  /**
   * 同时显示的滑块数量，nvue、支付宝小程序不支持
   * @default 1
   */
  displayMultipleItems?: number
  /**
   * 指定swiper切换缓动动画类型， 只对微信小程序有效
   * @default "default"
   */
  easingFunction?: 'default' | 'linear' | 'easeInCubic' | 'easeOutCubic' | 'easeInOutCubic'
  /**
   * 裁剪模式
   * @default "aspectFill"
   */
  imgMode?: 'scaleToFill' | 'aspectFit' | 'aspectFill' | 'widthFix' | 'heightFix' | 'top' | 'bottom' | 'center' | 'left' | 'right' | 'top left' | 'top right' | 'bottom left' | 'bottom right'

  /**
   * 组件高度
   * @default 130
   */
  height?: string | number
  /**
   * 背景颜色
   * @default "#f3f4f6"
   */
  bgColor?: string
  /**
   * 组件圆角，数值或带单位的字符串
   * @default 4
   */
  radius?: string | number
}

const props = withDefaults(defineProps<CarouselProps>(), {
  height: 600,
  autoplay: true,
  acceleration: true,
  interval: 5000,
  duration: 300,
  circular: true,
  previousMargin: 0,
  nextMargin: 0,
  bgColor: 'transparent',
  radius: 0,
  imgMode: 'aspectFill',
  easingFunction: 'linear',
  displayMultipleItems: 0,
  indicatorMode: 'dot',
  indicatorActiveColor: '#fff',
  indicatorInactiveColor: 'rgba(255, 255, 255, 0.35)',
})

const emits = defineEmits<{
  'update:current': [id: number]
  'click': [id: number]
  'change': [detail: { current: number, source: any }]
}>()

const canAutoplay = ref(props.autoplay)

// 轮播切换事件
function change(e: any) {
  canAutoplay.value = false
  // 当前的激活索引
  const {
    current,
  } = e.detail
  emits('update:current', current)
  emits('change', e.detail)
  setTimeout(() => {
    canAutoplay.value = true
  }, 2000)
}
// 点击某个item
function clickHandler(index: number) {
  emits('click', index)
}
// 判断是否数字
function isNumber(value: any) {
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
}
// 添加单位
function addUnit(value: any = 'auto', unit = 'rpx') {
  value = String(value)
  // 用uView内置验证规则中的number判断是否为数值
  return isNumber(value) ? `${value * 2}${unit}` : value
}
</script>

<template>
  <view
    class="carousel" :style="{
      '--swiper-height': addUnit(height),
      '--swiper-bg-color': bgColor,
      '--swiper-border-radius': addUnit(radius),
    }"
  >
    <swiper
      class="swiper" :circular="circular" :interval="interval" :duration="duration" :autoplay="canAutoplay"
      :current="current" :current-item-id="currentItemId" :previous-margin="addUnit(previousMargin)"
      :next-margin="addUnit(nextMargin)" :acceleration="acceleration" :display-multiple-items="displayMultipleItems"
      :easing-function="easingFunction" @change="change"
    >
      <swiper-item v-for="(item, index) in list" :key="index" class="item">
        <view class="wrapper">
          <slot name="default">
            <image class="image" :src="item" :mode="imgMode" @tap="clickHandler(index)" />
          </slot>
        </view>
      </swiper-item>
    </swiper>
    <view class="indicator" :style="[indicatorStyle]">
      <slot name="indicator">
        <u-swiper-indicator
          v-if="indicator" :indicator-active-color="indicatorActiveColor"
          :indicator-inactive-color="indicatorInactiveColor" :length="list.length" :current="current"
          :indicator-mode="indicatorMode"
        />
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
  .carousel {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;

    height: var(--swiper-height);
    background: var(--swiper-bg-color);
    border-radius: var(--swiper-border-radius);

    .swiper {
      flex: 1;
      height: var(--swiper-height);

      .item {
        flex: 1;

        .wrapper {
          display: flex;
          position: relative;
          overflow: hidden;
          transition: transform 0.3s;
          flex: 1;

          .image {
            flex: 1;

            height: var(--swiper-height);
            border-radius: var(--swiper-border-radius);
          }
        }
      }
    }

    .indicator {
      position: absolute;
      bottom: 10px;
    }
  }
</style>
