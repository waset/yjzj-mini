<script setup lang="ts">
const props = withDefaults(defineProps<{
  type: 'success' | 'fail' | 'waiting'
  width?: string
  height?: string
}>(), {
  width: '188rpx',
})
const icons = ref({
  success: {
    icon: 'i-icons-success',
    color: '#A7F522',
  },
  fail: {
    icon: 'i-icons-fail',
    color: '#F53F3F',
  },
  waiting: {
    icon: 'i-icons-waiting',
    color: '#FF7D00',
  },
})
</script>

<template>
  <div
    class="status" :style="{
      '--color': icons[props.type].color,
      '--width': props.width,
      '--height': props.height || props.width,
    }"
  >
    <div class="icons">
      <div class="icon" :class="[icons[props.type].icon]" />
    </div>
    <div class="bg">
      <div class="arc">
        <div class="icon i-icons-arc" />
      </div>
      <div class="arc">
        <div class="icon i-icons-arc" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .status {
    position: relative;
    width: var(--width);
    height: var(--height);
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color);

    .icon {
      width: var(--width);
      height: var(--height);
    }

    .icons {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;

      animation: pulse .8s alternate ease-in-out infinite;
    }

    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }

    @keyframes pulse {
      from {
        transform: scale(.8);
      }

      to {
        transform: scale(1);
      }
    }

    .bg {
      position: absolute;
      width: 100%;
      height: 100%;
      animation: spin 2s linear infinite;

      .arc {
        position: absolute;
        transform-origin: center center;

        &:nth-child(1) {
          transform: rotate(0deg);
        }

        &:nth-child(2) {
          transform: rotate(180deg);
        }
      }
    }
  }
</style>
