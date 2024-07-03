<script lang="ts" setup>
const { couponList } = storeToRefs(useSubmitOrderStore())
const { getCouponList, canusecouponList } = useSubmitOrderStore()

const page = ref<number>(1)

const show = ref<boolean>(false)
const rule = ref('')
const showrule = (index: number) => {
  show.value = !show.value
  if (show.value) {
    rule.value = couponList.value[index].ticketInfo.instruction || ''
  }
}

const selectId = ref<number>(0)
const price = ref<string>('0')

// 选择优惠券
const selectItem = (index: number) => {
  selectId.value = couponList.value[index]?.id ?? 0
  price.value = couponList.value[index]?.ticketInfo?.discountPrice ?? '0'
}

const confirm = () => {
  Jump('/pages/buy/submitOrder', { id: selectId.value, couponPrice: price.value }, 1)
}

// 更新优惠券列表
const updateCouponFn = async () => {
  page.value = 0
  await getCouponList(page.value += 1, 15)
}
</script>

<template>
  <div>
    <navbar-back text="我的优惠券" />
    <div class="body">
      <buys-coupon-search @update-coupon="updateCouponFn" />

      <template v-if="canusecouponList.length === 0">
        <common-empty text="当前暂无优惠券" icon="i-svg-nocoupon" />
      </template>
      <buys-coupon-item :coupn="canusecouponList" @click="showrule" @change="selectItem" />
    </div>
    <common-popup v-model:show="show" name="规则说明">
      <div class="h-full text-center lh-[40rpx]">
        {{ rule }}
      </div>
    </common-popup>
    <div class="confirm">
      <div>
        优惠金额：￥{{ price }}
      </div>
      <div class="confirmBtn" @click="confirm">
        确认
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$top-height: 112rpx;
$bottom-height: 156rpx;
$Be: #BEBEBE;

.i-background-product-detail {
  width: 100%;
  height: 100%;
}

.body {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.confirm {

  position: fixed;
  bottom: 0;
  width: 100%;
  height: 144rpx;
  background-color: rgba($color: #fff, $alpha: 0.2);
  backdrop-filter: blur(48rpx);

  // @supports not (backdrop-filter: blur(48rpx)) {
  // background-color: #fff; // 不支持模糊滤镜的浏览器使用不透明白色背景
  // }

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32rpx;
  box-sizing: border-box;

  .confirmBtn {

    background-color: #A7F522;
    font-size: 28rpx;
    border-radius: 8rpx;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 192rpx;
    height: 80rpx;
  }

  .confirmBtn:active {
    background-color: #8fdf06;

  }
}
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
