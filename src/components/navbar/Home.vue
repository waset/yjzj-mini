<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
const menu = useMenuButtonBounding()
</script>

<template>
  <navbar-base>
    <template #left>
      <div
        class="home" :style="{
          width: `${menu.width / 2}px`,
          height: `${menu.height}px`,
        }"
        @click="jump('/index')"
      >
        <div class="i-icons-home-active" />
      </div>
    </template>
    <template #center>
      <div class="text">
        {{ props.text }}
      </div>
    </template>
  </navbar-base>
</template>

<style lang="scss" scoped>
  .home {
    height: inherit;
    font-size: 28rpx;
    color: #fff;
    border-radius: 60rpx;
    border: 1rpx solid rgba($color: #fff, $alpha: .2);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    font-size: 32rpx;
    font-weight: 400;
    color: #fff;
  }
</style>
