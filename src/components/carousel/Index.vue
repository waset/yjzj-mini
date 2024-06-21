<script setup lang="ts" generic="T">
import { Carousel, type CarouselProps } from './carousel'

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

/**
 * 初始化轮播方法
 */
const carousel = new Carousel<T>(props, (name, value) => {
  emits(name, value)
})

// 挂载时
onMounted(() => {
  carousel.init()
})

// 卸载时
onUnmounted(() => {
  carousel.clear()
})

// 点击事件
function clickHandler(index: number) {
  emits('click', index)
}
</script>

<template>
  <div
    class="carousel" :style="{
      '--carousel-height': carousel.addUnit(props.height),
      '--carousel-bg-color': props.bgColor,
      '--carousel-border-radius': carousel.addUnit(props.radius),
      '--carousel-length': `${carousel.list.length}`,
      '--carousel-overflow': props.overflow,
      '--carousel-interval': `${props.interval}`,
      '--carousel-duration': `${props.duration}`,
      '--carousel-display-multiple-items': `${props.displayMultipleItems}`,
      '--transition': `${props.duration}ms ${props.easingFunction}`,
    }"
  >
    <template v-if="props.switch">
      <div class="switch" :style="props.switchStyle">
        <div class="item" @click="carousel.prev">
          <slot name="prev" :current="props.current" :click="carousel.prev">
            <div class="left" />
          </slot>
        </div>
        <div class="item" @click="carousel.next">
          <slot name="next" :current="props.current" :click="carousel.next">
            <div class="right" />
          </slot>
        </div>
      </div>
    </template>
    <template v-if="props.indicator">
      <div class="indicator" :style="props.indicatorStyle">
        <slot name="indicator" :current="props.current" :length="carousel.list.length">
          <template v-for="(_, index) in carousel.list" :key="index">
            <div
              class="item" :class="{
                active: index === props.current,
              }" @click="emits('update:current', index)"
            />
          </template>
        </slot>
      </div>
    </template>
    <div class="wrapper" @touchstart.capture="carousel.start" @touchend.capture="carousel.end">
      <template v-for="(item, index) in carousel.list" :key="index">
        <div class="item" :style="carousel.addStyle(index)" @click="clickHandler(index)">
          <slot name="item" :item="item" :index="index">
            <image
              class="image" :style="{
                width: '100%',
                height: 'var(--carousel-height)',
                borderRadius: 'var(--carousel-border-radius)',
              }" :src="item" mode="aspectFill" :draggable="false" lazy-load :fade-show="false"
            />
          </slot>
        </div>
      </template>
    </div>
  </div>
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
