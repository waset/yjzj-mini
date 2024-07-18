<script setup lang="ts">
const props = withDefaults(defineProps<{
  order: Order
}>(), {
})

// 自定义商品点击跳转
const customClick = (detailDiy: orderDetail) => {
  Jump('/pages/product/diy', { config_id: detailDiy.productConfigID })
}

// 非自定义商品点击跳转
const handleClick = (detailProduct: orderDetail) => {
  // 如果是diy商品
  if (detailProduct.typeParentID === 6) {
    Jump('/pages/product/diy', { id: detailProduct.productID })
  }
  else {
    Jump('/pages/product/detail', { id: detailProduct.productID })
  }
}

const isSrc = (detail: orderDetail) => {
  return detail.details.filter(item => item.tagTitle === '机箱')[0]?.productSnapshot.banner[0] || ''
}
</script>

<template>
  <div class="box">
    <div class="info">
      <template v-for="(detail, i) in props.order.details" :key="i">
        <div v-if="detail.productSnapshot === null" class="custom">
          <!-- 用户自定义商品 -->
          <div class="proItem">
            <div class="content">
              <div class="left">
                <div class="img" @click="customClick(detail)">
                  <!-- 从机箱中取banner图 -->
                  <product-image :src="isSrc(detail)" width="160rpx" radius="16rpx" />
                </div>
                <div class="text">
                  <div class="name">
                    {{ detail.tagTitle }} ({{ detail.productConfigSnapshot.shareCode }})
                  </div>
                  <div v-if="detail.productConfigSnapshot.shareCode" class="desc">
                    <div class="descText">
                      <!-- 取出所有配置的名称 -->
                      {{ `${detail.details.filter(item => item.tagTitle === 'CPU')[0]?.productSnapshot.name}+${detail.details.filter(item => item.tagTitle === 'tagTitle')[0]?.productSnapshot.name}` }}
                    </div>
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
          <!-- 非自定义商品 -->
          <div class="proItem">
            <div class="content">
              <div class="left">
                <div class="img" @click="handleClick(detail)">
                  <product-image :src="detail.productSnapshot.banner[0]" width="160rpx" radius="16rpx" />
                </div>
                <div class="text">
                  <div class="name" @click="handleClick(detail)">
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

    .custom {
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
