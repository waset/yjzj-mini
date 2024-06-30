<script setup lang="ts">
const props = defineProps<{
  detail: Product | null
}>()
const { detail } = toRefs(props)
const { gamesList } = storeToRefs(useDiyStore())
const { getGamesList } = useDiyStore()

//  swiper 实例
const swiperbox = ref<ComponentInstance['ProductSwiperBox']>()
// swiper当前位置
const current = ref<number>(0)

// 显示选择游戏弹窗
const showGames = ref<boolean>(false)
// 搜索文字
const searchText = ref<string>('')
//  用于展示轮播图的游戏列表
const useGamesList = ref<gamesList[]>([])
// 用于确定时赋值的游戏列表
const assignment = ref<gamesList[]>([])

// swiper 当前背景
const gameBg = computed(() => {
  let img = ''
  if (useGamesList.value.length !== 0) {
    img = ImageUrl(useGamesList.value[current.value].cover)
  }
  else {
    img = StaticUrl('/images/login-bg.png')
  }
  return `url(${img})`
})

// 切换游戏swiper页
const changeSwiperFn = (value: number) => {
  current.value = value
}

// 确认选择的游戏
const confirmGames = () => {
  useGamesList.value = JSON.parse(JSON.stringify(assignment.value))
  // 重置序列号
  swiperbox.value?.reset()
  showGames.value = false
}

// 选择操作
const selectAction = (item: gamesList) => {
  const index = assignment.value.findIndex((obj) => {
    return obj.id === item.id
  })
  if (index !== -1) {
    assignment.value.splice(index, 1)
  }
  else {
    assignment.value.push(item)
  }
}

// 判断是否选中
const isIncludes = (idToFind: number) => {
  return assignment.value.some(item => item.id === idToFind)
}

// 更新选配
const upOptional = () => {
  swiperbox.value?.getpower()
}

onMounted(async () => {
  const gemelist = await getGamesList() || []
  useGamesList.value = gemelist
  /**
   * TODO:@sampson762
   * @see https://vueuse.org/core/useCloned/
   */
  assignment.value = JSON.parse(JSON.stringify(gemelist))
})

onUnmounted(() => {
  //
})

defineExpose({
  upOptional,
})
</script>

<template>
  <div class="game">
    <div class="content" :style="{ '--bg-img': gameBg }">
      <product-swiper-box
        ref="swiperbox" :list="useGamesList" :pcurrent="current" :params="detail?.params || []"
        @select-games="showGames = true" @change-swiper="changeSwiperFn"
      />
    </div>
    <common-popup :show="showGames" name="选择游戏" @close="showGames = false">
      <div class="selectGames">
        <div>
          <div class="search">
            <input v-model="searchText" type="text" placeholder="输入关键字搜索想要的商品">
            <div class="i-icons-search" />
          </div>
          <div class="selectbox">
            <div v-for="(item, index) in gamesList" :key="index">
              <div class="select" @click="selectAction(item)">
                <div v-if="isIncludes(item.id)" class="selected">
                  <div class="icon i-icons-correct" />
                </div>
                <div class="goodsImg">
                  <image class="img" :src="ImageUrl(item.cover)" mode="aspectFill" />
                </div>
                <div class="goodsInfo">
                  <div class="name">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="confirm" @click="confirmGames">
            确定
          </div>
        </div>
      </div>
    </common-popup>
  </div>
</template>

<style scoped lang="scss">
  .game {

    .content {
      padding: 32rpx 22rpx;
      border-radius: 32rpx;
      background-size: cover;
      background-position: center center;
      background-repeat: no-repeat;
      background-image: var(--bg-img);
    }

    .selectGames {
      .search {
        display: flex;
        height: 88rpx;
        justify-content: space-between;
        align-items: center;
        border: 1rpx solid #A7F522;
        border-radius: 44rpx;
        padding: 0 24rpx;
        margin-bottom: 32rpx;
      }

      .selectbox {
        padding-bottom: 120rpx;
      }

      .select {
        position: relative;
        border-radius: 16rpx;
        height: 140rpx;
        background-color: rgba(#000, 0.2);
        padding: 20rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 32rpx;
        z-index: 9;

        .selected {
          position: absolute;
          top: 0;
          left: 0;
          width: 69rpx;
          height: 69rpx;
          background-color: #A7F522;
          clip-path: polygon(0% 98.571%, 98.571% 0%, 22.857% 0%, 22.857% 0%, 19.15% 0.299%, 15.633% 1.165%, 12.353% 2.551%, 9.358% 4.41%, 6.695% 6.695%, 4.41% 9.358%, 2.551% 12.353%, 1.165% 15.633%, 0.299% 19.15%, 0% 22.857%, 0% 98.571%);

          .icon {
            color: #000;
          }
        }

        .goodsImg {
          width: 100rpx;
          height: 100rpx;
          border-radius: 16rpx;
          background-color: #fff;
          overflow: hidden;

          .img {
            width: 100rpx;
            height: 100rpx;
          }
        }

        .goodsInfo {
          flex: 1;

          .name {
            margin-left: 48rpx;
            width: fit-content;
            width: -webkit-fit-content;
            width: -moz-fit-content;
            font-size: 28rpx;
            font-weight: 600;
            padding: 0 24rpx;
            background: linear-gradient(135deg, rgba(#BEBEBE, .1), rgba(#BEBEBE, .4), rgba(#BEBEBE, .4), rgba(#BEBEBE, .1));
          }
        }
      }

      .confirm {
        width: 440rpx;
        height: 80rpx;
        position: fixed;
        bottom: calc(32rpx + env(safe-area-inset-bottom));
        left: 50%;
        transform: translateX(-50%);
        padding: 10px 20px 10px 20px;
        border-radius: 4rpx;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #A7F522;
        color: #1D2129;
        font-size: 28rpx;
        z-index: 99;
      }

      .confirm:active {
        background-color: #82c410;
      }
    }
  }
</style>
