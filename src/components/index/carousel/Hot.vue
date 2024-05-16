<script setup lang="ts">
const props = defineProps<{
  list: Product[]
  current: number
}>()
const emit = defineEmits<{
  'update:current': [id: number]
}>()
const pcurrent = ref(props.current)
watch(pcurrent, (v) => {
  emit('update:current', v)
})
const colors: string[] = [
  '#A7F522',
  '#E61C44',
  '#52FFE2',
  '#FE63FC',
].sort(() => Math.random() - 0.5)
const carouselHeight = ref(900)
</script>

<template>
  <div class="hots">
    <carousel
      v-model:current="pcurrent" :list="props.list" :height="carouselHeight"
      direction="vertical" :offset-x-step="48" offset-x-step-units="rpx" :offset-y-step="48"
      offset-y-step-units="rpx" :scale-step="0.8" :opacity-step="0.99" overflow="visible" loop switch natural-direction
    >
      <template #item="{ item, index }">
        <div
          class="item" :style="{
            '--color': colors[index % colors.length],
            '--carousel-length': props.list.length,
            '--carousel-index': index,
            '--carousel-heigit': `${carouselHeight}rpx`,
          }"
        >
          <div class="box">
            <div class="body">
              <div class="image">
                <image
                  :src="ImageUrl(item.banner[0])" mode="aspectFill" :style="{
                    width: '500rpx',
                    height: '500rpx',
                  }" :draggable="false" :fade-show="false"
                />
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
      <template #prev>
        <div class="switch left">
          <div class="i-svg-hot-left" />
        </div>
      </template>
      <template #next>
        <div class="switch right">
          <div class="i-svg-hot-right" />
        </div>
      </template>
    </carousel>
  </div>
</template>

<style lang="scss" scoped>
    .hots {
        @apply px-[64rpx];
        --padding: 32rpx;

        .item {
            height: var(--carousel-heigit);
            padding: var(--padding);

            .box {
                padding: var(--padding);
                height: 100%;

                position: relative;
                z-index: 0;

                &::before {
                    content: '';
                    position: absolute;
                    bottom: var(--padding);
                    left: var(--padding);
                    z-index: -1;
                    width: calc(100% - var(--padding));
                    height: calc(100% - var(--padding));
                    background: linear-gradient(180deg, var(--color) 43%, rgba(0, 0, 0, 1) 150%);
                    clip-path: polygon(0% 7.83%, 0% 7.83%, 0.067% 7.391%, 0.26% 6.982%, 0.565% 6.608%, 0.969% 6.276%, 1.46% 5.991%, 2.026% 5.761%, 2.652% 5.591%, 3.325% 5.488%, 4.034% 5.458%, 4.765% 5.508%, 84.092% 15.328%, 84.092% 15.328%, 85.639% 15.585%, 87.088% 15.957%, 88.426% 16.434%, 89.639% 17.007%, 90.714% 17.667%, 91.638% 18.404%, 92.398% 19.21%, 92.98% 20.074%, 93.371% 20.988%, 93.557% 21.942%, 100% 100%, 15.85% 100%, 15.85% 100%, 13.279% 99.876%, 10.84% 99.517%, 8.566% 98.941%, 6.489% 98.17%, 4.642% 97.222%, 3.058% 96.117%, 1.769% 94.874%, 0.808% 93.514%, 0.207% 92.054%, 0% 90.516%, 0% 7.83%);
                }

                .body {
                    position: relative;
                    height: 100%;
                    padding: var(--padding);
                    padding-top: 0;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;

                    --margin-top: -64rpx;

                    .image {
                        margin-top: var(--margin-top);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }

                    .info {
                        width: 100%;

                        .title {
                            font-size: 32rpx;
                            line-height: 40rpx;
                            font-weight: 600;

                            display: -webkit-box;
                            -webkit-box-orient: vertical;
                            -webkit-line-clamp: 2;
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
                        }

                        .price {
                            display: flex;
                            align-items: center;
                            justify-self: start;
                            padding: 20rpx 10rpx;
                            background: linear-gradient(89.07deg, rgba(39, 39, 39, 0) -0.81%, rgba(190, 190, 190, 0.4) 29%, rgba(190, 190, 190, 0.4) 64.01%, rgba(39, 39, 39, 0) 92.9%);

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

        .switch {
            position: absolute;
            top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 50px;
            height: 100%;
            font-size: 48px;
            color: #fff;
            z-index: calc(var(--carousel-length) + 1);

            &.left {
                left: 0;
            }

            &.right {
                right: 0;
            }
        }
    }
</style>
