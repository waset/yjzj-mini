<script setup lang="ts">
const menu = useMenuButtonBounding()
</script>

<template>
  <common-navbar>
    <template #left>
      <div
        class="search" :style="{
          minWidth: `${menu.width}px`,
          height: `${menu.height}px`,
        }"
      >
        <div class="i-icons-search" />
        <div class="text">
          搜索
        </div>
      </div>
    </template>
    <template #center>
      <div class="i-svg-logo text-7xl" />
    </template>
  </common-navbar>
</template>

<style lang="scss" scoped>
    .search {
        height: inherit;
        font-size: 28rpx;
        color: #fff;
        border-radius: 60rpx;
        border: 1rpx solid rgba($color: #fff, $alpha: .2);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 4rpx;

        .text {
            margin-left: 10rpx;
        }
    }
</style>
