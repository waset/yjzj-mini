<script setup lang="ts">
const props = defineProps<{
  info: Product | null
}>()
const tabIdx = ref(0)
const tabs = reactive(['详情', '参数'])
</script>

<template>
  <div class="info">
    <div class="tabs">
      <template v-for="(item, index) in tabs" :key="index">
        <div
          class="item" :class="{
            active: tabIdx === index,
          }" @click="() => tabIdx = index"
        >
          {{ item }}
        </div>
      </template>
    </div>
    <div class="body">
      <template v-if="tabIdx === 0">
        <div class="detail">
          <div class="bg">
            <div class="wrap">
              <template v-if="props.info?.content && props.info.content.length">
                <div class="box">
                  <template v-for="(item, index) in props.info.content" :key="index">
                    <div class="item">
                      <image
                        class="img" :style="{ width: '100%', height: 'auto' }" :src="ImageUrl(item)"
                        mode="widthFix"
                      />
                    </div>
                  </template>
                </div>
              </template>
              <template v-else>
                <div class="empty">
                  <common-empty text="暂无介绍" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
      <template v-if="tabIdx === 1">
        <div class="param">
          <div class="bg">
            <div class="wrap">
              <template v-if="props.info?.params && props.info.params.length">
                <div class="box">
                  <template v-for="(item, index) in props.info.params" :key="index">
                    <div class="item">
                      <div class="type">
                        {{ item.desc }}
                      </div>
                      <div class="desc">
                        {{ item.name || item.paramValue }}
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else>
                <div class="empty">
                  <common-empty text="暂无参数" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .info {
    margin-top: -32rpx;

    .tabs {
      padding: 32rpx;

      display: flex;
      align-items: center;
      justify-content: start;

      gap: 32rpx;

      .item {
        position: relative;
        padding: 16rpx;
        z-index: 0;

        font-size: 32rpx;
        line-height: 40rpx;
        font-weight: 400;

        &.active {
          font-weight: bold;

          &::before {
            content: '';
            @apply bg-green;
            width: 100%;
            height: 20rpx;
            position: absolute;
            bottom: 10rpx;
            left: 0;
            z-index: -1;

            clip-path: polygon(5.814% 93.75%, 0% 31.25%, 98.837% 0%, 83.721% 93.75%, 5.814% 93.75%);
          }
        }
      }
    }

    .body {
      padding: 0 32rpx;

      @mixin bg {
        padding: 2rpx;
        border-radius: 16rpx;
        background-image: linear-gradient(100.04deg, #FFFFFF 0.82%, rgba(255, 255, 255, 0.1) 49.3%, #FFFFFF 91.18%);
      }

      @mixin wrap {
        border-radius: 16rpx;
        background-color: #000;
      }

      .detail {
        .bg {
          @include bg;

          .wrap {
            @include wrap;

            .box {
              border-radius: 16rpx;
              @apply flex-center;
              flex-direction: column;
              overflow: hidden;

              .item {
                width: 100%;
                @apply flex-center;
              }
            }
          }
        }
      }

      .param {
        .bg {
          @include bg;

          .wrap {
            @include wrap;

            .box {
              padding: 32rpx;

              .item {
                font-size: 28rpx;
                font-weight: 400;
                line-height: 40rpx;
                word-break: break-all;

                padding-bottom: 32rpx;

                &:last-child {
                  padding-bottom: 0;
                }

                .type {
                  @apply text-green;
                  padding-bottom: 16rpx;
                }

                .desc {
                  color: rgba(190, 190, 190, 1);
                }
              }
            }
          }
        }
      }
    }
  }
</style>
