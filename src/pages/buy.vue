<script lang="ts" setup>
const { products, isSelectdAll, selectedNum, total, selectedProductIds } = storeToRefs(useBuyStore())
const { selectAll, deleteProduct } = useBuyStore()
// TODO: test 测试方法，后续删除
const { windows, getWindows } = useWindowsStore()
onShow(async () => {
  await getWindows(1, 20)
  const wproducts = windows.length ? windows[4].content.products : []
  wproducts.forEach((item) => {
    products.value.push({ ...item, quantity: 1, select: false, delete: false })
  })
})
// test end
// 管理模式
const management = ref<boolean>(false)
// 当前滑块索引
const slidIdx = ref<number | null>(null)
// 页面刷新时
onShow(() => {
  management.value = false
  slidIdx.value = null
})
</script>

<template>
  <navbar-home text="购物车" />
  <div class="buy">
    <div class="top">
      <div class="wrap">
        <div class="left">
          共 {{ products.length }} 件商品
        </div>
        <div class="right">
          <div class="manage" @click="management = !management">
            <div class="i-icons-screen icon" />
            <text class="text">
              {{ !management ? '管理' : '退出管理' }}
            </text>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="top-wrap" />
      <template v-if="products.length > 0">
        <template v-for="(item, index) in products" :key="index">
          <buys-product
            v-model:product="products[index]"
            :sliding="slidIdx === index"
            :is-management="management"
            @sliding="(sliding) => sliding ? slidIdx = index : slidIdx = null"
            @del="deleteProduct([item.id])"
          />
        </template>
      </template>
      <template v-else>
        <common-empty text="您的购物车空空如也" />
      </template>
      <div class="bottom-wrap" />
    </div>
    <div class="bottom">
      <div class="wrap">
        <div class="selectAll" @click="selectAll(!isSelectdAll(management), management)">
          <div class="select" :class="{ all: isSelectdAll(management) }">
            <div v-if="isSelectdAll(management)" class="i-icons-correct" />
          </div>
          <div class="text">
            全选
          </div>
        </div>
        <div v-if="!management" class="info">
          <div class="details">
            <span class="text-[#BEBEBE]">已选 {{ selectedNum(management) }} 件</span>
            <!-- <span class="p-1">|</span>
            <span>优惠：</span>
            <span class="text-[28rpx] text-[#EDA522FF]">￥</span>
            <span class="text-[28rpx] text-[#EDA522FF]">{{ 4399.00 }}</span> -->
          </div>
          <div class="total">
            <span>合计：</span>
            <span class="text-[32rpx] text-green">￥</span>
            <span class="text-[32rpx] text-green">{{ total }}</span>
          </div>
        </div>
        <div class="btns">
          <template v-if="!management">
            <div class="btn bg-green">
              结算
            </div>
          </template>
          <template v-else>
            <div class="btn bg-white" @click="deleteProduct(selectedProductIds(management))">
              删除
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .buy {
    position: relative;
    min-height: var(--body-min-height);
    display: flex;
    flex-direction: column;

    $top-height: 112rpx;
    $bottom-height: 156rpx;

    .top {
      padding: 32rpx;
      padding-bottom: 0;
      position: fixed;
      top: var(--navbar-height-all);
      left: 0;
      right: 0;
      height: $top-height;
      background: linear-gradient(180deg, rgba(0, 0, 0, .1) 43%, rgba(19, 19, 19, .1) 100%);
      backdrop-filter: blur(48rpx);
      z-index: 1;

      .wrap {
        padding: 16rpx 32rpx;
        border-radius: 8rpx;
        background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), linear-gradient(0deg, rgba(132, 132, 132, 0.5), rgba(132, 132, 132, 0.5));

        @apply flex-between;

        .left {
          font-weight: 400;
          font-size: 28rpx;
          color: #FFFFFF;
          line-height: 40rpx;
          text-align: left;
          font-style: normal;
          text-transform: none;
        }

        .right {
          @apply flex-center;

          .text {
            font-weight: 500;
            font-size: 28rpx;
            color: #FFFFFF;
            line-height: 40rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
          }
        }
      }
    }

    .body {
      display: flex;
      flex-direction: column;
      flex-grow: 1;

      .top-wrap {
        height: $top-height;
      }

      .bottom-wrap {
        height: $bottom-height;
      }
    }

    .bottom {
      padding: 0 32rpx;
      position: fixed;
      bottom: var(--tabbar-height-all);
      left: 0;
      right: 0;
      background: linear-gradient(180deg, rgba(19, 19, 19, .1) 100%, rgba(0, 0, 0, .8) 43%);
      backdrop-filter: blur(48rpx);

      .wrap {
        flex-wrap: nowrap;
        @apply flex-between;

        .selectAll {
          @apply flex-center;
          height: $bottom-height;

          .select {
            @apply flex-center;
            color: #000;
            font-size: 32rpx;

            width: 48rpx;
            height: 48rpx;
            border-radius: 50%;
            border: 2rpx solid #FFFFFF;

            &.all {
              $color: #a7f522;
              background-color: $color;
              border-color: $color;
            }
          }

          .text {
            font-weight: 500;
            font-size: 28rpx;
            color: #FFFFFF;
            line-height: 40rpx;
            text-align: left;
            font-style: normal;
            text-transform: none;
            padding: 0 16rpx;
          }
        }

        .info {
          flex: 1;
          text-align: right;
          padding: 0 16rpx;

          .details {
            font-size: 24rpx;
            line-height: 40rpx;
            font-weight: 400;
            padding-bottom: 8rpx;
          }

          .total {
            font-size: 28rpx;
            line-height: 40rpx;
            font-weight: 600;
          }
        }

        .btns {
          .btn {
            padding: 20rpx 68rpx;
            border-radius: 8rpx;
            font-size: 32rpx;
            font-weight: bold;
            line-height: 40rpx;
            color: #333;
          }
        }
      }
    }
  }
</style>

<route lang="json">
{
  "layout": "home"
}
</route>
