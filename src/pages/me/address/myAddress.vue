<script lang="ts" setup>
</script>

<template>
  <navbar-home text="收货地址" />
  <div class="myaddress">
    <div class="addressCard">
      <div><span style="font-size: 32rpx;">熊庄主</span> 15923543341</div>
      <div class="addressInfo">
        保定市 容城县 光明路与幸福路交叉口往东50米路西
      </div>
      <div class="line" />
    </div>

    <div class="newAddress">
      新增收获
    </div>
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;
$Be: #BEBEBE;

.myaddress {
  .addressCard {
    margin: 0 auto;
    width: 686rpx;
    height: 304rpx;
    background-color: rgba($color: #fff, $alpha: 0.2);
    box-sizing: border-box;
    padding: 32rpx;
    border-radius: 8rpx;

    .addressInfo {
      width: 586rpx;
      height: 80rpx;
      font-size: 28rpx;
    }
    .line {
      width: 100%;
      height: 2rpx;
      background:linear-gradient(to right,rgba(#fff,0.3),rgba(#fff,0.03),rgba(#fff,0.3)) ;
      margin-top: 16rpx;
    }
  }

  .newAddress {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #000;
    width: 440rpx;
    border-radius: 4rpx;
    height: 80rpx;
    position: fixed;
    bottom: 32rpx;
    left: 50%;
    transform: translateX(-50%);
    font-size: 28rpx;
    background-color: #A7F522;
  }
}
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
