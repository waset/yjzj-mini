<script setup lang="ts" generic="T">
import type { StyleValue } from 'vue'

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
   * 滑块X轴偏移量，单位为 rpx
   * @default 0
   */
  offsetXStep?: number
  /**
   * 滑块Y轴偏移量，单位为 rpx
   * @default 0
   */
  offsetYStep?: number
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
}
// 接口
const props = withDefaults(defineProps<CarouselProps<T>>(), {
  height: 300,
  autoplay: false,
  loop: false,
  direction: 'horizontal',
  overflow: 'hidden',
  interval: 3000,
  duration: 200,
  displayMultipleItems: 0,
  indicator: false,
  bgColor: 'transparent',
  radius: 4,
  easingFunction: 'ease',
  offsetXStep: 200,
  offsetYStep: 0,
  scaleStep: 0.6,
  opacityStep: 0.5,
  rotateStep: 0,
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
// 计时器
let timer: NodeJS.Timeout | null = null
// 挂载时
onMounted(() => {
  play()
})
// 卸载时
onUnmounted(() => {
  clear()
})
// 是否可以自动播放
const canAutoplay = ref(props.autoplay)
// 监听 current 变化
watch(() => props.current, () => {
  // 自动播放
  play()
})
function upCurrent(value: number) {
  // current 超大
  if (value > props.list.length - 1) {
    if (props.loop)
      emits('update:current', 0)
    else
      emits('update:current', props.list.length - 1)
  }
  // current 超小
  else if (value < 0) {
    if (props.loop)
      emits('update:current', props.list.length - 1)
    else
      emits('update:current', 0)
  }
  else {
    emits('update:current', value)
  }
  // 触发change事件
  emits('change', { current: value, source: 'change' })
}
// 自动播放
function play() {
  // 自动播放
  if (!canAutoplay.value)
    return
  // 重置计时器
  clear()
  timer = setInterval(() => {
    if (props.current === props.list.length - 1)
      upCurrent(0)
    else
      upCurrent(props.current + 1)
    // 触发change事件
    emits('change', { current: props.current, source: 'autoplay' })
  }, props.interval)
}
// 清除
function clear() {
  timer && clearInterval(timer); timer = null
}
const axis = ref(0)
// 滑动开始
function start(e: TouchEvent) {
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
function end(e: TouchEvent) {
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
  if (size > 0)
    upCurrent(props.current - 1)
  else if (size < 0)
    upCurrent(props.current + 1)
}
// 点击事件
function clickHandler(e: any, index: number) {
  emits('click', index)
}
// 滑块样式
function addStyle(index: number) {
  // 滑块距离
  const dis = index - props.current
  // 绝对值
  const abs = Math.abs(dis)
  // 滑块正负
  const sign = Math.sign(abs)
  // 滑块样式
  const style: StyleValue = {}
  // 滑块偏移量
  let offsetX = abs * props.offsetXStep
  let offsetY = abs * props.offsetYStep

  if (index !== props.current) {
    offsetX = (offsetX + props.offsetXStep) * sign
    offsetY = (offsetY + props.offsetYStep) * sign
  }
  // 滑块缩放比例
  const scale = props.scaleStep ** abs
  // 旋转角度
  const rotate = props.rotateStep ? props.rotateStep * -sign : 0
  // 设置样式
  style.transform = `translateX(${offsetX}rpx) translateY(${offsetY}rpx) scale(${scale}) rotateY(${rotate}deg)`
  // 设置层级
  style.zIndex = props.list.length - abs
  // 设置透明度
  style.opacity = props.opacityStep ** abs
  // 设置过渡效果
  style.transition = `transform ${props.duration}ms ${props.easingFunction},`
  style.transition += `opacity ${props.duration}ms ${props.easingFunction},`
  style.transition += `z-index ${props.duration}ms ${props.easingFunction}`

  return style
}
// 添加单位
function addUnit(value: number | string) {
  if (/^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(String(value)))
    return `${value}rpx`
  return value
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
    }"
  >
    <template v-if="props.switch">
      <div class="switch">
        <div class="item" @click="upCurrent(props.current - 1)">
          <slot name="prev" :current="props.current" :click="upCurrent">
            <div class="left" />
          </slot>
        </div>
        <div class="item" @click="upCurrent(props.current + 1)">
          <slot name="next" :current="props.current" :click="upCurrent">
            <div class="right" />
          </slot>
        </div>
      </div>
    </template>
    <template v-if="props.indicator">
      <slot name="indicator" :current="props.current" :length="props.list.length">
        <view class="indicator">
          <template v-for="(_, index) in props.list" :key="index">
            <view
              class="item" :class="{
                active: index === props.current,
              }" @click="upCurrent(index)"
            />
          </template>
        </view>
      </slot>
    </template>
    <div class="wrapper" @touchstart="start" @touchend="end">
      <template v-for="(item, index) in props.list" :key="index">
        <view class="item" :style="addStyle(index)" @click="(e) => clickHandler(e, index)">
          <slot name="item" :item="item" :index="index">
            <image
              class="image" :style="{
                width: '100vw',
                height: 'var(--carousel-height)',
                borderRadius: 'var(--carousel-border-radius)',
              }" :src="item" mode="aspectFill" :draggable="false" lazy-load :fade-show="false"
              @click="clickHandler(index)"
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
        overflow: var(--carousel-overflow);
        cursor: pointer;

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
                max-width: 100%;
                height: var(--carousel-height);
                position: absolute;
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
