<script lang="ts" setup>
const { orderInfo, continuePay, countdown, cancelPay } = useSubmitOrderStore()

//  是否显示卡片边框
const showborder = ref<boolean>(false)
// 当前订单状态  待支付  已取消  支付成功
const state = ref<'success' | 'fail' | 'waiting'>('waiting')
// 商品详情
const detail = ref<orderinfoData>({})
// 倒计时
const timeout = ref<string>('--:--:--')
// 订单号
const orderNo = ref<string>('')
// 订单首次加载状态
const firstStatus = ref<number>(1)

const status = (key: number) => {
  switch (key) {
    case 6:
      state.value = 'fail'
      break
    case 1:
      state.value = 'waiting'
      break
    case 2 :
      state.value = 'success'
      break
  }
}

// 点击立即支付   调继续支付接口
const continueFn = async () => {
  await continuePay(detail.value?.id || 0)
}
// 取消支付
const cancelPayFn = async () => {
  await cancelPay(detail.value?.id || 0)
  detail.value = await orderInfo(orderNo.value)
  status(detail.value.status || firstStatus.value)
}

onLoad((options) => {
  if (options?.no) {
    orderNo.value = options?.no
  }
  if (options?.status) {
    status(Number(options?.status))
  }
})

onMounted(async () => {
  // 给请求 添加商品
  detail.value = await orderInfo(orderNo.value)
  timeout.value = countdown(detail.value?.createdAt || '')

  const times = setInterval(async () => {
    async function updateTimes() {
      timeout.value = countdown(detail.value?.createdAt || '')
      if (timeout.value === '已过期') {
        clearInterval(times)
        detail.value = await orderInfo(orderNo.value)
        status(detail.value.status || firstStatus.value)
      }
    }
    updateTimes()
  }, 1000)
})
</script>

<template>
  <navbar-back text="订单详情" />
  <div class="body">
    <div class="status">
      <div class="addressBox">
        <buys-diffents-status :status="state || firstStatus" :timer="timeout" />
        <buys-address-card :width="558" />
      </div>
    </div>

    <div class="box">
      <div class="gradient-border gradientbox">
        <buys-goods-item-card :list="detail.details" :showborder="showborder" />
        <div class="totalPrice">
          <span class="textFont">{{ state === 'success' ? '实际支付' : state === 'fail' ? '合计' : '待支付' }}:</span>
          <span class="priceFont">￥{{ detail.sellPrice }}</span>
        </div>
      </div>
    </div>

    <buys-order-info-bottom :status="state" @continue="continueFn" @cancel="cancelPayFn" />
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;
$Be: #BEBEBE;

.i-background-product-detail {
  width: 100%;
  height: 100%;
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .status {
    position: relative;
    width: 686rpx;
    height: 630rpx;
    margin: 32rpx auto;
    background-image: url('../../assets/background/order-status.svg');
    background-repeat: no-repeat;
    background-size: 100%;

    .addressBox {
      width: 622rpx;
      position: absolute;
      bottom: 94rpx;
      left: 50%;
      transform: translateX(-50%);
    }

  }

  .gradient-border {
    position: relative;
  }

  .gradient-border::before {
    content: "";
    border-radius: 32rpx;
    padding: 2rpx;
    inset: 0;
    position: absolute;
    background: linear-gradient(135deg, rgba(#FFFFFF, 0.8), rgba(#FFFFFF, 0.08), rgba(#FFFFFF, 0.8));
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  .gradientbox {
    width: 686rpx;
    margin: 0rpx auto 32rpx;
    box-sizing: border-box;
    padding: 32rpx 0;

    .totalPrice {
      height: 80rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 40rpx;

      .textFont {
        font-size: 28rpx;
      }

      .priceFont {
        font-size: 40rpx;
        font-weight: 600;
        color: #A7F522;
      }
    }
  }

  .top-wrap {
    height: $top-height;
  }

  .body-wrap {
    flex: 1;
  }

  .bottom-wrap {
    height: $bottom-height;
  }

}
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
