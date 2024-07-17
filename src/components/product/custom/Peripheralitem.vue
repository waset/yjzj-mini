<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { peripheral } = storeToRefs(useDiyStore())

// 预选数组
const Preselection = ref<any>([])

// 选择外设
const selectFn = (item: Product) => {
  // 选择的时候 传给新数组    否则就不传

  const index = Preselection.value.findIndex((obj: any) => item.id === obj.id)
  if (index === -1) {
    item.number = 1
    Preselection.value.push(item)
  }
}

// 预删除外设
const delSelect = (id: number) => {
  const index = Preselection.value.findIndex((item: any) => item.id === id)
  if (index === -1) {
    return
  }
  Preselection.value.splice(index, 1)
}

// 加减数量
const setNumber = (str: string, id: number, idx: number) => {
  const index = Preselection.value.findIndex((item: any) => item.id === id)
  if (index !== -1 && str === 'plus') {
    peripheral.value[idx].number = peripheral.value[idx].number + 1
    Preselection.value[index].number = peripheral.value[idx].number
  }

  if (index !== -1 && str === 'cut') {
    if (Preselection.value[index].number > 1) {
      peripheral.value[idx].number = peripheral.value[idx].number - 1
      Preselection.value[index].number = peripheral.value[idx].number
    }
  }
}

// 是否选中
const isSelect = (id: number) => {
  const index = Preselection.value.findIndex((obj: any) => id === obj.id)
  if (index === -1) {
    return false
  }
  else {
    return true
  }
}

const ProductselectPeripheralItem = ref<ComponentInstance['ProductCustomSelectPeripheral']>()

// 已选外设弹窗
const selectshows = ref<boolean>(false)

// 打开已选
const openSelect = () => {
  selectshows.value = true
}

const confirmSelect = () => {
  // 确认选中
  if (!detail.value) {
    return
  }
  const { cloned } = useCloned(Preselection.value)
  detail.value.perihera = cloned.value
}
const everyFun = () => {
  // 每次执行  比对当前 选中项 是否和 列表中的值相等  相等则替换   选中项替换列表数据
  // 创建一个新的数组，其中包含与 Preselection.value 中匹配的更新后对象
  peripheral.value = peripheral.value.map((obj) => {
    const matchedItem = Preselection.value.find((item: any) => item.id === obj.id)
    return matchedItem ? { ...obj, ...matchedItem } : obj
  })
}
const cloneds = ref<any>()

const showEvery = () => {
  const { cloned } = useCloned(detail.value?.perihera)
  cloneds.value = cloned.value
}

// 处理数组
const Processing = () => {
  //   每次请求完数据     把以确定的数值取出  赋值给  预选数组
  //   这是 之前选中的数据 的预选数组的值 则会被   覆盖
  // const { cloned } = useCloned(detail.value?.perihera)
  Preselection.value = cloneds.value

  everyFun()
}

const closed = () => {
  Preselection.value = []
  showEvery()
  Processing()
}
// 查看配置详情的数据
const showConfigs = ref<any | null>(null)
const showConfigsSwitch = ref<boolean>(false)
const checkInfo = (index: number) => {
  const info = peripheral.value[index] || null
  if (!info) {
    return
  }

  showConfigs.value = info

  showConfigsSwitch.value = true
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

defineExpose({
  showEvery,
  openSelect,
  confirmSelect,
  Processing,
})
</script>

<template>
  <div>
    <template v-if="peripheral.length !== 0">
      <template v-for="(item, index) in peripheral" :key="index">
        <div class="card mb-4">
          <div
            class="select" @click="() => {
              if (ProductStatus(item.status)) {
                selectFn(item)
              }
            }"
          >
            <template v-if="isSelect(item.id) && ProductStatus(item.status)">
              <div class="selected">
                <div class="icon i-icons-correct" />
              </div>
              <div class="selectbg">
                <image class="image" src="@/assets/svg/compon-select.svg" mode="scaleToFill" />
              </div>
            </template>
            <template v-else>
              <div class="topLine" :class="[ProductStatus(item.status) ? 'line' : 'line lineGrey']" />
              <div class="bottomLine" :class="[ProductStatus(item.status) ? 'line' : 'line lineGrey']" />
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
                <div class=" check" @click.prevent.stop="checkInfo(index)">
                  查看详情
                  <div class="i-icons-right" />
                </div>
                <div class="price">
                  <template v-if="item.number < 2 || !item.number">
                    <div> ￥{{ item.sellPrice }}</div>
                  </template>
                  <template v-if="isSelect(item.id) && item?.number > 1">
                    <div class="circlec" @click.stop="setNumber('cut', item.id, index)">
                      <div class="i-icons-minus" />
                    </div>
                    <div class="number">
                      {{ item.number }}
                    </div>
                  </template>

                  <template v-if="isSelect(item.id)">
                    <div class="circle" @click.stop="setNumber('plus', item.id, index)">
                      <div class="i-icons-add" />
                    </div>
                  </template>
                </div>
              </div>
              <template v-if="isSelect(item.id)">
                <div class="del" @click.stop="delSelect(item.id)">
                  <div class="i-icons-del" />
                </div>
              </template>
            </div>
          </div>
        </div>
      </template>
    </template>

    <template v-if="peripheral.length === 0">
      <div class="empty">
        <common-empty text="商品列表为空~" padding="0" />
      </div>
    </template>
    <common-popup v-model:show="selectshows" name="已选外设" height="70%" @close="closed">
      <div>
        <product-custom-select-peripheral ref="ProductselectPeripheralItem" />
      </div>
      <template #footer>
        <div class="bottom">
          <div class="numberbox">
            <div class="total">
              合计 <span class="temcolor pricefs">￥{{ totalPrice || 0 }}</span>
            </div>
            <div class="num">
              数量 <span class="temcolor pricefs">x{{ totalNum }}</span>
            </div>
          </div>
        </div>
      </template>
    </common-popup>

    <common-popup v-model:show="showConfigsSwitch" name="配置详情">
      <buys-show-alloaction :config="showConfigs" />
    </common-popup>
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

          .number {
            display: flex;
            justify-content: center;
            width: 54rpx;
          }

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

  .numberbox {
    width: 100%;
    @apply flex-between;
  }

  .total,
  .num {
    font-size: 28rpx;
  }

  .temcolor {
    margin-left: 8rpx;
    color: #A7F522;
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
