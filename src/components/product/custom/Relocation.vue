<script setup lang="ts">
const { ModificationList } = storeToRefs(useDiyStore())
const { getModificationList } = useDiyStore()
// 获取请求配置列表的参数
const getModificationListParams = ref<Modification>({
  page: 0,
  pageSize: 10,
} as Modification)

// 获取配置列表数据
const getAllocationList = async () => {
  getModificationListParams.value.page += 1
  await getModificationList(getModificationListParams.value)
}

const getAllocationListByParams = async (data: Modification) => {
  ModificationList.value = []
  getModificationListParams.value = data
  getModificationListParams.value.page = 1
  await getModificationList(getModificationListParams.value)
}
// 设置排序的请求参数
const setSortGet = (name: string, value: number) => {
  getModificationListParams.value.order = name
  if (value === 0) {
    getModificationListParams.value.sort = 'asc'
  }
  else {
    getModificationListParams.value.sort = 'desc'
  }
  if (name === 'all') {
    delete getModificationListParams.value.order
    delete getModificationListParams.value.sort
  }

  getModificationListParams.value.page = 0
  getAllocationList()
}

const ProductCustomFilterListRef = ref<ComponentInstance['ProductCustomFilterList']>()
const ProductCustomOptionalRef = ref<ComponentInstance['ProductCustomOptional']>()

// 筛选
const onChange: ComponentInstance['CommonSortFilter']['onChange'] = async (name, value) => {
  switch (name) {
    case 'filte':
      ProductCustomFilterListRef.value?.show()
      break
    case 'all':
      setSortGet('all', value || 0)
      break
    case 'price':
      setSortGet('sell_price', value || 0)
      break
    case 'sales':
      setSortGet('sell_number', value || 0)
      break
  }
}
// 触底加载
const reachBottom = () => {
  getAllocationList()
}

const hasShowOptional = ref(false)

const OptionalType = ref<DiyComponent | null>(null)
// const paramsId = ref<any>(0)
/**
 * 设置选配类型及获取其列表
 */
const showOptional = async (id: number, type: DiyComponent, paramValue: any) => {
  // paramsId.value = paramValue
  ProductCustomOptionalRef?.value?.setId(paramValue)
  OptionalType.value = type
  getModificationListParams.value.page = 0
  getModificationListParams.value.productTypeID = id
  getModificationListParams.value.productTypeParentID = 4
  getAllocationList().then(() => {
    hasShowOptional.value = true
  })
}

defineExpose({
  showOptional,
})
</script>

<template>
  <div class="relocation">
    <common-popup
      v-model:show="hasShowOptional" name="修改配置" height="80%" @close="() => {
        getModificationListParams = {
          page: 1,
          pageSize: 10,
          params: undefined,
        } as Modification
      }"
    >
      <div class="select">
        <div class="header">
          <common-search
            padding="48rpx 0rpx" :value="getModificationListParams.productName" is-input @update:value="(val) => {
              getModificationListParams.productName = val
              getModificationListParams.page = 0
              getAllocationList()
            }"
          />
          <common-sort-filter :has-layout="false" padding="0 0 32rpx 0" @change="onChange" />
        </div>
        <product-custom-filter-list
          ref="ProductCustomFilterListRef" v-model:value="getModificationListParams" @change="(data) => {
            getAllocationListByParams(data)
          }"
        />
        <div class="commodity_list">
          <product-custom-optional ref="ProductCustomOptionalRef" @change="hasShowOptional = false" @loadmore="reachBottom()" />
        </div>
      </div>
    </common-popup>
  </div>
</template>

<style scoped lang="scss">
.relocation {

  .scroll-view {
    height: 626rpx;

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
        z-index: 3;

        .icon {
          color: #000;
        }
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

      .goodsInfo {
        flex: 1;
        height: 100%;
        padding-left: 20rpx;

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

    .empty {
      height: 40rpx;
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
}
</style>
