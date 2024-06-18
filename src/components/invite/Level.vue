<template>
  <div class="inviation">
    <div class="flex-center">
      <image class="w-80 mt-20" src="@/assets/background/invitelevel-title.svg" mode="widthFix" />
    </div>
    <div class="inviteinfo flex-center m-auto relative">
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
    <image
      style="width: 100%;"
      src="@/assets/background/invite-program.png"
      mode="widthFix"
    />
  </div>
</template>

<style lang="scss" scoped>
.inviteinfo {
  margin-top: 92rpx;
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
