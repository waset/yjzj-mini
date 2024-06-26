<script setup lang="ts">
const props = withDefaults(defineProps<{
  order: Order
}>(), {
})

// 普通商品点击跳转
const handleClick = (detailProduct: Product) => {
  Jump('/pages/product/detail', { id: detailProduct.id })
}

// diy商品点击跳转
const diyClick = (detailDiy: ProductConfigSnapshot) => {
  Jump('/pages/product/detail', { id: detailDiy.shareCode })
}
</script>

<template>
  <div class="box">
    <div class="info">
      <template v-for="(detail, i) in props.order.details" :key="i">
        <div v-if="detail.productSnapshot === null" class="diy">
          <!-- diy商品 -->
          <div class="proItem">
            <div class="content">
              <div class="left">
                <div class="img" @click="diyClick(detail.productConfigSnapshot)">
                  <!-- diy商品从机箱中取banner图 -->
                  <product-image :src="detail.details.filter(item => item.tagTitle.indexOf('机箱') > -1)[0].productSnapshot.banner[0] || ''" width="160rpx" radius="16rpx" />
                </div>
                <div class="text">
                  <div class="name">
                    {{ detail.tagTitle }}
                  </div>
                </div>
              </div>
              <div class="right">
                <div class="productPrice">
                  <span>￥</span>
                  <span>{{ detail.sellPrice }}</span>
                </div>
              </div>
            </div>
            <div v-if="i !== props.order.details.length - 1" class="line" />
          </div>
        </div>
        <div v-else class="other">
          <!-- 非diy商品 -->
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
                  <div v-if="detail.productSnapshot.description" class="desc">
                    <div class="descText">
                      {{ detail.productSnapshot.description }}
                    </div>
                  </div>
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
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.box {

  .info {
    display: flex;
    flex-direction: column;

    .diy {
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

              .desc {

                .descText {
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;

                  font-size: 24rpx;
                  color: #bebebe;
                }
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

    .other {
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

              .desc {

                .descText {
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 1;
                  text-overflow: ellipsis;
                  overflow: hidden;
                  word-break: break-all;

                  font-size: 24rpx;
                  color: #bebebe;
                }
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
