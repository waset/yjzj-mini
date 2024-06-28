<script setup lang="ts">
const props = defineProps<{
  list: Product[]
}>()
const emit = defineEmits<{
  (e: 'confirm', index: number): void
  (e: 'loadmore'): void
}>()
const selectIndex = ref<number>(0)

const isSelect = (index: number) => {
  return index === selectIndex.value
}

const okfn = () => {
  emit('confirm', selectIndex.value)
}
// 触底加载
const reachBottom = () => {
  emit('loadmore')
}
</script>

<template>
  <scroll-view :scroll-y="true" class="scroll-view" @scrolltolower="reachBottom">
    <div v-for="(item, index) in props.list" :key="index">
      <div class="select" @click="selectIndex = index">
        <div v-if="isSelect(index)" class="selectbg" />
        <div v-if="isSelect(index)" class="selected">
          <div class="icon i-icons-correct" />
        </div>
        <div v-if="!isSelect(index)" class="line topLine" />
        <div v-if="!isSelect(index)" class="line bottomLine" />
        <div class="goodsImg">
          <image class="img" :src="ImageUrl(item.banner[0])" mode="scaleToFill" />
        </div>
        <div class="goodsInfo">
          <div class="row1 fs28">
            {{ item.name }}
          </div>
          <div class="row2 fs20">
            {{ item.description }}
          </div>
          <div class="row3">
            <div class="fs24 check">
              查看详情
              <div class="i-icons-right" />
            </div>
            <div class="fs32 price">
              ￥{{ item.sellPrice }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="empty" />
  </scroll-view>

  <div class="bottom">
    <div class="center">
      <div class="left" />
      <div class="right">
        <div class="cancel">
          取消
        </div>
        <div class="confirm" @click="okfn">
          确定
          <div class="confirm2" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fs20 {
  font-size: 20rpx;
}

.fs24 {
  font-size: 24rpx;
}

.fs28 {
  font-size: 28rpx;
}

.fs32 {
  font-size: 32rpx;
}

.scroll-view {
  height: 626rpx;

  .empty {
    height: 40rpx;
  }
}

.select {
  position: relative;
  border-radius: 16rpx;
  height: 192rpx;
  background-color: rgba(#000, 0.2);
  padding: 16rpx;
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

  .selectbg {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(../../assets/svg/compon-select.svg) no-repeat;
    background-size: 109% 105%;
    border-radius: 16rpx;
    opacity: 0.2;
    z-index: -1;
  }

  .line {
    position: absolute;
    width: 100%;
    left: 0;
    height: 2rpx;
    background: linear-gradient(to right, rgba(#91DC10, 0), #A7F522, rgba(#91DC10, 0));
  }

  .topLine {
    top: 0;
  }

  .bottomLine {
    bottom: 0;
  }

  .goodsImg {
    width: 160rpx;
    height: 160rpx;
    margin-right: 16rpx;
    background: url(../../assets/svg/product_bg.svg) no-repeat;
    display: flex;
    align-items: center;
    justify-content: center;

    .img {
      width: 100rpx;
      height: 100rpx;
    }
  }

  .goodsInfo {
    flex: 1;
    height: 100%;

    .row1 {
      font-weight: 600;

    }

    .row1,
    .row2 {
      width: 400rpx;
      color: #f5f5f5;
      margin-bottom: 10rpx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .row3 {
      margin-top: 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        color: #A7F522;
        font-weight: 600;
      }

      .check {
        color: #BEBEBE;
      }
    }
  }
}

.bottom {
  padding: 32rpx 0;
  padding-bottom: calc(32rpx + env(safe-area-inset-bottom));
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background-color: rgba(#444444, 0.6);
  backdrop-filter: blur(48rpx);
  color: #f5f5f5;
  z-index: 9;
  box-shadow: 0px -2rpx 10rpx 0px rgba(0, 0, 0, 0.05);

  .center {
    position: relative;
    display: flex;
    color: #f5f5f5;
    justify-content: space-between;
    align-items: center;
    padding: 0 32rpx;
    box-sizing: border-box;
  }

  .left {
    width: 272rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .number {
      font-size: 28rpx;
    }

    .counter {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 196rpx;
      height: 80rpx;
      background-color: rgba($color: #fff, $alpha: .2);
      border-radius: 40rpx;
      z-index: 99;
      padding: 28rpx 10rpx;
      box-sizing: border-box;
      font-size: 32rpx;
      margin-left: 16rpx;

      .plus,
      .reduce {
        width: 60rpx;
        height: 60rpx;
        display: flex;
        align-items: center;
        justify-content: center;
      }

    }
  }

  .right {
    display: flex;
    align-items: center;
    color: #000;
    position: relative;
    width: 392rpx;

    .confirm,
    .cancel,
    .confirm2 {
      position: absolute;
      right: 32rpx;
      width: 186rpx;
      height: 64rpx;
      line-height: 64rpx;
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
        height: 64rpx;
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
        height: 64rpx;
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

      &::after {
        background-color: #57683B;
      }

      &::before {
        background-color: #57683B;
      }
    }

    .cancel {
      left: 6rpx;
      padding-left: 60rpx;
      padding-right: 50rpx;

      &::after {
        left: 24rpx;
        border-radius: 30rpx;
        height: 64rpx;
        background: #ffffff;
        transform: skewX(-30deg);
        z-index: -1;
        border-bottom-right-radius: 20rpx;
      }

      &::before {

        right: 21rpx;
        width: 162rpx;
        height: 64rpx;
        border-radius: 25rpx;
        background: #ffffff;
        z-index: -1;

      }
    }

  }
}
</style>
