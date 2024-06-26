<script lang="ts" setup>
import ranktoplv1 from '@/assets/background/invite-th1bg.svg'
import ranktoplv2 from '@/assets/background/invite-th2bg.svg'
import ranktoplv3 from '@/assets/background/invite-th3bg.svg'

const props = withDefaults(defineProps<{
  inviterank: Inviterank[]
}>(), {
  inviterank: () => [],
})
const rankImglist = ref<string[]>([
  ranktoplv1,
  ranktoplv2,
  ranktoplv3,
])

const thIcon = ref<string[]>([
  'i-svg-th4',
  'i-svg-th5',
  'i-svg-th6',
  'i-svg-th7',
  'i-svg-th8',
  'i-svg-th9',
  'i-svg-th10',
])

// 榜单头像边框颜色
const bordercolor = ref<string[]>([
  '#6AE4FF',
  '#EFAA13',
  '#FFB774',
])
// 前三名榜单
const ranktop = computed(() => {
  if (props.inviterank.length < 3)
    return props.inviterank
  return [
    props.inviterank[1],
    props.inviterank[0],
    props.inviterank[2],
  ]
})

// 第三名到第十名榜单
const ranklist = computed(() => {
  if (props.inviterank.length > 3) {
    return props.inviterank.slice(3, props.inviterank.length >= 10 ? 10 : props.inviterank.length + 1)
  }
  else {
    return []
  }
})
</script>

<template>
  <div class="flex justify-center pt-20 pb-10">
    <image src="@/assets/background/invite-title2.svg" mode="heightFix" style="height: 44rpx;" />
  </div>

  <div class="ranking">
    <div class="award flex justify-between pb-10">
      <template v-if="ranktop && ranktop.length">
        <template v-for="(item, i) in ranktop" :key="i">
          <div
            class="awardbg"
            :style="{ marginTop: i !== 1 ? '80rpx' : '0', backgroundImage: `url(${rankImglist[item.lv - 1]})` }"
          >
            <image
              :src="ImageUrl(item.avatar)" mode="scaleToFill" class="avatar"
              :style="`border: 4rpx solid ${bordercolor[i]};`"
            />
            <div class="no">
              NO.{{ item.lv }}
            </div>
            <div class="flex-center">
              <div class="nickname">
                {{ item.nickname }}
              </div>
              <div :class="`i-svg-medal-lv${item.levelLevel} ml-1`" />
            </div>
            <div class="flex mt-1">
              <div class="title">
                返利金额：
              </div>
              <div class="text">
                {{ item.orderAmount }}
              </div>
            </div>
            <div class="flex">
              <div class="title">
                推广人数：{{ item.memberNumber }}
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>

    <div class="list">
      <div class="flex justify-center">
        <image src="@/assets/background/invite-ranktop.svg" mode="scaleToFill" class="ranktop  mt-10 mb-4" />
      </div>
      <template v-if="ranklist && ranklist.length">
        <template v-for="(item, i) in ranklist" :key="i">
          <div class="flex items-center mt-2">
            <div :class="thIcon[i]" class="th" />
            <div class="userinfo flex items-center ml-4">
              <image :src="ImageUrl(item.avatar)" mode="widthFix" class="avatar" />
              <span class="text nickname">{{ item.nickname }}</span>
              <div :class="`i-svg-medal-lv${item.levelLevel}`" />
            </div>
            <div class="text price">
              {{ item.orderAmount }}
            </div>
            <div class="text num">
              {{ item.memberNumber }}
            </div>
          </div>
        </template>
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
      background-size: cover;
      background-repeat: no-repeat;
      display: flex;
      align-items: center;
      flex-direction: column;

      .avatar {
        width: 134rpx;
        height: 134rpx;
        width: 133rpx;
        height: 132rpx;
        border-radius: 134rpx;
        background-color: linear-gradient(141deg, rgba(252, 255, 86, 1), rgba(255, 178, 18, 1)) 4 4;
      }

      .no {
        font-weight: 400;
        font-size: 28rpx;
        line-height: 40rpx;
        color: linear-gradient(38deg, #FFF387 0%, #FFA800 100%);
      }

      .nickname {
        font-weight: 400;
        font-size: 24rpx;
        color: #FFFFFF;
        max-width: 120rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
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
      width: 218rpx;

      .nickname {
        margin: 0 8rpx;
        max-width: 140rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .avatar {
        width: 48rpx;
        height: 48rpx;
        border-radius: 48rpx;
        flex-shrink: 0;
      }
    }

    .price {
      width: 172rpx;
      text-align: center;
    }

    .num {
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
