<script lang="ts" setup>
import ranktopimg1 from '@/assets/background/invite-th1bg.svg'
import ranktopimg2 from '@/assets/background/invite-th2bg.svg'
import ranktopimg3 from '@/assets/background/invite-th3bg.svg'

const rankImglist = ref<string[]>([
  ranktopimg1,
  ranktopimg2,
  ranktopimg3,
])
</script>

<template>
  <div class="flex justify-center pt-20 pb-10">
    <image
      src="@/assets/background/invite-title2.svg"
      mode="heightFix"
      style="height: 44rpx;"
    />
  </div>

  <div class="ranking">
    <div class="award flex justify-between pb-10">
      <template v-for="i in 3" :key="i">
        <div class="awardbg" :style="{ marginTop: i !== 2 ? '80rpx' : '0', backgroundImage: `url(${rankImglist[i - 1]})` }">
          <image
            src="@/assets/background/invite-icon1.svg"
            mode="scaleToFill"
            class="avatar"
          />
          <div class="no">
            NO.2
          </div>
          <div class="nickname">
            昵称
          </div>
          <div class="flex mt-1">
            <div class="title">
              返利金额：
            </div>
            <div class="text">
              1000
            </div>
          </div>
          <div class="flex">
            <div class="title">
              推广人数：
            </div>
            <div class="text">
              130
            </div>
          </div>
        </div>
      </template>
    </div>

    <div class="list">
      <div class="flex justify-center">
        <image
          src="@/assets/background/invite-ranktop.svg"
          mode="scaleToFill"
          class="ranktop  mt-10 mb-4"
        />
      </div>
      <template v-for="i in 6" :key="i">
        <div class="flex items-center mt-2">
          <div class="i-svg-th4 th" />
          <div class="userinfo flex-center">
            <image
              src="@/assets/background/invite-icon1.svg"
              mode="scaleToFill"
              class="avatar"
            />
            <span class="text nickname">昵称</span>
            <div class="i-svg-th4" />
          </div>
          <div class="text price">
            3000
          </div>
          <div class="text num">
            3
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.ranking {
  .award {
    padding: 0 46rpx;
    .awardbg {
      width: 196rpx;
      height: 336rpx;
      background-size:cover;
      background-repeat:no-repeat;
      display: flex;
      align-items:center;
      flex-direction:column;
      .avatar {
        width: 134rpx;
        height: 134rpx;
        border-radius: 134rpx;
        width: 133rpx;
        height: 132rpx;
        border: 4rpx solid;
        background-color: linear-gradient(141deg, rgba(252, 255, 86, 1), rgba(255, 178, 18, 1)) 4 4;
      }
      .no {
        font-weight: 400;
        font-size: 28rpx;
        line-height: 40rpx;
        color: linear-gradient(38.96901306494723deg, #FFF387 0%, #FFA800 100%);
      }
      .nickname {
        font-weight: 400;
        font-size: 24rpx;
        color: #FFFFFF;
      }
      .title {
        font-weight: 400;
        font-size: 20rpx;
        color: #FFFFFF;
      }
      .text {
        font-weight: 400;
        font-size: 22rpx;
        color: #FFFFFF;
      }
    }
  }
  .list {
    margin: 0 26rpx;
    .ranktop {
      width: 662rpx;
      height: 40rpx;
    }
    .th {
      width: 58rpx;
      height: 58rpx;
      margin: 0 24rpx;
    }
    .userinfo {
      width: 268rpx;
      .nickname {
        margin: 0 8rpx;
      }
      .avatar {
        width: 48rpx;
        height: 48rpx;
      }
    }
    .price {
      width: 172rpx;
      text-align: center;
    }
    .num{
      width: 148rpx;
      text-align: center;
    }
    .text {
      font-weight: 400;
      font-size: 24rpx;
      color: #FFFFFF;
    }
  }
}
</style>
