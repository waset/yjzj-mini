<script setup lang="ts">
const props = withDefaults(defineProps<{
  order: Order
}>(), {
})

const handleClick = (detailProduct: Product) => {
  Jump('/pages/product/detail', { id: detailProduct.id })
}
</script>

<template>
  <div class="box">
    <div class="info">
      <div class="product">
        <template v-for="(detail, i) in props.order.details" :key="i">
          <div class="proItem">
            <div class="content">
              <div class="left">
                <div class="img" @click="handleClick(detail.productSnapshot)">
                  <product-image :src="detail.productSnapshot.banner[0]" width="160rpx" radius="16rpx" />
                </div>
                <div class="text">
                  <div class="name" @click="handleClick(detail.productSnapshot)">
                    {{ detail.productSnapshot.name }}
                  </div>
                  <order-configs :product="detail.productSnapshot" />
                </div>
              </div>
              <div class="right">
                <div class="productPrice">
                  <span>￥</span>
                  <span>{{ detail.productSnapshot.tagPrice }}</span>
                </div>
              </div>
            </div>
            <div v-if="i !== props.order.details.length - 1" class="line" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {

  .info {
    display: flex;
    flex-direction: column;

    .product {
      display: flex;
      flex-direction: column;

      .proItem {
        display: flex;
        flex-direction: column;

        .content {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          padding: 32rpx 0;

          gap: 16rpx;

          .left {
            display: flex;
            flex-direction: row;
            gap: 16rpx;

            .text {
              display: flex;
              flex-direction: column;
              justify-content: center;
              gap: 16rpx;

              .name {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                text-overflow: ellipsis;
                overflow: hidden;
                word-break: break-all;

                font-size: 28rpx;
                font-weight: 550;
                line-height: 40rpx;
              }

              .info {
                display: flex;
                flex-direction: row;
                align-items: center;

                font-size: 24rpx;
                color: #bebebe;
              }
            }
          }

          .right {

            .productPrice {
              font-size: 28rpx;
            }
          }
        }

        .line {
          width: 100%;
          height: 2rpx;
          background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.2));
        }
      }
    }
  }

}
</style>
