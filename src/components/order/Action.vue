<script setup lang="ts">
// 定义不同状态订单的操作按钮
const props = withDefaults(defineProps<{
  status: Order['status']
}>(), {
})
</script>

<template>
  <div class="action">
    <div v-if="props.status === 1">
      <div class="wait">
        <div class="cancel">
          取消订单
        </div>
        <div class="waitPay">
          继续付款
        </div>
      </div>
    </div>
    <div v-else-if="props.status === 2">
      <div class="ordered">
        <div class="refund">
          退款
        </div>
      </div>
    </div>
    <div v-else-if="props.status === 3">
      <!-- 这里的状态不应该是3，引入物流信息后，增加&&物流信息的条件 -->
      <div class="shipped">
        <div class="logistics">
          查看物流
        </div>
        <div class="received">
          确认收货
        </div>
      </div>
    </div>
    <div v-else-if="props.status === 4 || props.status === 5 || props.status === 6">
      <div class="closed">
        <div class="add">
          加入购物车
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.action {

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

    .waitPay {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #a7f522;
      border-radius: 4rpx;
    }
  }

  .ordered {

    .refund {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #ffffff;
      border-radius: 4rpx;
    }
  }

  .shipped {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16rpx;

    .logistics {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #ffffff;
      border-radius: 4rpx;
    }

    .received {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #a7f522;
      border-radius: 4rpx;
    }
  }

  .closed {

    .add {
      padding: 12rpx 32rpx;
      font-size: 28rpx;
      color: #1d2129;
      background-color: #a7f522;
      border-radius: 4rpx;
    }
  }
}
</style>
