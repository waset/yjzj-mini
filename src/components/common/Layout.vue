<script setup lang="ts">
const props = withDefaults(defineProps<{
  // 是否全屏
  isFull?: boolean
}>(), {
  isFull: false,
})
// 获取小程序胶囊尺寸
const menu = useMenuButtonBounding()
// 获取小程序状态栏高度
// const statusBarHeight = useStatusBarHeight()
// 获取小程序底部安全区距离
const safe_area = useSafeAreaInsets()
// 获取 tabbar 尺寸
const tabbar_size = useTabbarSize()
// 获取 navbar 尺寸
const navbar_size = useNavbarSize()
</script>

<template>
  <div
    class="body" :style="{
      // navbar
      '--navbar-top': `${menu.top}px`,
      '--navbar-width': `${menu.width}px`,
      '--navbar-height': `${menu.height}px`,
      '--navbar-left': `${navbar_size.left}px`,
      '--navbar-right': `${navbar_size.right}px`,
      '--navbar-bottom': `${navbar_size.bottom}px`,
      // tabbar
      '--tabbar-safe': `${safe_area.bottom}px`,
      '--tabbar-height': `${tabbar_size.height}rpx`,
      '--tabbar-top': `${tabbar_size.top}rpx`,
      '--tabbar-bottom': `${tabbar_size.bottom}rpx`,
    }"
  >
    <div v-if="!props.isFull" class="navbar-wrap" />
    <slot />
    <div v-if="!props.isFull" class="tabbar-wrap" />
  </div>
</template>

<style lang="scss" scoped>
  .body {
    width: 100%;
    height: 100%;
    // navbar
    --navbar-padding-left: var(--navbar-left);
    --navbar-padding-right: var(--navbar-right);
    --navbar-padding-bottom: 20rpx;
    --navbar-height-all: calc(var(--navbar-height) + var(--navbar-top) + var(--navbar-bottom));

    // tabbar
    --tabbar-padding-top: var(--tabbar-top);
    --tabbar-padding-bottom: calc(var(--tabbar-bottom) + env(safe-area-inset-bottom));
    --tabbar-height-all: calc(var(--tabbar-height) + var(--tabbar-top) + var(--tabbar-bottom) + env(safe-area-inset-bottom));

    // body
    --body-min-height: calc(100vh - var(--navbar-height-all) - var(--tabbar-height-all));

    .navbar-wrap {
      height: var(--navbar-height-all);
    }

    .tabbar-wrap {
      height: var(--tabbar-height-all);
    }
  }
</style>
