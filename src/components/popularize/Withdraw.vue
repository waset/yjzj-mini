<script setup lang="ts">
// 提现成功提示
const { user } = storeToRefs(useUserStore())
const { CashWithdraw } = usePopularizeStore()
const showWIthdraw = ref(false) // 提现表单弹出
const showModel = ref(false)// 账户信息
// 提现说明
const explainArray = [
  '1、每天最多可提现1次，每次提现至少10元，最多2000元。',
  '2、提现将于1~3个工作日到账，特殊情况可能顺延。',
  '3、提现将收取1%的微信支付手续费。',
]

// 提现金额
const amount = ref()

// 全部提现
function allWithdraw() {
  amount.value = user.value.balanceAmount
}

// 提现校验
async function withdrawEvent() {
  const isWithdraw = Number.parseFloat(amount.value)

  if (user.value.isSub === 2) {
    uni.showToast({ title: '请先关注“一剑装机”公众号', icon: 'none' })
    return
  }

  if (!user.value?.IDCard) {
    uni.showToast({ title: '请先实名认证', icon: 'none' })
    return
  }

  if (!amount.value || isWithdraw <= 0) {
    return uni.showToast({ title: '请正确输入提现金额', icon: 'none' })
  }

  if (isWithdraw > 2000) {
    uni.showToast({ title: '单笔提现金额不能超过2000元', icon: 'none' })
    return
  }

  if (isWithdraw < 10) {
    uni.showToast({ title: '单笔提现金额不能少于10元', icon: 'none' })
  }
  await serveWithdraw()
}

// 发起提现
async function serveWithdraw() {
  const res = await CashWithdraw({ applyAmount: amount.value })
  if (res.code === 200) {
    showWIthdraw.value = false
    showModel.value = true
  }
  else {
    uni.showToast({ title: res.msg, icon: 'none' })
  }
}

// 输入金额触发 计算可提现金额
const realAmount = ref()
const upinp = useDebounceFn((e) => {
  realAmount.value = e
}, 200)
function InpAmount(e: any) {
  upinp(e.target.value)
}
</script>

<template>
  <div>
    <!-- 提现成功提醒 -->
    <common-model v-model:show="showModel" msg="零钱提现已发起，请耐心等待。" icon="i-svg-success" @ok="showModel = false" />
    <!-- 提现弹窗 -->
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
          {{ user.balanceAmount }}
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
      <div class="ensure_style" @click="user.realName || Jump('/pages/me/info', { type: 'authentication' })">
        {{ user.realName ? '已认证' : '未认证' }}
        <template v-if="!user.realName">
          <div class="i-icons-right money_way_svg" />
        </template>
      </div>
    </div>
    <div class="popup_text">
      提现金额
    </div>
    <div class="input_view">
      <input v-model="amount" type="digit" class="sum_input" placeholder="输入您想提现的金额" @input="InpAmount">
      <div class="money_icon">
        ￥
      </div>
      <div class="sum_all" @click="allWithdraw">
        全部提现
      </div>
    </div>
    <!-- 渐变底线 -->
    <div class="gradient-line" />
    <template v-if="realAmount">
      <div class="reality_sum">
        实际到账金额 {{ realAmount }}
      </div>
    </template>
    <div class="withdraw_explain" style="margin-top: 60rpx;">
      <div class="icon i-icons-info" style="margin-right: 6.66rpx;" /> 提现说明
    </div>
    <div v-for="(item, index) in explainArray" :key="index" class="withdraw_explain">
      {{ item }}
    </div>
    <div class="button_style" @click="withdrawEvent">
      立即提现
    </div>
  </div>
  <div class="safe fixed left-0 right-0 bottom-0 bg-[#272727]" />
</template>

<style lang="scss" scoped>
.safe {
  height: calc(32rpx + env(safe-area-inset-bottom));
}

.money_view_popup {
  height: 236rpx;
  margin: 0 auto;
  border-radius: 36rpx;
  overflow: hidden;
  position: relative;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
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
