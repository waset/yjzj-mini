<script setup lang="ts">
const props = defineProps<{
  info: Product | null
  price?: number

}>()

const { isLogin } = storeToRefs(useUserStore())

const moduleflag = ref<boolean>(false)
const { detail } = storeToRefs(useProductStore())
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
            <span>{{ product_is_diy(detail) ? price : detail?.sellPrice }}</span>
          </div>
          <div class="btns">
            <template v-if="isLogin">
              <button class="btn" open-type="share">
                <div class="icon">
                  <div class="i-icons-share" />
                </div>
              </button>
            </template>
            <template v-else>
              <div class="btn" @click="moduleflag = true">
                <div class="icon">
                  <div class="i-icons-share" />
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
    <common-model
      :show="moduleflag" msg="请登录后分享" icon="i-svg-warn" @ok="() => {
        Jump('/pages/me/login')
        moduleflag = false
      }" @cancel="moduleflag = false"
    />
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
              display: inline-block;

              &::after {
                content: none;
              }

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
