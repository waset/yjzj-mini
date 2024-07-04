<script setup lang="ts">
const { getUserInfo } = useUserStore()
const { user } = storeToRefs(useUserStore())

onShow(async () => {
  await getUserInfo()
})

const showWInvite = ref(false) // 邀请人填写弹出
// 邀请详情
const messageArray = ref([
  {
    Isvg: 'i-svg-vector',
    title: '邀请码',
    value: user.value.inviteCode,
    click: () => {
      copyText(user.value.inviteCode)
    },
  },
  {
    Isvg: 'i-svg-edit-lv',
    title: '我的邀请人',
    value: user.value?.inviteUserInfo.nickname,
    avatar: '',
    click: () => {
      showWInvite.value = !showWInvite.value
    },
  },
])
// 邀请确认
function InviteEvent() {
  showWInvite.value = false
  uni.showToast({
    title: '邀请人填写成功',
    icon: 'success',
    duration: 2000,
  })
}
</script>

<template>
  <div class="popularize">
    <navbar-back text="邀请推广" />
    <!-- 推广邀请 -->
    <div class="popu_value">
      <image
        class="popu_svg_bg" src="@/assets/background/popularize-bg.svg" :style="{ width: '100%' }"
        mode="widthFix"
      />
      <div class="info">
        <div class="popu_title">
          邀请推广
        </div>
        <!-- 立即提现 & 提现弹窗 -->
        <popularize-withdraw />
        <div class="explain_view">
          <div class="explain_ad">
            *特别说明：由于相关业务数据复杂，可能存在误差及计算延迟情况，若有疑问请联系客服。给您带来不便，敬请谅解。
          </div>
        </div>
        <template v-for="(item, index) in messageArray" :key="index">
          <div class="message_line">
            <div class="message_left message_text">
              {{ item.title }}
            </div>
            <div class="message_right message_text">
              <image v-if="index === 2" class="message_right_avatar" :src="item.avatar" />
              <div class="text_width">
                {{ item.value }}
              </div>
              <div :class="item.Isvg" class="copy_redact_svg" @click="item.click" />
            </div>
          </div>
        </template>
      </div>
    </div>
    <!-- 返利记录 & 提现记录 -->
    <popularize-record-list />
    <!-- 邀请人弹窗 -->
    <common-popup v-model:show="showWInvite" name="我的邀请人">
      <input class="query_input" type="text" placeholder="请输入邀请人的邀请码">
      <div class="query_button">
        查询
      </div>
      <input class="query_input_current" type="text" placeholder="当前邀请码所属的邀请人">
      <div class="button_view_fixed">
        <div class="button_view">
          <div class="button_cancel" @click="showWInvite = false">
            取消
          </div>
          <div class="button_affirm" @click="InviteEvent">
            确认
          </div>
        </div>
      </div>
    </common-popup>
  </div>
</template>

<style lang="scss" scoped>
  .popularize {
    width: 100%;

    .popu_value {
      position: relative;
      width: calc(100% - 64rpx);
      height: 960rpx;
      margin: 0 auto;
      margin-top: 34rpx;
      overflow: hidden;

      .popu_svg_bg {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 0;
      }

      .info {
        position: relative;
        z-index: 1;

        .popu_title {
          font-size: 32rpx;
          font-weight: bold;
          line-height: 41.6rpx;
          text-align: left;

          position: absolute;
          top: -80rpx;
          left: 40rpx;
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
          background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));

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
              width: 280rpx;
              float: left;
              text-overflow: ellipsis;
              overflow: hidden;
              white-space: nowrap;
            }

            .copy_redact_svg {
              width: 30rpx;
              height: 30rpx;
              float: right;
              margin-top: 18.66rpx;
            }
          }
        }
      }
    }
  }

  .query_input {
    width: calc(100% - 200rpx);
    height: 72rpx;
    display: inline-block;
    border-radius: 8rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    font-size: 28rpx;
    margin-top: 32rpx;
    min-height: auto !important;
    background: rgba(132, 132, 132, 0.2);
  }

  .query_button {
    float: right;
    height: 72rpx;
    line-height: 72rpx;
    padding: 0rpx 40rpx 0rpx 40rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    text-align: center;
    border-radius: 8rpx;
    margin-top: 32rpx;
    color: rgba(167, 245, 34, 1);
    background: rgba(132, 132, 132, 0.2);
  }

  .query_button:active {
    background-color: #696969;
  }

  .query_input_current {
    width: 100%;
    box-sizing: border-box;
    height: 72rpx;
    display: inline-block;
    border-radius: 8rpx;
    padding: 0rpx 24rpx 0rpx 24rpx;
    font-size: 28rpx;
    min-height: auto !important;
    background: rgba(132, 132, 132, 0.2);
    margin-top: 32rpx;
  }

  .button_view_fixed {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;

    .button_view {
      width: 100%;
      padding: 80rpx 107rpx 80rpx 107rpx;
      box-sizing: border-box;
      overflow: hidden;

      .button_cancel {
        width: 192rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 8rpx;
        text-align: center;
        float: left;
        font-size: 28rpx;
        color: rgba(51, 51, 51, 1);
        background: var(---light, rgba(255, 255, 255, 1));
      }

      .button_affirm {
        width: 192rpx;
        height: 80rpx;
        line-height: 80rpx;
        border-radius: 8rpx;
        text-align: center;
        float: right;
        font-size: 28rpx;
        color: rgba(51, 51, 51, 1);
        background: var(--, rgba(167, 245, 34, 1));
      }
    }
  }
</style>
