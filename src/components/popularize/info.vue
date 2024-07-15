<script lang="ts" setup>
const emits = defineEmits(['bandinvite', 'openwith'])

const { user, userDesc } = storeToRefs(useUserStore())

const lvIcon = [
  'i-svg-medal-lv1',
  'i-svg-medal-lv2',
  'i-svg-medal-lv3',
  'i-svg-medal-lv4',
  'i-svg-medal-lv5',
]

const WithInfo = ref([
  {
    title: '当前等级',
    value: lvIcon[user.value.promoter.levelLevel || 0],
    isicon: true,
  },
  {
    title: '返利比例',
    value: userDesc.value.promoter.rebateRatio,
    isicon: false,

  },
  {
    title: '返利方式',
    value: userDesc.value.promoter.rebateTypeDesc,
    isicon: false,

  },
])

function band() {
  emits('bandinvite')
}

function withdraw() {
  if (Number.parseFloat(userDesc.value.balanceAmount) < 10) {
    uni.showToast({
      title: '最低提现金额为10元',
      icon: 'none',
      duration: 2000,
    })
    return
  }
  emits('openwith')
}

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
    Isvg: 'i-svg-vector',
    title: '邀请链接',
    value: DomainUrl(`/login?inviteCode=${user.value.inviteCode}`),
    click: () => {
      copyText(DomainUrl(`/login?inviteCode=${user.value.inviteCode}`))
    },
  },
  {
    Isvg: 'i-svg-edit-lv',
    title: '我的邀请人',
    value: user.value?.inviteUserInfo?.nickname,
    click: () => {
      band()
    },
  },
])

// 积分余额
const balance = ref([
  {
    title: '积分',
    value: userDesc.value.promoter.cycleOrderAmount,
    icon: '',
  },
  {
    title: '账户余额',
    value: Number.parseFloat(userDesc.value.balanceAmount).toFixed(2),
    icon: 'i-icons-withdraw',
  },
])
</script>

<template>
  <div class="info m-4">
    <img class="dag" src="@/assets/background/drawdag.svg" alt="">
    <div class="title">
      邀请推广
    </div>
    <div class="with-info pb-6">
      <div class="user flex items-center px-4 pt-2">
        <avatar :src="user.avatar" width="48rpx" />
        <div class="name ml-2">
          {{ user.nickname }}
        </div>
      </div>
      <div class="grid mt-4 flex">
        <template v-for="(item, index) in WithInfo" :key="index">
          <div class="flex flex-col justify-center items-center w-33.33%">
            <div class="title mb-1">
              {{ item.title }}
            </div>
            <template v-if="item.isicon">
              <i :class="item.value" />
            </template>
            <template v-else>
              <div class="value">
                {{ item.value }}
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
    <div class="invite-info mt-4">
      <template v-for="(item, index) in messageArray" :key="index">
        <div class="row flex items-center mb-2 px-4 py-1.5">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="flex items-center justify-between flex-1">
            <div class="flex items-center">
              <template v-if="index === 2">
                <avatar :src="user.inviteUserInfo?.avatar" width="40rpx" />
              </template>
              <div class="value ml-1">
                {{ item.value }}
              </div>
            </div>
            <div :class="item.Isvg" @click="item.click" />
          </div>
        </div>
      </template>
    </div>
    <div style="width: 100%;">
      <div class="outside mt-4">
        <div class="inside flex justify-around">
          <template v-for="(item, index) in balance" :key="index">
            <div class="flex flex-col items-center justify-center">
              <div class="title">
                {{ item.title }}
              </div>
              <div
                class="flex items-center mt-2"
                :style="{ color: item.icon && Number.parseFloat(item.value) > 10 ? '#A7F522' : '#FFF' }"
              >
                <div class="value mr2">
                  {{ item.value }}
                </div>
                <i :class="item.icon" @click="withdraw" />
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.info {
  position: relative;
  z-index: 0;
  padding: 38rpx 32rpx 104rpx 32rpx;

  --path: polygon(0% 3.333%, 0% 3.333%, 0.061% 2.793%, 0.238% 2.28%, 0.521% 1.801%, 0.9% 1.365%, 1.366% 0.976%, 1.91% 0.643%, 2.521% 0.372%, 3.19% 0.17%, 3.908% 0.044%, 4.665% 0%, 41.763% 0%, 41.763% 0%, 42.188% 0.014%, 42.607% 0.055%, 43.016% 0.123%, 43.413% 0.216%, 43.797% 0.334%, 44.164% 0.476%, 44.513% 0.641%, 44.841% 0.829%, 45.145% 1.038%, 45.424% 1.268%, 51.369% 6.649%, 51.369% 6.649%, 51.648% 6.879%, 51.952% 7.088%, 52.28% 7.276%, 52.629% 7.441%, 52.996% 7.583%, 53.38% 7.701%, 53.777% 7.794%, 54.186% 7.862%, 54.605% 7.903%, 55.03% 7.917%, 95.335% 7.917%, 95.335% 7.917%, 96.092% 7.96%, 96.81% 8.087%, 97.479% 8.289%, 98.09% 8.56%, 98.634% 8.893%, 99.1% 9.281%, 99.479% 9.718%, 99.762% 10.196%, 99.939% 10.709%, 100% 11.25%, 100% 93.37%, 100% 93.37%, 99.995% 93.445%, 99.981% 93.519%, 99.958% 93.591%, 99.926% 93.662%, 99.886% 93.73%, 99.837% 93.795%, 99.78% 93.857%, 99.716% 93.915%, 99.644% 93.969%, 99.565% 94.019%, 97.259% 95.346%, 97.259% 95.346%, 97.195% 95.38%, 97.129% 95.411%, 97.06% 95.438%, 96.989% 95.462%, 96.915% 95.482%, 96.84% 95.499%, 96.764% 95.513%, 96.686% 95.522%, 96.607% 95.528%, 96.528% 95.53%, 93.777% 95.53%, 93.777% 95.53%, 93.685% 95.532%, 93.594% 95.54%, 93.504% 95.553%, 93.416% 95.571%, 93.331% 95.593%, 93.249% 95.62%, 93.169% 95.652%, 93.093% 95.688%, 93.021% 95.729%, 92.953% 95.773%, 88.392% 99.026%, 88.392% 99.026%, 88.12% 99.205%, 87.832% 99.367%, 87.528% 99.511%, 87.21% 99.638%, 86.88% 99.747%, 86.539% 99.837%, 86.188% 99.908%, 85.83% 99.959%, 85.466% 99.99%, 85.097% 100%, 10.903% 100%, 10.903% 100%, 10.446% 99.984%, 9.998% 99.937%, 9.562% 99.859%, 9.14% 99.753%, 8.735% 99.618%, 8.35% 99.457%, 7.988% 99.269%, 7.65% 99.056%, 7.342% 98.82%, 7.064% 98.561%, 0.826% 92.105%, 0.826% 92.105%, 0.672% 91.935%, 0.534% 91.759%, 0.41% 91.578%, 0.303% 91.393%, 0.211% 91.203%, 0.136% 91.01%, 0.077% 90.813%, 0.034% 90.614%, 0.009% 90.413%, 0% 90.211%, 0% 3.333%);

  .dag {
    position: absolute;
    width: 274rpx;
    height: 46rpx;
    right: 28rpx;
    top: 14rpx;
  }

  &::before {
    content: '';
    position: absolute;
    z-index: -2;
    inset: -2rpx;
    clip-path: var(--path);
    background: linear-gradient(160deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1));
  }

  &::after {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    clip-path: var(--path);
    background: rgba(#070707, 1);
  }

  .title {
    font-size: 32rpx;
    color: #FFFFFF;
  }

  .with-info {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));
    border-radius: 32rpx 32rpx 32rpx 32rpx;
    margin-top: 40rpx;

    .user {
      background: linear-gradient(90deg, rgba(109, 109, 109, 0) 1.52%, rgba(202, 202, 202, 0.5) 53.11%, rgba(109, 109, 109, 0) 98.86%);

      .name {
        font-size: 26rpx;
        color: #F5F5F5;
      }
    }
  }

  .grid {
    .title {
      font-size: 24rpx;
      color: #F5F5F5;
    }

    .value {
      font-weight: 600;
      font-size: 32rpx;
      color: #A7F522;
    }
  }

  .invite-info {
    .row {
      border-radius: 8rpx;
      background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(132, 132, 132, 0.2), rgba(132, 132, 132, 0.2));

      .title {
        font-size: 28rpx;
        color: #FFFFFF;
        width: 180rpx;
      }

      .value {
        font-size: 28rpx;
        color: #FFFFFF;
        width: 280rpx;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
    }

  }

  .outside {
    width: calc(100% - 8rpx);
    height: 152rpx;
    position: relative;
    border-radius: 8rpx;
    background: rgba(62, 62, 62, 0.2);

    .inside {
      width: 100%;
      height: 152rpx;
      position: absolute;
      top: 10rpx;
      left: 10rpx;
      border-radius: 8rpx;
      background: rgba(62, 62, 62, 0.3);

      .title {
        font-weight: 400;
        font-size: 28rpx;
      }

      .value {
        font-size: 28;
        font-weight: bold;
      }
    }
  }
}
</style>
