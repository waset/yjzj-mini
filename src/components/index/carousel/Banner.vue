<script setup lang="ts">
const props = defineProps<{
  list: WindowsImage[]
}>()

const bannerImages = ref<WindowsImage[]>([])
watchEffect(() => {
  bannerImages.value = props.list
})

const bannerSwiper = ref()
const current = ref(0)
const onChange = () => {
  current.value = bannerSwiper.value?.swiper.realIndex
}
const changSwiper = (index: number) => {
  bannerSwiper.value?.swiper.slideToLoop(index)
}

const { detail } = storeToRefs(useProductStore())
const goJump = (src: string) => {
  if (src.includes('diy')) {
    detail.value = {} as Product
    detail.value.typeParentID = 6
    detail.value.params = []
  }
  Jump(src as any)
}

onShow(() => {
  bannerSwiper.value?.swiper.autoplay.start()
})
onHide(() => {
  bannerSwiper.value?.swiper.autoplay.stop()
})
</script>

<template>
  <div
    class="banner" :style="{
      '--carousel-length': props.list.length,
    }"
  >
    <z-swiper
      ref="bannerSwiper" v-model="bannerImages" :options="{
        loop: true,
        autoplay: true,
      }" @slide-change="onChange"
    >
      <z-swiper-item v-for="(item, index) in bannerImages" :key="index">
        <image class="image" :src="ImageUrl(item.imageUrl)" mode="aspectFill" @click="goJump(item.src)" />
      </z-swiper-item>
      <template #indicator>
        <div class="indicator">
          <template v-for="(_, index) in props.list" :key="index">
            <div
              class="item" :class="{
                active: index === current,
              }" @click="changSwiper(index)"
            />
          </template>
        </div>
      </template>
    </z-swiper>
  </div>
</template>

<style lang="scss" scoped>
  .banner {
    position: relative;

    .image {
      width: 100%;
      height: 1200rpx;
    }

    .indicator {
      position: absolute;
      bottom: 40rpx;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: calc(var(--carousel-length) + 1);

      .item {
        width: 16rpx;
        height: 16rpx;
        border-radius: 32rpx;
        background: rgba(255, 255, 255, 0.2);
        margin: 0 10rpx;
        cursor: pointer;
        transition: width 0.3s ease-in-out;

        &.active {
          width: 48rpx;
          background: rgba(255, 255, 255, 0.8);
        }
      }
    }
  }
</style>
