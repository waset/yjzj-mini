<script setup lang="ts">
const props = defineProps<{
  list: Product['banner']
}>()

const current = ref(0)
const banner_images = computed<string[]>(() => {
  if (props.list && props.list.length) {
    return props.list.map(item => ImageUrl(item))
  }
  return []
})
</script>

<template>
  <div class="banner">
    <div class="wrap">
      <div class="top">
        <div class="box">
          <div class="title">
            <div class="icon i-icons-yjzj" />
          </div>
          <div class="right">
            <div class="icon i-icons-rights" />
          </div>
        </div>
      </div>
      <div class="body">
        <div class="indicator">
          <template v-for="(item, index) in banner_images" :key="index">
            <div
              class="item" :class="{
                active: current === index,
              }"
            >
              <image
                class="img" :style="{
                  width: '120rpx',
                  height: '120rpx',
                  borderRadius: '16rpx',
                }" :src="ImageUrl(item)" mode="aspectFill" :draggable="false" @click="() => { current = index }"
              />
              <div class="left">
                <div class="i-icons-play" />
              </div>
            </div>
          </template>
        </div>
        <div class="carousel">
          <carousel
            v-model:current="current" :list="banner_images" autoplay loop :height="500" easing-function="linear"
            :duration="500"
          />
          <div class="statement">
            *实际效果图以订单为准
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .banner {
    padding-top: 48rpx;

    .wrap {
      position: relative;
      z-index: 0;

      .top {
        @apply bg-green;
        padding-left: 24rpx;
        padding-right: 60rpx;
        clip-path: polygon(0% 15.094%, 0% 84.906%, 0% 84.906%, 0.068% 87.354%, 0.263% 89.677%, 0.576% 91.842%, 0.996% 93.82%, 1.512% 95.579%, 2.113% 97.088%, 2.789% 98.315%, 3.53% 99.23%, 4.324% 99.802%, 5.161% 100%, 94.827% 100%, 94.827% 100%, 96.046% 99.592%, 97.135% 98.442%, 98.078% 96.661%, 98.854% 94.36%, 99.444% 91.65%, 99.83% 88.641%, 99.993% 85.444%, 99.914% 82.171%, 99.573% 78.932%, 98.953% 75.838%, 81.015% 6.027%, 81.015% 6.027%, 80.707% 4.936%, 80.368% 3.943%, 80.001% 3.052%, 79.609% 2.266%, 79.195% 1.59%, 78.762% 1.029%, 78.312% 0.585%, 77.848% 0.263%, 77.373% 0.066%, 76.889% 0%, 5.161% 0%, 5.161% 0%, 4.324% 0.198%, 3.53% 0.77%, 2.789% 1.685%, 2.113% 2.912%, 1.512% 4.421%, 0.996% 6.18%, 0.576% 8.158%, 0.263% 10.323%, 0.068% 12.646%, 0% 15.094%);
        color: #000;
        position: absolute;
        left: 0;
        top: -48rpx;
        height: 100rpx;
        z-index: -1;

        .box {
          @apply flex-between;

          .title {
            .icon {
              width: 120rpx;
              height: 28rpx;
            }
          }

          .right {
            padding-left: 40rpx;
            padding-right: 20rpx;

            .icon {
              width: 60rpx;
              height: 28rpx;
            }
          }
        }
      }

      .body {
        position: relative;
        background-color: #3c3c3c;
        border-radius: 16rpx;
        padding: 32rpx;

        @apply flex-center;

        .carousel {
          flex: 1;
          position: relative;
          padding-left: 32rpx;

          .statement {
            position: absolute;
            bottom: -16rpx;
            right: 0;
            z-index: 9999999;

            font-size: 24rpx;
            line-height: 40rpx;
            @apply underline decoration-[#a7f522] underline-offset-[-2rpx] decoration-3;
          }
        }

        .indicator {
          flex: 0 0 25%;
          @apply flex-around;
          flex-direction: column;

          padding: 16rpx;
          min-height: 456rpx;

          border-radius: 16rpx;
          background: linear-gradient(180deg, rgba(48, 48, 48, 1) 26%, rgba(94, 94, 94, 1) 48%, rgba(94, 94, 94, 1) 51%, rgba(48, 48, 48, 1) 77%);

          .item {
            position: relative;

            .img {
              display: block;
              border-radius: 16rpx;
              margin: 16rpx 0;
              border: 2rpx solid transparent;
            }

            .left {
              position: absolute;
              right: -64rpx;
              top: 0;
              height: 100%;
              z-index: 9999999;

              @apply flex-center text-green;

              opacity: 0;
            }

            &.active {
              .img {
                border-color: #a7f522;
              }

              .left {
                opacity: 1;
              }
            }
          }
        }
      }
    }
  }
</style>
