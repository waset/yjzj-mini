<script setup lang="ts">
const { getOrderList } = useOrderStore()
const { orders } = storeToRefs(useOrderStore())

const tabsIdx = ref<Order['status']>(0)
const tabs = ref<{
  [index in Order['status']]?: string
}>({
  0: '全部订单',
  1: '待付款',
  2: '待发货',
  3: '待收货',
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

// 是否显示详情
const showDropSwitch = ref(false)
// 显示详情方法
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

const handleTabClick = (index: Order['status']) => {
  tabsIdx.value = index
  getOrderList(index)
}

onShow(() => {
  getOrderList(tabsIdx.value)
})

// 复制订单号
function copyText() {
  uni.setClipboardData({
    data: orders.value[0].no || '暂无订单号',
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
  <navbar-back text="我的订单" />
  <div class="order">
    <div class="head">
      <template v-for="(item, index) in tabs" :key="index">
        <div
          class="item" :class="{
            active: Number(tabsIdx) === Number(index),
          }" @click="() => handleTabClick(index)"
        >
          {{ item }}
        </div>
      </template>
    </div>
    <div class="body">
      <template v-for="(item, index) in orders" :key="index">
        <div class="box">
          <template v-if="orders.length === 0">
            <div class="empty">
              <common-empty text="您还没有订单哦" />
            </div>
          </template>
          <template v-else>
            <div class="list">
              <div class="item">
                <div class="detail">
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
                      <order-product :orders="orders" />
                    </div>
                  </div>
                  <div class="func">
                    <div class="left">
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
                          <template v-for="(i, idx) in more" :key="idx">
                            <div class="item" @click="i.handleclick">
                              {{ i.text }}
                            </div>
                          </template>
                        </template>
                      </common-drop>
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
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.order {
  .head {
    padding: 32rpx;
    display: flex;
    align-items: center;
    justify-content: start;

    gap: 32rpx;

    .item {
      position: relative;
      padding: 16rpx;
      z-index: 0;

      font-size: 32rpx;
      line-height: 40rpx;
      font-weight: 400;

      &.active {
        font-weight: bold;

        &::before {
          content: '';
          @apply bg-green;
          width: 100%;
          height: 20rpx;
          position: absolute;
          bottom: 10rpx;
          left: 0;
          z-index: -1;

          clip-path: polygon(5.814% 93.75%, 0% 31.25%, 98.837% 0%, 83.721% 93.75%, 5.814% 93.75%);
        }
      }
    }
  }

  .body {
    padding: 0 32rpx;

    .box {
      .empty {
        padding-top: 15%;
      }
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
              position: relative;
              display: inline-block;
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
}
</style>
