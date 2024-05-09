<script setup lang="ts">
const menu = useMenuButtonBounding()
</script>

<template>
  <div>
    <common-navbar>
      <template #left>
        <div
          class="home" :style="{
            width: `${menu.width / 2}px`,
            height: `${menu.height}px`,
          }"
        >
          <div class="i-icons-home-active" />
        </div>
      </template>
    </common-navbar>
  </div>
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

    .text {
      margin-left: 10rpx;
    }
  }
</style>
