<script lang="ts" setup>
import { ref } from 'vue'
import addressCard from '../../components/buys/addressCard.vue'
import settlementCard from '../../components/buys/settlementCard.vue'
import bottomSubmit from '../../components/buys/bottomSubmit.vue'
import markpopup from '../../components/buys/popup/markpopup.vue'
import goodsItemCard from '../../components/buys/goodsItemCard.vue'
import addresspop from '../../components/buys/popup/address.vue'

// 提交商品的列表
const goodslist = ref<goodsListInfo[]>([
  {
    name: '天选5Pro 14代酷睿i9',
    price: 33333333,
    number: 2,
  },
  {
    name: '天选5Pro 14代酷睿i9',
    price: 3333,
    number: 3,
  },
])
// 备注展示
const mark = ref<string>('')
// 合计数量
const totalNumber = ref<number>(0)
// 实付金额
const payment = ref<number>(4399)

// 控制备注弹出层显示
const showPop = ref<boolean>(false)

// 地址新增 弹出层
const AddressshowPop = ref<boolean>(false)

// 设置弹出层关闭
const setShowFn = (data: boolean) => {
  showPop.value = data
}

// 设置备注信息
const writeMarkFn = (data: string): void => {
  mark.value = data
}
</script>

<template>
  <navbar-home text="123" />
  <div class="body">
    <div @click="AddressshowPop = true">
      <addressCard />
    </div>
    <goodsItemCard :list="goodslist" />
    <div class="CouponsAndNotes">
      <div class="counpons">
        <div>优惠券</div>
        <div class="beColor">
          待使用
        </div>
      </div>
      <div class="notes" @click="showPop = true">
        <div>备注</div>
        <div class="beColor mark">
          {{ mark || '无备注' }}
        </div>
      </div>
    </div>
    <settlementCard :number="totalNumber" :pay="payment" />
    <bottomSubmit :number="totalNumber" :pay="payment" />

    <markpopup :showpop="showPop" @set-show="setShowFn" @write-mark="writeMarkFn" />

    <addresspop :showpop="AddressshowPop" @set-show="AddressshowPop = false" />
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;

$Be: #BEBEBE;

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

  .CouponsAndNotes {
    width: 686rpx;
    height: 112rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // background-color: #fff;
    margin: 32rpx auto 0;
    font-size: 28rpx;
    box-sizing: border-box;
    padding-left: 32rpx;

    .counpons {
      display: flex;
      justify-content: space-between;
    }

    .notes {
      display: flex;
      justify-content: space-between;
    }

    .beColor {
      color: #BEBEBE;

    }
    .mark {
      max-width: 400rpx;
      max-height: 80rpx;
      overflow: hidden;

    }
  }

}
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
