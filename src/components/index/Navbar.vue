<script setup lang="ts">

</script>

<template>
  <view>
    <common-navbar>
      <template #left="{ menu }">
        <view
          class="search" :style="{
            width: `${menu.width}px`,
            height: `${menu.height}px`,
          }"
        >
          <view class="i-icons-search" />
          <view class="text">
            搜索
          </view>
        </view>
      </template>
      <template #center>
        <view class="i-svg-logo text-7xl" />
      </template>
    </common-navbar>
  </view>
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
