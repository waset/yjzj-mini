<script lang="ts" setup>
const props = withDefaults(defineProps<{
  text?: string
  icon?: string
  padding?: string
}>(), {
  text: '',
  icon: 'i-svg-empty',
  padding: '100rpx 40rpx',
})
</script>

<template>
  <div
    class="empty" :style="{
      padding: props.padding,
    }"
  >
    <div class="icon">
      <div :class="props.icon" />
    </div>
    <div class="text">
      {{ props.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .empty {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100%;

    .icon {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 240rpx;
    }

    .text {
      padding: 40rpx 0;
      font-weight: 400;
      font-size: 28rpx;
      color: #BEBEBE;
      line-height: 40rpx;
      text-align: left;
      font-style: normal;
      text-transform: none;
      color: rgba(190, 190, 190, 1);
      text-shadow: 0 0 10rpx rgba(190, 190, 190, 0.4), 0 0 10rpx rgba(190, 190, 190, 0.4);
    }
  }
</style>
