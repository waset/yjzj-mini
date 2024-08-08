<script setup lang="ts">
const props = withDefaults(defineProps<{
  src?: string | null
  mode?: string
  width?: string
  height?: string
  radius?: string
}>(), {
  mode: 'aspectFill',
  width: '160rpx',
  height: '',
  radius: '50%',
})
</script>

<template>
  <div class="avatar">
    <div
      class="wrap" :style="{
        width: props.width,
        height: props.height || props.width,
        borderRadius: props.radius,
      }"
    >
      <template v-if="props.src">
        <image class="img" :src="ImageUrl(props.src)" :mode="props.mode" :draggable="false" />
      </template>
      <template v-else>
        <div class="i-svg-avatar icon" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;

    .wrap {
      max-width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;

      .img {
        will-change: transform;
        width: 100%;
        height: 100%;
      }

      .icon {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
