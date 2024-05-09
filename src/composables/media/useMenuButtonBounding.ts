/**
 * navbar 胶囊边界
 * 单位：px
 */
const bounding = ref<UniApp.GetMenuButtonBoundingClientRectRes>({
  width: 80,
  height: 32,
  left: 16,
  right: 16,
  top: 12,
  bottom: 0,
})

// #ifdef MP
bounding.value = uni.getMenuButtonBoundingClientRect() || bounding.value
// #endif

export default () => bounding
