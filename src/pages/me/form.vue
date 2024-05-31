<script setup lang="ts">
const tab = ref({
  list: ['全部订单', '待付款', '待发货', '待收货'],
  active: 0,
})
// 订单状态
const getStatus = {
  1: { label: '待付款' },
  2: { label: '支付成功' },
  3: { label: '支付失败' },
  4: { label: '部分退款' },
  5: { label: '全部退款' },
  6: { label: '取消支付' },
}
</script>

<template>
  <div class="order">
    <navbar-back text="我的订单" />
    <div class="head">
      <template v-for="(item, index) in tab.list" :key="index">
        <div :class="{ active: index === tab.active }" @click="tab.active = index">
          <div class="tab">
            {{ item }}
          </div>
        </div>
      </template>
    </div>
    <div class="box">
      <div class="list">
        <div class="item">
          <template>
            <div class="info">
              <div class="id">
                订单编号：
              </div>
              <div class="status">
                {{ getStatus[6].label }}
              </div>
            </div>
            <div class="product" />
            <div class="func">
              <div class="more">
                <div class="icon" />
                <div class="text">
                  更多
                </div>
              </div>
              <div class="price">
                <span>￥</span>
              </div>
              <div class="btn">
                再次加购
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
