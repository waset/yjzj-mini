<script setup lang="ts">
// 获取小程序胶囊尺寸
const menu = useMenuButtonBounding()
// 获取小程序状态栏高度
// const statusBarHeight = useStatusBarHeight()
// 获取小程序底部安全区距离
const safeAreaInsets = useSafeAreaInsets()
</script>

<template>
  <div
    class="body" :style="{
      // navbar
      '--navbar-top': `${menu.top}px`,
      '--navbar-width': `${menu.width}px`,
      '--navbar-height': `${menu.height}px`,
      '--navbar-left': `${menu.left}px`,
      '--navbar-right': `${menu.right}px`,
      // tabbar
      '--tabbar-buttom': `${safeAreaInsets.bottom}`,
    }"
  >
    <slot />
    <div class="mx-auto mt-5 text-center text-sm c-white opacity-25">
      [Home Layout]
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .body {
        --navbar-padding-left: calc(100vw - var(--navbar-right));
        --navbar-padding-right: var(--navbar-padding-left);
        --navbar-padding-bottom: 20rpx;
        --navbar-heigth-all: calc(var(--navbar-height) + var(--navbar-top) + var(--navbar-padding-bottom));

        --tab-bar-padding-interval: 16rpx;

        padding-top: var(--navbar-heigth-all);
        padding-bottom: var(--window-bottom);
    }
</style>
