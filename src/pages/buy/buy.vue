<script lang="ts" setup>
const { products, isSelectedAll, selectedNum, total, selectedProductIds } = storeToRefs(useBuyStore())
const { selectAll, deletes } = useBuyStore()
const { hasGoLogin } = useUserStore()
const { setNowAddress } = useAddressStore()
const { changeBuyType } = useSubmitOrderStore()
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
  setNowAddress()
  management.value = false
  slidIdx.value = null
})
// 要显示的详情
const showConfigs = ref<BuyProduct | null>(null)
// 是否显示详情
const showConfigsSwitch = ref(false)

// 配置详情列表
const allocationList = ref<any[]>([])
// 配置外设列表
const nowgoodsPer = ref<any[]>([])
// 显示详情方法
function showConfigsFn(product: BuyProduct) {
  showConfigs.value = product
  showConfigsSwitch.value = true
  allocationList.value = product.params
  nowgoodsPer.value = product.perihera
}
// 是否显示确认框
const showModel = ref(false)
const del_ids = ref<BuyProduct['id'][]>([])
const del_alloaction = ref<BuyProduct['id'][]>([])
// 删除弹窗
function delModel(ids: delobj) {
  del_ids.value = ids.ids
  del_alloaction.value = ids.alls
  showModel.value = true
}
// 删除商品
function deleteProduct() {
  deletes(del_ids.value, del_alloaction.value)
  showModel.value = false
  slidIdx.value = null
  if (del_ids.value.length > 1 || products.value.length === 0)
    management.value = false
  del_ids.value = []
  del_alloaction.value = []
}

//  下单
const submitorder = () => {
  changeBuyType('car')
  if (hasGoLogin()) {
    return
  }
  Jump('/pages/buy/submitOrder')
}

// 跳转商品详情
const infoClick = (product: BuyProduct) => {
  if (product_is_diy(product)) {
    if (product.id) {
      Jump('/pages/product/diy', { id: product.id })
    }
    else {
      Jump('/pages/product/diy', { config_id: product.alloaction })
    }
  }
  else {
    Jump('/pages/product/detail', { id: product.id })
  }
}
</script>

<template>
  <navbar-home text="购物车" />
  <common-popup v-model:show="showConfigsSwitch" name="配置详情">
    <div class="configs">
      <div v-if="showConfigs" class="wrap">
        <buys-submit-allocation-card :nowgoods-per="nowgoodsPer" :allocation-list="allocationList" />
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
              @sliding="(sliding) => sliding ? slidIdx = index : slidIdx = null" @del="delModel"
              @show-detail="showConfigsFn" @update:product="(product) => products[index] = product"
              @click="infoClick"
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
            <div
              class="btn pay" :class="{
                active: !!selectedNum(management),
              }" @click="submitorder"
            >
              结算
            </div>
          </template>
          <template v-else>
            <div
              class="btn del" :class="{
                active: selectedNum(true),
              }" @click="() => {
                const selected = selectedProductIds(management)
                if ((!selected.ids.length && !selected.alls.length)) {
                  return
                }
                delModel(selected)
              }"
            >
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
          line-height: 40rpx;
          font-weight: bold;
          color: #F5F5F5;
          background-color: #8D8D8D;

          &.pay.active {
            color: #333;
            background-color: #A7F522;
          }

          &.del.active {
            background-color: #F53F3F;
          }
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
