<script setup lang="ts">
const props = defineProps<{
  list: Product[]
}>()
const emit = defineEmits<{
  click: [item: Product, index: number]
}>()
const current = ref(0)
const colors: string[] = [
  '#A7F522',
  '#E61C44',
  '#52FFE2',
  '#FE63FC',
].sort(() => Math.random() - 0.5)
const carouselHeight = ref(900)
</script>

<template>
  <div class="pushs">
    <carousel
      v-model:current="current" indicator loop :list="props.list" :height="carouselHeight" :offset-x-step="280"
      offset-x-step-units="rpx" :offset-y-step="0" :duration="500" offset-y-step-units="rpx" :scale-step="0.93"
      :opacity-step="0.9" overflow="visible" easing-function="linear"
    >
      <template #item="{ item, index }">
        <div
          class="item" :style="{
            '--color': colors[index % colors.length],
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
                    <span>{{ item.tagPrice }}</span>
                  </div>
                  <div class="original">
                    <span>￥</span>
                    <span>{{ item.costPrice }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </carousel>
  </div>
</template>

<style lang="scss" scoped>
  .pushs {
    --padding: 48rpx;
    --bottom: 40rpx;
    padding: 0 var(--padding);
    padding-bottom: var(--bottom);
    overflow: hidden;

    .item {
      height: 100%;
      padding-bottom: calc(var(--bottom) * 2);

      .box {
        padding: 0 var(--padding);
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
              color: var(--color);
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
