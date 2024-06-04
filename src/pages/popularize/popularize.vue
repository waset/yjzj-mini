<script lang="ts" setup>
// const { userDesc } = storeToRefs(useUserStore())

const tabIndex = ref(0)

const showWithdraw = ref(false)
// 账户信息
const moneyArray = [
  {
    title: '返利比例',
    value: '9',
  },
  {
    title: '返利方式',
    value: '等级',
  },
  {
    title: '账号余额',
    value: '01.00',
  },
]
// 邀请详情
const messageArray = [
  {
    title: '邀请码',
    value: '081200',
  },
  {
    title: '邀请链接',
    value: 'http://baidu.com',
  },
  {
    title: '我的邀请人',
    value: '诺顿坎贝尔',
    avatar: 'https://img2.baidu.com/it/u=4194115798,4169726391&fm=253&app=120&size=w931&n=0&f=JPEG&fmt=auto?sec=1717520400&t=07f44f7aa557afc8a3268b79488c64da',
  },
]
// 提现说明
const explainArray = ['1、每天最多可提现1次，每次提现至少10元，最多2000元。','2、提现将于1~3个工作日到账，特殊情况可能顺延。','3、提现将收取1%的微信支付手续费。']

// 提现弹框
function eventWithdraw() {
  if (moneyArray[2].value !== '00.00') {
    showWithdraw.value = !showWithdraw.value
  }
}
</script>

<template>
  <div class="popularize">
    <navbar-back text="邀请推广" />
    <!-- 推广邀请 -->
    <div class="popu_value">
      <image class="popu_svg_bg" src="@/assets/svg/popularize_bg.svg" :style="{ width: '100%' }" mode="widthFix" />
      <div class="popu_title">
        邀请推广
      </div>
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
          <image
            class="popu_svg_medal float_style" src="@/assets/svg/medal.svg"
            :style="{ width: '38.78rpx', height: '31.46rpx' }" mode="widthFix"
          />
          <div class="integral_right">
            积分：88809
          </div>
        </div>
        <div class="money_view">
          <div class="wrap">
            <div v-for="(item, index) in moneyArray" :key="index" class="money_details">
              <div class="money_title">
                {{ item.title }}
              </div>
              <div class="subhead">
                {{ index !== 2 ? item.value : `￥${item.value}` }}
              </div>
            </div>
          </div>
          <div :class="moneyArray[2].value !== '00.00' ? 'subheads ' : 'withdraw '" @click="eventWithdraw">
            立即提现
          </div>
        </div>
      </div>
      <div class="explain_view">
        <div class="explain_ad">
          *特别说明：由于相关业务数据复杂，可能存在误差及计算延迟情况，若有疑问请联系客服。给您带来不便，敬请谅解。
        </div>
      </div>
      <div v-for="(item, index) in messageArray" :key="index" class="message_line">
        <div class="message_left message_text">
          {{ item.title }}
        </div>
        <div class="message_right message_text">
          <image v-if="index === 2" class="message_right_avatar" :src="item.avatar" mode="" />
          <div class="text_width">
            {{ item.value }}
          </div>
          <image
            v-if="index !== 2" class="copy_redact_svg" src="@/assets/svg/Vector.svg"
            :style="{ width: '22.66rpx', height: '26.66rpx' }" mode="widthFix"
          />
          <image
            v-if="index === 2" class="copy_redact_svg" src="@/assets/svg/Edit.svg"
            :style="{ width: '22.66rpx', height: '26.66rpx' }" mode="widthFix"
          />
        </div>
      </div>
    </div>
    <!-- 返利记录 & 提现记录 -->
    <div class="record_list">
      <div :class="!tabIndex ? 'withdraw_tab_rebate' : 'tab_text'" @click="tabIndex = 0">
        返利记录
        <image v-if="!tabIndex" class="tab_svg" src="@/assets/svg/Vector_tab.svg" :style="{ width: '120%', height: '16rpx' }" mode="widthFix" />
      </div>
      <div :class="tabIndex ? 'withdraw_tab_rebate' : 'tab_text'" @click="tabIndex = 1">
        提现记录
        <image v-if="tabIndex" class="tab_svg" src="@/assets/svg/Vector_tab.svg" :style="{ width: '120%', height: '16rpx' }" mode="widthFix" />
      </div>
      <div class="title_tab">
        <div class="title_text">
          关联订单
        </div>
        <div class="title_text">
          用户昵称
        </div>
        <div class="title_text">
          返利金额
        </div>
      </div>
      <div class="list_scroll">
        <div v-for="(item, index) in 30" :key="index" class="title_list">
          <div class="title_text">
            DD****1234
          </div>
          <div class="title_text">
            PinkRFriend
          </div>
          <div class="title_text">
            871.00
          </div>
        </div>
      </div>
    </div>
    <!-- 提现弹窗 -->
    <common-popup v-model:show="showWithdraw" height="80vh" name="申请提现">
      <div class='money_view_popup'>
        <image class="Yjzj_svg" src="@/assets/background/baojian.svg" :style="{ width:'230rpx', height:'230rpx' }" />
        <div class="money_text">可提现金额（元）</div>
        <div class="money">
          <div class="money_one">￥</div>
          <div class="money_two">100.00</div>
        </div>
        <div class="money_way">
          到账方式
          <image class="money_way_svg" src="@/assets/background/weixin_icon.svg" :style="{width:'32rpx', height:'32rpx'}" />
          微信零钱
        </div>
      </div>
      <div class="ensure_view">
        <div class="ensure_style">
          <image class="money_way_svg" src="@/assets/icons/authentication.svg" :style="{width:'32rpx', height:'32rpx'}" />
          实名认证
        </div>
        <div class="ensure_style">
          已认证
          <image src="@/assets/icons/right.svg" :style="{width:'32rpx', height:'32rpx'}" />
        </div>
      </div>
      <div class="popup_text">提现金额</div>
      <div class="input_view">
        <input type="number" class="sum_input" placeholder="输入您想提现的金额" />
        <div class="money_icon">￥</div>
        <div class="sum_all">全部提现</div>
      </div>
      <!-- 渐变底线 -->
      <div class="gradient-line"></div>
      <div class="reality_sum">实际到账金额  66.00</div>
      <div class="withdraw_explain" style="margin-top: 60rpx;">
        <div class="icon i-icons-info" style="margin-right: 6.66rpx;"/> 提现说明
      </div>
      <div class="withdraw_explain" v-for="(item,index) in explainArray" :key="index">
        {{item}}
      </div>
      <div class="button_style">立即提现</div>
    </common-popup>
  </div>
</template>

<style lang="scss" scoped>
  .popularize {
    width: 100%;

    .popu_value {
      width: calc(100% - 64rpx);
      height: 960rpx;
      position: relative;
      margin: 0 auto;
      margin-top: 34rpx;
      overflow: hidden;

      .popu_svg_bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
      }

      .popu_title {
        font-size: 32rpx;
        font-weight: bold;
        line-height: 41.6rpx;
        text-align: left;

        position: absolute;
        top: 38rpx;
        left: 48rpx;
      }

      // 推广信息
      .popu_user {
        width: calc(100% - 64rpx);
        height: 300rpx;
        margin: 0 auto;
        margin-top: 119rpx;
        border-radius: 32rpx;
        overflow: hidden;
        padding: 0px 0px 32rpx 0px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
          linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));

        .user_value_view {
          height: 80rpx;
          padding: 0rpx 32rpx;
          box-sizing: border-box;
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
            margin-top: 24rpx;
            margin-left: 16.02rpx;
          }

          .integral_right {
            float: right;
            line-height: 80rpx;
            font-size: 24rpx;
            font-weight: 500;
            text-align: center;
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
                color: #A7F522;

              }
            }
          }

          .subheads {
            font-family: PingFang SC;
            font-size: 28rpx;
            text-align: center;
            color: #A7F522;
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
            color: #8D8D8D;
          }
        }
      }

      // 解释说明
      .explain_view {
        width: calc(100% - 64rpx);
        height: 152rpx;
        margin: 0 auto;
        margin-top: 32rpx;
        position: relative;
        border-radius: 8rpx;
        background: rgba(62, 62, 62, 0.2);
        margin-bottom: 32rpx;

        .explain_ad {
          width: 100%;
          height: 152rpx;
          padding: 16rpx 60rpx;
          border-radius: 8rpx;
          box-sizing: border-box;
          position: absolute;
          top: 10rpx;
          left: 10rpx;
          color: rgba(190, 190, 190, 1);
          background: rgba(62, 62, 62, 0.3);

          font-family: PingFang SC;
          font-size: 24rpx;
          font-weight: 400;
          line-height: 40rpx;
          text-align: center;

        }
      }

      .message_line {
        width: calc(100% - 64rpx);
        height: 64rpx;
        margin: 0 auto;
        overflow: hidden;
        margin-bottom: 16rpx;
        padding: 0rpx 32rpx 0rpx 32rpx;
        box-sizing: border-box;
        border-radius: 8rpx 0px 0px 0px;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));

        .message_left {
          width: calc(100% - 366rpx);
          float: left;
          line-height: 64rpx;
        }

        .message_text {

          font-size: 28rpx;
          font-weight: 400;
          line-height: 64rpx;
        }

        .message_right {
          width: 366rpx;
          float: right;
          line-height: 64rpx;

          .message_right_avatar {
            width: 40rpx;
            height: 40rpx;
            float: left;
            border-radius: 50%;
            margin-top: 14rpx;
            margin-right: 10rpx;
          }

          .text_width {
            width: 290rpx;
            float: left;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
          }

          .copy_redact_svg {
            float: right;
            margin-top: 18.66rpx;
          }
        }
      }
    }

    .record_list {
      width: calc(100% - 64rpx);
      height: 720rpx;
      margin: 0 auto;
      margin-top: 32rpx;
      border-radius: 32rpx;
      position: relative;
      overflow: hidden;
      &::before {
        overflow: hidden;
        display: block;
        content: '';
        border-radius: 32rpx;
        background: rgba(0, 0, 0, 0.6);
        border: 2rpx solid transparent;
        background: linear-gradient(113.84deg, rgba(255, 255, 255, 0.8) -6.55%, rgba(255, 255, 255, 0.08) 46.47%, rgba(255, 255, 255, 0.8) 92.28%) border-box;
        mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
        mask-composite: exclude;
        position: absolute;
        z-index: -1;
        width: 100%;
        height: 100%;
      }
      .tab_text{
        display: inline-block;
        font-family: PingFang SC;
        font-size: 28rpx;
        font-weight: 400;
        text-align: center;
        margin-left: 40rpx;
        margin-top: 32rpx;
      }
      .withdraw_tab_rebate{
        display: inline-block;
        margin-left: 40rpx;
        margin-top: 32rpx;
        font-family: PingFang SC;
        font-size: 32rpx;
        font-weight: 600;
        position: relative;
        padding-bottom: 5rpx;

        .tab_svg{
          position: absolute;
          bottom: 0;
          left: 50%;
          z-index: -1;
          transform: translateX(-50%);
        }
      }
      .title_tab{
        width: calc(100% - 64rpx);
        height: 80rpx;
        margin: 0 auto;
        margin-top: 48rpx;
        border-radius: 8rpx;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));
        @apply flex-around;
        .title_text{
          font-size: 28rpx;
          font-weight: 400;
        }
      }
      .list_scroll{
        width: calc(100% - 64rpx);
        margin: 0 auto;
        height: 450rpx;
        overflow-y: scroll;

        .title_list{
          @apply flex-around;
          font-size: 28rpx;
          font-weight: 400;
          text-align: center;
          margin-top: 36rpx;
        }
      }

    }
  }
  .money_view_popup{
    height: 236rpx;
    margin: 0 auto;
    border-radius: 36rpx;
    overflow: hidden;
    position: relative;
    background: linear-gradient(277.69deg, rgba(21, 21, 21, 0.9) 39.19%, rgba(74, 74, 74, 0.9) 94.91%);
    .Yjzj_svg{
      position: absolute;
      right: 0rpx;
      bottom: -25rpx;
    }
    .money_text{
      font-family: PingFang SC;
      font-size: 28rpx;
      font-weight: 400;
      line-height: 40rpx;
      text-align: left;
      padding: 32rpx 0rpx 0rpx 32rpx;
      box-sizing: border-box;
    }
    .money{
      font-size: 28rpx;
      line-height: 40rpx;
      text-align: left;
      color: rgba(167, 245, 34, 1);
      padding: 24rpx 0rpx 0rpx 32rpx;
      box-sizing: border-box;

      .money_one{
        font-size: 28rpx;
        display: inline-block;
      }
      .money_two{
        display: inline-block;
        font-size: 34rpx;
      }
    }

    .money_way{
      text-align: right;
      font-size: 28rpx;
      font-weight: 400;
      padding-right: 32rpx;
      position: absolute;
      margin-top: 32rpx;
      right: 0;
      z-index: 2;
      .money_way_svg{
        display: inline-block;
        z-index: 2;
        margin-left: 25rpx;
        transform:translate(6rpx,6rpx);
      }
    }
  }

  .ensure_view{
    @apply flex-between;
    width: 100%;
    padding: 24rpx 32rpx ;
    border-radius: 8rpx;
    background: linear-gradient(100.04deg, #000000 0.82%, rgba(0, 0, 0, 0.5) 49.3%, #000000 91.18%);
    margin-top: 48rpx;
    font-size: 28rpx !important;

    .ensure_style>image{
      transform: translateY(6rpx);
    }
  }
  .popup_text{
    font-size: 28rpx;
    margin-top: 48rpx;

  }
  .input_view{
    width: 100%;
    margin-top: 16rpx;
    position: relative;
    padding: 20rpx 200rpx 20rpx 50rpx;
    box-sizing: border-box;


    .sum_input{
     width: 100%;
     height: 40rpx;
    }

    .money_icon{
      position: absolute;
      left: 0;
      top: 50%;
      font-size: 40rpx;
      transform: translateY(-50%);
    }
    .sum_all{
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      font-size: 28rpx;
      color: #A7F522;
      @apply underline underline-offset-3;
    }
  }

  .gradient-line{
    border-bottom: 3rpx solid transparent;
    background: linear-gradient(98.8deg, rgba(190, 190, 190, 0.1) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0.1) 92.04%) border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
  }
  .reality_sum{
    //styleName: 正文常规;
    margin-top: 8rpx;
    font-size: 28rpx;
    color: rgba(255, 125, 0, 1);
  }
  .withdraw_explain{
    width: calc(100% - 42rpx);
    margin: 0 auto;
    font-size: 24rpx;
    line-height: 40rpx;

    margin-bottom: 24rpx;
  }
  .button_style{
    width: 440rpx;
    height: 80rpx;
    padding: 20rpx 40rpx 20rpx 40rpx;
    border-radius: 4rpx;
    color:#000;
    margin: 0 auto;
    margin-top: 68rpx;
    text-align: center;
    background: rgba(167, 245, 34, 1);
  }
</style>
