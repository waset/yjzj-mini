<script lang="ts" setup>
const { nowAddress } = storeToRefs(useAddressStore())
// 通过code获取省市区
onShow(() => {

})
</script>

<template>
  <div class="addressCard">
    <div class="center_info">
      <div v-if="nowAddress.username" class="nameMobile">
        <div style="display: flex; align-items: center; gap: 8rpx;">
          <div class="usernameRow">
            <div class="icon i-icons-address" />
            <div class="username">
              {{ nowAddress.username }}
            </div>
          </div>
          <div style="font-size: 28rpx;">
            {{ nowAddress.phone }}
          </div>
          <div v-if="nowAddress.isDefault === 1" class="isdefault">
            默认
          </div>
        </div>
        <div class="i-icons-right" />
      </div>
      <div v-else class="addressInfoTips" style="width: 156rpx;">
        <div class="icon i-icons-address" />
        <div>收货地址</div>
      </div>
      <div v-if="!nowAddress.provinceCode" class="shadel" />
      <div v-if="nowAddress.provinceCode" style="font-size: 28rpx;padding-left: 57rpx" class="address">
        <span>{{ getPcaDetails([nowAddress.provinceCode, nowAddress.cityCode, nowAddress.countryCode]) }}- {{
          nowAddress.address }}</span>
      </div>
      <div v-else class="addressInfoTips">
        <div> 请选择/添加收货地址</div>
        <div class="i-icons-right" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$max-width: 686rpx;

.addressCard {
  width: 100%;
  height: 192rpx;
  position: relative;
  z-index: 0;
  margin: 0 auto;
  border-radius: 8rpx;
  overflow: hidden;
  padding: 32rpx;
  box-sizing: border-box;

  .center_info {
    width: 100%;
    height: 152rpx;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 0 32rpx;

    .address {
      overflow: hidden; //超出隐藏
      text-overflow: ellipsis; //文本超出时显示省略号
      display: -webkit-box;
      -webkit-box-orient: vertical; //子元素排列 vertical（竖排）orhorizontal（横排）
      -webkit-line-clamp: 2; //内容限制的行数
    }

    .addressInfoTips {
      width: 100%;
      font-size: 28rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nameMobile {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .usernameRow {
        display: flex;
        align-items: center;

        .username {
          max-width: 140rpx;
          overflow: hidden; //超出隐藏
          text-overflow: ellipsis; //文本超出时显示省略号
          display: -webkit-box;
          -webkit-box-orient: vertical; //子元素排列 vertical（竖排）orhorizontal（横排）
          -webkit-line-clamp: 1; //内容限制的行数
        }

      }

      .icon {
        margin-right: 16rpx;
      }

      .isdefault {
        margin-left: 16rpx;
        width: 96rpx;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 24rpx;
        border: 2rpx solid transparent;
        border-radius: 8rpx;
        display: flex;
        align-self: center;
        justify-content: center;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #6F706E, #6F706E), linear-gradient(135deg, rgba(#fff, 1), rgba(#fff, 0.1), rgba(#fff, 1), );
      }
    }

    .shadel {
      width: 100%;
      height: 2rpx;
      border-top: 1px dashed #fff;
      /* 在顶部创建一条1像素宽，黑色，虚线的边框 */
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    background-image: radial-gradient(circle at 0 50%,
        transparent 0,
        transparent 20rpx,
        rgba($color: #848484, $alpha: 0.5) 20rpx);
  }

  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    right: 0;
    width: 50%;
    background-image: radial-gradient(circle at 100% 50%,
        transparent 0,
        transparent 20rpx,
        rgba($color: #848484, $alpha: 0.5) 20rpx);
    z-index: -1;
  }

  background-repeat: no-repeat;
  background-position: left center,
  right center;

}
</style>
