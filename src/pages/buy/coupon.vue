<script lang="ts" setup>
import search from '@/components/buys/coupon/search.vue'
import couponItem from '@/components/buys/coupon/couponItem.vue'
</script>

<template>
  <navbar-home text="我的优惠券" />
  <div class="body">
    <search />
    <couponItem />
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
