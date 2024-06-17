<script setup lang="ts">
const tabIndex = ref(0) // tab下标弹出
const tabListArray = ['返利记录', '提现记录'] // 记录tab
const tabTitleX = {
  tabOne: [
    '关联订单',
    '用户昵称',
    '返利金额',
    '当前状态',
    '邀请时间',
    '返利时间',
  ],
  tabTwo: [
    '提现编号',
    '交易类型',
    '交易金额',
    '交易后余额',
    '提现时间',
    '打款状态',
  ],
}
// 返利记录数据
// const rebateData = []
</script>

<template>
  <div class="list">
    <!-- 返利记录 & 提现记录 -->
    <div class="record_list">
      <div
        v-for="(item, index) in tabListArray"
        :key="index"
        :class="tabIndex === index ? 'withdraw_tab_rebate' : 'tab_text'"
        @click="tabIndex = index"
      >
        {{ item }}
        <div
          v-if="tabIndex === index"
          class="i-svg-vector-tab tab_svg"
        />
      </div>
      <!-- 表单 -->
      <div class="scroll_view">
        <div class="title_tab">
          <div
            v-for="(item, index) in tabIndex ? tabTitleX.tabTwo : tabTitleX.tabOne"
            :key="index"
            class="title_text"
          >
            {{ item }}
          </div>
        </div>
        <div class="list_scroll">
          <div
            v-for="(item, index) in 30"
            :key="index"
            class="title_list"
          >
            <div class="title_text">
              DD****1234
            </div>
            <div class="title_text">
              PinkRFriend
            </div>
            <div class="title_text">
              871.00
            </div>
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
    </div>
  </div>
</template>

<style lang="scss" scoped>
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
    content: "";
    border-radius: 32rpx;
    background: rgba(0, 0, 0, 0.6);
    border: 2rpx solid transparent;
    background: linear-gradient(
        113.84deg,
        rgba(255, 255, 255, 0.8) -6.55%,
        rgba(255, 255, 255, 0.08) 46.47%,
        rgba(255, 255, 255, 0.8) 92.28%
      )
      border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
    position: absolute;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
  .tab_text {
    display: inline-block;
    font-family: PingFang SC;
    font-size: 28rpx;
    font-weight: 400;
    text-align: center;
    margin-left: 40rpx;
    margin-top: 32rpx;
  }
  .withdraw_tab_rebate {
    display: inline-block;
    margin-left: 40rpx;
    margin-top: 32rpx;
    font-family: PingFang SC;
    font-size: 32rpx;
    font-weight: 600;
    position: relative;
    padding-bottom: 5rpx;

    .tab_svg {
      width: 120%;
      height: 16rpx;
      position: absolute;
      bottom: 0;
      left: 50%;
      z-index: -1;
      transform: translateX(-50%);
    }
  }
  .scroll_view {
    width: calc(100% - 64rpx);
    margin: 0 auto;
    overflow-x: scroll;

    .title_tab {
      height: 80rpx;
      margin-top: 48rpx;
      border-radius: 8rpx;
      white-space: nowrap;
      float: left;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
        linear-gradient(
          0deg,
          rgba(132, 132, 132, 0.2),
          rgba(132, 132, 132, 0.2)
        );
      .title_text {
        display: inline-block;
        width: 240rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        font-weight: 400;
        text-align: center;
      }
    }
    .list_scroll {
      width: 1440rpx;
      height: 450rpx;
      overflow-y: scroll;

      .title_list {
        line-height: 80rpx;
        text-align: center;
        white-space: nowrap;
        font-size: 28rpx;
        font-weight: 400;
        text-align: center;
        margin-top: 36rpx;
        float: left;

        .title_text {
          width: 240rpx;
          line-height: 80rpx;
          font-size: 28rpx;
          display: inline-block;
          font-weight: 400;
          text-align: center;
        }
      }
    }
  }
}
</style>
