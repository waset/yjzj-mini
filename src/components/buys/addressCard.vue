<script lang="ts" setup>
const address = ref<{
  address: string
  username: string
  mobile: string
  isDefault: boolean
  addressInfo: string
}>()
onMounted(() => {
  address.value = uni.getStorageSync('defaultAddress')
})
</script>

<template>
  <div class="addressCard">
    <div class="center_info">
      <div v-if="address?.username && address?.mobile" class="nameMobile">
        <div style="font-size: 32rpx;">
          {{ address.username }}
        </div>
        <div style="font-size: 28rpx;">
          {{ address.mobile
          }}
        </div>
        <div v-if="address.isDefault" class="isdefault">
          默认
        </div>
      </div>
      <div v-else>
        收货地址
      </div>
      <div class="shadel" />
      <div v-if="address?.address">
        <span>{{ address.address }}{{ address.addressInfo }}</span>
      </div>
      <div v-else>
        请选择收货地址
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$max-width: 686rpx;

.addressCard {
  width: $max-width;
  height: 192rpx;
  position: relative;
  margin: 0 auto;
  border-radius: 8rpx;
  overflow: hidden;

  .center_info {
    width: 622rpx;
    height: 128rpx;
    // background-color: #fff;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    .nameMobile {
      display: flex;
      align-items: center;

      view {
        margin-right: 16rpx;
      }

      .isdefault {
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

  // background-color: rgba($color: #848484, $alpha: 0.5);
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
  }

  background-repeat: no-repeat;
  background-position: left center,
  right center;

}
</style>
