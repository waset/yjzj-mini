<script lang="ts" setup>
const props = defineProps<{
  status: string
}>()
</script>

<template>
  <div class="bottom">
    <div v-if="props.status === 'waiting'" class="Tobepaid">
      <div class="cancle">
        取消支付
      </div>
      <div class="fastPay">
        立即支付
      </div>
    </div>
    <div v-else-if="props.status === 'fail'" class="Tobepaid">
      <div class="cancle">
        删除订单
      </div>
      <div class="fastPay">
        重新加购
      </div>
    </div>
    <div v-else class="Tobepaid">
      <div class="cancle">
        查看订单
      </div>
      <div class="fastPay">
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
    height: 144rpx;
    background-color: #414141;

    .Tobepaid {
      height: 100%;
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
