<script setup lang="ts">
// 组件定义
const props = defineProps<{
  // 产品信息
  product: BuyProduct
  // 是否为管理模式
  isManagement: boolean
  // 是否为滑动模式
  sliding: boolean
}>()
const emits = defineEmits<{
  'update:product': [product: BuyProduct]
  'del': [id: BuyProduct['id']]
  'sliding': [sliding: boolean]
  'showDetail': [product: BuyProduct]
  'click': [product: BuyProduct]
}>()
// 选择状态
const selected = computed({
  get: () => {
    if (!props.isManagement)
      return props.product?.select
    else
      return props.product?.delete
  },
  set: (val) => {
    if (!props.isManagement)
      emits('update:product', { ...props.product, select: val })

    else
      emits('update:product', { ...props.product, delete: val })
  },
})
// 删除产品
function del() {
  emits('del', props.product.id)
}
// 功能区
const func = ref<HTMLElement | null>(null)
// 滑动距离
const slidingX = ref(0)
// 滑动开始
const useStart = useThrottleFn((e: TouchEvent) => {
  if (!props.isManagement)
    return

  e.preventDefault()
  slidingX.value = e.touches[0].clientX
}, 100)
// 滑动结束
const useEnd = useThrottleFn((e: TouchEvent) => {
  if (!props.isManagement)
    return

  e.preventDefault()
  if (e.changedTouches[0].clientX > slidingX.value + 80) {
    emits('sliding', false)
    return
  }
  if (slidingX.value - e.changedTouches[0].clientX > 80)
    emits('sliding', true)
}, 100)
// 减购条件
const conditionsMinus = computed(() => {
  return props.product.quantity <= 1
})
// 加购条件
const conditionsAdd = computed(() => {
  return props.product.quantity >= props.product.maxBuyNumber && props.product.quantity >= props.product.stockNumber
})
// 减购
function minus() {
  if (conditionsMinus.value)
    return
  emits('update:product', { ...props.product, quantity: props.product.quantity - 1 })
}
// 加购
function add() {
  if (conditionsAdd.value)
    return
  emits('update:product', { ...props.product, quantity: props.product.quantity + 1 })
}
function showInfo() {
  emits('showDetail', props.product)
}
function onClick() {
  emits('click', props.product)
}
</script>

<template>
  <div
    class="product" :class="{
      sliding: props.sliding,
    }" :style="{
      '--sliding': `-${func?.clientWidth || 60}px`,
    }"
  >
    <div class="wraps">
      <div class="wrap" @click="selected = !selected">
        <div class="select" :class="{ selected }">
          <div v-if="selected" class="i-icons-correct" />
        </div>
        <div class="info" @touchstart.capture="useStart" @touchend.capture="useEnd">
          <div class="image" @click.stop.prevent="onClick">
            <product-image :src="props.product.banner[0]" width="200rpx" height="200rpx" />
          </div>
          <div class="details">
            <div class="name" @click.stop.prevent="onClick">
              {{ props.product.name }}
            </div>
            <div class="goview" @click.stop.prevent="showInfo">
              <div class="text">
                配置详情
              </div>
              <div class="i-icons-right" />
            </div>
            <div class="funarea">
              <div class="price">
                <div class="original">
                  <span>￥</span>
                  <span>{{ props.product.costPrice }}</span>
                </div>
                <div class="current">
                  <span>￥</span>
                  <span>{{ props.product.sellPrice }}</span>
                </div>
              </div>
              <div v-if="!isManagement" class="num">
                <div
                  class="fun" :class="{
                    disabled: conditionsMinus,
                  }" @click.stop.prevent="minus"
                >
                  <div class="i-icons-minus" />
                </div>
                <div class="number">
                  {{ props.product.quantity }}
                </div>
                <div
                  class="fun" :class="{
                    disabled: conditionsAdd,
                  }" @click.stop.prevent="add"
                >
                  <div class="i-icons-add" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="func">
      <div class="item del" @click.stop.prevent="del">
        <div class="i-icons-del" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $px: 32rpx;
  $py: 16rpx;

  .product {
    padding: $py $px;
    position: relative;
    z-index: 0;

    .wraps {
      position: relative;
      z-index: 1;
      border-radius: 32rpx;
      box-shadow: 0rpx 16rpx 48rpx 12rpx rgba(0, 0, 0, 0.2);
      background-image: linear-gradient(113.84deg, rgba(255, 255, 255, 0.8) -6.55%, rgba(255, 255, 255, 0.08) 46.47%, rgba(255, 255, 255, 0.8) 92.28%);
      padding: 2rpx;
      transition: transform 0.3s;

      .wrap {
        @apply flex-between;
        background: rgba(0, 0, 0, 1);
        border-radius: 32rpx;
        padding: 24rpx 32rpx;

        .select {
          @apply flex-center;
          color: #000;
          font-size: 32rpx;

          width: 48rpx;
          height: 48rpx;
          border-radius: 50%;
          border: 2rpx solid #FFFFFF;

          &.selected {
            $color: #a7f522;
            background-color: $color;
            border-color: $color;
          }
        }

        .info {
          flex: 1;
          max-width: 90%;
          @apply flex-between;

          .image {
            padding-right: 16rpx;
          }

          .details {
            flex: 1;
            overflow: hidden;

            .name {
              font-weight: 500;
              font-size: 28rpx;
              color: #FFFFFF;
              line-height: 46rpx;
              text-align: left;
              font-style: normal;
              text-transform: none;
              padding-bottom: 8rpx;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }

            .goview {
              @apply flex-start;
              font-weight: 400;
              font-size: 24rpx;
              color: #BEBEBE;
              line-height: 40rpx;
              padding-bottom: 16rpx;
            }
          }

          .funarea {
            @apply flex-between items-end;

            .price {
              .current {
                font-weight: 500;
                font-size: 28rpx;
                color: #A7F522;
                line-height: 40rpx;
                text-align: left;
                font-style: normal;
                text-transform: none;
              }

              .original {
                font-weight: 400;
                font-size: 24rpx;
                color: #BEBEBE;
                line-height: 40rpx;
                text-align: left;
                font-style: normal;
                text-decoration-line: line-through;
                text-transform: none;
              }
            }

            .num {
              @apply flex-end;

              background: rgba(255, 255, 255, 0.2);
              border-radius: 12rpx 12rpx 12rpx 12rpx;

              .number {
                font-weight: 500;
                font-size: 28rpx;
                color: #F5F5F5;
                line-height: 40rpx;
                text-align: center;
                font-style: normal;
                text-transform: none;
                padding: 0 8rpx;
              }

              .fun {
                @apply flex-center;
                font-size: 42rpx;

                &.disabled {
                  color: #767676;
                }
              }
            }
          }
        }

      }
    }

    &.sliding {
      .wraps {
        transform: translateX(calc(var(--sliding) - $px));
      }
    }

    .func {
      position: absolute;
      right: $px;
      top: $py;
      height: calc(100% - $py * 2);
      z-index: -1;
      border-radius: 32rpx;

      .item {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 $px;
        font-size: 48rpx;
        border-radius: 32rpx;
        background: rgba(0, 0, 0, 0.5);
        box-shadow: 0rpx 16rpx 48rpx 12rpx rgba(0, 0, 0, 0.2);
      }
    }
  }
</style>
