<script lang="ts" setup>
</script>

<template>
  <navbar-home text="123" />
  <div class="body">
    <!-- <addressCard /> -->
    <div v-for="(item, index) in [1, 2]" :key="index" class="goodsCard">
      <div class="goodsInfo">
        <div class="goodsImg" />
        <div class="goodsOptions">
          <div class="goodsTitle">
            天选5Pro 14代酷睿i9
          </div>
          <div class="options">
            配置详情
          </div>

          <div class="priceAndNum">
            <div class="price">
              ￥43390
            </div>
            <div class="Number">
              x 2
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="CouponsAndNotes">
      <div class="counpons">
        <div>优惠券</div>
        <div class="beColor">
          待使用
        </div>
      </div>
      <div class="notes">
        <div>备注</div>
        <div class="beColor">
          无备注
        </div>
      </div>
    </div>

    <div class="settlementCard">
      <div class="trapezoid" />
      <div class="circle" />
      <div class="title">
        结算信息
      </div>

      <div class="row">
        <div class="BEC">
          商品数量
        </div>
        <div>x2</div>
      </div>

      <div class="row">
        <div class="BEC">
          合计金额
        </div>
        <div>￥43390</div>
      </div>

      <div class="row">
        <div class="BEC">
          活动优惠
        </div>
        <div style="color: #F53F3F;">
          -￥299
        </div>
      </div>

      <div class="row">
        <div class="BEC">
          卡券优惠
        </div>
        <div>0</div>
      </div>

      <div class="row">
        <div class="BEC">
          优惠
        </div>
        <div>0</div>
      </div>

      <div class="lines" />

      <div class="row2">
        <div style="color: #fff;">
          实付金额
        </div>
        <div>￥43390</div>
      </div>
    </div>

    <div class="bottomSubmit" />
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;
$max-width: 686rpx;
$Be: #BEBEBE;

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;

  .top-wrap {
    height: $top-height;
  }

  .body-wrap {
    flex: 1;
  }

  .bottom-wrap {
    height: $bottom-height;
  }

  .goodsCard {
    width: $max-width;
    height: 248rpx;
    margin: 30rpx auto 0;
    border: 2rpx solid transparent;
    border-radius: 32rpx;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #222, #222), linear-gradient(135deg, rgba(#fff, 0.8), rgba(#fff, 0.08), rgba(#fff, 0.8), );
    display: flex;
    align-items: center;
    justify-content: center;

    .goodsInfo {
      width: 622rpx;
      height: 200rpx;
      // background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .goodsImg {
        width: 200rpx;
        height: 200rpx;
        background-color: #fff;

      }

      .goodsOptions {
        width: 400rpx;
        height: 144rpx;
        // background-color: antiquewhite;

        .goodsTitle {
          font-weight: 500;
          font-size: 28rpx;
          color: #fff;
          margin-bottom: 20rpx;
        }

        .options {
          font-size: 24rpx;
          font-weight: 400;
          color: #BEBEBE;
          margin-bottom: 16rpx;
        }

        .priceAndNum {
          display: flex;
          justify-content: space-between;

          .price {
            font-size: 28rpx;
            font-weight: 500;
            color: #A7F522;

          }

          .Number {
            font-size: 24rpx;
            padding: 4rpx 24rpx;
            background-color: rgba($color: #fff, $alpha: 0.2);
            border-radius: 80rpx;
          }
        }

      }

    }

  }

  .CouponsAndNotes {
    width: $max-width;
    height: 112rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background-color: #fff;
    margin: 32rpx auto 0;
    font-size: 28rpx;
    box-sizing: border-box;
    padding-left: 32rpx;

    .counpons {
      display: flex;
      justify-content: space-between;
    }

    .notes {
      display: flex;
      justify-content: space-between;
    }

    .beColor {
      color: #BEBEBE;
    }
  }

  .settlementCard {
    position: relative;
    margin: 32rpx auto;
    border-radius: 32rpx;
    width: $max-width;
    // height: 608rpx;
    background-image: linear-gradient(135deg, #4C4A4B, rgba(#0D0D0D, 0.8), rgba(#0D0D0D, 0.9), #373737);

    .circle {
      position: absolute;
      width: 44rpx;
      height: 36rpx;
      border-radius: 20rpx;
      top: 30rpx;
      right: 36rpx;
      border: 3rpx;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(135deg, #000, #000), linear-gradient(135deg, #000,#fff );
    }

    .row {
      margin: 0 auto;
      width: 622rpx;
      height: 56rpx;
      font-size: 28rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-sizing: border-box;
      padding-left: 32rpx;
      margin-top: 16rpx;

      .BEC {
        color: $Be;
      }
    }

    .row2 {
      margin: 32rpx auto;
      width: 622rpx;
      height: 56rpx;
      font-size: 32rpx;
      font-weight: 600;
      color: #A7F522;
      display: flex;
      align-items: center;
      padding-left: 32rpx;
      box-sizing: border-box;
      justify-content: space-between;
    }

    .lines {

      width: 622rpx;
      height: 2rpx;
      margin: 0 auto;
      background: linear-gradient(135deg, rgba(#BEBEBE, 0.1), rgba(#BEBEBE, 0.4), rgba(#BEBEBE, 0.4), rgba(#BEBEBE, 0.1));
      margin-top: 16rpx;
    }

    .trapezoid {
      position: relative;
      width: 290rpx;
      height: 28px;
      margin: 0 auto;

      &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        transform: perspective(40px) rotateX(-10deg);
        transform-origin: top;
        background: #444444;
        border-bottom-left-radius: 10rpx;
        border-bottom-right-radius: 10rpx;
      }

    }

    .title {
      color: #fff;
      font-size: 32rpx;
      font-weight: 600;
      margin-top: 22rpx;
      margin-left: 64rpx;
      margin-bottom: 46rpx;
    }

  }

  .bottomSubmit{
    position: fixed;
    bottom: 0;
    height: 128rpx;
    width: 100%;

  }

}
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
