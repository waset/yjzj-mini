<script lang="ts" setup>
const { couponList } = storeToRefs(useSubmitOrderStore())
</script>

<template>
  <navbar-back text="我的优惠券" />
  <div class="body">
    <buys-coupon-search />
    <div v-if="couponList.length === 0">
      <common-empty text="当前暂无优惠券" icon="i-svg-nocoupon" />
    </div>
    <div v-for="(item, index) in couponList" :key="index">
      <buys-coupon-item :coupn="item" :is-select="true" />
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
