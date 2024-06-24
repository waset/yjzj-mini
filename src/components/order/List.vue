<script setup lang="ts">
const props = withDefaults(defineProps<{
  order: Order
}>(), {
})

// 点击更多显示提示弹窗
const more = ref([
  {
    name: 'detail',
    label: '查看明细',
  },
  {
    name: 'again',
    label: '再来一单',
  },
])

const { detail } = storeToRefs(useProductStore())
const { addProduct } = useBuyStore()

// 加入购物车
const addBuyCar = () => {
  addProduct({
    ...detail.value,
    quantity: 1,
    select: false,
    delete: false,
  })
  uni.showToast({
    title: '添加成功',
    icon: 'success',
  })
}

// 是否展示下拉菜单
const showDropSwitch = ref(false)
// 显示下拉菜单的方法
function toggleDropFn() {
  showDropSwitch.value = !showDropSwitch.value
}

// 查看明细弹窗
const detailDialog = ref(false)
// 查看明细弹窗内展示信息
const detailInfo = ref<Order>()
// 显示查看明细弹窗
function showDetailDialogFn() {
  detailDialog.value = true
  detailInfo.value = props.order
}

// 下拉菜单点击事件
const DropFn = (name: string) => {
  switch (name) {
    case 'detail':
      // 查看明细
      showDetailDialogFn()
      break

    case 'again':
      // 再来一单
      addBuyCar()
      break
  }
}

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
      desc: '支付失败',
      color: '#ffffff',
    },
    4: {
      desc: '部分退款',
      color: '#bebebe',
    },
    5: {
      desc: '交易关闭',
      color: '#bebebe',
    },
    6: {
      desc: '取消支付',
      color: '#bebebe',
    },
  }
  return statusMap[status]
}
</script>

<template>
  <div class="order-list-container">
    <common-popup v-model:show="detailDialog" name="查看明细">
      <div class="detail">
        <div v-if="detailInfo" class="wrap">
          <div class="content">
            <div class="bg">
              <div class="top">
                <div class="total">
                  <div class="text">
                    合计金额
                  </div>
                  <div class="price">
                    <span>￥</span>
                    <span>{{ detailInfo.sellPrice }}</span>
                  </div>
                </div>
                <div class="activity">
                  <div class="text">
                    活动优惠
                  </div>
                  <div class="price">
                    <span>-￥</span>
                    <span>0</span>
                  </div>
                </div>
                <div class="coupon">
                  <div class="text">
                    卡券优惠
                  </div>
                  <div class="price">
                    <span>-￥</span>
                    <span>{{ detailInfo.ticketPrice }}</span>
                  </div>
                </div>
                <div class="freight">
                  <div class="text">
                    运费
                  </div>
                  <div class="price">
                    <span>￥</span>
                    <span>0</span>
                  </div>
                </div>
                <div class="actualPayment">
                  <div class="text">
                    实付金额
                  </div>
                  <div class="price">
                    <span>￥</span>
                    <span>{{ detailInfo.sellPrice }}</span>
                  </div>
                </div>
              </div>
              <div class="line" />
              <div class="bottom">
                <div class="orderNumber">
                  <div class="text">
                    订单编号
                  </div>
                  <div class="info">
                    <div class="num">
                      {{ detailInfo.no }}
                    </div>
                    <div class="replication" @click="copyText(detailInfo.no)">
                      | 复制
                    </div>
                  </div>
                </div>
                <div class="create">
                  <div class="text">
                    创建时间
                  </div>
                  <div class="info">
                    <div>{{ detailInfo.createdAt }}</div>
                  </div>
                </div>
                <div v-if="detailInfo.payAt" class="pay">
                  <div class="text">
                    付款时间
                  </div>
                  <div class="info">
                    <div>{{ detailInfo.payAt }}</div>
                  </div>
                </div>
                <div v-if="detailInfo.updatedAt" class="finish">
                  <div class="text">
                    成交时间
                  </div>
                  <div class="info">
                    <div>{{ detailInfo.updatedAt }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="service">
            <div class="body">
              <div class="title">
                遇到问题？
              </div>
              <div class="btn">
                <div class="i-icons-service" />
                <div class="text">
                  联系客服
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </common-popup>
    <div class="order-list">
      <div class="list">
        <div class="item">
          <div class="info">
            <div class="top">
              <div class="idFunc">
                <div class="id">
                  订单号：{{ props.order.no }}
                </div>
                <div class="copy" @click="copyText(props.order.no)">
                  | 复制
                </div>
              </div>
              <div class="statusDesc" :style="{ color: filterOrder(props.order.status).color }">
                {{ filterOrder(props.order.status).desc }}
              </div>
            </div>
            <div class="product">
              <order-product :order="order" />
            </div>
          </div>
          <div class="func">
            <div class="upper">
              <div
                v-if="props.order.status === OrderStatus.Wait || props.order.status === OrderStatus.PaymentSuccessful"
                class="price"
              >
                <div class="text">
                  总计：
                </div>
                <div class="totalPrice">
                  <span>￥</span>
                  <span>{{ props.order.sellPrice }}</span>
                </div>
              </div>
            </div>
            <div class="bottom">
              <div class="left">
                <common-drop v-model:show="showDropSwitch" :list="more" position="top" @click="DropFn">
                  <div class="more" @click="toggleDropFn">
                    <span>更多</span>
                  </div>
                </common-drop>
              </div>
              <div class="right">
                <div
                  v-if="props.order.status === OrderStatus.Wait || props.order.status === OrderStatus.PaymentSuccessful"
                  class="action"
                >
                  <div class="operation">
                    <order-action
                      :order="props.order" :status="props.order.status" :express="props.order.express"
                      @add-buy-car="addBuyCar"
                    >
                      <slot />
                    </order-action>
                  </div>
                </div>
                <div v-else class="sum">
                  <div class="text">
                    总计：
                  </div>
                  <div class="totalPrice">
                    <span>￥</span>
                    <span>{{ props.order.sellPrice }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;

  gap: 32rpx;

  .list {

    .item {
      padding: 24rpx;

      background: rgba(132, 132, 132, 0.2);
      border: 2rpx solid rgba(189, 189, 189, 0.5);
      border-radius: 32rpx;

      .info {
        display: flex;
        flex-direction: column;

        .top {
          display: flex;
          justify-content: space-between;
          padding: 32rpx 24rpx;

          gap: 32rpx;

          background-image: linear-gradient(133.06deg, rgba(0, 0, 0, 1) 0%, rgba(36, 36, 36, 0.5) 50%, rgba(0, 0, 0, 1) 100%);
          border-radius: 32rpx;

          .idFunc {
            display: flex;
            align-items: center;
            justify-content: start;
            flex-direction: row;
            gap: 4rpx;

            .id {
              font-size: 24rpx;
              color: #bebebe;
              white-space: nowrap;
            }

            .copy {
              font-size: 24rpx;
              color: #ffffff;
            }
          }

          .statusDesc {
            font-size: 24rpx;
          }
        }

      }

      .func {
        display: flex;
        flex-direction: column;

        gap: 16rpx;

        .upper {
          display: flex;
          flex-direction: row-reverse;

          .price {
            display: flex;
            flex-direction: row;
            align-items: center;

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

        }

        .bottom {
          all: unset;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

          .left {
            width: auto;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: start;
            gap: 16rpx;

            .more {
              position: relative;
              display: inline-block;
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 4rpx;

              font-size: 28rpx;
              color: #ffffff;

              .icon {
                font-size: 32rpx;
              }
            }

          }

          .right {

            .sum {
              display: flex;
              flex-direction: row;
              align-items: center;

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

          }

        }

      }
    }
  }

}

.detail {

  .wrap {
    display: flex;
    flex-direction: column;

    gap: 32rpx;

    .content {
      background-image: linear-gradient(133.06deg, rgba(255, 255, 255, 0.4) 3.56%, rgba(238, 238, 238, 0.06) 99.09%);
      padding: 2rpx;
      border-radius: 32rpx;

      .bg {
        border-radius: 32rpx;
        background: rgba(0, 0, 0, 0.8);

        display: flex;
        flex-direction: column;
        gap: 16rpx;
        padding: 32rpx 32rpx;

        .top {
          display: flex;
          flex-direction: column;
          gap: 16rpx;

          .total {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .price {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 2rpx;

              font-size: 28rpx;
              font-weight: 500;

            }

          }

          .activity {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .price {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 2rpx;

              font-size: 28rpx;
              font-weight: 500;

            }

          }

          .coupon {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .price {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 2rpx;

              font-size: 28rpx;
              font-weight: 500;

            }

          }

          .freight {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .price {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 2rpx;

              font-size: 28rpx;
              font-weight: 500;

            }

          }

          .actualPayment {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .price {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 2rpx;

              color: #a7f522;
              font-size: 28rpx;
              font-weight: 500;

            }

          }

        }

        .line {
          width: 100%;
          height: 2rpx;
          background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.6), rgba(190, 190, 190, 0.6), rgba(190, 190, 190, 0.2));
        }

        .bottom {
          display: flex;
          flex-direction: column;
          gap: 16rpx;

          .orderNumber {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .info {
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: start;
              gap: 8rpx;

              .num {
                color: #bebebe;
                font-size: 28rpx;
              }

              .replication {
                color: #ffffff;
                font-size: 28rpx;
                font-weight: 500;
              }

            }

          }

          .create {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .info {
              color: #bebebe;
              font-size: 28rpx;
              font-weight: 500;

            }

          }

          .pay {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .info {
              color: #bebebe;
              font-size: 28rpx;
              font-weight: 500;

            }

          }

          .finish {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding: 8rpx 0;

            .text {
              font-size: 28rpx;
              color: #ffffff;
            }

            .info {
              color: #bebebe;
              font-size: 28rpx;
              font-weight: 500;

            }

          }

        }
      }
    }

    .service {
      background-image: linear-gradient(133.06deg, rgba(255, 255, 255, 0.4) 3.56%, rgba(238, 238, 238, 0.06) 99.09%);
      padding: 2rpx;
      border-radius: 32rpx;

      .body {
        border-radius: 32rpx;    background: rgba(0, 0, 0, 0.8);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding: 32rpx 32rpx;

        .title {
          font-size: 30rpx;
          color: #ffffff;
        }

        .btn {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 4rpx;

          font-size: 28rpx;
          color: #ffffff;
        }

      }
    }
  }
}
</style>
