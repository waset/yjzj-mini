<script setup lang="ts">
interface Props {
  show: boolean
  msg: string
  icon?: 'i-svg-info' | 'i-svg-success' | 'i-svg-error' | 'i-svg-warn'
  closeBtn?: boolean
  mask?: boolean
  maskClosable?: boolean
  confirmBtn?: boolean
  cancelBtn?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-svg-success',
  closeBtn: true,
  mask: true,
  maskClosable: true,
  confirmBtn: true,
  cancelBtn: true,
})

const emit = defineEmits<{
  'ok': []
  'cancel': []
  'update:show': [show: boolean]
}>()

function cancel() {
  emit('update:show', false)
  emit('cancel')
}

function confirm() {
  emit('ok')
}

function maskClose() {
  if (props.maskClosable)
    cancel()
}
</script>

<template>
  <div
    v-if="props.show" class="model" :class="{ mask: props.mask }" @touchmove.prevent.stop @mousewheel.prevent.stop
    @scroll.prevent.stop @click="maskClose"
  >
    <div class="wrap" @click.prevent.stop>
      <div class="decoration left">
        <div class="i-svg-model-decoration" />
      </div>
      <div class="header">
        <div class="icon">
          <i :class="props.icon" />
        </div>
        <div v-if="props.closeBtn" class="close" @click="cancel">
          <i class="i-icons-closed" />
        </div>
      </div>
      <div class="body">
        <div class="msg">
          {{ props.msg }}
        </div>
      </div>
      <div class="footer">
        <slot name="footer">
          <div v-if="props.cancelBtn" class="btn cancel" @click="cancel">
            取消
          </div>
          <div v-if="props.confirmBtn" class="btn confirm" @click="confirm">
            确认
          </div>
        </slot>
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
        width: 66%;
        padding: 60rpx 0;
        text-align: center;
      }

      .footer {
        width: 66%;
        display: flex;
        align-items: center;
        justify-content: space-around;
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
</style>
