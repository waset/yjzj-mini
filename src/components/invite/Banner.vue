<script lang="ts" setup>
import banner from '@/assets/background/invite-banner.svg'

const bannerImg = ref(banner)
</script>

<template>
  <div>
    <div class="banner" :style="`background-image: url(${bannerImg})`">
      <div class="banner-bg">
        <image
          class="icon1 mt-20"
          src="@/assets/background/invite-icon1.svg"
          mode="widthFix"
        />
        <image
          class="icon2"
          src="@/assets/background/invite-icon2.svg"
          mode="widthFix"
        />
      </div>
      <div class="flex justify-between items-center mt-10 ml-6 mr-6">
        <span class="my-inviter">我的邀请人：---</span>
        <span class="btn-inviter">绑定邀请人</span>
        <span class="btn-inviter">我的下级</span>
      </div>
      <div class="flex justify-center">
        <image
          style="width: 90%;"
          src="@/assets/background/invite-btn.svg"
          mode="widthFix"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner {
  width: 100%;
  // height: 1296rpx;
  background-size: cover;
  background-position: center;
  .banner-bg {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .icon1 {
    width: 600rpx;
    height: 600rpx;
  }
  .icon2 {
    width: 562rpx;
    height: 216rpx;
  }
  .my-inviter {
    font-weight: 600;
    font-size: 28rpx;
    color: #FFFFFF;
  }
  .btn-inviter {
    padding: 8rpx 16rpx;
    font-weight: 400;
    font-size: 28rpx;
    color: #F5F5F5;
    background: rgba(85,85,85,0.5);
    border-radius: 4rpx 4rpx 4rpx 4rpx;
  }
}
</style>
