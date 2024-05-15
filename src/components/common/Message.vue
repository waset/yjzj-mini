<script setup lang="ts">
interface Props {
  show: boolean
  icon?: string
  msg: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  icon: 'i-svg-success',
  duration: 3000,
})

const emit = defineEmits<{
  'update:show': [show: boolean]
  'close': []
}>()

onMounted(() => {
  if (props.duration) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})

function close() {
  emit('close')
  emit('update:show', false)
}
</script>

<template>
  <div class="message">
    <div class="wrap">
      <div class="icon">
        <div :class="props.icon" />
      </div>
      <div class="text">
        {{ props.msg }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .message {
    position: absolute;
    top: var(--navbar-height-all);
    left: 0;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;

    .wrap {
      display: flex;
      align-items: center;
      justify-content: center;
      max-width: 80%;
      padding: 16rpx;
      padding-right: 8%;
      // background: rgba(245, 245, 245, 0.2);
      background: rgba($color: green, $alpha:  1);
      backdrop-filter: blur(48rpx);
      // clip-path: polygon(0% 100%, 0% 0%, 83.656% 0%, 100% 69.388%, 100% 100%, 0% 100%);

      .text {
        flex: 1;
        font-size: 28rpx;
        line-height: 40rpx;
        color: rgba(245, 245, 245, 1);
      }

      .icon {
        margin-left: 32rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 40rpx;
      }
    }
  }
</style>
