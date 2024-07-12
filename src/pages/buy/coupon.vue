<script lang="ts" setup>
const { couponList } = storeToRefs(useSubmitOrderStore())
const { getCouponList } = useSubmitOrderStore()
const page = ref<number>(1)

onShow(async () => {
  page.value = 0
  try {
    couponList.value = []
    // 获取优惠列表
    await getCouponList(page.value += 1, 15)
  }
  catch (error) {
    console.error('Failed to fetch coupon list:', error)
  }
})

const show = ref<boolean>(false)
const rule = ref('')
const showrule = (index: number) => {
  show.value = !show.value
  if (show.value) {
    rule.value = couponList.value[index]?.ticketInfo?.instruction || ''
  }
}

// 更新优惠券列表
const updateCouponFn = async () => {
  page.value = 0
  await getCouponList(page.value += 1, 15)
}
// 触底加载更多
onReachBottom(async () => {
  await getCouponList(page.value += 1, 15)
})
</script>

<template>
  <div class="">
    <navbar-back text="我的优惠券" />
    <div class="body">
      <buys-coupon-search @update-coupon="updateCouponFn" />

      <template v-if="couponList.length === 0">
        <common-empty text="当前暂无优惠券" icon="i-svg-nocoupon" />
      </template>
      <buys-coupon-item :coupn="couponList" :is-select="false" @click="showrule" />
    </div>
    <common-popup v-model:show="show" name="规则说明">
      <div class="h-full text-center lh-[40rpx]">
        {{ rule }}
      </div>
    </common-popup>
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
</style>
