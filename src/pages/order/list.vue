<script setup lang="ts">
const { orders } = storeToRefs(useOrderStore())
const { getOrderList } = useOrderStore()

const tabsIdx = ref<Order['status']>(0)
const tabs = ref<{
  [index in Order['status']]?: string
}>({
  0: '全部订单',
  1: '待付款',
  2: '待收货',
})

onLoad((params) => {
  const req = params as {
    status?: Order['status']
  }
  if (req.status !== undefined) {
    tabsIdx.value = req.status
  }
})

const getList = async (status: number) => {
  await getOrderList(status)
}

const handleTabClick = async (status: Order['status']) => {
  tabsIdx.value = status
  await getList(status)
}

onShow(async () => {
  await getList(tabsIdx.value)
})
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
      <div class="box">
        <template v-if="orders && orders.length">
          <template v-for="(item, index) in orders" :key="index">
            <order-list
              :order="(item as Order)" @change="() => {
                handleTabClick(tabsIdx)
              }"
            />
          </template>
        </template>
        <template v-else>
          <div class="empty">
            <common-empty text="您还没有订单哦" />
          </div>
        </template>
      </div>
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

    .box {
      padding: 0 32rpx;
      display: flex;
      flex-direction: column;

      gap: 32rpx;

      .empty {
        padding-top: 15%;
      }
    }
  }
}
</style>
