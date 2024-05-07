<script setup lang="ts">
  // 获取小程序胶囊尺寸
  const menu = useMenuButtonBounding()
  // 获取小程序状态栏高度
  // const statusBarHeight = useStatusBarHeight()
  // 获取小程序底部安全区距离
  const safeAreaInsets = useSafeAreaInsets()
</script>

<template>
  <div class="body" :style="{
    // navbar
    '--navbar-top': `${menu.top}px`,
    '--navbar-width': `${menu.width}px`,
    '--navbar-height': `${menu.height}px`,
    '--navbar-left': `${menu.left}px`,
    '--navbar-right': `${menu.right}px`,
    // tabbar
    '--tabbar-buttom': `${safeAreaInsets.bottom}`,
  }">
    <div class="navbar" />
    <slot />
  </div>
</template>

<style lang="scss" scoped>
  .body {
    // navbar
    --navbar-padding-left: calc(100vw - var(--navbar-right));
    --navbar-padding-right: var(--navbar-padding-left);
    --navbar-padding-bottom: 20rpx;
    --navbar-heigth-all: calc(var(--navbar-height) + var(--navbar-top) + var(--navbar-padding-bottom));
    // tabbar
    --tabbar-padding-top: 16rpx;
    --tabbar-padding-bottom: calc(var(--tabbar-padding-top) + env(safe-area-inset-bottom));
    --tab-bar-height: 100rpx;
    --tabbar-heigth: calc(var(--tab-bar-height) + var(--tabbar-padding-top) + var(--tabbar-padding-bottom));

    padding-bottom: var(--tabbar-heigth);

    .navbar {
      padding-top: var(--navbar-heigth-all);
    }
  }
</style>
