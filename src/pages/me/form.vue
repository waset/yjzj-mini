<script setup lang="ts">
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

onShow(() => {
  getOrderList(tabsIdx.value)
})
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
      <order-list />
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

}
</style>
