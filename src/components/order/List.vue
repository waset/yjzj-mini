<script setup lang="ts">
const props = defineProps<{
  order: Order
}>()

const emits = defineEmits<{
  change: [order: Order]
}>()

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
            <div class="left">
              <div class="price">
                <div class="text">
                  总计：
                </div>
                <div class="totalPrice">
                  <span>￥</span>
                  <span>{{ props.order.sellPrice }}</span>
                </div>
              </div>
            </div>
            <div class="right">
              <div class="action">
                <template
                  v-if="props.order.status === OrderStatus.Wait || props.order.status === OrderStatus.PaymentSuccessful"
                >
                  <div class="operation">
                    <order-action
                      :order="props.order" :status="props.order.status" :express="props.order.express"
                      @updata="emits('change', props.order)"
                    >
                      <slot />
                    </order-action>
                  </div>
                </template>
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
        flex-direction: row;
        justify-content: flex-end;

        .right {
          all: unset;
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

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

        .left {
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

      }
    }
  }

}
</style>
