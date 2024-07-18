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
              <image class="image" src="@/assets/svg/compon-select.svg" mode="aspectFill" />
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
</template>

<style scoped lang="scss">
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
    height: 192rpx;
    top: 0;
    left: 0;
    opacity: 0.2;
    z-index: 0;

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
</style>
