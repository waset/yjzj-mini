<script lang="ts" setup>
const props = defineProps<{
  status: string
}>()

const emit = defineEmits<{
  (e: 'continue'): void
  (e: 'cancel'): void
}>()
const continuePay = () => {
  emit('continue')
}
const cancelPay = () => {
  emit('cancel')
}
</script>

<template>
  <div class="bottom">
    <div v-if="props.status === 'waiting'" class="Tobepaid">
      <div class="cancle" @click="cancelPay">
        取消支付
      </div>
      <div class="fastPay" @click="continuePay">
        立即支付
      </div>
    </div>
    <div v-else-if="props.status === 'success' || 'fail'" class="Tobepaid">
      <div class="cancle" @click="Jump('/pages/order/list', {}, 1)">
        查看订单
      </div>
      <div class="fastPay" @click="Jump('/pages/menu/menu')">
        随便逛逛
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  background-color: #414141;

  .Tobepaid {
    height: 100%;
    padding-top: 32rpx;
    padding-bottom: env(safe-area-inset-bottom);
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .cancle {
      width: 192rpx;
      padding: 20rpx 40rpx;
      background-color: #fff;
      font-size: 28rpx;
      border-radius: 8rpx;
      color: #333333;
    }

    .fastPay {
      width: 192rpx;
      padding: 20rpx 40rpx;
      background-color: #A7F522;
      font-size: 28rpx;
      border-radius: 8rpx;
      color: #333333;
      margin: 0 32rpx 0 16rpx;
    }
  }
}
</style>
