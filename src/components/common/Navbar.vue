<script setup lang="ts">
const menu = ref<UniApp.GetMenuButtonBoundingClientRectRes>({
  width: 80,
  height: 32,
  left: 0,
  top: 48,
  bottom: 0,
  right: 410,
})

// #ifdef MP
menu.value = uni.getMenuButtonBoundingClientRect() || menu.value
// eslint-disable-next-line no-console
console.log(menu.value)

// #endif
</script>

<template>
  <view
    class="navbar" :style="{
      '--nav-top': `${menu.top}px`,
      '--nav-width': `${menu.width}px`,
      '--nav-height': `${menu.height}px`,
      '--nav-left': `${menu.left}px`,
      '--nav-right': `${menu.right}px`,
    }"
  >
    <view class="box flex items-center justify-between">
      <view class="left">
        <slot name="left" :menu="menu" />
      </view>
      <view class="center">
        <slot name="center" :menu="menu" />
      </view>
      <view class="right" />
    </view>
  </view>
</template>

<style lang="scss" scoped>
    .navbar {
        position: fixed;
        left: 0;
        top: var(--nav-top);
        height: var(--nav-height);
        width: 100%;
        z-index: 100;
        color: #fff;
        box-sizing: border-box;
        padding: 0 calc(100vw - var(--nav-right));

        .box {
            height: inherit;
            .left{
                min-width: var(--nav-width);
            }
            .center{
                overflow: hidden;
            }
            .right{
                width: var(--nav-width);
                height: var(--nav-height);
            }
        }
    }
</style>
