<script setup lang="ts">

</script>

<template>
  <div>
    <common-navbar>
      <template #left="{ menu }">
        <div
          class="search" :style="{
            width: `${menu.width}px`,
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
  </div>
</template>

<style lang="scss" scoped>
    .search {
        box-sizing: border-box;
        height: inherit;
        font-size: 24rpx;
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
