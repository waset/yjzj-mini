<script lang="ts" setup>

</script>

<template>
  <div class="searchBox">
    <div class="search">
      <input type="text" placeholder="输入卡券兑换码">
      <div class="exchange">
        兑换
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;
$Be: #BEBEBE;

.searchBox {
    padding: 21rpx 40rpx;
    box-sizing: border-box;

    .search {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      height: 64rpx;
      background-color: rgba($color: #fff, $alpha: 0.2);
      border-radius: 40rpx;
      border: 2rpx solid #A7F522;
      input {
        flex: 1;
        padding-left: 20rpx;
        box-sizing: border-box;
      }
      .exchange {
        padding: 12rpx 32rpx;
        background-color: #A7F522;
        font-size: 28rpx;
        color: #333;
        border-radius: 40rpx;
      }
      .exchange:active {
        background-color: #91d816;
      }
    }
  }
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
