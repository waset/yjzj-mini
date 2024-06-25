<script lang="ts" setup>
const props = defineProps<{
  user: UserInfo
}>()
const emits = defineEmits(['bandinvite', 'become'])
function band() {
  emits('bandinvite')
}
function become() {
  emits('become')
}
</script>

<template>
  <div class="banner-container">
    <div class="banner" :style="`background-image: url(${StaticUrl('/svg/invite-banner.svg')})`">
      <div class="banner-bg">
        <image class="icon1 mt-20" :src="StaticUrl('/svg/invite-icon1.svg')" mode="widthFix" />
        <image class="icon2" :src="StaticUrl('/svg/invite-icon2.svg')" mode="widthFix" />
      </div>
      <div class="flex-center mt-10 ml-6 mr-6">
        <span class="my-inviter">我的邀请人：{{ props.user?.inviteUserInfo ? user.inviteUserInfo?.nickname : '---'
        }}</span>
        <span class="btn-inviter" @click="band">{{ props.user.promoterStatus === 1 ? '换绑' : '绑定邀请人 ' }}</span>
      </div>
      <div class="flex justify-center mt-2">
        <template v-if="props.user.promoterStatus !== 1">
          <image style="width: 90%;" src="@/assets/background/invite-btn.svg" mode="widthFix" @click="become" />
        </template>
        <template v-else>
          <image class="mt-4" style="width: 90%;" src="@/assets/background/invite-btned.svg" mode="widthFix" />
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.banner-container {
  background-color: #150A35;
}

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
    background: rgba(85, 85, 85, 0.5);
    border-radius: 4rpx 4rpx 4rpx 4rpx;
    margin-left: 22rpx;
  }
}
</style>
