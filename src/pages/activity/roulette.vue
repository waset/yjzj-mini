<script setup lang="ts">
const tablist = ref<string[]>(['i-svg-fastbuytxt', 'i-svg-prizetxt', 'i-svg-tasktxt', 'i-svg-ruletxt'])
// tabs 的位置
const tabs = ref<number>(0)

// 滚动条位置
const totop = ref<number>(0)

const setTab = (index: number) => {
  tabs.value = index
  totop.value = index * 400
}
</script>

<template>
  <div class="roulette">
    <image class="bg" :src="StaticUrl('/images/s_prizebg.png')" mode="scaleToFill" />
    <div class="banner">
      banner
    </div>

    <div class="tabs">
      <template v-for="(item, index) in tablist" :key="index">
        <div class="tabs_item" @click="setTab(index)">
          <template v-if="tabs === index">
            <div class="icon i-svg-activestatus" />
          </template>
          <div class="text" :class="[item]" />
        </div>
      </template>
    </div>
    <div class="list">
      <scroll-view scroll-y class="scroll" :scroll-top="totop" scroll-with-animation>
        <div class="title-tip">
          <div class="titlebox">
            <image class="titleicon" src="@/assets/sun/s_fastbuy.svg" mode="scaleToFill" />
            <div class="timetxt">
              <div>限时抢购</div>
              <div>2021-123-123145</div>
            </div>
          </div>
        </div>

        <activity-fastbuy />
        <div class="title-tip">
          <div class="titlebox">
            <image class="titleicon" src="@/assets/sun/s_prize.svg" mode="scaleToFill" />
            <div class="timetxt">
              <div>抽奖</div>
              <div>2021-123-123145</div>
            </div>
          </div>
        </div>

        <div class="title-tip">
          <div class="titlebox">
            <image class="titleicon" src="@/assets/sun/s_task.svg" mode="scaleToFill" />
            <div class="timetxt">
              <div>活动任务周期</div>
              <div>2021-123-123145</div>
            </div>
          </div>
        </div>
        <div class="tasklist">
          <template v-for="(item, index) in 6" :key="index">
            <div class="taskitem">
              <div class="taskinfo">
                <div class="tasktitle">
                  任务名称
                </div>
                <div class="taskcontent">
                  每日签到一次每日签到一次每日签到一次每日签到一次每日签到一次
                </div>
              </div>
              <div class="complate">
                去完成
              </div>
            </div>
          </template>
        </div>
        <div class="title-tip">
          <div class="titlebox">
            <image class="titleicon" src="@/assets/sun/s_rule.svg" mode="scaleToFill" />
            <div class="timetxt">
              <div>活动规则详情</div>
              <div>2021-123-123145</div>
            </div>
          </div>
        </div>

        <div class="rules">
          <image class="rulesimg" src="@/assets/sun/s_rules.svg" mode="scaleToFill" />
        </div>

        <div class="s_title">
          <image src="@/assets/sun/s_title.svg" mode="scaleToFill" />
        </div>
      </scroll-view>
    </div>
  </div>
</template>

<style>
page {
  background-image: none !important;
}
</style>

<style lang="scss" scoped>
.roulette {
  position: relative;
  min-height: 100vh;
  width: 100%;
  z-index: 0;

  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background-size: cover
  }

  .banner {
    height: 1400rpx;
  }

  .tasklist {
    box-sizing: border-box;
    padding: 32rpx;

    .taskitem {
      border: 2rpx solid #FF6621;
      border-radius: 16rpx;
      background-color: #FDF2E0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-sizing: border-box;
      padding: 16rpx 32rpx;
      margin-bottom: 32rpx;

      .tasktitle {
        color: #000;
        font-size: 32rpx;
        font-weight: 600;
      }

      .taskcontent {
        font-size: 24rpx;
        color: #686868;
        max-width: 396rpx;
      }

      .complate {
        width: 224rpx;
        height: 64rpx;
        border-radius: 32rpx;
        background: linear-gradient(to right, #FF4E08, #FF2727);
        @apply flex-center;
      }
    }
  }

}

.tabs {
  width: 100%;
  height: 132rpx;
  background: linear-gradient(to right, #FFA131, #FF6621);
  display: flex;
  align-items: center;
  justify-content: space-around;

  .tabs_item {
    position: relative;
    width: 144rpx;
    height: 80rpx;
    font-size: 40rpx;
  }

  .text {
    position: absolute;
    z-index: 2;
    width: 100%;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

}

.icon {
  position: absolute;
  width: 100%;
  bottom: 0;
  z-index: 1;
}

.scroll {
  height: calc(100vh - 132rpx);
  background-size: cover;
  background-attachment: scroll;
}

.title-tip {
  height: 154rpx;
  width: 100%;

  .titlebox {
    font-size: 24rpx;
    margin-top: 60rpx;
    position: relative;
    display: flex;
    align-items: center;
    height: 154rpx;

    .titleicon {
      position: absolute;
      width: 256rpx;
      height: 154rpx;
      z-index: 1;
      left: 10%;
    }

    .timetxt {
      padding-top: 4rpx;
      position: absolute;
      left: 35%;
      width: 400rpx;
      height: 88rpx;
      border-radius: 44rpx;
      background: linear-gradient(to right, #FFCB78, #FF8B00);
      z-index: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }

}

.rules {
    padding: 32rpx;

    .rulesimg {
      width: 100%;
    }
  }

.s_title {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

<route lang="json">
{
  "layout": "full"
}
</route>
