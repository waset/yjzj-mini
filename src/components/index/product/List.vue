<script setup lang="ts">
const props = withDefaults(defineProps<{
  list: Product[]
  limit?: number
}>(), {
  limit: 4,
})
</script>

<template>
  <div
    class="lists" :style="{
      '--row': Math.floor(props.limit / 2),
    }"
  >
    <template v-if="props.list.length && props.list.length <= props.limit">
      <div class="body">
        <template v-for="(product, index) in props.list" :key="index">
          <div class="wrap">
            <div class="item" @click="() => Jump('/pages/product/detail', { id: product.id })">
              <image :src="ImageUrl(product.banner[0])" class="image" mode="aspectFit" />
              <div class="info">
                <span class="name">{{ product.name }}</span>
              </div>
              <div class="buy">
                <div class="price">
                  <span>￥</span>
                  <span>{{ product.tagPrice }}</span>
                </div>
                <div class="icon">
                  <div class="i-icons-buy" />
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
      <div class="more">
        <div class="btn" @click="() => Jump('/pages/product/category', { key: 'laptop' })">
          查看更多>>
        </div>
      </div>
    </template>
    <template v-else>
      <common-empty text="暂无商品" />
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .lists {
    @apply px-[32rpx];

    .body {
      @apply py-[60rpx] grid grid-cols-2 gap-[16rpx];
      grid-template-rows: repeat(var(--row, 2), minmax(0, 1fr));

      .wrap {
        padding: 2rpx;
        border-radius: 32rpx;
        background-image: linear-gradient(113.84deg, rgba(255, 255, 255, 0.8) -6.55%, rgba(255, 255, 255, 0.08) 46.47%, rgba(255, 255, 255, 0.8) 92.28%);

        .item {
          background: #000000;
          border-radius: 32rpx;
          transition: all 3s;
          @apply p-[16rpx];

          .image {
            width: 296rpx;
            height: 296rpx;
            max-width: 100%;
            border-radius: 28rpx;
          }

          .info {
            padding: 16rpx 0;

            .name {
              font-weight: 600;
              font-size: 28rpx;
              color: #FFFFFF;
              line-height: 40rpx;
              text-align: left;
              font-style: normal;
              text-transform: none;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

          }

          .buy {
            @apply flex-between;

            .price {
              flex: 1;
              background: linear-gradient(83deg, rgba(39, 39, 39, 0) -0.81%, rgba(190, 190, 190, 0.4) 29%, rgba(190, 190, 190, 0.4) 64.01%, rgba(39, 39, 39, 0) 92.9%);
              border-radius: 0rpx 4rpx 4rpx 0rpx;
              font-weight: 600;
              font-size: 28rpx;
              color: #FFFFFF;
              line-height: 40rpx;
              text-align: left;
              font-style: normal;
              text-transform: none;
              padding: 20rpx 8rpx;
            }

            .icon {
              @apply flex-center;

              width: 80rpx;
              height: 80rpx;
              font-size: 40rpx;
              color: #333;
              background: #A7F522;
              border-radius: 48rpx 48rpx 48rpx 48rpx;
            }
          }
        }
      }
    }

    .more {
      @apply flex-center;

      .btn {
        @apply underline underline-offset-3;

        background: linear-gradient(98.8deg, rgba(190, 190, 190, 0) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0) 92.04%);
        border-radius: 0rpx 4rpx 4rpx 0rpx;
        padding: 16rpx 110rpx;
      }
    }
  }
</style>
