<script lang="ts" setup>
const { products, isSelectedAll, selectedNum, total, selectedProductIds } = storeToRefs(useBuyStore())
const { selectAll, deletes } = useBuyStore()
// 当前滑块索引
const slidIdx = ref<number | null>(null)
// 管理模式
const management = ref<boolean>(false)
// 切换管理模式
function managementSwitch() {
  management.value = !management.value
  slidIdx.value = null
}
// 页面刷新时
onShow(() => {
  management.value = false
  slidIdx.value = null
})
// 要显示的详情
const showConfigs = ref<BuyProduct | null>(null)
// 是否显示详情
const showConfigsSwitch = ref(false)
// 显示详情方法
function showConfigsFn(product: BuyProduct) {
  showConfigs.value = product
  showConfigsSwitch.value = true
}
// 是否显示确认框
const showModel = ref(false)
const del_ids = ref<BuyProduct['id'][]>([])
// 删除弹窗
function delModel(ids: BuyProduct['id'][]) {
  del_ids.value = ids
  showModel.value = true
}
//
function deleteProduct() {
  deletes(del_ids.value)
  showModel.value = false
  slidIdx.value = null
  if (del_ids.value.length > 1 || products.value.length === 0)
    management.value = false
  del_ids.value = []
}
</script>

<template>
  <navbar-home text="购物车" />
  <common-popup v-model:show="showConfigsSwitch" name="配置详情">
    <div class="configs">
      <div v-if="showConfigs" class="wrap">
        <template v-for="(item, index) in showConfigs.params" :key="index">
          <div class="item">
            <div v-if="item.banner" class="image">
              <product-image :src="item.banner[0]" width="60rpx" height="60rpx" />
            </div>
            <div class="info">
              <div class="top">
                <div class="type">
                  {{ item.desc }}
                </div>
                <div v-if="item.number" class="num">
                  <span>x</span>
                  <span>{{ item.number }}</span>
                </div>
              </div>
              <div class="desc">
                {{ item.name || item.paramValue }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </common-popup>
  <common-model v-model:show="showModel" msg="是否删除" icon="i-svg-warn" @ok="deleteProduct" @cancel="del_ids = []" />
  <div class="buy">
    <div class="top">
      <div class="wrap">
        <div class="left">
          共 {{ products.length }} 件商品
        </div>
        <div class="right">
          <div class="manage" @click="managementSwitch">
            <div class="i-icons-screen icon" />
            <text class="text">
              {{ !management ? '管理' : '退出管理' }}
            </text>
          </div>
        </div>
      </div>
    </div>
    <div class="body">
      <div
        class="body-wrap" :style="{
          overflow: products.length ? 'scroll' : 'hidden',
        }"
      >
        <div class="top-wrap" />
        <template v-if="products.length > 0">
          <template v-for="(item, index) in products" :key="index">
            <buys-product
              :product="item" :sliding="slidIdx === index" :is-management="management"
              @sliding="(sliding) => sliding ? slidIdx = index : slidIdx = null" @del="delModel([item.id])"
              @show-detail="showConfigsFn" @update:product="(product) => products[index] = product"
              @click="(product) => Jump('/pages/product/detail', { id: product.id })"
            />
          </template>
        </template>
        <template v-else>
          <common-empty text="您的购物车空空如也" />
        </template>
        <div class="bottom-wrap" />
      </div>
    </div>
    <div class="bottom">
      <div class="wrap">
        <div class="selectAll" @click="selectAll(!isSelectedAll(management), management)">
          <div class="select" :class="{ all: isSelectedAll(management) }">
            <div v-if="isSelectedAll(management)" class="i-icons-correct" />
          </div>
          <div class="text">
            全选
          </div>
        </div>
        <div v-if="!management" class="info">
          <div class="details">
            <span class="text-[#BEBEBE]">已选 {{ selectedNum(management) }} 件</span>
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
            <div class="btn bg-white" @click="delModel(selectedProductIds(management))">
              删除
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  $top-height: 112rpx;
  $bottom-height: 156rpx;

  .buy {
    position: relative;
    height: calc(var(--body-min-height) - $top-height - $bottom-height);
    display: flex;
    flex-direction: column;
    overflow: hidden;

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
      flex: 1;
      overflow: hidden;

      .top-wrap {
        height: $top-height;
      }

      .body-wrap {
        flex: 1;
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

  .configs {
    .wrap {
      .item {
        @apply flex-between;
        background: rgba(132, 132, 132, 0.2);
        border-radius: 8rpx 8rpx 8rpx 8rpx;
        margin-bottom: 32rpx;
        padding: 22rpx 24rpx;

        .image {
          margin-right: 20rpx;
        }

        .info {
          flex: 1;

          .top {
            @apply flex-between;

            .type {
              flex: 1;
              font-size: 32rpx;
              font-weight: 400;
              line-height: 40rpx;
              color: rgba(167, 245, 34, 1);
            }

            .num {
              font-family: PingFang SC;
              font-size: 28rpx;
              font-weight: 400;
              line-height: 40rpx;
              color: rgba(190, 190, 190, 1);
            }
          }

          .desc {
            padding-top: 16rpx;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: rgba(190, 190, 190, 1);
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
