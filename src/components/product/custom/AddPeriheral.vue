<script setup lang="ts">
const emit = defineEmits<{
  addPeriherals: []
  showSelected: []
  cancle: []
}>()

const { detail } = storeToRefs(useProductStore())

// 确认选购
const addPeriheral = () => {
  emit('addPeriherals')
}

const showSelect = () => {
  emit('showSelected')
}

const cancelbtn = () => {
  emit('cancle')
}
</script>

<template>
  <div class="operation">
    <div class="wrap">
      <div class="left">
        <template v-if="detail?.perihera && detail.perihera.length > 0">
          <div class="item" @click="showSelect">
            <div class="icon">
              <div class="i-icons-buy" />
              <template v-if="detail?.perihera && detail.perihera.length > 0">
                <div class="num">
                  {{ detail.perihera.length }}
                </div>
              </template>
            </div>
            <div class="name">
              已选
            </div>
          </div>
        </template>
      </div>
      <div class="right">
        <div class="center">
          <div class="cancel" @click="cancelbtn">
            取消
          </div>
          <div class="confirm" @click="addPeriheral">
            确定选购
            <div class="confirm2" />
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

        .btn {
          // 清除系统button样式
          all: unset;
          display: inline-block;

          &::after {
            content: none;
          }
        }
      }

    }

    .center {
      position: relative;
      height: 80rpx;
      display: flex;
      color: #000;
      justify-content: center;
      align-items: center;
      // box-sizing: border-box;

      .confirm,
      .cancel,
      .confirm2 {
        position: relative;
        right: 32rpx;
        width: 256rpx;
        height: 80rpx;
        line-height: 80rpx;
        font-size: 28rpx;
        font-weight: 400;
        // margin-right: 40rpx;
        color: #000;
        text-align: center;
        z-index: 10;
        padding-left: 50rpx;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 26rpx;
          right: 0;
          bottom: 0;
          border-radius: 30rpx;
          height: 80rpx;
          background: #A7F522;
          transform: skewX(-30deg);
          z-index: -1;
          border-top-left-radius: 20rpx;
        }

        &::before {
          content: "";
          position: absolute;
          top: 0;
          right: -20rpx;
          width: 162rpx;
          height: 80rpx;
          border-radius: 25rpx;
          background: #A7F522;
          z-index: -1;

        }

      }

      .confirm2 {
        position: absolute;
        top: 8rpx;
        left: 8rpx;
        z-index: -2;

        &::after,
        &::before {
          background-color: #57683B;
        }

      }

      .cancel {
        left: 6rpx;
        padding-left: 60rpx;
        padding-right: 50rpx;
        margin-right: 20rpx;
        width: 180rpx;

        &::after {
          left: 85rpx;
          border-radius: 30rpx;
          height: 80rpx;
          background: #ffffff;
          transform: skewX(-30deg);
          z-index: -1;
          border-bottom-right-radius: 20rpx;
        }

        &::before {

          right: 22rpx;
          width: 165rpx;
          height: 80rpx;
          border-radius: 25rpx;
          background: #ffffff;
          z-index: -1;

        }
      }
    }
  }
}
</style>
