<script lang="ts" setup>
const props = defineProps<{
  config: any
}>()
</script>

<template>
  <div class="configs">
    <div v-if="props.config" class="wrap">
      <template v-for="(item, index) in props.config.params" :key="index">
        <div class="item">
          <div v-if="product_is_diy(props.config) && item.product.banner" class="image">
            <product-image :src="item.product.banner[0]" :background="false" width="100rpx" height="100rpx" />
          </div>
          <div class="info">
            <div class="top">
              <div class="type">
                {{ item.desc }}
              </div>
              <div v-if="item.number" class="num">
                <span>x</span>
                <span>{{ item.number }}</span>
              </div>
            </div>
            <div class="desc">
              <template v-if="product_is_diy(props.config)">
                {{ item.product.name }}
              </template>
              <template v-else>
                {{ item.name || item.paramValue }}
              </template>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.configs {
  .wrap {
    .item {
      @apply flex-between;
      background: rgba(132, 132, 132, 0.2);
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      margin-bottom: 32rpx;
      padding: 22rpx 24rpx;

      .image {
        margin-right: 20rpx;
      }

      .info {
        flex: 1;

        .top {
          @apply flex-between;

          .type {
            flex: 1;
            font-size: 32rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: rgba(167, 245, 34, 1);
          }

          .num {
            font-family: PingFang SC;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: rgba(190, 190, 190, 1);
          }
        }

        .desc {
          padding-top: 16rpx;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: rgba(190, 190, 190, 1);
        }
      }
    }
  }
}
</style>
