<script setup lang="ts">
const bannerImages = ref<any>([{ name: 1 }, { name: 2 }])

const bannerSwiper = ref()
const current = ref(0)
const onChange = () => {
  current.value = bannerSwiper.value?.swiper.realIndex
}

onShow(() => {
  bannerSwiper.value?.swiper.autoplay.start()
})

onHide(() => {
  bannerSwiper.value?.swiper.autoplay.stop()
})
</script>

<template>
  <div
    class="banner" :style="{
      '--carousel-length': bannerImages.length,
    }"
  >
    <z-swiper
      ref="bannerSwiper" v-model="bannerImages" :options="{
        loop: false,
        autoplay: true,
        navigation: {
          slot: true,
        },
      }" @slide-change="onChange"
    >
      <z-swiper-item v-for="(item, index) in bannerImages" :key="index">
        <div class="goods">
          <image class="box" src="@/assets/sun/s_boxtitle.svg" mode="scaleToFill" />
          <div class="goodsboxwhite">
            <div class="number">
              <div>限购</div>
              <div>200/200</div>
            </div>

            <div class="watermark">
              <div class="i-svg-star" />
              <div>YJZJ</div>
              <div class="i-svg-star" />
            </div>
            <div class="watermark2">
              <div class="i-svg-star" />
              <div>YJZJ</div>
              <div class="i-svg-star" />
            </div>
            <div class="centerorg">
              <div class="goodstitle">
                华硕百家之言
              </div>
              <div class="center">
                <div class="icon i-svg-sbgs" />
              </div>

              <div class="buybtn">
                <div class="price">
                  <div class="nowprice">
                    ￥1231
                  </div>
                  <div class="oldprice">
                    ￥1231
                  </div>
                </div>
                <div class="jiantou i-svg-jiantou" />
                <div class="txt">
                  抢
                </div>
              </div>
            </div>
          </div>
        </div>
      </z-swiper-item>

      <template #pre-button>
        <div class="switch left">
          <div class="lefticon i-svg-swiperright" />
        </div>
      </template>

      <template #next-button>
        <div class="switch right">
          <div class="righticon i-svg-swiperright" />
        </div>
      </template>
    </z-swiper>
    <div class="tet">
      {{ current + 1 }}/{{ bannerImages.length }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tet {
  position: absolute;
  bottom: 8%;
  left: 50%;
  transform: translate(-50%);
  font-size: 40rpx;
  font-weight: 600;
  color: #FF2828;
}

.banner {
  position: relative;

  .image {
    width: 100%;
    height: 1200rpx;
  }

  .switch {
    position: absolute;
    top: 410rpx;

    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 100%;
    font-size: 43px;
    color: #fff;
    z-index: calc(var(--carousel-length) + 1);

    &.left {
      left: 170rpx;
      transform: rotate(180deg);

    }

    &.right {
      right: 170rpx;
    }
  }

  .indicator {
    position: absolute;
    bottom: 40rpx;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: calc(var(--carousel-length) + 1);

    .item {
      width: 16rpx;
      height: 16rpx;
      border-radius: 32rpx;
      // background: rgba(255, 255, 255, 0.2);
      margin: 0 10rpx;
      cursor: pointer;
      transition: width 0.3s ease-in-out;

      &.active {
        width: 48rpx;
        background: rgba(255, 255, 255, 0.8);
      }
    }
  }

  .goods {
    margin-top: 80rpx;
    height: 950rpx;
    // background-color: #c2baba;
    display: flex;
    justify-content: center;
    position: relative;

    .box {
      width: 500rpx;
      height: 156rpx;
    }

    .goodsboxwhite {
      position: absolute;
      top: 66rpx;
      border-radius: 16rpx;
      width: 556rpx;
      height: 704rpx;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;

      .number {

        position: absolute;
        top: 40%;
        left: 1%;
        transform: rotate(-35deg);

        font-size: 24rpx;
        font-weight: 600;
        text-align: center;
        width: 150rpx;
        height: 88rpx;
        border-radius: 50%;
        background-color: #F03E3F;

      }

      .watermark {
        position: absolute;
        top: 60rpx;
        right: -46rpx;
        transform: rotate(90deg);
        height: 40rpx;
        width: 120rpx;
        display: flex;
        font-size: 28rpx;
        color: #000;
        font-weight: 600;
      }

      .watermark2 {
        position: absolute;
        bottom: 60rpx;
        left: -48rpx;
        transform: rotate(-90deg);
        height: 40rpx;
        width: 120rpx;
        display: flex;
        font-size: 28rpx;
        color: #000;
        font-weight: 600;
      }

      .centerorg {
        width: 504rpx;
        height: 634rpx;
        border-radius: 16rpx;

        background: linear-gradient(to bottom, #F03E3F 5%, #F35030, #F8661F, #FF8B00);

        @keyframes pulse {

          /* 动画开始时（0%），按钮保持原样 */
          0% {
            transform: scale(1);
          }

          /* 在动画的50%处，按钮放大1.5倍 */
          50% {
            transform: scale(1.2);
          }

          /* 动画结束时（100%），按钮恢复原尺寸 */
          100% {
            transform: scale(1);
          }
        }

        .buybtn {
          width: 348rpx;
          height: 84rpx;
          border-radius: 42rpx;
          margin: 0 auto;
          background: linear-gradient(to bottom, #FF4E08, #FF2727);
          display: flex;
          align-items: center;
          padding: 0 26rpx;
          justify-content: space-between;
          /* 指定动画名称 */
          animation-name: pulse;
          /* 动画持续时间为1秒 */
          animation-duration: 1s;
          /* 动画无限循环 */
          animation-iteration-count: infinite;
          /* 动画执行方式可以平滑过渡 */
          animation-timing-function: ease-in-out;

          .price {
            box-sizing: border-box;
            padding-top: 4rpx;
            width: 170rpx;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .nowprice {
              font-size: 40rpx;

            }

            .oldprice {
              font-size: 20rpx;
              text-decoration: line-through;
            }
          }

          .jiantou {
            height: 100%;
          }

          .txt {
            font-size: 52rpx;
          }
        }

        .goodstitle {
          font-size: 34rpx;
          width: 432rpx;
          font-weight: 600;
          color: #000;
          margin: 10rpx auto 0;
          text-align: center;
        }

        .center {
          width: 432rpx;
          height: 426rpx;
          background-color: #FFC16C;
          margin: 14rpx auto 26rpx;

          .icon {
            width: 432rpx;
            height: 426rpx;
          }
        }
      }
    }
  }
}
</style>
