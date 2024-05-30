<script setup lang="ts">

</script>

<template>
  <div class="search">
    <div class="input">
      <div class="text">
        输入关键字搜索想要的商品
      </div>
      <div class="i-icons-search" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .search {
    padding: 48rpx 32rpx;

    .input {
      @apply flex-between;

      font-size: 28rpx;
      line-height: 40rpx;
      font-weight: 400;
      padding: 24rpx;
      background: rgba(0, 0, 0, 0.2);
      border: 1rpx solid rgba(167, 245, 34, .6);
      border-radius: 160rpx;
    }
  }
</style>
