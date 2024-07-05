<script setup lang="ts">
const emit = defineEmits<{
  upconfigs: []
}>()
const { detail } = storeToRefs(useProductStore())
const DiyType = [
  {
    text: '请选择CPU',
    icons: 'i-icons-cpu',
    type: 'CPU',
    typeID: 13,
  },
  {
    text: '请选择主板',
    icons: 'i-icons-mainboard',
    type: '主板',
    typeID: 14,
  },
  {
    text: '请选择显卡',
    icons: 'i-icons-graphics-card',
    type: '显卡',
    typeID: 15,
  },
  {
    text: '请选择内存',
    icons: 'i-icons-storage',
    type: '内存',
    typeID: 16,
  },
  {
    text: '请选择硬盘',
    icons: 'i-icons-hard-disk',
    type: '硬盘',
    typeID: 17,
  },
  {
    text: '请选择机箱',
    icons: 'i-icons-crate',
    type: '机箱',
    typeID: 18,
  },

  {
    text: '请选择散热',
    icons: 'i-icons-heat-dissipation',
    type: 'CPU散热器',
    typeID: 19,
  },
  {
    text: '请选择电源',
    icons: 'i-icons-power-supply',
    type: '电源',
    typeID: 20,
  },
]
const productCustomRelocationRef = ref<ComponentInstance['ProductCustomRelocation']>()
// 打开选择配置组件的弹窗
const openSelectPop = async (index: number, paramValue: string | number | string[] | undefined) => {
  const { typeID, type } = DiyType[index]
  productCustomRelocationRef.value?.showOptional(typeID, index, type, paramValue)
}

const upconfig = () => {
  emit('upconfigs')
}
</script>

<template>
  <div class="diy">
    <div class="top">
      <div class="wrap">
        <template v-for="(item, index) in DiyType" :key="index">
          <div class="linebox">
            <div class="line">
              <div :class="item.icons" class="icon_style" />

              <div class="text">
                <template v-if="detail?.params[index] && detail?.params[index].paramDesc === item.type">
                  <template v-if="detail?.params[index] && detail?.params[index]?.product?.errors">
                    <div
                      :class="{ error: detail?.params[index]?.product?.errors?.findIndex((v) => v.key === item.type) !== -1 }"
                    >
                      {{ detail?.params[index].product.name }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="">
                      {{ detail?.params[index].product.name }}
                    </div>
                  </template>
                </template>

                <template v-else>
                  {{ item.text }}
                </template>
              </div>

              <div class="alter" @click="openSelectPop(index, detail?.params[index]?.paramValue)">
                <div class="i-icons-edit alter_icon" />
                改配
              </div>
            </div>
            <div>
              <template v-if="detail?.params[index]?.product?.errors && detail?.params[index]?.product?.errors?.length">
                <template v-for="(v, i) in detail?.params[index]?.product?.errors" :key="i">
                  <template v-if="v.key === detail?.params[index]?.product?.typeName">
                    <div class="tips">
                      <div class="i-icons-info" />
                      <span>{{ v.message }}</span>
                    </div>
                  </template>
                </template>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>

    <product-custom-relocation ref="productCustomRelocationRef" @updateconfig="upconfig" />
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

      .linebox {
        margin-bottom: 20rpx;

        .tips {
          font-size: 24rpx;
          color: #F53F3F;
          @apply flex;
          padding-left: 16rpx;
        }

        .line {
          margin-bottom: 4rpx;
          height: 80rpx;
          line-height: 80rpx;
          overflow: hidden;
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

            .error {
              color: #F53F3F;
            }
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
}
</style>
