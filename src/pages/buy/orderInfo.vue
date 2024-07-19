<script lang="ts" setup>
const { orderInfo, continuePay, countdown, cancelPay } = useSubmitOrderStore()

// 当前订单状态  待支付  已取消  支付成功
const state = ref<'success' | 'fail' | 'waiting'>('waiting')
// 商品详情
const detail = ref({} as orderinfoData)
// 倒计时
const timeout = ref<string>('--:--:--')
// 订单号
const orderId = ref<number>()
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
    case 2:
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
  detail.value = await orderInfo(orderId.value)
  status(detail.value.status || firstStatus.value)
}

onLoad((options) => {
  if (options?.id) {
    orderId.value = options?.id
  }
  if (options?.status) {
    status(Number(options?.status))
  }
})

const showConfigsSwitch = ref<boolean>(false)
const showConfigs = ref<any>(null)
const checkinfo = (index: number) => {
  const config_id = detail.value?.details?.[index].productConfigID
  const id = detail.value?.details?.[index].productID
  if (config_id) {
    Jump('/pages/product/diy', { config_id })
  }
  else {
    Jump('/pages/product/detail', { id })
  }
}
onShow(async () => {
  // 给请求 添加商品
  detail.value = await orderInfo(orderId.value)
  timeout.value = countdown(detail.value?.createdAt || '')
  status(detail.value.status || firstStatus.value)

  const times = setInterval(async () => {
    async function updateTimes() {
      timeout.value = countdown(detail.value?.createdAt || '')
      if (timeout.value === '已过期') {
        clearInterval(times)
        detail.value = await orderInfo(orderId.value)
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
        <buys-orderinfo-address :address="detail" />
      </div>
    </div>
    <template v-if="detail.details">
      <div class="box">
        <div class="gradient-border gradientbox">
          <buys-submit-orderinfo-goods :list="detail.details" @check="checkinfo" />
          <div class="totalPrice">
            <span class="textFont">{{ state === 'success' ? '实际支付' : state === 'fail' ? '合计' : '待支付' }}:</span>
            <span class="priceFont">￥{{ detail.sellPrice }}</span>
          </div>
        </div>
      </div>
    </template>

    <div class="info">
      <!-- 详情 -->
      <buys-submit-information :info="detail as orderinfoData" />
    </div>
    <common-popup v-model:show="showConfigsSwitch" name="配置详情">
      <buys-submit-order-allocation :allocation-list="showConfigs" />
    </common-popup>
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

  .servicebox {
    padding: 32rpx;

    .service {
      background-image: linear-gradient(133.06deg, rgba(255, 255, 255, 0.4) 3.56%, rgba(238, 238, 238, 0.06) 99.09%);
      padding: 2rpx;
      border-radius: 32rpx;

      .body {
        border-radius: 32rpx;
        background: rgba(0, 0, 0, 0.5);

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        padding: 32rpx 32rpx;

        .title {
          font-size: 30rpx;
          color: #ffffff;
        }

        .btn {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: 4rpx;

          font-size: 28rpx;
          color: #ffffff;
        }

      }
    }
  }

  .box {
    padding: 0 32rpx 32rpx 32rpx;
  }

  .info {
    padding: 0 32rpx 32rpx 32rpx;
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
    // width: 686rpx;
    // margin: 0rpx auto 32rpx;
    box-sizing: border-box;
    padding: 32rpx;

    .totalPrice {
      // height: 80rpx;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 16rpx 8rpx;

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
