// 获取小程序安全区
const safe_area = ref<UniApp.SafeAreaInsets>({
  left: 0,
  top: 0,
  bottom: 20,
  right: 0,
})
// #ifdef MP
safe_area.value = uni.getSystemInfoSync().safeAreaInsets || safe_area.value
// #endif

export default () => safe_area
