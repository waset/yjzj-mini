<script lang="ts" setup>
const props = defineProps<{
  status: 'success' | 'fail' | 'waiting'
  timer: string
}>()
</script>

<template>
  <div class="statusBox">
    <div class="leftIcon">
      <IconStatus :type="props.status" />
    </div>
    <template v-if="props.status === 'waiting'">
      <div class="rightbox">
        <div class="title">
          等待支付
        </div>
        <div class="waiting">
          <span>剩余时间</span>
          <span style="color: #FF7D00;">{{ props.timer }}</span>
        </div>
        <div class="text">
          10分钟内未付款将自动关闭订单。
        </div>
      </div>
    </template>
    <template v-if="props.status === 'fail'">
      <div class="rightbox">
        <div class="title">
          取消支付
        </div>
        <div class="text">
          由于您未在规定时间内完成付款，订单已取消。期待您的再次选择。
        </div>
      </div>
    </template>
    <template v-if="props.status === 'success' ">
      <div class="rightbox">
        <div class="title">
          支付成功
        </div>
        <div class="text">
          您的订单已成功提交，我们将尽快为您发货，请关注物流信息。
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .statusBox {
    width: 578rpx;
    height: 188rpx;
    margin: 0 auto 48rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .waiting {
      font-size: 28rpx;
    }

    .leftIcon {
      width: 188rpx;
      height: 188rpx;

      .i-icons-arc {
        width: 94rpx;
        height: 188rpx;
      }
    }

    .rightbox {
      margin-left: 20rpx;
      width: 416rpx;

      display: flex;
      flex-direction: column;
      justify-content: space-between;

      gap: 16rpx;

      .title {
        font-weight: 600;
        font-size: 40rpx;
      }

      .text {
        font-size: 24rpx;
        color: #bebebe;
      }
    }
  }
</style>
