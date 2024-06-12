<script lang="ts" setup>
const { couponList } = storeToRefs(useSubmitOrderStore())
</script>

<template>
  <navbar-home text="我的优惠券" />
  <div class="body">
    <buys-coupon-search />
    <div v-for="(item, index) in couponList" :key="index">
      <buys-coupon-couponItem :coupn="item" />
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
</style>
<!--
<route lang="json">
{
  "layout": "home"
}
</route> -->
