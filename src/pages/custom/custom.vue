<script lang="ts" setup>
const { detail } = storeToRefs(useProductStore())
function JumpDetail() {
  detail.value = {
    typeParentID: 6,
  } as Product
  Jump('/pages/product/detail')
}
</script>

<template>
  <div class="custom">
    <navbar-home text="智能推荐" />
    <div class="body">
      <div class="wrap left">
        <div class="item movein" @click="() => { Jump('/pages/recommend/screen') }">
          <image class="image bounce" :src="StaticUrl('/images/custom_left.png')" mode="scaleToFill" />
        </div>
      </div>
      <div class="wrap right">
        <div class="item movein" @click="JumpDetail">
          <image class="image bounce" :src="StaticUrl('/images/custom_right.png')" mode="scaleToFill" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .custom {
    height: var(--body-min-height);

    .body {
      height: 100%;

      .wrap {
        width: 100%;
        height: 50%;
        position: relative;

        .item {
          position: relative;
          width: 62%;
          display: inline-block;
          opacity: 0;

          .image {
            width: 460rpx;
            height: 580rpx;

            &.bounce {

              animation: bounce 1s infinite alternate;

              @keyframes bounce {
                0% {
                  transform: translateY(-15rpx);
                }

                100% {
                  transform: translateY(15rpx);
                }
              }
            }
          }
        }

        &.left {
          text-align: left;

          .item {
            left: 0;
            top: 32%;
            z-index: 2;

            &.movein {
              opacity: 1;
              animation: leftmove 1s;

              @keyframes leftmove {
                0% {
                  left: -100%;
                }

                100% {
                  left: 0;
                }
              }
            }

            .image {
              animation-delay: 1.1s;
            }
          }
        }

        &.right {
          text-align: right;

          .item {
            right: 0;
            bottom: 32%;
            z-index: 1;

            &.movein {
              opacity: 1;
              animation: rightmovein 1s;

              @keyframes rightmovein {
                0% {
                  right: -100%;
                }

                100% {
                  right: 0;
                }
              }
            }

            .image {
              animation-delay: 1.2s;
            }
          }
        }
      }
    }
  }
</style>

<route lang="json">
{
  "layout": "home"
}
</route>
