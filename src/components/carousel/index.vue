<script setup lang="ts" generic="T">
import type { CSSProperties, StyleValue } from 'vue'

// 轮播配置
interface CarouselProps<T> {
  /**
   * 轮播数据
   */
  list: T[]
  /**
   * 当前所在滑块的 index
   * 必须为 `v-model` 绑定
   * @default 0
   */
  current: number
  /**
   * 是否自动播放
   * @default false
   */
  autoplay?: boolean
  /**
   * 是否循环播放
   * @default false
   */
  loop?: boolean
  /**
   * 滑动方向
   * @default 'horizontal'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * 溢出方式
   * @default false
   */
  overflow?: 'hidden' | string
  /**
   * 滑块自动切换时间间隔（ms）
   * @default 3000
   */
  interval?: number
  /**
   * 滑块切换过程所需时间（ms），nvue不支持
   * @default 300
   */
  duration?: number
  /**
   * 同时显示的滑块数量，nvue、支付宝小程序不支持
   * @default 0
   */
  displayMultipleItems?: number
  /**
   * 是否显示面板指示器
   * @default false
   */
  indicator?: boolean
  /**
   * 指示器样式
   * indicator 为 true 时生效
   * @default {}
   */
  indicatorStyle?: StyleValue
  /**
   * 切换按钮样式
   * switch 为 true 时生效
   * @default {}
   */
  switchStyle?: StyleValue
  /**
   * 是否显示切换按钮
   * @default false
   */
  switch?: boolean
  /**
   * 组件高度 (单位 rpx)
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
  /**
   * 指定carousel切换缓动动画类型
   * @default "default"
   */
  easingFunction?: string | 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'
  /**
   * 滑块X轴偏移量
   * @default 100
   */
  offsetXStep?: number
  /**
   * 滑块X轴偏移量单位
   * @default %
   */
  offsetXStepUnits?: string
  /**
   * 滑块Y轴偏移量
   * @default 0
   */
  offsetYStep?: number
  /**
   * 滑块Y轴偏移量单位
   * @default %
   */
  offsetYStepUnits?: string
  /**
   * 滑块的缩放比例
   * @default 1
   */
  scaleStep?: number
  /**
   * 滑块的透明度
   * @default 0.5
   */
  opacityStep?: number
  /**
   * 旋转角度
   *
   * @default 0
   */
  rotateStep?: number
  /**
   * 是否自然滚动
   * @default false
   */
  naturalDirection?: boolean
}
// 接口
const props = withDefaults(defineProps<CarouselProps<T>>(), {
  height: 300,
  autoplay: false,
  loop: false,
  direction: 'horizontal',
  overflow: 'hidden',
  interval: 3000,
  duration: 1000,
  displayMultipleItems: 0,
  indicator: false,
  bgColor: 'transparent',
  radius: 4,
  easingFunction: 'ease',
  offsetXStep: 50,
  offsetXStepUnits: '%',
  offsetYStep: 0,
  offsetYStepUnits: '%',
  scaleStep: 1,
  opacityStep: 1,
  rotateStep: 0,
  naturalDirection: false,
})
// 事件
const emits = defineEmits<{
  'update:current': [id: number]
  'click': [id: number]
  'change': [detail: { current: number, source: any }]
}>()
// 插槽
defineSlots<{
  // 展示
  item: (props: { item: T, index: number }) => any
  // 指示器
  indicator: (props: { current: number, length: number }) => any
  // 上一个
  prev: (props: { current: number, click: Function }) => any
  // 下一个
  next: (props: { current: number, click: Function }) => any
}>()
// 挂载时
onMounted(() => {
  play()
})
// 卸载时
onUnmounted(() => {
  clear()
})
// 当前索引
const current = useVModel(props, 'current', emits)
// 计时器
let timer: NodeJS.Timeout | null = null
// 是否可以自动播放
const canAutoplay = ref(props.autoplay || false)
function prev() {
  if (current.value === 0) {
    if (props.loop)
      current.value = props.list.length - 1
    else
      current.value = 0
  }
  else {
    current.value--
  }
  // 触发change事件
  emits('change', { current: current.value, source: 'change' })
  // 自动播放
  play()
}
function next() {
  if (current.value === props.list.length - 1) {
    if (props.loop)
      current.value = 0
    else
      current.value = props.list.length - 1
  }
  else {
    current.value++
  }
  // 触发change事件
  emits('change', { current: current.value, source: 'change' })
  // 自动播放
  play()
}
// 滑动距离
const axis = ref(0)
// 是否正在滑动
const isSliding = ref(false)
// 自动播放
function play() {
  // 自动播放
  if (!canAutoplay.value || isSliding.value)
    return
  // 重置计时器
  clear()
  timer = setInterval(() => {
    next()
    // 触发change事件
    emits('change', { current: current.value, source: 'autoplay' })
  }, props.interval)
}
// 清除
function clear() {
  timer && clearInterval(timer)
  timer = null
}
// 滑动开始
const useStart = useThrottleFn(start, 800)
function start(e: TouchEvent) {
  e.preventDefault()
  // 判断是否正在滑动
  if (isSliding.value)
    return
  // 滑动开始
  isSliding.value = true
  // 获取滑动距离
  const { clientX, clientY } = e.touches[0]
  switch (props.direction) {
    case 'horizontal':
      axis.value = clientX
      break
    case 'vertical':
      axis.value = clientY
      break
    default:
      axis.value = clientX
      break
  }
}
// 滑动结束
const useEnd = useThrottleFn(end, 800)
function end(e: TouchEvent) {
  e.preventDefault()
  // 判断是否正在滑动
  if (!isSliding.value)
    return
  // 滑动结束
  isSliding.value = false
  // 获取滑动距离
  let size = 0
  const { clientX, clientY } = e.changedTouches[0]
  switch (props.direction) {
    case 'horizontal':
      size = clientX - axis.value
      break
    case 'vertical':
      size = clientY - axis.value
      break
    default:
      size = clientX - axis.value
      break
  }
  // 判断滑动距离
  if (size > 0) {
    if (props.naturalDirection)
      prev()
    else
      next()
  }
  else if (size < 0) {
    if (props.naturalDirection)
      next()
    else
      prev()
  }
}
// 点击事件
function clickHandler(index: number) {
  emits('click', index)
}
// css 变量
interface CustomStyle extends CSSProperties {
  // 滑块距离
  '--offsetX': string
  '--offsetY': string
  // 滑块缩放比例
  '--scale': number
  // 旋转角度
  '--rotate': string
  // 设置层级
  '--zIndex': number
  // 设置透明度
  '--opacity': number
}
// 滑块样式
function addStyle(index: number) {
  // 滑块样式
  const style = {} as CustomStyle
  // 滑块距离
  const dis = index - current.value
  // 滑块正负
  const sign = Math.sign(dis)
  // 绝对值
  const abs = Math.abs(dis)
  // 滑块偏移量
  let offsetX = abs * props.offsetXStep
  let offsetY = abs * props.offsetYStep
  if (index !== current.value) {
    offsetX = (offsetX + props.offsetXStep) * sign
    offsetY = (offsetY + props.offsetYStep) * sign
  }
  // 添加单位
  style['--offsetX'] = addUnit(offsetX, props.offsetXStepUnits)
  style['--offsetY'] = addUnit(offsetY, props.offsetXStepUnits)
  // 滑块缩放比例
  style['--scale'] = props.scaleStep ** abs
  // 旋转角度
  style['--rotate'] = addUnit(props.rotateStep * -sign, 'deg')
  // 设置层级
  style['--zIndex'] = props.list.length - abs
  // 设置透明度
  style['--opacity'] = props.opacityStep ** abs

  return style
}
// 添加单位
function addUnit(value: number | string, unit = 'rpx'): string {
  if (/^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(String(value)))
    return `${value}${unit}`
  return `${value}`
}
</script>

<template>
  <view
    class="carousel" :style="{
      '--carousel-height': addUnit(props.height),
      '--carousel-bg-color': props.bgColor,
      '--carousel-border-radius': addUnit(props.radius),
      '--carousel-length': `${props.list.length}`,
      '--carousel-overflow': props.overflow,
      '--carousel-interval': `${props.interval}`,
      '--carousel-duration': `${props.duration}`,
      '--carousel-display-multiple-items': `${props.displayMultipleItems}`,
      '--transition': `${props.duration}ms ${props.easingFunction}`,
    }"
  >
    <template v-if="props.switch">
      <div class="switch" :style="props.switchStyle">
        <div class="item" @click="prev">
          <slot name="prev" :current="current" :click="prev">
            <div class="left" />
          </slot>
        </div>
        <div class="item" @click="next">
          <slot name="next" :current="current" :click="next">
            <div class="right" />
          </slot>
        </div>
      </div>
    </template>
    <template v-if="props.indicator">
      <slot name="indicator" :current="current" :length="props.list.length">
        <view class="indicator" :style="props.indicatorStyle">
          <template v-for="(_, index) in props.list" :key="index">
            <view
              class="item" :class="{
                active: index === current,
              }" @click="current = index"
            />
          </template>
        </view>
      </slot>
    </template>
    <div class="wrapper" @touchstart.capture="useStart" @touchend.capture="useEnd">
      <template v-for="(item, index) in props.list" :key="index">
        <view class="item" :style="addStyle(index)" @click="clickHandler(index)">
          <slot name="item" :item="item" :index="index">
            <image
              class="image" :style="{
                width: '100vw',
                height: 'var(--carousel-height)',
                borderRadius: 'var(--carousel-border-radius)',
              }" :src="item" mode="aspectFill" :draggable="false" lazy-load :fade-show="false"
            />
          </slot>
        </view>
      </template>
    </div>
  </view>
</template>

<style lang="scss" scoped>
    .carousel {
        position: relative;
        width: 100%;
        height: var(--carousel-height);
        background: var(--carousel-bg-color);
        border-radius: var(--carousel-border-radius);

        .wrapper {
            position: absolute;
            width: 100%;
            overflow: var(--carousel-overflow);
            height: 100%;

            &:hover {
                background: none;
            }

            .item {
                width: 100%;
                height: var(--carousel-height);
                position: absolute;

                z-index: var(--zIndex);
                opacity: var(--opacity);
                transform: translate(var(--offsetX), var(--offsetY)) scale(var(--scale)) rotate(var(--rotate));
                transition: scale var(--transition), opacity var(--transition), transform var(--transition);
            }
        }

        .switch {
            .item {

                .left,
                .right {
                    position: absolute;
                    top: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 50px;
                    height: 100%;
                    font-size: 40px;
                    color: #fff;
                    background: rgba(0, 0, 0, 0.2);
                    z-index: calc(var(--carousel-length) + 1);
                }

                .left {
                    left: 0;

                    &::after {
                        content: '<';
                    }
                }

                .right {
                    right: 0;

                    &::after {
                        content: '>';
                    }
                }
            }
        }

        .indicator {
            position: absolute;
            bottom: 10px;
            left: 0;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: calc(var(--carousel-length) + 1);

            .item {
                width: 16rpx;
                height: 16rpx;
                border-radius: 32rpx;
                background: rgba(255, 255, 255, 0.2);
                margin: 0 10rpx;
                cursor: pointer;
                transition: width 0.3s ease-in-out;

                &.active {
                    width: 48rpx;
                    background: rgba(255, 255, 255, 0.8);
                }
            }
        }
    }
</style>
