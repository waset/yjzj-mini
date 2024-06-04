<script setup lang="ts">
import { it } from 'node:test'

const { orders } = storeToRefs(useOrderStore())
const { getOrderList } = useOrderStore()

const tabsIdx = ref<Order['status']>(0)
const tabs = ref<{
  [index in Order['status']]?: string
}>({
  0: '全部订单',
  1: '待付款',
  2: '待发货',
  3: '待收货',
})

// 订单状态
// const getStatus = reactive<{
//   [index in Order['status']]?: string
// }>({
//   0: '',
//   1: '',
//   3: '',
// })

const userOrder = ref(orders.value)

onShow(() => {
  getOrderList(tabsIdx.value)
  console.log(orders.value)
})

function copyText() {

}
</script>

<template>
  <div class="order">
    <navbar-back text="我的订单" />
    <div class="head">
      <template v-for="(item, index) in tabs" :key="index">
        <div
          class="item" :class="{
            active: Number(tabsIdx) === Number(index),
          }" @click="() => tabsIdx = index"
        >
          {{ item }}
        </div>
      </template>
    </div>
    <div class="body">
      <template v-if="orders.length === 0">
        <div class="empty">
          <common-empty text="您还没有订单哦" />
        </div>
      </template>
      <template v-else>
        <div class="list">
          <div class="item">
            <template v-for="(item, index) in userOrder" :key="index">
              <div class="info">
                <div class="top">
                  <div class="idFunc">
                    <div class="id">
                      订单编号：{{ item.no }}
                    </div>
                    <button style="background: none; color:#f5f5f5 ;font-size: 24rpx;" @click="copyText">
                      | 复制
                    </button>
                  </div>
                  <div class="status">
                    <!-- 订单状态：{{ getStatus[item.status] }} -->
                  </div>
                </div>
                <div class="product">
                  <div class="left">
                    <div class="img">
                      <product-image :src="item.details[0].productSnapshot.banner[0]" width="160rpx" radius="16rpx" />
                    </div>
                    <div class="text">
                      <div class="name">
                        {{ item.details[0].productSnapshot.name }}
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
                      <span>{{ item.details[0].productSnapshot.tagPrice }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="func">
                <div class="left">
                  <div class="more">
                    <div class="i-icons-right" />
                    <span>更多</span>
                  </div>
                </div>
                <div class="right">
                  <div class="text">
                    总计：
                  </div>
                  <div class="totalPrice">
                    <span>￥</span>
                    <span>{{ item.sellPrice }}</span>
                  </div>
                </div>
                <div class="btn">
                  <slot />
                </div>
              </div>
            </template>
          </div>
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

    .empty {
      padding-top: 15%;
    }

    .list {
      padding: 0 32rpx;

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
            }
          }

          .product {
            display: flex;
            flex-direction: row;
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
        }

        .func {
          display: flex;
          flex-direction: row;
          justify-content: space-between;

          .left {
            font-size: 28rpx;
            color: #ffffff;
          }

          .right {
            display: flex;
            flex-direction: row;
            align-items: center;

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
