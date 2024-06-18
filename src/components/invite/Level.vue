<template>
  <div class="inviation">
    <div class="flex justify-center pt-20">
      <image
        src="@/assets/background/invite-title1.svg"
        mode="heightFix"
        style="height: 44rpx;"
      />
    </div>
    <div class="inviteinfo flex-center relative">
      <div class="flex">
        <span>零零</span>
        <span class="ml-2">当前等级</span>
      </div>
      <div class="mt-2">
        积分：2000
      </div>
      <div class="horn absolute" />
    </div>
    <!-- 推广等级进度 -->
    <invite-step />
    <div class="flex justify-center">
      <image
        style="width: 90%;"
        src="@/assets/background/invite-label.svg"
        mode="widthFix"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inviteinfo {
  margin:92rpx auto -100rpx auto;
  width: 366rpx;
  height: 140rpx;
  background: linear-gradient(90deg, rgba(254, 233, 160, 0) 0%, rgba(254, 233, 160, 0.5) 53%, rgba(254, 233, 160, 0) 100%);
  flex-direction: column;

  .horn {
    width: 28rpx;
    height: 16rpx;
    background: linear-gradient(90deg, rgba(254, 233, 160, 0) 0%, rgba(254, 233, 160, 0.5) 53%, rgba(254, 233, 160, 0) 100%);
    left: 50%;
    bottom: -14rpx;
    transform: translateX(-50%);
  }
}
</style>
