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

// 是否展示下拉菜单
const showDropSwitch = ref(false)
// 显示下拉菜单的方法
function showDropFn() {
  showDropSwitch.value = !showDropSwitch.value
}

// 查看明细弹窗
const detailDialog = ref(false)
// 弹窗内展示信息
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
  <common-popup v-model:show="detailDialog" name="查看明细">
    <div class="detail">
      <div v-if="detailInfo" class="wrap">
        <div class="content">
          <div class="total">
            <div class="text">
              订单详情
            </div>
            <div class="price" />
          </div>
        </div>
        <div class="service" />
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
            <div class="left">
              <common-drop v-model:show="showDropSwitch" :list="more" position="top" @click="DropFn">
                <div class="more" @click="showDropFn">
                  <div class="icon">
                    <div class="i-icons-more" />
                  </div>
                  <span>更多</span>
                </div>
              </common-drop>
            </div>
            <div class="operation">
              <order-action :status="props.order.status">
                <slot />
              </order-action>
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

        }

      }
    }
  }

}
</style>
