<script lang="ts" setup>
// 第一个点
const x = ref<number>(20)
const y = ref<number>(0)
// 第二个点
const x1 = ref<number>(100)
const y1 = ref<number>(0)

// 用于计算 价钱
const saveX = ref<number>(20)
// 第二个点用于计算价钱
const saveX2 = ref<number>(100)
// 获取进度条长度
const width = ref<number>(300)
// 开始点的价钱
const starPrice = computed((): number => {
  return Math.round((24000 / width.value) * (saveX.value))
})
// 结束点的价钱
const endPrice = computed((): number => {
  return Math.round((24000 / width.value) * (saveX2.value))
})

// 获取滑动条的宽度
const movableWidth = ref()
onReady(() => {
  const query = uni.createSelectorQuery().in(getCurrentInstance())
  query
    .select('#movable')
    .fields({ size: true }, (data: any) => {
      movableWidth.value = data.width
    })
    .exec()
})

// 滑动第一个点
const startChange = (e: any) => {
  saveX.value = e.detail.x
  x.value = saveX.value
}
// 滑动第二个点
const endchange = (e: any) => {
  saveX2.value = e.detail.x
  x1.value = saveX2.value
}
interface pricelist {
  start: number
  end: number
  title: string
}

const list = ref<pricelist[]>([{
  start: 0,
  end: 4000,
  title: '0 - 4000',
}, {
  start: 4000,
  end: 7000,
  title: '4000 - 7000',
}, {
  start: 7000,
  end: 10000,
  title: '7000 - 10000',
}, {
  start: 10000,
  end: 20000,
  title: '10000 - 20000',
}, {
  start: 20000,
  end: 99999,
  title: '20000+',
}])

// 计算中间背景开始的长度
const bgLeft = computed(() => {
  const ratio = Math.min(saveX2.value, saveX.value) / movableWidth.value
  return `${(ratio * 100).toFixed(2)}%`
})

// 中间背景的长度
const bgWidth = computed(() => {
  const ratio = Math.abs(saveX2.value - saveX.value) / movableWidth.value
  return `${(ratio * 100).toFixed(2)}%`
})

// 计算价格区间
const sub = (price: number) => {
  return price / Math.round((24000 / width.value))
}

const setPrice = (item: pricelist) => {
  // 点击金额区间 给点1  点2 设置位置
  saveX.value = sub(item.start)
  x.value = saveX.value
  // 点2 设置位置
  if (item.end === 99999) {
    saveX2.value = sub(24000)
  }
  else {
    saveX2.value = sub(item.end)
  }
  x1.value = saveX2.value
}

const select = ref<'Intel' | 'AMD'>('Intel')
</script>

<template>
  <div>
    <navbar-back text="筛选条件" />
    <div>
      <div class="box">
        <div class="budget relative">
          <div class="content">
            预算范围
          </div>

          <div id="setupbox" class="setupbox">
            <movable-area id="movable" class="langLine">
              <div class="bg" :style="{ left: `${bgLeft}`, width: `${bgWidth}` }" />
              <movable-view
                :animation="false" :x="x" :y="y" direction="horizontal" class="circle flex justify-center"
                @change="startChange"
              >
                <div class="text">
                  {{ starPrice > 20000 ? '20000' : starPrice }}
                </div>
              </movable-view>
              <movable-view

                :inertia="true" :animation="false" :x="x1" :y="y1" direction="horizontal" class="circle flex justify-center"
                @change="endchange"
              >
                <div class="text">
                  {{ endPrice > 20000 ? '20000+' : endPrice }}
                </div>
              </movable-view>
            </movable-area>
          </div>

          <div class="price">
            <div v-for="(item, index) in list" :key="index" class="priceItem" @click="setPrice(item)">
              <div
                class="item"
                :class="{ actives: item.start === starPrice && item.end === endPrice || item.start === starPrice && item.end === 99999 }"
              >
                <div class="text">
                  {{ item.title }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cir">
          <div class="cir2">
            <div class="line" />
          </div>
        </div>
      </div>

      <div class="cpubox">
        <div class="cir">
          <div class="cir2">
            <div class="line" />
          </div>
        </div>
        <div class="cpu">
          <div class="content">
            CPU平台
          </div>
          <div class="itembox">
            <div class="cpuitem" :class="{ active: select === 'Intel' }" @click="select = 'Intel'">
              <div class="icon i-svg-intericon" />
              <div v-if="select === 'Intel'" class="triangle">
                <div class="icons i-icons-correct" />
              </div>
            </div>
            <div class="cpuitem" :class="{ active: select === 'AMD' }" @click="select = 'AMD'">
              <div class="icon i-svg-amd" />
              <div v-if="select === 'AMD'" class="triangle">
                <div class="icons i-icons-correct" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="btn" @click="() => {

        Jump('/pages/recommend/recommendlist', { start: starPrice > 20000 ? 20000 : starPrice, end: endPrice > 20000 ? 99999 : endPrice, cpu: select })

      }"
    >
      开始智能推荐
    </div>
  </div>
</template>

<style scoped lang="scss">
$bg : polygon(0.292% 91.787%, 0.292% 8.213%, 0.292% 8.213%, 0.354% 6.959%, 0.531% 5.769%, 0.815% 4.66%, 1.195% 3.648%, 1.663% 2.747%, 2.208% 1.974%, 2.821% 1.346%, 3.492% 0.877%, 4.212% 0.584%, 4.971% 0.483%, 79.409% 0.483%, 79.409% 0.483%, 80.168% 0.584%, 80.888% 0.877%, 81.559% 1.346%, 82.172% 1.974%, 82.717% 2.747%, 83.185% 3.648%, 83.565% 4.66%, 83.849% 5.769%, 84.026% 6.959%, 84.087% 8.213%, 84.087% 15.942%, 84.087% 15.942%, 84.149% 17.196%, 84.326% 18.385%, 84.61% 19.494%, 84.99% 20.507%, 85.458% 21.408%, 86.003% 22.18%, 86.616% 22.809%, 87.287% 23.277%, 88.007% 23.57%, 88.766% 23.671%, 95.029% 23.671%, 95.029% 23.671%, 95.788% 23.773%, 96.508% 24.066%, 97.179% 24.534%, 97.792% 25.163%, 98.337% 25.935%, 98.805% 26.836%, 99.185% 27.849%, 99.469% 28.958%, 99.646% 30.147%, 99.708% 31.401%, 99.708% 91.787%, 99.708% 91.787%, 99.646% 93.041%, 99.469% 94.231%, 99.185% 95.34%, 98.805% 96.352%, 98.337% 97.253%, 97.792% 98.026%, 97.179% 98.654%, 96.508% 99.123%, 95.788% 99.416%, 95.029% 99.517%, 4.971% 99.517%, 4.971% 99.517%, 4.212% 99.416%, 3.492% 99.123%, 2.821% 98.654%, 2.208% 98.026%, 1.663% 97.253%, 1.195% 96.352%, 0.815% 95.34%, 0.531% 94.231%, 0.354% 93.041%, 0.292% 91.787%);
$bg2: polygon(93.176% 1.435%, 5.338% 21.935%, 5.338% 21.935%, 4.558% 22.216%, 3.827% 22.675%, 3.152% 23.297%, 2.542% 24.067%, 2.005% 24.969%, 1.547% 25.989%, 1.178% 27.111%, 0.904% 28.32%, 0.734% 29.602%, 0.676% 30.94%, 0.676% 89.773%, 0.676% 89.773%, 0.746% 91.247%, 0.951% 92.646%, 1.279% 93.951%, 1.719% 95.142%, 2.259% 96.201%, 2.889% 97.11%, 3.597% 97.849%, 4.373% 98.4%, 5.204% 98.745%, 6.081% 98.864%, 93.919% 98.864%, 93.919% 98.864%, 94.796% 98.745%, 95.627% 98.4%, 96.403% 97.849%, 97.111% 97.11%, 97.741% 96.201%, 98.281% 95.142%, 98.721% 93.951%, 99.049% 92.646%, 99.254% 91.247%, 99.324% 89.773%, 99.324% 10.44%, 99.324% 10.44%, 99.24% 8.826%, 98.997% 7.312%, 98.61% 5.918%, 98.096% 4.668%, 97.469% 3.584%, 96.744% 2.688%, 95.937% 2.003%, 95.063% 1.551%, 94.138% 1.354%, 93.176% 1.435%);
$sc: polygon(62.821% 25.676%, 0% 101.351%, 98.718% 105.405%, 100.641% 0%, 60.256% 47.297%, 62.821% 25.676%);

.actives {
  position: relative;

  border: 0 !important;

  .text {
    background: linear-gradient(135deg, #F68903, #BCD91A);
    background-clip: text;
    color: transparent;
    z-index: 5 !important;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(135deg, #F68903, #BCD91A) !important;
    border-radius: 8rpx;
    z-index: 3;

  }

  &::after {
    content: '';
    position: absolute;
    top: 2rpx;
    left: 2rpx;
    bottom: 2rpx;
    right: 2rpx;
    background: #272727 !important;
    border-radius: 8rpx;
    z-index: 4;

  }
}

.box,
.cpubox {
  @apply relative;
  width: 680rpx;
  margin: 0 auto;
}

.budget {
  margin-top: 30rpx;
  width: 680rpx;
  height: 410rpx;
  padding: 34rpx;
  box-sizing: border-box;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(115deg, rgba(#fff, 1), rgba(#fff, .1), rgba(#fff, 1));
    clip-path: $bg;
    z-index: 1;
  }

  &::after {
    content: '';
    position: absolute;
    top: 2rpx;
    left: 2rpx;
    bottom: 2rpx;
    right: 2rpx;
    background: #272727;
    clip-path: $bg;
    z-index: 2;
  }

  .content {
    position: relative;
    font-size: 40rpx;
    font-weight: 600;
    height: 68rpx;
    width: 512rpx;
    border-bottom: 2rpx solid rgba($color: #fff, $alpha: .2);
    z-index: 3;

  }

  .setupbox {
    margin-top: 44rpx;
    position: relative;
    z-index: 3;

    .langLine {
      position: relative;
      width: 600rpx;
      height: 4rpx;
      border-radius: 2rpx;
      background-color: #fff;

      .bg {
        position: absolute;
        height: 4rpx;
        background-color: #A7F522;
      }

      .circle {

        margin-top: -14rpx;
        width: 30rpx;
        height: 30rpx;
        background-color: #A7F522;
        border-radius: 50%;

        .text {
          text-align: center;
          margin-top: 35rpx
        }
      }
    }
  }

  .price {
    position: relative;
    z-index: 3;
    width: 100%;
    margin-top: 70rpx;
    @apply flex flex-wrap;

    .priceItem {
      margin-bottom: 16rpx;
      width: 33.33%;
      @apply flex-center;

      .item {
        width: 180rpx;
        height: 52rpx;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 24rpx;
        border: 2rpx solid #fff;
        border-radius: 8rpx;

      }

    }
  }

}

.cir {
  position: absolute;
  right: 10rpx;
  top: 10rpx;
  width: 64rpx;
  height: 64rpx;
  background: linear-gradient(90deg, rgba(#fff, 1), rgba(#fff, .1), rgba(#fff, 1));
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  .cir2 {
    width: 60rpx;
    height: 60rpx;
    background: #272727;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    .line {
      transform: rotate(135deg);
      width: 36rpx;
      height: 4rpx;
      background: linear-gradient(90deg, rgba(#fff, 1), rgba(#fff, .1), rgba(#fff, 1));
    }
  }
}

.cpubox {

  .cpu {
    margin-top: 30rpx;
    position: relative;
    width: 680rpx;
    height: 410rpx;
    padding: 34rpx;
    box-sizing: border-box;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: linear-gradient(115deg, rgba(#fff, 1), rgba(#fff, .1), rgba(#fff, 1));
      clip-path: $bg;
      z-index: 1;
    }

    &::after {
      content: '';
      position: absolute;
      top: 2rpx;
      left: 2rpx;
      bottom: 2rpx;
      right: 2rpx;
      background: #272727;
      clip-path: $bg;
      z-index: 2;
    }

    .content {
      position: relative;
      z-index: 3;
      font-size: 40rpx;
      font-weight: 600;
      height: 68rpx;
      width: 512rpx;
      border-bottom: 2rpx solid rgba($color: #fff, $alpha: .2);
    }

    .itembox {
      position: relative;
      z-index: 3;
      display: flex;
      justify-content: space-between;
      margin-top: 60rpx;

      .cpuitem {
        width: 292rpx;
        height: 174rpx;
        position: relative;
        border-radius: 16rpx;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 145rpx;
        color: #272727;

        &::after {
          content: '';
          position: absolute;
          top: 4rpx;
          left: 4rpx;
          bottom: 4rpx;
          right: 4rpx;
          clip-path: $bg2;
          background-color: #fff;
          z-index: -1;
        }

        &.active::after {
          background-color: rgba($color: #fff, $alpha: .96)
        }

        &::before {
          content: '';
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          clip-path: $bg2;
          background-color: #fff;
          z-index: -2;
        }

        &.active::before {
          background-color: #A7F522;
        }

        .icon {
          position: absolute;
          bottom: -10rpx;
        }

        .triangle {
          position: absolute;
          bottom: 2rpx;
          right: 4rpx;
          width: 156rpx;
          height: 78rpx;
          background: rgba($color: #A7F522, $alpha: .2);
          clip-path: $sc;
          overflow: hidden;
          border-bottom-right-radius: 16rpx;

          .icons {
            position: absolute;
            bottom: 2rpx;
            right: 16rpx;
            font-size: 28rpx;
            color: #fff;
          }

          &::after {
            content: '';
            position: absolute;
            left: -8rpx;
            bottom: -8rpx;
            top: 0;
            right: 0;
            transform: translate(10%, 10%);
            background: rgba($color: #A7F522, $alpha: 1);
            clip-path: $sc;
            z-index: -1;
          }

        }
      }
    }

  }
}

.btn {
  width: 440rpx;
  height: 80rpx;
  background-color: #A7F522;
  border-radius: 4rpx;
  line-height: 80rpx;
  text-align: center;
  color: #333;
  font-size: 28rpx;
  font-weight: bold;
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  bottom: calc(38rpx + env(safe-area-inset-bottom));
}

.btn:active {
  background-color: #7bbd09;
}
</style>
