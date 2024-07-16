<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
// 预删除外设
const delSelect = (id: number) => {
  if (detail.value) {
    const index = detail.value.perihera.findIndex(item => item.id === id)
    if (index === -1) {
      return
    }
    detail.value?.perihera.splice(index, 1)
  }
}

// 加减数量
const setNumber = (str: string, id: number) => {
  if (detail.value) {
    const index = detail.value.perihera.findIndex(item => item.id === id)
    let num = 1
    if (index === -1) {
      return
    }
    if (str === 'plus') {
      num = detail.value.perihera[index].number + 1
    }
    else {
      if (detail.value.perihera[index].number > 1) {
        num = detail.value.perihera[index].number - 1
      }
    }
    if (num < 1) {
      return
    }
    detail.value.perihera[index].number = num
  }
}

// 是否选中
const isSelect = (id: number) => {
  const index = detail.value?.perihera.findIndex((obj: any) => id === obj.id)
  if (index === -1) {
    return false
  }
  else {
    return true
  }
}

// 合计
const totalPrice = computed(() => {
  let result = 0
  detail.value?.perihera.forEach((item: any) => {
    result += (item.number * Number(item.sellPrice))
  })
  return result
})
// 数量
const totalNum = computed(() => {
  let result = 0
  detail.value?.perihera.forEach((item: any) => {
    result += item.number
  })
  return result
})
</script>

<template>
  <div>
    <template v-for="(item, index) in detail?.perihera" :key="index">
      <div class="card mb-4">
        <div class="select">
          <template v-if="isSelect(item.id)">
            <div class="selected">
              <div class="icon i-icons-correct" />
            </div>
            <div class="selectbg">
              <image class="image" src="@/assets/svg/compon-select.svg" mode="scaleToFill" />
            </div>
          </template>
          <template v-else>
            <div class="topLine line" />
            <div class="bottomLine line" />
          </template>
          <div class="goodsImg">
            <product-image :src="ImageUrl(item.banner[0])" />
          </div>
          <div class="goodsInfo">
            <div class="row1">
              {{ item.name }}
            </div>
            <div class="row2">
              {{ item.description }}
            </div>
            <div class="row3">
              <div class=" check">
                查看详情
                <div class="i-icons-right" />
              </div>
              <div class="price">
                <template v-if="isSelect(item.id) && item.number === 1">
                  <div> ￥{{ item.sellPrice }}</div>
                </template>
                <template v-if="isSelect(item.id) && item?.number !== 1">
                  <div class="circlec" @click="setNumber('cut', item.id)">
                    <div class="i-icons-minus" />
                  </div>
                  <div>{{ item.number }}</div>
                </template>

                <template v-if="isSelect(item.id)">
                  <div class="circle" @click="setNumber('plus', item.id)">
                    <div class="i-icons-add" />
                  </div>
                </template>
              </div>
            </div>
            <template v-if="isSelect(item.id)">
              <div class="del" @click="delSelect(item.id)">
                <div class="i-icons-del" />
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>

  <div class="bottom">
    <div>
      <div class="total">
        合计<span class="temcolor pricefs">￥{{ totalPrice }}</span>
      </div>
      <div class="num">
        数量<span class="temcolor numser">x{{ totalNum }}</span>
      </div>
    </div>
    <div class="right">
      <!-- <div class="cancel">
        取消
      </div>
      <div class="confirm" @click="confirm">
        确定
        <div class="confirm2" />
      </div> -->
    </div>
  </div>
</template>

<style scoped lang="scss">
.temcolor {
  margin-left: 8rpx;
  color: #A7F522;
}

.card {
  .selected {
    position: absolute;
    top: 0;
    left: 0;
    width: 69rpx;
    height: 69rpx;
    background-color: #A7F522;
    clip-path: polygon(0% 98.571%, 98.571% 0%, 22.857% 0%, 22.857% 0%, 19.15% 0.299%, 15.633% 1.165%, 12.353% 2.551%, 9.358% 4.41%, 6.695% 6.695%, 4.41% 9.358%, 2.551% 12.353%, 1.165% 15.633%, 0.299% 19.15%, 0% 22.857%, 0% 98.571%);
    z-index: 3;

    .icon {
      color: #000;
    }
  }

  .selectbg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0.2;
    z-index: 1;

    .image {
      border-radius: 16rpx;
      width: 100%;
      height: 100%;
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

    z-index: 9;

    .line {
      position: absolute;
      width: 100%;
      left: 0;
      height: 2rpx;
      background: linear-gradient(to right, rgba(#91DC10, 0), #A7F522, rgba(#91DC10, 0));
    }

    .lineGrey {
      background: linear-gradient(to right, rgba(#E3E3E3, 0), #bebebe, rgba(#E3E3E3, 0));
    }

    .topLine {
      top: 0;
    }

    .bottomLine {
      bottom: 0;
    }

    .goodsInfo {
      position: relative;
      flex: 1;
      height: 100%;
      padding-left: 20rpx;

      .row1 {
        font-weight: 600;
        font-size: 28rpx;
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

      .row2 {
        font-size: 20rpx;
      }

      .row3 {
        margin-top: 32rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          font-size: 32rpx;
          color: #A7F522;
          font-weight: 600;
          display: flex;

          .circle {
            @apply flex-center ml-2;
            width: 48rpx;
            height: 48rpx;
            border-radius: 50%;
            background-color: #A7F522;
            color: #000;
            font-size: 40rpx;
          }

          .circlec {
            @apply flex-center mr-2;
            width: 48rpx;
            height: 48rpx;
            border-radius: 50%;
            // background-color: #A7F522;
            border: 2rpx solid #A7F522;
            color: #fff;
            font-size: 40rpx;
          }
        }

        .check {
          font-size: 24rpx;
          color: #BEBEBE;
        }
      }

      .del {
        position: absolute;
        @apply flex-center;
        right: 0;
        top: 0;
        width: 56rpx;
        height: 48rpx;
        border: 2rpx solid #F53F3F;
        color: #F53F3F;
        border-radius: 4rpx;
        background-color: rgba($color: #fff, $alpha: 0.2);
        font-size: 24rpx;
      }
    }
  }

}

.bottom {
  padding: 32rpx;
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
  @apply flex-between;

  .total,
  .num {
    font-size: 28rpx;
  }

  .pricefs {
    font-size: 40rpx;
    font-weight: 600;
  }

  .right {
    display: flex;
    align-items: center;
    color: #000;
    position: relative;
    width: 420rpx;
    height: 80rpx;

    .confirm,
    .cancel,
    .confirm2 {
      position: absolute;
      right: 32rpx;
      width: 200rpx;
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

      &::after {
        background-color: #57683B;
      }

      &::before {
        background-color: #57683B;
      }
    }

    .cancel {
      left: 6rpx;
      padding-left: 46rpx;
      padding-right: 67rpx;

      &::after {
        left: 24rpx;
        border-radius: 30rpx;
        height: 80rpx;
        background: #ffffff;
        transform: skewX(-30deg);
        z-index: -1;
        border-bottom-right-radius: 20rpx;
      }

      &::before {

        right: 21rpx;
        width: 200rpx;
        height: 80rpx;
        border-radius: 25rpx;
        background: #ffffff;
        z-index: -1;

      }
    }

  }

}
</style>
