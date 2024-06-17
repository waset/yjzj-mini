<script lang="ts" setup>
//  是否显示卡片边框
const showborder = ref<boolean>(false)
// 当前订单状态  待支付  已取消  支付成功
const state = ref<'success' | 'fail' | 'waiting'>('waiting')

const goodslist = ref<goodsListInfo[]>([
  {
    name: '天选5Pro 14代酷睿i9',
    price: 33333333,
    number: 2,
  },
  {
    name: '天选5Pro 14代酷睿i9',
    price: 3333,
    number: 3,
  },
])
</script>

<template>
  <navbar-home text="订单详情" />
  <div class="body">
    <div class="status">
      <div class="addressBox">
        <buys-diffentsStatus :status="state" />
        <buys-addressCard :width="558" />
      </div>
    </div>

    <div class="box">
      <div class="gradient-border gradientbox">
        <buys-goodsItemCard :list="goodslist" :showborder="showborder" />
        <div class="totalPrice">
          <span class="textFont">待支付：</span>
          <span class="priceFont">￥123213</span>
        </div>
      </div>
    </div>

    <buys-orderInfoBottom :status="state" />
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
