<script setup lang="ts">
const emits = defineEmits(['addCar', 'buyNow'])

const { products } = storeToRefs(useBuyStore())

const addCar = () => {
  emits('addCar')
}

const buyNow = () => {
  emits('buyNow')
}
</script>

<template>
  <div class="operation">
    <div class="wrap">
      <div class="left">
        <div class="item">
          <div class="icon">
            <div class="i-icons-share" />
          </div>
          <div class="name">
            分享
          </div>
        </div>
        <div class="item" @click="() => Jump('/pages/buy/buy')">
          <div class="icon">
            <div class="i-icons-buy" />
            <div v-if="products && products.length" class="num">
              {{ products.length }}
            </div>
          </div>
          <div class="name">
            购物车
          </div>
        </div>
      </div>
      <div class="right">
        <div class="item">
          <div class="btn" @click="addCar">
            加入购物车
          </div>
        </div>
        <div class="item">
          <div class="btn" @click="buyNow">
            立即购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.operation {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: var(--tabbar-height-all);
      background-color: rgba(#444444, 0.6);
      backdrop-filter: blur(48rpx);
      z-index: 100;
      box-shadow: 0px -2rpx 10rpx 0px rgba(0, 0, 0, 0.05);

      .wrap {
        height: calc(100% - env(safe-area-inset-bottom));
        @apply flex-between;
        padding: 0 32rpx;
        gap: 40rpx;

        .left,
        .right {
          height: 100%;
          @apply flex-between;
        }

        .left {
          margin-left: -16rpx;

          .item {
            height: 100%;
            padding: 0 24rpx;
            @apply flex-center;
            flex-direction: column;

            .icon {
              @apply flex-center;
              font-size: 40rpx;
              position: relative;

              .num {
                $size: 40rpx;
                position: absolute;
                top: calc($size / 4 * -1);
                right: calc($size / 2 * -1);
                @apply flex-center;

                font-size: 20rpx;
                color: #fff;
                width: $size;
                height: $size;
                border-radius: 50%;
                background-color: rgba(245, 63, 63, 1);
              }
            }

            .name {
              font-size: 20rpx;
              line-height: 40rpx;
              font-weight: 400;
            }
          }

        }

        .right {
          justify-content: center;

          .item {
            color: rgba(19, 17, 18, 1);
            padding: 10rpx 40rpx;
            padding-right: 50rpx;
            position: relative;
            z-index: 0;

            --path: polygon(90.957% 78.538%, 98.117% 39.269%, 98.117% 39.269%, 98.844% 34.141%, 99.226% 28.82%, 99.288% 23.477%, 99.052% 18.285%, 98.544% 13.418%, 97.786% 9.049%, 96.802% 5.349%, 95.616% 2.493%, 94.252% 0.652%, 92.733% 0%, 9.836% 0%, 9.836% 0%, 8.241% 0.491%, 6.727% 1.912%, 4.027% 7.235%, 2.881% 10.983%, 1.898% 15.353%, 1.098% 20.267%, 0.501% 25.647%, 0.129% 31.417%, -0% 37.5%, -0% 62.5%, -0% 62.5%, 0.129% 68.583%, 1.898% 84.647%, 2.881% 89.016%, 4.027% 92.765%, 5.316% 95.814%, 6.727% 98.088%, 8.241% 99.509%, 9.836% 100%, 80.189% 100%, 81.468% 99.762%, 82.723% 99.059%, 83.946% 97.905%, 85.129% 96.318%, 86.265% 94.311%, 87.345% 91.901%, 88.362% 89.103%, 89.309% 85.933%, 90.176% 82.406%, 90.957% 78.538%);
            --path: polygon(90.957% 78.538%, 98.117% 39.269%, 98.117% 39.269%, 98.844% 34.141%, 99.226% 28.82%, 99.288% 23.477%, 99.052% 18.285%, 98.544% 13.418%, 97.786% 9.049%, 96.802% 5.349%, 95.616% 2.493%, 94.252% 0.652%, 92.733% 0%, 9.836% 0%, 9.836% 0%, 8.241% 0.491%, 6.727% 1.912%, 4.027% 7.235%, 2.881% 10.983%, 1.898% 15.353%, 1.098% 20.267%, 0.501% 25.647%, 0.129% 31.417%, -0% 37.5%, -0% 62.5%, -0% 62.5%, 0.129% 68.583%, 1.898% 84.647%, 2.881% 89.016%, 4.027% 92.765%, 5.316% 95.814%, 6.727% 98.088%, 8.241% 99.509%, 9.836% 100%, 80.189% 100%, 81.468% 99.762%, 82.723% 99.059%, 83.946% 97.905%, 85.129% 96.318%, 86.265% 94.311%, 87.345% 91.901%, 88.362% 89.103%, 89.309% 85.933%, 90.176% 82.406%, 90.957% 78.538%);

            &::after {
              content: "";
              position: absolute;
              z-index: -1;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              clip-path: var(--path);
              transform-origin: center center;
              background-color: #fff;
            }

            &::after {
              content: "";
              position: absolute;
              z-index: -1;
              left: 0;
              top: 0;
              width: 100%;
              height: 100%;
              clip-path: var(--path);
              transform-origin: center center;
              background-color: #fff;
            }

            &:last-child {
              &::after {
                background-color: #a7f522;
                transform: rotate(180deg) translateX(12rpx);
              }

              &:last-child {
                &::after {
                  background-color: #a7f522;
                  transform: rotate(180deg) translateX(12rpx);
                }

                &::before {
                  content: "";
                  position: absolute;
                  z-index: -1;
                  left: 8rpx;
                  top: 8rpx;
                  width: 100%;
                  height: 100%;
                  transform-origin: center center;
                  transform: rotate(180deg) translateX(12rpx);
                  clip-path: var(--path);
                  background-color: rgba($color: #a7f522, $alpha: 0.2);
                }
              }

              &::before {
                content: "";
                position: absolute;
                z-index: -1;
                left: 8rpx;
                top: 8rpx;
                width: 100%;
                height: 100%;
                transform-origin: center center;
                transform: rotate(180deg) translateX(12rpx);
                clip-path: var(--path);
                background-color: rgba($color: #a7f522, $alpha: 0.2);
              }
            }

            .btn {
              font-size: 28rpx;
              font-weight: 400;
              line-height: 40rpx;
            }
          }
        }
      }
    }
</style>
