<script setup lang="ts">
const props = withDefaults(defineProps<{
  src: string
  mode?: string
  width?: string
  height?: string
  radius?: string
  background?: boolean
}>(), {
  mode: 'aspectFill',
  width: '160rpx',
  height: '',
  radius: '8rpx',
  background: true,
})
</script>

<template>
  <div class="product-image">
    <div v-if="props.background" class="background">
      <div class="i-svg-product-bg icon" />
    </div>
    <div class="image">
      <image
        class="img" :style="{
          width: props.width,
          height: props.height || props.width,
          borderRadius: props.radius,
        }" :src="ImageUrl(props.src)" :mode="props.mode" :draggable="false"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .product-image {
    width: 100%;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;

    .image {
      max-width: 100%;
      z-index: 2;
      display: flex;
      align-items: center;
      justify-content: center;

      .img {
        will-change: transform;
        max-width: 100%;
      }
    }

    .background {
      position: absolute;
      z-index: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;

      .icon {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
