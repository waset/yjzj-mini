<script setup lang="ts">
const { getRebatelist, getWithdrawlist } = usePopularizeStore()
const { rebatelist, withdrawlist, rebateLastpage, withdrawLastpage } = storeToRefs(usePopularizeStore())
const rebatePage = ref(1)
const withdrawPage = ref(1)

onShow(async () => {
  await getRebatelist({ page: 1, pageSize: 20 })
  await getWithdrawlist({ page: 1, pageSize: 20 })
})
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

function forString(str: string) {
  if (str && str.length > 6) {
    const firstTwo = str.substring(0, 2)
    const lastFour = str.substring(str.length - 4)
    return `${firstTwo}****${lastFour}`
  }
}

const withdrawStatus = ['处理中', '打款成功', '打款退回', '处理中', '处理中', '打款成功']

// 返利状态
function rebateStatus(status: number) {
  return status === 1 ? '待返利' : '已返利'
}
// 返利记录触底加载
async function rebatePush() {
  if (rebatePage.value < rebateLastpage.value) {
    rebatePage.value++
    await getRebatelist({ page: rebatePage.value, pageSize: 20 })
  }
  else {
    uni.showToast({
      title: '没有更多记录了',
      icon: 'none',
    })
  }
}

// 提现记录触底加载
async function withdrawPush() {
  if (withdrawPage.value < withdrawLastpage.value) {
    withdrawPage.value++
    await getWithdrawlist({ page: withdrawPage.value, pageSize: 20 })
  }
  else {
    uni.showToast({
      title: '没有更多记录了',
      icon: 'none',
    })
  }
}

// 列表触底
function reachBottom() {
  !tabIndex.value ? rebatePush() : withdrawPush()
}
</script>

<template>
  <div class="list">
    <!-- 返利记录 & 提现记录 -->
    <div class="record_list">
      <template v-for="(item, index) in tabListArray" :key="index">
        <div :class="tabIndex === index ? 'withdraw_tab_rebate' : 'tab_text'" @click="tabIndex = index">
          {{ item }}
          <div v-if="tabIndex === index" class="i-svg-vector-tab tab_svg" />
        </div>
      </template>
      <!-- 表单 -->
      <div class="scroll_view">
        <div class="title_tab">
          <template v-for="(item, index) in tabIndex ? tabTitleX.tabTwo : tabTitleX.tabOne" :key="index">
            <div class="title_text">
              {{ item }}
            </div>
          </template>
        </div>
        <div>
          <template v-if="!tabIndex ? rebatelist && rebatelist.length > 0 : withdrawlist && withdrawlist.length > 0">
            <scroll-view class="list_scroll" :scroll-y="true" @scrolltolower="reachBottom">
              <template v-for="(item, index) in !tabIndex ? rebatelist : withdrawlist" :key="index">
                <div class="title_list">
                  <div class="title_text">
                    {{ !tabIndex ? forString(item.orderNO) : forString(item.no) }}
                  </div>
                  <div class="title_text">
                    {{ !tabIndex ? item.userInfo.nickname : '' }}
                  </div>
                  <div class="title_text">
                    {{ !tabIndex ? item.rebateAmount : item.withdrawAmount }}
                  </div>
                  <div class="title_text">
                    {{ !tabIndex ? rebateStatus(item.status) : item.balanceAmountAfter }}
                  </div>
                  <div class="title_text">
                    {{ !tabIndex ? item.createdAt : item.auditedAt }}
                  </div>
                  <div class="title_text">
                    {{ !tabIndex ? item.updatedAt : withdrawStatus[item.status - 1] }}
                  </div>
                </div>
              </template>
            </scroll-view>
          </template>
          <template v-else>
            <common-empty text="暂无记录" />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.record_list {
  position: relative;
  z-index: 0;
  overflow: hidden;
  background-color: rgba($color: #000000, $alpha: .6);

  width: calc(100% - 64rpx);
  height: 720rpx;

  margin: 0 auto;
  margin-top: 32rpx;
  border-radius: 32rpx;

  &::before {
    position: absolute;
    z-index: -1;
    overflow: hidden;

    display: block;
    content: "";
    border-radius: 32rpx;
    background: rgba(0, 0, 0, 0.6);
    border: 2rpx solid transparent;
    background: linear-gradient(113.84deg,
        rgba(255, 255, 255, 0.8) -6.55%,
        rgba(255, 255, 255, 0.08) 46.47%,
        rgba(255, 255, 255, 0.8) 92.28%) border-box;
    mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    mask-composite: exclude;
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
        linear-gradient(0deg,
          rgba(132, 132, 132, 0.2),
          rgba(132, 132, 132, 0.2));

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
        text-align: center;
        font-size: 28rpx;
        font-weight: 400;
        text-align: center;
        margin-top: 36rpx;
        display: flex;
        align-items: center;

        .title_text {
          width: 240rpx;
          font-size: 28rpx;
          font-weight: 400;
          text-align: center;
        }
      }
    }
  }
}
</style>
