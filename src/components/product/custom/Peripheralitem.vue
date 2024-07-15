<script setup lang="ts">
const emits = defineEmits<{
  loadmore: []
}>()
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
const reachBottom = () => {
  emits('loadmore')
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
// 处理数组
const Processing = () => {
  const { cloned } = useCloned(detail.value?.perihera)
  Preselection.value = cloned.value
  everyFun()
}

const closed = () => {
  Processing()
}

defineExpose({
  openSelect,
  confirmSelect,
  Processing,
})
</script>

<template>
  <div>
    <scroll-view scroll-y class="scroll" :enable-flex="true" @scrolltolower="reachBottom">
      <div class="scrollpb">
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
                <product-custom-singlebg />
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
                  <div class=" check">
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
                      <div>{{ item.number }}</div>
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
        <template v-if="peripheral.length === 0">
          <common-empty text="暂无物流信息" />
        </template>
      </div>
    </scroll-view>

    <common-popup v-model:show="selectshows" name="已选外设" height="70%" @close="closed">
      <div>
        <product-custom-select-peripheral ref="ProductselectPeripheralItem" />
      </div>
      <div class="" />
    </common-popup>
  </div>
</template>

<style scoped lang="scss">
.scroll {

  height: 30vh;

  .scrollpb {
    padding-bottom: 80rpx;
  }
}

.card {
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
