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

export {
  CSSProperties,
  StyleValue,
  CarouselProps,
}
