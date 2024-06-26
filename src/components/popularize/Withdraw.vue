<script setup lang="ts">
const showWIthdraw = ref(false) // 提现表单弹出
const showModel = ref(false) // 提现成功提示

// 账户信息
const moneyObject = ref({
  proportion: {
    title: '返利比例',
    value: '9',
  },
  way: {
    title: '返利方式',
    value: '等级',
  },
  balance: {
    title: '账号余额',
    value: '01.00',
  },
})
// 提现说明
const explainArray = [
  '1、每天最多可提现1次，每次提现至少10元，最多2000元。',
  '2、提现将于1~3个工作日到账，特殊情况可能顺延。',
  '3、提现将收取1%的微信支付手续费。',
]
// 提现弹框
function eventWithdraw() {
  if (moneyObject.value.balance.value !== '00.00') {
    showWIthdraw.value = !showWIthdraw.value
  }
}
// 提现确认
function withdrawEvent() {
  showWIthdraw.value = false
  showModel.value = true
}
</script>

<template>
  <div class="popu_user">
    <div class="user_value_view">
      <image
        class="avatar_image_money float_style"
        src="https://img2.baidu.com/it/u=4194115798,4169726391&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1717520400&t=07f44f7aa557afc8a3268b79488c64da"
        mode=""
      />
      <div class="user_name float_style">
        汉库克
      </div>
      <div class="user_grade float_style">
        当前等级lv2
      </div>
      <div class="i-svg-medal-v2 popu_svg_medal" />
      <div class="integral_right">
        积分：88809
      </div>
    </div>
    <div class="money_view">
      <div class="wrap">
        <div v-for="(item, key, index) in moneyObject" :key="key" class="money_details">
          <div class="money_title">
            {{ item.title }}
          </div>
          <div class="subhead">
            {{ index === 2 ? `￥${item.value}` : `${item.value}` }}
          </div>
        </div>
      </div>
      <div :class="moneyObject.balance.value === '00.00' ? 'withdraw' : ' subheads'" @click="eventWithdraw">
        立即提现
      </div>
    </div>
  </div>
  <!-- 提现成功提醒 -->
  <common-model v-model:show="showModel" msg="零钱提现已发起，请耐心等待。" icon="i-svg-success" @ok="showModel = false" />
  <!-- 提现弹窗 -->
  <common-popup v-model:show="showWIthdraw" name="申请提现">
    <div class="money_view_popup">
      <div class="icon i-svg-product-bg " />
      <div class="money_text">
        可提现金额（元）
      </div>
      <div class="money">
        <div class="money_one">
          ￥
        </div>
        <div class="money_two">
          100.00
        </div>
      </div>
      <div class="money_way">
        到账方式
        <div class="i-svg-weixin-icon money_way_svg" />
        微信零钱
      </div>
    </div>
    <div class="ensure_view">
      <div class="ensure_style">
        <div class="i-icons-authentication money_way_svg" />
        实名认证
      </div>
      <div class="ensure_style">
        已认证
        <div class="i-icons-right money_way_svg" />
      </div>
    </div>
    <div class="popup_text">
      提现金额
    </div>
    <div class="input_view">
      <input type="number" class="sum_input" placeholder="输入您想提现的金额">
      <div class="money_icon">
        ￥
      </div>
      <div class="sum_all">
        全部提现
      </div>
    </div>
    <!-- 渐变底线 -->
    <div class="gradient-line" />
    <div class="reality_sum">
      实际到账金额 66.00
    </div>
    <div class="withdraw_explain" style="margin-top: 60rpx;">
      <div class="icon i-icons-info" style="margin-right: 6.66rpx;" /> 提现说明
    </div>
    <div v-for="(item, index) in explainArray" :key="index" class="withdraw_explain">
      {{ item }}
    </div>
    <div class="button_style" @click="withdrawEvent">
      立即提现
    </div>
  </common-popup>
</template>

<style lang="scss" scoped>
// 推广信息
  .popu_user {
    width: calc(100% - 64rpx);
    height: 300rpx;
    margin: 0 auto;
    margin-top: 119rpx;
    border-radius: 32rpx;
    overflow: hidden;
    padding: 0px 0px 32rpx 0px;
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));

    .user_value_view {
      height: 80rpx;
      padding: 0rpx 32rpx;
      box-sizing: border-box;
      line-height: 80rpx;
      overflow: hidden;
      background: linear-gradient(90deg, rgba(109, 109, 109, 0) 1.52%, rgba(202, 202, 202, 0.5) 53.11%, rgba(109, 109, 109, 0) 98.86%);

      .avatar_image_money {
        width: 48rpx;
        height: 48rpx;
        border-radius: 50%;
        margin-top: 16rpx;
      }

      .float_style {
        float: left;
      }

      .user_name {
        margin-left: 8rpx;
        font-size: 30rpx;
        font-weight: 600;
        line-height: 80rpx;
      }

      .user_grade {
        margin-left: 8rpx;
        font-size: 25rpx;
        line-height: 80rpx;
      }

      .popu_svg_medal {
        width: 38.78rpx;
        height: 31.46rpx;
        margin-left: 16rpx;
      }

      .integral_right {
        float: right;
        line-height: 80rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: rgba(255, 223, 109, 1);
      }
    }

    .money_view {
      height: 220rpx;
      overflow: hidden;

      .wrap {
        margin-top: 32rpx;
        @apply flex-around;

        .money_details {
          text-align: center;

          .money_title {
            font-family: PingFang SC;
            font-size: 24rpx;
            font-weight: 400;
            line-height: 40rpx;
            text-align: center;
            margin-bottom: 8rpx;
          }

          .subhead {
            font-family: PingFang SC;
            font-size: 32rpx;
            font-weight: 600;
            line-height: 40rpx;
            text-align: center;
            color: #a7f522;
          }
        }
      }

      .subheads {
        font-family: PingFang SC;
        font-size: 28rpx;
        text-align: center;
        color: #a7f522;
        text-align: right;
        margin-top: 24rpx;
        padding-right: 60rpx;
        box-sizing: border-box;
        @apply underline underline-offset-3;
      }

      .withdraw {
        @apply underline underline-offset-3;
        font-size: 28rpx;
        text-align: right;
        margin-top: 24rpx;
        padding-right: 60rpx;
        box-sizing: border-box;
        color: #8d8d8d;
      }
    }
  }

  .money_view_popup {
    height: 236rpx;
    margin: 0 auto;
    border-radius: 36rpx;
    overflow: hidden;
    position: relative;
    background: linear-gradient(277.69deg, rgba(21, 21, 21, 0.9) 39.19%, rgba(74, 74, 74, 0.9) 94.91%);

    .icon {
      width: 240rpx;
      height: 240rpx;
      position: absolute;
      right: 0rpx;
      bottom: -25rpx;
      opacity: 0.5;
    }

    .money_text {
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      text-align: left;
      padding: 32rpx 0rpx 0rpx 32rpx;
      box-sizing: border-box;
    }

    .money {
      font-size: 28rpx;
      line-height: 40rpx;
      text-align: left;
      color: rgba(167, 245, 34, 1);
      padding: 24rpx 0rpx 0rpx 32rpx;
      box-sizing: border-box;

      .money_one {
        font-size: 28rpx;
        display: inline-block;
      }

      .money_two {
        display: inline-block;
        font-size: 34rpx;
      }
    }

    .money_way {
      text-align: right;
      font-size: 28rpx;
      font-weight: 400;
      padding-right: 32rpx;
      position: absolute;
      margin-top: 32rpx;
      right: 0;
      z-index: 2;

      .money_way_svg {
        width: 32rpx;
        height: 32rpx;
        display: inline-block;
        z-index: 2;
        margin-left: 25rpx;
        transform: translate(6rpx, -2rpx);
      }
    }
  }

  .ensure_view {
    @apply flex-between;
    width: 100%;
    padding: 24rpx 32rpx;
    border-radius: 8rpx;
    background: linear-gradient(100.04deg, #000000 0.82%, rgba(0, 0, 0, 0.5) 49.3%, #000000 91.18%);
    margin-top: 48rpx;
    font-size: 28rpx !important;

    .ensure_style {
      .money_way_svg {
        width: 32rpx;
        height: 32rpx;
        display: inline-block;
        transform: translate(6rpx, -2rpx);
      }
    }
  }

  .popup_text {
    font-size: 28rpx;
    margin-top: 48rpx;
  }

  .input_view {
    width: 100%;
    margin-top: 16rpx;
    position: relative;
    padding: 20rpx 200rpx 20rpx 50rpx;
    box-sizing: border-box;

    .sum_input {
      width: 100%;
      height: 40rpx;
    }

    .money_icon {
      position: absolute;
      left: 0;
      top: 50%;
      font-size: 40rpx;
      transform: translateY(-50%);
    }

    .sum_all {
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 28rpx;
      color: #a7f522;
      @apply underline underline-offset-3;
    }
  }

  .gradient-line {
    border-bottom: 3rpx solid transparent;
    background: linear-gradient(98.8deg, rgba(190, 190, 190, 0.1) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0.1) 92.04%) border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }

  .reality_sum {
    margin-top: 8rpx;
    font-size: 28rpx;
    color: rgba(255, 125, 0, 1);
  }

  .withdraw_explain {
    width: calc(100% - 42rpx);
    margin: 0 auto;
    font-size: 24rpx;
    line-height: 40rpx;
    margin-bottom: 24rpx;
  }

  .button_style {
    width: 440rpx;
    height: 80rpx;
    padding: 20rpx 40rpx 20rpx 40rpx;
    border-radius: 4rpx;
    color: #000;
    margin: 0 auto;
    margin-top: 68rpx;
    text-align: center;
    background: rgba(167, 245, 34, 1);
  }
</style>
