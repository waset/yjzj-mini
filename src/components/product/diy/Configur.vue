<script setup lang="ts">
const { detail } = storeToRefs(useProductStore())
const { diytype } = storeToRefs(useDiyStore())

const productCustomRelocationRef = ref<ComponentInstance['ProductCustomRelocation']>()
// 打开选择配置组件的弹窗
const openSelectPop = async (index: number) => {
  const { type, typeID } = diytype.value[index]
  productCustomRelocationRef.value?.showOptional(typeID, type)
}

// // 替换 选配 组件
// const replaceAllocation = (index: number) => {
//   if (!detail.value) {
//     return
//   }
//   detail.value.params[openIndex.value].id = ModificationList.value[index].id
//   detail.value.params[openIndex.value].product = ModificationList.value[index]
//   changeAllocation.value = false
// }
// watch(() => getModificationListParams.value.productName, async () => {
//   getModificationListParams.value.page = 1
//   await getModificationList(getModificationListParams.value)
// })
</script>

<template>
  <div class="diy">
    <div class="top">
      <div class="wrap">
        <template v-for="(item, index) in diytype" :key="index">
          <div class="line">
            <div :class="item.icons" class="icon_style" />

            <div class="text">
              <template v-if="detail?.configuration && detail?.configuration[item.type]">
                {{ detail?.configuration[item.type].product.name }}
              </template>
              <template v-else>
                {{ item.text }}
              </template>
            </div>

            <div class="alter" @click="openSelectPop(index)">
              <div class="i-icons-edit alter_icon" />
              改配
            </div>
          </div>
        </template>
      </div>
    </div>

    <product-custom-relocation ref="productCustomRelocationRef" />
  </div>
</template>

<style scoped lang="scss">
  .diy {
    .top {
      padding: 0 32rpx;
      box-sizing: border-box;

      .wrap {
        padding: 32rpx;
        border-radius: 16rpx;
        background-color: #000;
        word-break: break-all;

        .title {
          font-size: 40rpx;
          line-height: 48rpx;
          font-weight: 600;
          color: rgba(245, 245, 245, 1);
        }

        .desc {
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          margin-top: 16rpx;
        }

        .line {
          height: 80rpx;
          line-height: 80rpx;
          overflow: hidden;
          margin-bottom: 20rpx;
          box-sizing: border-box;
          background: linear-gradient(90.04deg, rgba(39, 39, 39, 0) 2.8%, #272727 24.32%, #272727 49.68%, rgba(39, 39, 39, 0) 79.65%);
          border-bottom: 2rpx solid;
          border-image-source: linear-gradient(98.8deg, rgba(190, 190, 190, 0.1) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0.1) 92.04%);
          border-image-slice: 1;
          font-size: 28rpx;
          font-weight: 600;
          position: relative;
          padding: 0rpx 16rpx;
          display: flex;
          align-items: center;

          .icon_style {
            width: 44rpx;
            height: 44rpx;
            margin-right: 12rpx;
          }

          .text {
            font-size: 28rpx;
            font-weight: 600;
            width: 420rpx;
            height: 46rpx;
            line-height: 46rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .alter {
            min-width: 104rpx;
            height: 48rpx;
            line-height: 35rpx;
            position: absolute;
            top: 50%;
            right: 16rpx;
            transform: translateY(-50%);
            float: right;
            font-size: 24rpx;
            text-align: center;
            color: #ffffff;
            border-radius: 4rpx;
            border: 2rpx solid #a7f522;
            background: #ffffff33;
            padding: 4rpx 14rpx 4rpx 14rpx;

            .alter_icon {
              font-size: 24rpx;
            }
          }
        }
      }
    }
  }
</style>
