<script setup lang="ts">
const props = withDefaults(defineProps<{
  order: Order
}>(), {
})

// 点击更多显示提示弹窗
const more = ref([
  {
    text: '查看明细',
    handleclick: () => { },
  },
  {
    text: '再来一单',
    handleclick: () => { },
  },
])

// 是否展示下拉菜单
const showDropSwitch = ref(false)
// 显示下拉菜单的方法
function showDropFn() {
  showDropSwitch.value = !showDropSwitch.value
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
    data: props.order.no || '暂无订单号',
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
  <div class="order-list">
    <div class="list">
      <div class="item">
        <div class="info">
          <div class="top">
            <div class="idFunc">
              <div class="id">
                订单号：{{ props.order.no }}
              </div>
              <div class="copy" @click="copyText">
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
          <div class="bottom">
            <common-drop v-model:show="showDropSwitch">
              <template #default>
                <div class="more" @click="showDropFn">
                  <div class="icon">
                    <div class="i-icons-more" />
                  </div>
                  <span>更多</span>
                </div>
              </template>
              <template #info>
                <div class="menu">
                  <template v-for="(i, idx) in more" :key="idx">
                    <div class="item" @click="i.handleclick">
                      {{ i.text }}
                    </div>
                  </template>
                </div>
              </template>
            </common-drop>
            <div class="btn">
              <div v-if="props.order.status === 1" class="wait">
                <div class="cancel">
                  取消订单
                </div>
                <div class="pay">
                  继续付款
                </div>
              </div>
              <div v-else-if="props.order.status === 2" class="sucess">
                <div class="refund">
                  退款
                </div>
              </div>
              <div
                v-else-if="props.order.status === 4 || props.order.status === 5 || props.order.status === 6"
                class="btnSta"
              >
                <button>确认收货</button>
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
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  gap: 32rpx;

  .list {

    .item {
      padding: 24rpx;

      background: rgba(132, 132, 132, 0.2);
      border: 2rpx solid rgba(189, 189, 189, 0.6);
      border-radius: 32rpx;

      .info {
        display: flex;
        flex-direction: column;

        .top {
          display: flex;
          justify-content: space-between;
          padding: 32rpx 24rpx;

          gap: 32rpx;

          background: #000000;
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
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;

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

          .menu {
            display: flex;
            flex-direction: column;

            .item {
              padding: 16rpx 32rpx;
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
