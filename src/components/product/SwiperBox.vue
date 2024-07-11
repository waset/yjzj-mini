<script setup lang="ts">
const props = defineProps<{
  list: gamesList[]
}>()
const emit = defineEmits<{
  (e: 'selectGames'): void
  (e: 'changeSwiper', value: number): void
}>()

const { getGamePower } = useDiyStore()

const { detail } = storeToRefs(useProductStore())
// 当前第几页 页码
const pcurrent = ref(0)
// 分辨率
const power = ref<string[]>(['1080', '2k'])
const selectPower = ref<string>('1080')

// 游戏性能请求参数
const powerParams = ref<powerParams>({

})
// 用于为请求配置参数  删除没有值的参数
const copyPararms = ref<powerParams>({
  cpuTag2IDS: [],
  displayCardTag2IDs: [],
  resolutionType: 1,
  page: 1,
  pageSize: 10,
  gameID: 1,
})
// 处理游戏性能请求参数
const handleParams = (list?: any) => {
  copyPararms.value.cpuTag2IDS = detail?.value?.params[0]?.product?.tags2 || []
  copyPararms.value.displayCardTag2IDs = detail.value?.params[2]?.product?.tags2 || []
  copyPararms.value.resolutionType = selectPower.value === '1080' ? 1 : 2
  copyPararms.value.gameID = props.list[pcurrent.value]?.id || list[0].id

  // 然后删除不需要的属性
  if (powerParams.value.cpuTag2IDS?.length === 0) {
    delete copyPararms.value.cpuTag2IDS
  }
  if (powerParams.value.displayCardTag2IDs?.length === 0) {
    delete copyPararms.value.displayCardTag2IDs
  }
  if (powerParams.value.gameID === 0) {
    delete copyPararms.value.gameID
  }
}
// 用于展示 fps 数值
const FPSpower = ref({
  fpsAvg: 0,
  fpsMax: 0,
  fpsMin: 0,
})
// 重置序列号
const reset = () => {
  pcurrent.value = 0
}
// 请求游戏性能
const getpower = async (list?: any) => {
  await handleParams(list)
  const arr = ref<any>([])
  arr.value = await getGamePower(copyPararms.value)
  if (arr.value.length === 0) {
    FPSpower.value = {
      fpsAvg: 0,
      fpsMax: 0,
      fpsMin: 0,
    }
  }
  else {
    const { fpsAvg, fpsMax, fpsMin } = arr.value[0]
    FPSpower.value = {
      fpsAvg,
      fpsMax,
      fpsMin,
    }
  }
}
defineExpose({
  getpower,
  reset,
})
// 监听分辨率选择是否变化了  变化了就请求
watch(selectPower, async () => {
  await getpower()
})

// 监听页面是否变化  变化了就传递给父组件显示
watch(pcurrent, async (val) => {
  emit('changeSwiper', val)
  await getpower()
})

// 轮播图高度
const carouselHeight = ref(360)
const colors: string[] = [
  '#A7F522',
  '#E61C44',
  '#52FFE2',
  '#FE63FC',
].sort(() => Math.random() - 0.5)

// 选择游戏
const selectGame = () => {
  emit('selectGames')
}
// 切换游戏
const changeGame = (text: string) => {
  if (text === 'next') {
    if (pcurrent.value >= props.list.length - 1) {
      pcurrent.value = 0
    }
    else {
      pcurrent.value += 1
    }
  }

  if (text === 'pre') {
    if (pcurrent.value <= 0) {
      pcurrent.value = props.list.length - 1
    }
    else {
      pcurrent.value -= 1
    }
  }
}
</script>

<template>
  <div class="center">
    <template v-if="props.list.length !== 0">
      <div>
        <!-- <div class="searchBox" @click="selectGame">
          <span> 选择喜欢的游戏,查看当前配置的性能数据</span>
          <div class="icon i-icons-left" />
        </div> -->
        <div class="swiper">
          <carousel
            v-model:current="pcurrent" :list="props.list" :height="carouselHeight" direction="horizontal"
            :offset-x-step="48" offset-x-step-units="rpx" :offset-y-step="0" offset-y-step-units="rpx" :scale-step="0.8"
            :opacity-step="0.99" overflow="visible" loop switch :natural-direction="true"
          >
            <template #item="{ item, index }">
              <div
                class="item" :style="{
                  '--color': colors[index % colors.length],
                  '--carousel-length': props.list.length,
                  '--carousel-index': index,
                  '--carousel-heigit': `${carouselHeight}rpx`,
                }"
              >
                <div class="box">
                  <div class="body">
                    <div class="image" :class="[index === pcurrent ? 'image active' : 'image']">
                      <image
                        :src="ImageUrl(item?.cover || '')" mode="aspectFill" :style="{
                          width: '488rpx',
                          height: '248rpx',
                          borderRadius: '30rpx',
                        }" :draggable="false" :fade-show="false"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template #prev>
              <div class="switch left">
                <div class="i-icons-swiper-left" />
              </div>
            </template>
            <template #next>
              <div class="switch right">
                <div class="i-icons-swiper-right" />
              </div>
            </template>
          </carousel>

          <div class="gamesName">
            <div class="name-text">
              {{ list[pcurrent].name }}
            </div>
            <div class="length">
              <div class="icon i-icons-left" @click="changeGame('pre')" />
              <div class="length-text">
                {{ `${pcurrent + 1}/${list.length}` }}
              </div>
              <div class="i-icons-right" @click="changeGame('next')" />
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="empty" @click="selectGame">
        <image
          src="@/assets/background/games-power.svg" :style="{
            width: '100%',
            height: '100%',
          }" mode="scaleToFill"
        />
      </div>
    </template>
    <div class="Frame_rate">
      <div class="text">
        选择帧数
      </div>
      <div v-for="(item, index) in power" :key="index" class="rate_item" @click="selectPower = item">
        <div v-if="selectPower === item" class="circle" />
        <div v-if="selectPower !== item" class="circle_no" />
        <div class="powerText">
          {{ item }}
        </div>
      </div>
    </div>

    <div class="performance">
      <div class="title">
        <div class="big">
          性能数据
        </div>
        <div class="small">
          帧率波动范围
        </div>
      </div>
      <div class="textinfo">
        <div class="row">
          <span class="rowtext">平均帧率：</span>
          <span class="number">{{ FPSpower.fpsAvg }}</span>
          <span>FPS</span>
        </div>
        <div class="row">
          <span class="rowtext">最高帧率：</span>
          <span class="number">{{ FPSpower.fpsMax }}</span>
          <span>FPS</span>
        </div>
        <div class="row">
          <span class="rowtext">最低帧率：</span>
          <span class="number low">{{ FPSpower.fpsMin }}</span>
          <span>FPS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.center {
  .empty {
    height: 480rpx;
    border-radius: 32rpx;
    background-color: rgba($color: #000, $alpha: .5);
    box-sizing: border-box;
    padding: 80rpx 40rpx;
  }

  .searchBox {
    width: 560rpx;
    height: 64rpx;
    border-radius: 4rpx;
    background: rgba($color: #fff, $alpha: .2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    font-size: 28rpx;

    .icon {
      transform: rotate(-90deg);

    }

  }

  .swiper {
    .gamesName {
      display: flex;
      flex-direction: column;
      align-items: center;

      .name-text {
        font-size: 32rpx;
        font-weight: 600;
        padding: 8rpx 32rpx;
        background-color: #000;
        border-radius: 40rpx;
      }

      .length {
        font-size: 24rpx;
        margin-top: 16rpx;
        padding: 8rpx 32rpx 8rpx 32rpx;
        background-color: #000;
        border-radius: 40rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .length-text {
          margin: 0 8rpx;
        }
      }
    }

    .item {
      height: var(--carousel-heigit);
      padding: var(--padding);

      .box {
        padding: var(--padding);
        height: 100%;

        position: relative;
        z-index: 0;

        &::before {
          content: '';
          position: absolute;
          bottom: var(--padding);
          left: var(--padding);
          z-index: -1;
          width: calc(100% - var(--padding));
          height: calc(100% - var(--padding));
          background: linear-gradient(180deg, var(--color) 43%, rgba(0, 0, 0, 1) 150%);
          clip-path: polygon(0% 7.83%, 0% 7.83%, 0.067% 7.391%, 0.26% 6.982%, 0.565% 6.608%, 0.969% 6.276%, 1.46% 5.991%, 2.026% 5.761%, 2.652% 5.591%, 3.325% 5.488%, 4.034% 5.458%, 4.765% 5.508%, 84.092% 15.328%, 84.092% 15.328%, 85.639% 15.585%, 87.088% 15.957%, 88.426% 16.434%, 89.639% 17.007%, 90.714% 17.667%, 91.638% 18.404%, 92.398% 19.21%, 92.98% 20.074%, 93.371% 20.988%, 93.557% 21.942%, 100% 100%, 15.85% 100%, 15.85% 100%, 13.279% 99.876%, 10.84% 99.517%, 8.566% 98.941%, 6.489% 98.17%, 4.642% 97.222%, 3.058% 96.117%, 1.769% 94.874%, 0.808% 93.514%, 0.207% 92.054%, 0% 90.516%, 0% 7.83%);
        }

        .body {
          position: relative;
          height: 100%;
          padding: var(--padding);
          padding-top: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;

          --margin-top: -64rpx;

          .image {
            margin-top: var(--margin-top);
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 30rpx;
            overflow: hidden;

          }

          .active {
            padding: 4rpx;
            background: linear-gradient(125deg, rgba(#A7F522, 1), rgba(#fff, 0.1), rgba(#A7F522, 1));
          }

          .info {
            width: 100%;

            .title {
              font-size: 32rpx;
              line-height: 40rpx;
              font-weight: 600;

              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            .desc {
              font-size: 28rpx;
              line-height: 40rpx;
              margin: 16rpx 0;

              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            .price {
              display: flex;
              align-items: center;
              justify-self: start;
              padding: 20rpx 10rpx;
              background: linear-gradient(89.07deg, rgba(39, 39, 39, 0) -0.81%, rgba(190, 190, 190, 0.4) 29%, rgba(190, 190, 190, 0.4) 64.01%, rgba(39, 39, 39, 0) 92.9%);

              .current {
                font-size: 32rpx;
                line-height: 40rpx;
                font-weight: 600;
                margin-right: 16rpx;
              }

              .original {
                font-size: 24rpx;
                line-height: 32rpx;
                color: #bebebe;
                text-decoration: line-through;
                margin-left: 16rpx;
              }
            }
          }
        }
      }
    }

    .switch {
      position: absolute;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 100%;
      font-size: 32px;
      color: #fff;
      z-index: calc(var(--carousel-length) + 1);

      &.left {
        left: 0;

      }

      &.right {
        right: 0;
      }
    }
  }

  .Frame_rate {
    font-size: 28rpx;
    height: 96rpx;
    background-color: rgba($color: #000000, $alpha: .5);
    margin-top: 48rpx;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding-left: 36rpx;

    .text {
      margin-right: 24rpx;
    }

    .rate_item {
      display: flex;
      align-items: center;
      margin-right: 16rpx;

      .circle {
        width: 40rpx;
        height: 40rpx;
        background-color: #A7F522;
        clip-path: polygon(100% 50%, 100% 50%, 99.346% 58.11%, 97.451% 65.804%, 94.419% 72.978%, 90.353% 79.529%, 85.355% 85.355%, 79.529% 90.353%, 72.978% 94.419%, 65.804% 97.451%, 58.11% 99.346%, 50% 100%, 50% 100%, 41.89% 99.346%, 34.196% 97.451%, 27.022% 94.419%, 20.471% 90.353%, 14.645% 85.355%, 9.647% 79.529%, 5.581% 72.978%, 2.549% 65.804%, 0.654% 58.11%, 0% 50%, 0% 50%, 0.654% 41.89%, 2.549% 34.196%, 5.581% 27.022%, 9.647% 20.471%, 14.645% 14.645%, 20.471% 9.647%, 27.022% 5.581%, 34.196% 2.549%, 41.89% 0.654%, 50% 0%, 50% 0%, 58.11% 0.654%, 65.804% 2.549%, 72.978% 5.581%, 79.529% 9.647%, 85.355% 14.645%, 90.353% 20.471%, 94.419% 27.022%, 97.451% 34.196%, 99.346% 41.89%, 100% 50%, 50% 85%, 44.323% 84.542%, 38.937% 83.216%, 33.915% 81.093%, 29.329% 78.247%, 25.251% 74.749%, 21.753% 70.671%, 18.907% 66.085%, 16.784% 61.063%, 15.458% 55.677%, 15% 50%, 15% 50%, 15.458% 44.323%, 16.784% 38.937%, 18.907% 33.915%, 21.753% 29.329%, 25.251% 25.251%, 29.329% 21.753%, 33.915% 18.907%, 38.937% 16.784%, 44.323% 15.458%, 50% 15%, 50% 15%, 55.677% 15.458%, 61.063% 16.784%, 66.085% 18.907%, 70.671% 21.753%, 74.749% 25.251%, 78.247% 29.329%, 81.093% 33.915%, 83.216% 38.937%, 84.542% 44.323%, 85% 50%, 85% 50%, 84.542% 55.677%, 83.216% 61.063%, 81.093% 66.085%, 78.247% 70.671%, 74.749% 74.749%, 70.671% 78.247%, 66.085% 81.093%, 61.063% 83.216%, 55.677% 84.542%, 50% 85%, 50% 85%, 95% 50%, 94.411% 42.701%, 92.706% 35.777%, 89.977% 29.32%, 86.318% 23.424%, 81.82% 18.18%, 76.576% 13.682%, 70.68% 10.023%, 64.224% 7.294%, 57.299% 5.589%, 50% 5%, 50% 5%, 42.701% 5.589%, 35.777% 7.294%, 29.32% 10.023%, 23.424% 13.682%, 18.18% 18.18%, 13.682% 23.424%, 10.023% 29.32%, 7.294% 35.777%, 5.589% 42.701%, 5% 50%, 5% 50%, 5.589% 57.299%, 7.294% 64.224%, 10.023% 70.68%, 13.682% 76.576%, 18.18% 81.82%, 23.424% 86.318%, 29.32% 89.977%, 35.777% 92.706%, 42.701% 94.411%, 50% 95%, 50% 95%, 57.299% 94.411%, 64.224% 92.706%, 70.68% 89.977%, 76.576% 86.318%, 81.82% 81.82%, 86.318% 76.576%, 89.977% 70.68%, 92.706% 64.224%, 94.411% 57.299%, 95% 50%, 95% 50%);
      }

      .circle_no {
        box-sizing: border-box;
        width: 40rpx;
        height: 40rpx;
        border: 2rpx solid #fff;
        border-radius: 50%;
      }

      .powerText {
        margin-left: 16rpx;
      }
    }
  }

  .performance {
    margin-top: 16rpx;
    padding: 32rpx;
    border-radius: 8rpx;
    background-color: rgba($color: #000000, $alpha: .5);

    .title {
      display: flex;
      align-items: center;
      margin-bottom: 32rpx;

      .big {
        color: #fff;
        font-size: 40rpx;
        font-weight: 600;
        margin-right: 8rpx;
      }

      .small {
        font-size: 24rpx;
        color: #BEBEBE;
      }

    }

    .textinfo {
      border-radius: 8rpx;
      padding: 24rpx 40rpx;
      background-color: rgba($color: #8E8E8E, $alpha: .4);

      .row {
        padding: 20rpx 0;
        font-size: 28rpx;

        .rowtext {
          margin-right: 32rpx;
        }

        .number {
          margin-right: 16rpx;
          font-size: 32rpx;
          color: #20BA42;
        }

        .low {
          color: #E4AC69;
        }
      }
    }
  }

}
</style>
