const bounding = ref<UniApp.GetMenuButtonBoundingClientRectRes>({
  width: 80,
  height: 32,
  left: 0,
  top: 12,
  bottom: 0,
  right: 410,
})

// #ifdef MP
bounding.value = uni.getMenuButtonBoundingClientRect() || bounding.value
// #endif

export default () => bounding
