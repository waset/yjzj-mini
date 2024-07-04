<script lang="ts" setup>
interface Props {
  coupn: couponList[]
  isSelect?: boolean
  maxwidth?: number
}
const props = withDefaults(defineProps<Props>(), {
  isSelect: true,
  maxwidth: 500,
})

const emit = defineEmits<{
  click: [index: number]
  change: [index: number]
}>()

enum TimeTypeEnum {
  day = 1,
  today = 2,
  setTime = 3,
}

const TimeConversion = (item: couponList) => {
  const useTimeType = item.ticketInfo.useTimeType
  switch (useTimeType) {
    case TimeTypeEnum.day:
      return item.ticketInfo.useTimeDays
    case TimeTypeEnum.today:
      return '当天内可用'
    case TimeTypeEnum.setTime:
      return `${item.ticketInfo.useStartAt}-${item.ticketInfo.useEndAt}`
    default:
      return ''
  }
}

const compareTime = (targetTime: string) => {
  // 将目标时间转换为时间戳（单位：毫秒）
  const targetTimestamp = Date.parse(targetTime)

  // 获取当前时间的时间戳（单位：毫秒）
  const currentTimestamp = Date.now()
  if (!targetTime)
    return '#8E8B84' // 处理空或无效的时间输入
  // 比较目标时间戳与当前时间戳
  if (targetTimestamp > currentTimestamp) {
    return '#D3AC4D'
  }
  else if (targetTimestamp < currentTimestamp) {
    return '#8E8B84'
  }
  else {
    return '#8E8B84'
  }
}

const selectId = ref<number>(0)

const slect = (index: number) => {
  selectId.value = props.coupn[index]?.id ?? 0
  emit('change', index)
}
onMounted(() => {

})
</script>

<template>
  <div>
    <template v-for="(item, index) in props.coupn" :key="index">
      <div class="item" @click.stop="slect(index)">
        <div class="left">
          <div class="coupon-bg">
            <div class="couponL">
              <div class="couponL-up" :style="{ background: compareTime(item.useEndAt) }">
                <div class="couponName">
                  立减券
                </div>
              </div>
            </div>
          </div>
          <div class="couponC-bg" :style="{ width: `${maxwidth}rpx` }">
            <div class="couponC" :style="{ width: `${maxwidth}rpx` }">
              <div class="couponC-lineL" />
              <div class="couponC-up">
                <div class="textBox">
                  <div class="bgc" :style="{ background: compareTime(item.useEndAt) }">
                    <div class="body">
                      <div class="row1">
                        <div class="l">
                          <span style="font-size: 32rpx;">￥</span>
                          <span style="font-size: 64rpx;">{{ item.ticketInfo.discountPrice }}</span>
                        </div>
                        <template v-if="compareTime(item.useEndAt) === '#D3AC4D'">
                          <div class="r">
                            <span style="color: #EDA522;">
                              <span> {{ TimeConversion(item) }}</span>
                            </span>
                            <span>
                              <span>天内使用</span>
                              <!-- <span v-if="isSelect">| 立即使用 >></span> -->
                            </span>
                          </div>
                        </template>
                        <template v-if="compareTime(item.useEndAt) === '#8E8B84'">
                          <div class="r">
                            <span style="color: #fff;">
                              <span> 已过期</span>
                            </span>
                          </div>
                        </template>
                      </div>
                      <div class="row2">
                        满{{ item.ticketInfo.overPrice }}元可用
                      </div>
                      <div class="row3" @click.stop="emit('click', index)">
                        规则>>
                      </div>

                      <div class="row4">
                        {{ item.ticketInfo.no }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="couponC-lineR" />
            </div>
          </div>
          <div class="coupon-bg">
            <div class="couponR">
              <div class="couponR-up" :style="{ background: compareTime(item.useEndAt) }">
                <div class="barcode">
                  <div class="Coarse" />
                  <div class="fine" />
                  <div class="in" />
                  <div class="in" />
                  <div class="fine" />
                  <div class="fine" />
                  <div class="in" />
                  <div class="fine" />
                  <div class="fine" />
                  <div class="Coarse" />
                  <div class="in" />
                  <div class="fine" />
                  <div class="in" />
                  <div class="fine" />
                  <div class="fine" />
                  <div class="in" />
                  <div class="fine" />
                  <div class="Coarse" />
                  <div class="in" />
                  <div class="in" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <template v-if="isSelect">
          <div class="right">
            <template v-if="selectId === item?.id">
              <div class="Default">
                <div class="icon i-icons-correct" />
              </div>
            </template>
            <template v-else>
              <div class="noDefault" />
            </template>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;
$Be: #BEBEBE;

.item {
  // width: 678rpx;
  margin: 16rpx auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24rpx;
  --between-path: polygon(0% 89.852%, 0% 9.367%, 0% 9.367%, 4.774% 9.194%, 9.302% 8.804%, 13.527% 8.216%, 17.393% 7.447%, 20.847% 6.515%, 23.832% 5.435%, 26.293% 4.227%, 28.174% 2.907%, 29.42% 1.492%, 29.976% 0%, 67.525% 0%, 67.525% 0%, 68.104% 1.529%, 69.407% 2.977%, 71.376% 4.324%, 73.949% 5.552%, 77.068% 6.642%, 80.673% 7.576%, 84.703% 8.335%, 89.099% 8.9%, 93.801% 9.253%, 98.75% 9.375%, 98.75% 9.375%, 98.876% 9.375%, 99.001% 9.375%, 99.126% 9.374%, 99.251% 9.374%, 99.377% 9.373%, 99.501% 9.372%, 99.626% 9.371%, 99.751% 9.37%, 99.876% 9.369%, 100% 9.367%, 100% 89.852%, 100% 89.852%, 99.876% 89.85%, 99.751% 89.849%, 99.626% 89.848%, 99.501% 89.847%, 99.377% 89.846%, 99.251% 89.845%, 99.126% 89.845%, 99.001% 89.844%, 98.876% 89.844%, 98.75% 89.844%, 98.75% 89.844%, 93.681% 89.972%, 88.873% 90.342%, 84.389% 90.934%, 80.294% 91.728%, 76.653% 92.704%, 73.529% 93.842%, 70.988% 95.122%, 69.093% 96.523%, 67.909% 98.025%, 67.5% 99.609%, 67.5% 99.609%, 67.5% 99.649%, 67.501% 99.688%, 67.502% 99.727%, 67.504% 99.766%, 67.506% 99.805%, 67.509% 99.844%, 67.512% 99.883%, 67.516% 99.922%, 67.52% 99.961%, 67.525% 100%, 29.976% 100%, 29.976% 100%, 29.98% 99.961%, 29.984% 99.922%, 29.988% 99.883%, 29.991% 99.844%, 29.994% 99.805%, 29.996% 99.766%, 29.998% 99.727%, 29.999% 99.688%, 30% 99.649%, 30% 99.609%, 30% 99.609%, 29.61% 98.063%, 28.481% 96.593%, 26.672% 95.219%, 24.244% 93.96%, 21.255% 92.834%, 17.766% 91.859%, 13.836% 91.055%, 9.525% 90.44%, 4.893% 90.033%, 0% 89.852%);
  --center-path: polygon(95.446% 0%, 4.666% 0%, 4.666% 0%, 4.582% 1.492%, 4.393% 2.907%, 4.107% 4.227%, 3.733% 5.435%, 3.279% 6.515%, 2.755% 7.447%, 2.167% 8.216%, 1.525% 8.804%, 0.838% 9.194%, 0.112% 9.367%, 0.112% 89.852%, 0.112% 89.852%, 0.856% 90.033%, 1.559% 90.44%, 2.214% 91.055%, 2.811% 91.859%, 3.341% 92.834%, 3.795% 93.96%, 4.164% 95.219%, 4.439% 96.593%, 4.611% 98.063%, 4.67% 99.609%, 4.67% 99.609%, 4.67% 99.649%, 4.67% 99.688%, 4.67% 99.727%, 4.669% 99.766%, 4.669% 99.805%, 4.669% 99.844%, 4.668% 99.883%, 4.668% 99.922%, 4.667% 99.961%, 4.666% 100%, 95.446% 100%, 95.446% 100%, 95.445% 99.961%, 95.445% 99.922%, 95.444% 99.883%, 95.444% 99.844%, 95.443% 99.805%, 95.443% 99.766%, 95.443% 99.727%, 95.442% 99.688%, 95.442% 99.649%, 95.442% 99.609%, 95.442% 99.609%, 95.501% 98.063%, 95.673% 96.593%, 95.948% 95.219%, 96.317% 93.96%, 96.771% 92.834%, 97.301% 91.859%, 97.898% 91.055%, 98.553% 90.44%, 99.257% 90.033%, 100% 89.852%, 100% 9.367%, 100% 9.367%, 99.275% 9.194%, 98.587% 8.804%, 97.945% 8.216%, 97.357% 7.447%, 96.833% 6.515%, 96.379% 5.435%, 96.005% 4.227%, 95.72% 2.907%, 95.53% 1.492%, 95.446% 0%);

  .left {
    display: flex;
    align-items: center;
    justify-content: center;

    .coupon-bg {
      position: relative;
      width: 40px;
      height: 128px;
      clip-path: var(--between-path);
      background-color: #3F3815;
    }

    .couponL,
    .couponR {
      position: absolute;
      top: -8rpx;
      width: 40px;
      height: 128px;
      clip-path: var(--between-path);
      background-color: #000;
      display: flex;
      align-items: center;
      justify-content: center;

      &-up,
      &-up {
        width: 74%;
        height: 86%;
        clip-path: var(--between-path);
        background-color: #D3AC4D;
        display: flex;
        align-items: center;
        justify-content: center;

        .couponName {
          font-size: 32rpx;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          writing-mode: vertical-lr;
          letter-spacing: 10rpx;
        }

        .barcode {
          display: flex;
          justify-content: center;
          flex-direction: column;
          width: 41rpx;
          height: 150rpx;

          .Coarse {
            width: 100%;
            height: 6rpx;
            background-color: #000;
            margin-bottom: 2rpx;
          }

          .fine {
            width: 100%;
            height: 4rpx;
            background-color: #000;
            margin-bottom: 4rpx;
          }

          .in {
            width: 100%;
            height: 2rpx;
            margin-bottom: 5rpx;
            background-color: #000;

          }

        }

      }
    }

    .couponC-bg {

      position: relative;
      width: 250px;
      height: 128px;
      clip-path: var(--center-path);
      background-color: #3F3815;

    }

    .couponC {
      position: absolute;
      top: -8rpx;
      width: 250px;
      height: 128px;
      clip-path: var(--center-path);
      background-color: #000;
      display: flex;
      align-items: center;
      justify-content: center;

      &-lineL {
        width: 2rpx;
        height: 170rpx;
        border: 2rpx dashed#fff;
        position: absolute;
        left: 0;
        top: 40rpx;
      }

      &-lineR {
        width: 2rpx;
        height: 170rpx;
        border: 2rpx dashed#fff;
        position: absolute;
        right: 0;
        top: 40rpx;
      }

      &-up {
        width: 94%;
        height: 86%;

        .textBox {
          position: relative;
          width: 100%;
          height: 100%;
          color: rgba($color: #fff, $alpha: .2);

          .bgc {
            width: 100%;
            height: 100%;
            z-index: 1;
            clip-path: var(--center-path);
            background-color: #D3AC4D;

          }

          // &::before {
          //   content: "";
          //   position: absolute;
          //   left: 0;
          //   top: 0;

          // }

          &::after {
            content: "";
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            z-index: 2;

            background-color: rgba($color: #fff, $alpha: .2);

            clip-path: polygon(0% 9.295%, 0% 89.93%, 0% 89.93%, 0.37% 89.989%, 0.731% 90.104%, 1.082% 90.274%, 1.424% 90.495%, 1.753% 90.767%, 2.07% 91.086%, 2.372% 91.45%, 2.66% 91.858%, 2.932% 92.306%, 3.187% 92.794%, 0.306% 9.25%, 0.306% 9.25%, 0.275% 9.256%, 0.245% 9.262%, 0.215% 9.268%, 0.184% 9.273%, 0.153% 9.277%, 0.123% 9.282%, 0.092% 9.286%, 0.062% 9.289%, 0.031% 9.292%, 0% 9.295%, 2.609% 7.444%, 36.692% 99.612%, 28.327% 99.612%, 2.178% 8.016%, 2.222% 7.963%, 2.267% 7.909%, 2.311% 7.854%, 2.354% 7.798%, 2.398% 7.742%, 2.441% 7.684%, 2.483% 7.625%, 2.526% 7.566%, 2.568% 7.505%, 2.609% 7.444%, 2.609% 7.444%, 3.446% 5.854%, 62.548% 99.612%, 50% 99.612%, 3.117% 6.573%, 3.151% 6.504%, 3.185% 6.434%, 3.219% 6.364%, 3.252% 6.293%, 3.286% 6.222%, 3.318% 6.15%, 3.351% 6.077%, 3.383% 6.003%, 3.414% 5.929%, 3.446% 5.854%, 3.446% 5.854%, 4.049% 3.998%, 100% 89.535%, 100% 89.93%, 99.981% 89.929%, 99.962% 89.927%, 99.943% 89.926%, 99.924% 89.925%, 99.905% 89.924%, 99.886% 89.924%, 99.867% 89.923%, 99.848% 89.923%, 99.829% 89.923%, 99.81% 89.922%, 99.81% 89.922%, 99.039% 90.049%, 98.308% 90.416%, 97.626% 91.004%, 97.003% 91.792%, 96.449% 92.76%, 95.974% 93.89%, 95.588% 95.159%, 95.299% 96.55%, 95.119% 98.041%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 95.057% 99.612%, 85.361% 99.612%, 3.817% 4.825%, 3.842% 4.745%, 3.867% 4.664%, 3.891% 4.582%, 3.915% 4.5%, 3.938% 4.418%, 3.961% 4.335%, 3.984% 4.251%, 4.006% 4.167%, 4.028% 4.083%, 4.049% 3.998%, 4.049% 3.998%, 4.416% 2.014%, 100% 37.209%, 100% 59.302%, 4.28% 2.91%, 4.296% 2.822%, 4.311% 2.733%, 4.325% 2.645%, 4.34% 2.556%, 4.353% 2.466%, 4.367% 2.376%, 4.379% 2.286%, 4.392% 2.196%, 4.404% 2.105%, 4.416% 2.014%, 4.416% 2.014%, 4.548% 0.37%, 4.546% 0.42%, 4.544% 0.469%, 4.542% 0.518%, 4.54% 0.567%, 4.538% 0.617%, 4.535% 0.666%, 4.532% 0.715%, 4.53% 0.764%, 4.527% 0.812%, 4.524% 0.861%, 4.524% 0.861%, 100% 10.853%, 100% 9.295%, 99.981% 9.296%, 99.962% 9.297%, 99.943% 9.299%, 99.924% 9.3%, 99.905% 9.3%, 99.886% 9.301%, 99.867% 9.302%, 99.848% 9.302%, 99.829% 9.302%, 99.81% 9.302%, 99.81% 9.302%, 99.058% 9.182%, 98.344% 8.833%, 97.676% 8.273%, 97.063% 7.522%, 96.515% 6.597%, 96.041% 5.517%, 95.65% 4.301%, 95.35% 2.967%, 95.151% 1.534%, 95.061% 0.019%, 95.061% 0.019%, 4.548% 0.37%, 1.548% 8.634%, 18.631% 99.612%, 11.787% 99.612%, 1.021% 8.985%, 1.075% 8.955%, 1.129% 8.924%, 1.182% 8.892%, 1.235% 8.859%, 1.288% 8.824%, 1.341% 8.789%, 1.393% 8.752%, 1.445% 8.714%, 1.497% 8.674%, 1.548% 8.634%, 1.548% 8.634%);
          }

          .body {
            padding-left: 20rpx;
            position: absolute;
            left: 0;
            right: 0;
            width: 100%;
            height: 100%;
            z-index: 3;
            color: #fff;

            .row1 {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .l {
                display: flex;
                align-items: center;
                // vertical-align: center;
              }

              .r {
                display: flex;
                align-items: center;
                font-size: 24rpx;
                padding: 8rpx 8rpx 8rpx 24rpx;
                background-color: #000;
                border-radius: 32rpx 0 0 32rpx;

              }
            }

            .row2 {
              font-size: 28rpx;
              color: #fff;
            }

            .row3 {
              margin-top: 16rpx;
              width: 102rpx;
              height: 48rpx;
              border-radius: 8rpx;
              font-size: 24rpx;
              padding: 4rpx 8rpx 4rpx 8rpx;
              border: 2rpx solid #fff;
            }

            .row4 {
              position: absolute;
              bottom: 20rpx;
              right: 40rpx;
              font-size: 24rpx;
              color: #fff;
            }
          }
        }

      }

    }

  }

  .right {
    margin-left: 16rpx;
    .noDefault {
      width: 40rpx;
      height: 40rpx;
      border: 2rpx solid #fff;
      border-radius: 50%;
    }

    .Default {
      width: 40rpx;
      height: 40rpx;
      background-color: #A7F522;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;

      .icon {
        color: #000;
      }
    }
  }
}
</style>
