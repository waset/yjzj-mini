<script setup lang="ts">
const { orders } = storeToRefs(useOrderStore())

// 订单状态描述及颜色
const filterOrder = (status: Order['status']) => {
  const statusMap: any = {
    1: {
      desc: '等待付款',
      color: '#ff7d00',
    },
    2: {
      desc: '已下单',
      color: '#a7f522',
    },
    3: {
      desc: '已发货',
      color: '#a7f522',
    },
    4: {
      desc: '部分退款',
      color: '#ffffff',
    },
    5: {
      desc: '交易关闭',
      color: '#ffffff',
    },
    6: {
      desc: '取消支付',
      color: '#ffffff',
    },
  }
  return statusMap[status]
}

// 复制订单号
function copyText() {
  uni.setClipboardData({
    data: orders.value[0].no && orders.value[0].no !== '' ? orders.value[0].no : '暂无订单号',
    success: () => {
      uni.showToast({ title: '复制成功' })
    },
    fail: () => {
      uni.showToast({ title: '复制失败' })
    },
  })
}
</script>

<template>
  <div class="body">
    <template v-if="orders.length === 0">
      <div class="empty">
        <common-empty text="您还没有订单哦" />
      </div>
    </template>
    <template v-else>
      <div class="list">
        <div class="item">
          <template v-for="(item, index) in orders" :key="index">
            <div class="info">
              <div class="top">
                <div class="idFunc">
                  <div class="id">
                    订单编号：{{ item.no }}
                  </div>
                  <div class="copy" @click="copyText">
                    | 复制
                  </div>
                </div>
                <div class="statusDesc" :style="{ color: filterOrder(item.status).color }">
                  {{ filterOrder(item.status).desc }}
                </div>
              </div>
              <div class="product">
                <template v-for="(detail, i) in item.details" :key="i">
                  <div class="proItem">
                    <div class="content">
                      <div class="left">
                        <div class="img">
                          <product-image :src="detail.productSnapshot.banner[0]" width="160rpx" radius="16rpx" />
                        </div>
                        <div class="text">
                          <div class="name">
                            {{ detail.productSnapshot.name }}
                          </div>
                          <div class="info">
                            <span>配置详情</span>
                            <div class="i-icons-right" />
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
                    <div v-if="i !== item.details.length - 1" class="line" />
                  </div>
                </template>
              </div>
            </div>
            <div class="func">
              <div class="left">
                <div class="more">
                  <div class="icon">
                    <div class="i-icons-up" />
                  </div>
                  <span>更多</span>
                </div>
              </div>
              <div class="right">
                <div class="price">
                  <div class="text">
                    总计：
                  </div>
                  <div class="totalPrice">
                    <span>￥</span>
                    <span>{{ item.sellPrice }}</span>
                  </div>
                </div>
                <div class="btn">
                  <div v-if="item.status === 1" class="wait">
                    <div class="cancel">
                      取消订单
                    </div>
                    <div class="pay">
                      继续付款
                    </div>
                  </div>
                  <div v-else-if="item.status === 2" class="sucess">
                    <div class="refund">
                      退款
                    </div>
                  </div>
                  <div v-else-if="item.status === 4 || item.status === 5 || item.status === 6" class="btnSta">
                    <button>确认收货</button>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.body {
  padding: 0 32rpx;

  .empty {
    padding-top: 15%;
  }

  .list {

    .item {
      padding: 24rpx;

      background: rgba(132, 132, 132, 0.2);
      border: 2rpx solid rgba(245, 245, 245, 0.6);
      border-radius: 32rpx;

      .info {
        display: flex;
        flex-direction: column;

        .top {
          display: flex;
          justify-content: space-between;
          padding: 32rpx 32rpx;

          background: #000000;
          border-radius: 32rpx;

          .idFunc {
            display: flex;
            align-items: center;
            justify-content: start;
            flex-direction: row;
            gap: 8rpx;

            .id {
              font-size: 24rpx;
              color: #bebebe;
            }

            .copy {
              font-size: 24rpx;
              color: #ffffff;
            }
          }

          .statusDesc {
            font-size: 28rpx;
          }
        }

        .product {
          display: flex;
          flex-direction: column;

          .proItem {
            display: flex;
            flex-direction: column;

            .content {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 16rpx;

              padding: 32rpx 0;

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

      .func {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .left {
          display: flex;
          flex-direction: column-reverse;

          font-size: 28rpx;
          color: #ffffff;

          .more {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 4rpx;

            .icon {
              font-size: 32rpx;
            }
          }
        }

        .right {
          display: flex;
          flex-direction: column;
          gap: 16rpx;

          .price {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-end;

            padding: 0 8rpx;

            .text {
              font-size: 24rpx;
              color: #ffffff;
            }

            .totalPrice {
              font-size: 32rpx;
              font-weight: 550;
              color: #ffffff;
            }
          }

          .btn {

            .wait {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 16rpx;

              .cancel {
                padding: 12rpx 32rpx;
                font-size: 28rpx;
                color: #1d2129;
                background-color: #ffffff;
                border-radius: 4rpx;
              }

              .pay {
                padding: 12rpx 32rpx;
                font-size: 28rpx;
                color: #1d2129;
                background-color: #a7f522;
                border-radius: 4rpx;
              }
            }
          }
        }
      }
    }
  }

}
</style>
