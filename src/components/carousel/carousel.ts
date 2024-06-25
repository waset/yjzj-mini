import type {
  CSSProperties,
  CarouselProps,
} from './type'

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

class Carousel<T> {
  /**
   * 公共配置
   */
  config: CarouselProps<T>

  /**
   * 构造函数
   *
   * @param config 公共配置
   */
  constructor(config: CarouselProps<T>, private callback: (name: any, value: any) => void) {
    this.config = config

    this.init()
  }

  public get list(): T[] {
    return this.config.list
  }

  /**
   * 初始化
   */
  init() {
    // 自动播放
    this.play()
  }

  /**
   * 上一个
   */
  prev() {
    let { current, list, loop } = this.config
    if (current === 0) {
      if (loop)
        current = list.length - 1
      else
        current = 0
    }
    else {
      current--
    }
    this.callback('update:current', current)
    // 自动播放
    this.play()
  }

  /**
   * 下一个
   */
  next() {
    let { current, list, loop } = this.config

    if (current === list.length - 1) {
      if (loop)
        current = 0
      else
        current = list.length - 1
    }
    else {
      current++
    }
    this.callback('update:current', current)
    // 自动播放
    this.play()
  }

  /**
   * 是否正在播放
   */
  private isPlaying: boolean = false

  /**
   * 自动播放
   */
  private play() {
    const { autoplay, interval } = this.config
    // 没有配置自动播放
    if (!autoplay) {
      return
    }
    // 正在自动播放
    if (this.isPlaying) {
      return
    }
    // 正在滑动
    if (this.isSliding) {
      return
    }
    // 重置计时器
    this.clear()
    // 自动播放
    this.timer = setInterval(() => {
      this.next()
    }, interval)
  }

  /**
   * 计时器
   */
  private timer: any = null

  /**
   * 清除计时器
   */
  clear() {
    this.timer && clearInterval(this.timer)
    this.timer = null
  }

  /**
   * 添加样式
   *
   * @param index 滑块索引
   * @returns 滑块样式
   */
  addStyle(index: number) {
    // 滑块样式
    const style = {} as CustomStyle

    const {
      current,
      offsetXStep,
      offsetYStep,
      offsetXStepUnits,
      offsetYStepUnits,
      scaleStep,
      rotateStep,
      opacityStep,
      list,
    } = this.config

    // 滑块距离
    const dis = index - current
    // 滑块正负
    const sign = Math.sign(dis)
    // 绝对值
    const abs = Math.abs(dis)
    // 滑块偏移量
    let offsetX = abs * (offsetXStep || 0)
    let offsetY = abs * (offsetYStep || 0)
    if (index !== current) {
      offsetX = (offsetX + (offsetXStep || 0)) * sign
      offsetY = (offsetY + (offsetYStep || 0)) * sign
    }
    // 添加单位
    style['--offsetX'] = this.addUnit(offsetX, offsetXStepUnits)
    style['--offsetY'] = this.addUnit(offsetY, offsetYStepUnits)
    // 滑块缩放比例
    style['--scale'] = (scaleStep || 0) ** abs
    // 旋转角度
    style['--rotate'] = this.addUnit((rotateStep || 0) * -sign, 'deg')
    // 设置层级
    style['--zIndex'] = list.length - abs
    // 设置透明度
    style['--opacity'] = (opacityStep || 0) ** abs

    return style
  }

  /**
   * 添加单位
   *
   * @param value
   * @param unit
   * @returns string
   */
  addUnit(value: number | string, unit = 'rpx'): string {
    if (/^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(String(value)))
      return `${value}${unit}`
    return `${value}`
  }

  /**
   * 是否正在播放
   */
  private isSliding: boolean = false

  /**
   *
   */
  private axis: number = 0
  /**
   * 滑动开始
   *
   * @param e TouchEvent
   */
  start(e: TouchEvent) {
    e.preventDefault()
    const { direction } = this.config
    // 如果正在滑动，退出
    if (this.isSliding)
      return
    // 滑动开始
    this.isSliding = true
    // 清除定时器
    this.clear()
    // 获取滑动距离
    const { clientX, clientY } = e.touches[0]
    switch (direction) {
      case 'horizontal':
        this.axis = clientX
        break
      case 'vertical':
        this.axis = clientY
        break
      default:
        this.axis = clientX
        break
    }
  }

  // 滑动结束
  end(e: TouchEvent) {
    e.preventDefault()
    const { direction, naturalDirection } = this.config
    // 如果不是在滑动，退出
    if (!this.isSliding)
      return
    // 获取滑动距离
    let size = 0
    const { clientX, clientY } = e.changedTouches[0]
    switch (direction) {
      case 'horizontal':
        size = clientX - this.axis
        break
      case 'vertical':
        size = clientY - this.axis
        break
      default:
        size = clientX - this.axis
        break
    }
    // 判断滑动距离
    if (size > 0) {
      if (naturalDirection)
        this.next()
      else
        this.prev()
    }
    else if (size < 0) {
      if (naturalDirection)
        this.prev()
      else
        this.next()
    }
    // 滑动结束
    this.isSliding = false
    // 开始自动播放
    this.play()
  }
}

export {
  Carousel,
}
export type {
  CarouselProps,
}
