<script setup lang="ts">
const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <div class="title">
    <div class="flex-between" @click="emit('click')">
      <div class="left">
        <slot name="left" />
      </div>
      <div class="right">
        <slot name="right" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .title {
        @apply px-[32rpx] py-[80rpx];

        .left {
            @apply pr-[48rpx] text-8xl flex-center;
            height: 80rpx;
        }

        .right {
            @apply text-[32rpx] text-right p-[8rpx] pt-[24rpx] flex-1;
            border-radius: 0rpx 4rpx 4rpx 0rpx;
            background: linear-gradient(98.8deg,
            rgba(190, 190, 190, 0) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0) 100%);
            padding: 12px 4px 4px 4px;
            gap: 4px;
        }
    }
</style>
