<script setup lang="ts">
interface Props {
  show: boolean
  name?: string
  width?: string
  height?: string
  closeBtn?: boolean
  mask?: boolean
  maskClosable?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'popup',
  width: '100%',
  height: '60%',
  closeBtn: true,
  mask: true,
  maskClosable: true,
})

const emit = defineEmits<{
  'close': []
  'update:show': [show: boolean]
}>()

function close() {
  emit('update:show', false)
  emit('close')
}

function maskClose() {
  if (props.maskClosable)
    close()
}
</script>

<template>
  <div v-if="props.show" class="popup">
    <div v-if="props.mask" class="mask" @click="maskClose" @touchmove.prevent.stop @scroll.prevent.stop />
    <div class="wrap" :style="{ width: props.width, height: props.height }">
      <div class="header" @touchmove.prevent.stop @scroll.prevent.stop>
        <slot name="header">
          <div class="title" @click="close">
            <div v-if="props.name" class="name">
              {{ name }}
            </div>
            <div v-if="props.closeBtn" class="close">
              <i class="i-icons-closed" />
            </div>
          </div>
        </slot>
      </div>
      <div class="body">
        <slot />
      </div>
      <div class="footer" @touchmove.prevent.stop @scroll.prevent.stop>
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .popup {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow: hidden;

    .mask {
      flex: 1;
      width: 100%;
      background: rgba($color: #000, $alpha: 0.5);
      backdrop-filter: blur(4rpx);
    }

    .wrap {
      background: #272727;
      padding: 32rpx;
      border-radius: 32rpx 32rpx 0 0;
      display: flex;
      flex-direction: column;
      overflow: hidden;

      .header {
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8rpx;
          padding-top: 24rpx;
          border-radius: 0rpx 4rpx 4rpx 0rpx;
          background: linear-gradient(150deg, rgba(190, 190, 190, 0) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0) 92.04%);

          .name {
            font-size: 28rpx;
            line-height: 40rpx;
            font-weight: bold;
            text-shadow: 8rpx 8rpx 0 rgba(167, 245, 34, 0.2);
          }

          .close {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 24rpx;
          }
        }
      }

      .body {
        flex: 1;
        overflow: scroll;
        padding: 32rpx 0;
      }
    }
  }
</style>
