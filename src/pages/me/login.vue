<script setup lang="ts">
const { isRegister } = storeToRefs(useUserStore())
const { getToken, getUserInfo } = useUserStore()
const agreementChecked = ref(false)

async function gologin() {
  uni.login({
    provider: 'weixin', // 使用微信登录
    success: async ({ code }) => {
      await getToken(code)
      await getUserInfo()
      if (!isRegister.value) {
        jump('/me/info')
      }
      else {
        if (useRoute.length > 1) {
          uni.navigateBack({
            delta: 1,
          })
        }
        else {
          jump('/me/me')
        }
      }
    },
  })
}
</script>

<template>
  <div class="login">
    <image class="bg" :src="StaticUrl('/images/login-bg.png')" mode="scaleToFill" />
    <div class="logo">
      <div class="i-svg-logo" />
    </div>
    <div class="btn">
      <div
        class="gologin" :class="{
          disable: !agreementChecked,
        }"
        @click="gologin"
      >
        点击登录
      </div>
    </div>
    <div
      class="agreement" :class="{
        selected: agreementChecked,
      }" @click="agreementChecked = !agreementChecked"
    >
      <div class="check" value="cb" checked="true">
        <div v-if="agreementChecked" class="i-icons-correct" />
      </div>
      <div class="text">
        授权登录即表明同意《一剑装机服务及隐私条款》
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .login {
    @apply flex-center;
    flex-direction: column;
    height: 100%;
    width: 100%;
    position: relative;
    z-index: 0;

    .bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
    }

    .logo {
      @apply flex-center;
      font-size: 200rpx;
      line-height: 100rpx;
    }

    .btn {
      @apply flex-center;

      .gologin {
        @apply px-[160rpx] py-[32rpx] bg-green c-black rounded-[32rpx];
        box-shadow: 4px 4px 0px 0px rgba(167, 245, 34, 0.2);

        &.disable {
          @apply bg-[#8D8D8D] text-[#f5f5f5];
          box-shadow: 4px 4px 0px 0px rgba(#8D8D8D, 0.2);
        }
      }
    }

    .agreement {
      @apply flex-center mt-[32rpx];

      .check {
        @apply flex-center mr-[16rpx] w-[36rpx] h-[36rpx] border-1 border-solid border-[#DEDEDE] rounded-[4rpx];
      }

      .text {
        @apply text-[24rpx];
      }

      &.selected {
        @apply text-green;

        .check {
          @apply border-[#a7f522];
        }
      }
    }
  }
</style>

<route lang="json">
{
  "layout": "full"
}
</route>
