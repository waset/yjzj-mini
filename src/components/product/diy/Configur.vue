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

const atr = ref<any>({})

const delselectParams = (index: number) => {
  if (detail.value) {
    detail.value.params[index].product = atr.value
    detail.value.params[index].paramDesc = ''
    detail.value.params[index].paramValue = 0
  }
}
const upconfig = () => {
  emit('upconfigs')
}

// 查看配置详情的数据
const showConfigs = ref<Product | null>(null)
const showConfigsSwitch = ref<boolean>(false)
// 查看详情
const checkInfo = (index: number) => {
  const info = detail.value?.params[index]?.product || null
  if (!info) {
    return
  }

  showConfigs.value = info
  showConfigsSwitch.value = true
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
              <div class="type">
                {{ item.type === 'CPU散热器' ? '散热' : item.type }}
              </div>
              <div class="text" @click="checkInfo(index)">
                <template v-if="detail?.params[index] && detail?.params[index].paramDesc === item.type">
                  <template v-if="detail?.params[index] && detail?.params[index]?.product?.errors">
                    <div class="scrolling">
                      {{ detail?.params[index].product.name }}
                    </div>
                  </template>
                  <template v-else>
                    <div class="scrolling">
                      {{ detail?.params[index].product.name }}
                    </div>
                  </template>
                </template>

                <template v-else>
                  {{ item.text }}
                </template>
              </div>
              <div class="rightbtn">
                <div class="alter" @click="openSelectPop(index, detail?.params[index]?.paramValue)">
                  <div class="i-icons-modify alter_icon" />
                </div>
                <div
                  class="del"
                  :class="{ candel: detail?.params[index] && detail?.params[index].paramDesc ? true : false }"
                  @click="delselectParams(index)"
                >
                  <div class="i-icons-del" />
                </div>
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

    <common-popup v-model:show="showConfigsSwitch" name="配置详情">
      <buys-show-alloaction :config="showConfigs" />
    </common-popup>
  </div>
</template>

<style scoped lang="scss">
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  .scrolling {
    display: inline-block;
    animation: scroll 6s ease-in-out infinite alternate;
    animation-delay: 2s;
  }

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
            // padding: 0rpx 16rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .icon_style {
              width: 32rpx;
              height: 32rpx;
              margin-right: 12rpx;
            }

            .type {
              margin-right: 12rpx;
            }

            .text {
              font-size: 28rpx;
              font-weight: 600;
              line-height: 46rpx;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              flex: 1 1 50%;

              .error {
                color: #F53F3F;
              }
            }

            .rightbtn {
              display: flex;
              align-items: center;
              justify-content: space-between;

              .alter {
                @apply flex-center;
                width: 56rpx;
                height: 48rpx;
                color: #ffffff;
                border-radius: 4rpx;
                border: 2rpx solid #a7f522;
                background: #ffffff33;
                font-size: 24rpx;

              }

              .del {
                margin-left: 20rpx;
                @apply flex-center;
                width: 56rpx;
                height: 48rpx;
                color: #8D8D8D;
                border-radius: 4rpx;
                border: 2rpx solid #8D8D8D;
                background: #ffffff33;
                font-size: 24rpx;
              }

              .candel {
                border: 2rpx solid #F53F3F;
                color: #F53F3F;
              }

            }

          }
        }

      }
    }
  }
</style>
