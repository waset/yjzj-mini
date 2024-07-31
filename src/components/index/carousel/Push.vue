<script setup lang="ts">
const props = defineProps<{
  list: Product[]
}>()
const emit = defineEmits<{
  click: [item: Product, index: number]
}>()

const pushSwiper = ref()
const carouselHeight = ref(900)

const { cloned: products } = useCloned(props.list)
watchEffect(() => {
  products.value = props.list
})

onShow(() => {
  pushSwiper.value?.swiper.autoplay.start()
})
onHide(() => {
  pushSwiper.value?.swiper.autoplay.stop()
})
</script>

<template>
  <div class="pushs">
    <z-swiper
      ref="pushSwiper" v-model="products" :options="{
        loop: true,
        autoplay: true,
        slidesPerView: 'auto',
        centeredSlides: true,
        spaceBetween: 14,
      }"
    >
      <z-swiper-item
        v-for="(item, index) in products" :key="index" :custom-style="{
          width: '80%',
        }"
      >
        <div
          class="item" :style="{
            '--color': item.color,
            '--carousel-length': props.list.length,
            '--carousel-heigit': `${carouselHeight}rpx`,
          }" @click="emit('click', item, index)"
        >
          <div class="box">
            <div class="body">
              <div class="banner">
                <div class="background">
                  <div class="i-icons-push-bg icon" />
                </div>
                <div class="image">
                  <image
                    :src="ImageUrl(item.banner[0])" mode="aspectFill" :style="{
                      width: '500rpx',
                      height: '500rpx',
                    }" :draggable="false" :fade-show="false"
                  />
                </div>
              </div>
              <div class="info">
                <div class="title">
                  {{ item.name }}
                </div>
                <div class="desc">
                  {{ item.description }}
                </div>
                <div class="price bg-red">
                  <div class="current">
                    <span>￥</span>
                    <span>{{ item.sellPrice }}</span>
                  </div>
                  <div class="original">
                    <span>￥</span>
                    <span>{{ item.tagPrice }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </z-swiper-item>
    </z-swiper>
  </div>
</template>

<style lang="scss" scoped>
  .pushs {
    --padding: 48rpx;
    --bottom: 40rpx;

    .item {
      height: 100%;
      padding-bottom: calc(var(--bottom) * 2);

      .box {
        height: 100%;
        position: relative;
        z-index: 0;

        .body {
          --border-radius: 64rpx;
          border-radius: var(--border-radius);
          background-color: #272727;

          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;

          .banner {
            flex: 1;
            width: 100%;
            position: relative;
            z-index: 0;

            .background {
              position: absolute;
              z-index: 0;
              width: 100%;
              height: 100%;
              color: var(--color,#A7F522);
              border-radius: 64rpx;
              overflow: hidden;

              .icon {
                width: 100%;
                height: 100%;
              }
            }

            .image {
              position: relative;
              z-index: 1;
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }

          .info {
            width: 100%;
            padding: 32rpx;

            .title {
              font-size: 32rpx;
              line-height: 40rpx;
              font-weight: 600;

              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 1;
              overflow: hidden;
            }

            .desc {
              font-size: 28rpx;
              line-height: 40rpx;
              min-height: 80rpx;
              margin: 16rpx 0;

              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
              word-break: break-all;
            }

            .price {
              display: flex;
              align-items: center;
              justify-self: start;
              padding: 20rpx 10rpx;
              background: linear-gradient(89.07deg, rgba(39, 39, 39, 0.4) -0.81%, rgba(190, 190, 190, 0.4) 29%, rgba(190, 190, 190, 0.4) 64.01%, rgba(39, 39, 39, 0.1) 92.9%);

              .current {
                font-size: 32rpx;
                line-height: 40rpx;
                font-weight: 600;
                margin-right: 16rpx;
              }

              .original {
                font-size: 24rpx;
                line-height: 32rpx;
                color: #bebebe;
                text-decoration: line-through;
                margin-left: 16rpx;
              }
            }
          }
        }
      }
    }
  }
</style>
