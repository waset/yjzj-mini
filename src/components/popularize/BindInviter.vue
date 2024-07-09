<script lang="ts" setup>
const props = defineProps<{
  user: UserInfo
}>()
const { getUserInfo } = useUserStore()
const { bandInviter } = useInviteStore()
const show = ref(false)
const code = ref('')
// 确认绑定
async function band() {
  try {
    const res = await bandInviter(code.value)
    if (res.code === 200) {
      uni.showToast({
        title: '绑定成功',
        icon: 'none',
      })
      await getUserInfo()
    }
    else {
      uni.showToast({
        title: res.msg,
        icon: 'none',
      })
    }
  }
  catch {
    uni.showToast({
      title: '网络错误',
      icon: 'none',
    })
  }
  code.value = ''
  show.value = false
}

async function confirm() {
  await band()
}
function cancel() {
  show.value = false
}
function openShow() {
  show.value = true
}

// 调用openShow方法打开邀请弹窗
defineExpose({
  openShow,
})
</script>

<template>
  <div v-if="show" class="model mask" @touchmove.prevent.stop @mousewheel.prevent.stop @scroll.prevent.stop>
    <div class="wrap" @click.prevent.stop>
      <div class="decoration left">
        <div class="i-svg-model-decoration" />
      </div>
      <div class="header">
        <div class="icon">
          <template v-if="props.user.promoterStatus">
            <i class="i-svg-warn" />
          </template>
          <template v-else>
            <i class="i-svg-info" />
          </template>
        </div>
        <div class="close" @click="cancel">
          <i class="i-icons-closed" />
        </div>
      </div>
      <div class="body">
        <div class="msg">
          {{ props.user.promoterStatus === 1 ? '换绑' : '绑定邀请人 ' }}邀请人
        </div>
        <div class="codeinp flex-center pt-2">
          <input v-model="code" placeholder="请输入邀请人邀请码" type="text" class="inp mt-1">
        </div>
      </div>
      <div class="footer">
        <div class="btn cancel" @click="cancel">
          取消
        </div>
        <div class="btn confirm" @click="confirm">
          确认
        </div>
      </div>
      <div class="decoration right">
        <div class="i-svg-model-decoration" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.model {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
  padding-top: var(--navbar-height-all);
  padding-bottom: var(--tabbar-height-all);

  &.mask {
    background: rgba($color: #000, $alpha: 0.5);
  }

  .wrap {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 90%;
    min-height: 300rpx;
    z-index: 0;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      background: rgba(#f5f5f5, 0.2);
      backdrop-filter: blur(72rpx);
      clip-path: polygon(80.476% 0%, 0% 0%, 0% 65.476%, 18.254% 99.859%, 100% 99.859%, 100% 36.774%, 80.476% 0%);
    }

    .header {
      position: relative;
      width: 100%;
      height: 70rpx;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        position: absolute;
        top: -75%;
        font-size: 100rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .close {
        position: absolute;
        top: 0;
        right: 0;
        font-size: 24rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        color: rgba(190, 190, 190, 1);
        background: rgba(217, 217, 217, 0.2);
        backdrop-filter: blur(72rpx);
        padding: 12rpx;
        border-radius: 50%;
        border: 2rpx solid rgba(190, 190, 190, 1);
      }
    }

    .body {
      width:60%;
      padding: 60rpx 0;
      text-align: center;
    }

    .footer {
      width: 60%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 50rpx;

      .btn {
        padding: 12rpx 60rpx;
        background-color: #fff;
        color: #000;
        border-radius: 8rpx;

        &.confirm {
          background: rgba(167, 245, 34, 1);
        }
      }
    }

    .decoration {
      font-size: 100rpx;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;

      $spacing: 12rpx;

      &.left {
        top: $spacing;
        left: $spacing;
      }

      &.right {
        bottom: $spacing;
        right: $spacing;
        transform: rotateX(180deg) rotateY(180deg);
      }
    }
  }
}

.codeinp {
  border-radius: 8rpx 8rpx 8rpx 8rpx;

  .inp {
    font-size: 26rpx;
    color: #000;
    background: #D9D9D9;
    width: 100%;
    border-radius: 12rpx;
    padding: 12rpx 0;
  }
}
</style>
