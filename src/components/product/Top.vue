<script setup lang="ts">
const props = defineProps<{
  info: Product | null
}>()
</script>

<template>
  <div class="product-top">
    <div class="top">
      <div class="wrap">
        <div class="title">
          {{ props.info?.name || '自由定制' }}
        </div>
        <div class="desc">
          {{ props.info?.description }}
        </div>
        <div class="more">
          <div class="price">
            <span>￥</span>
            <span>{{ props.info?.sellPrice || 0 }}</span>
          </div>
          <div class="btns">
            <button class="btn" open-type="share">
              <div class="icon">
                <div class="i-icons-share" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .product-top {

    .top {
      padding: 32rpx;

      .wrap {
        padding: 32rpx;
        border-radius: 16rpx;
        background-color: #000;
        word-break: break-all;

        .title {
          font-size: 36rpx;
          line-height: 48rpx;
          color: rgba(245, 245, 245, 1);
        }

        .desc {
          font-size: 24rpx;
          line-height: 36rpx;
          color: #bebebe;
          padding: 16rpx 0;
        }

        .more {
          @apply flex-between;
          font-size: 48rpx;
          line-height: 56rpx;

          .price {
            @apply text-green;
          }

          .btns {
            .btn {
              // 清除系统button样式
              all: unset;

              height: 100%;
              padding: 0 24rpx;
              @apply flex-center;
              flex-direction: column;
            }
          }
        }
      }

      .price {
        @apply text-green;
      }
    }
  }
</style>
