<script setup lang="ts">
const { getUserInfo } = useUserStore()
const { user } = storeToRefs(useUserStore())
const { getRebatelist, getWithdrawlist } = usePopularizeStore()
const { rebatelist, withdrawlist } = storeToRefs(usePopularizeStore())
onShow(async () => {
  await getUserInfo()
  getRebatelist({ page: 1, pageSize: 20 })
  getWithdrawlist({ page: 1, pageSize: 20 })
})
// 提现弹窗显示隐藏
const showWithdraw = ref(false)
function openWithdraw() {
  showWithdraw.value = true
}
// 打开绑定邀请人组件
const childRef = ref<ComponentInstance['PopularizeBindInviter']>()
function bandinvite() {
  childRef.value?.openShow()
}
</script>

<template>
  <div class="popularize">
    <navbar-back text="邀请推广" />
    <!-- 推广邀请 -->
    <popularize-info @bandinvite="bandinvite" @openwith="openWithdraw" />
    <!-- 返利记录 & 提现记录 -->
    <popularize-record-list :rebatelist="rebatelist" :withdrawlist="withdrawlist" />
    <!-- 立即提现 & 提现弹窗 -->
    <common-popup v-model:show="showWithdraw" name="申请提现">
      <popularize-withdraw />
    </common-popup>

    <!-- 邀请人弹窗 -->
    <popularize-bind-inviter ref="childRef" :user="user" />
    <div class="c-#BEBEBE mx-10 text-center mt-6 text-sm">
      *特别说明：由于相关业务数据复杂，可能存在误差及计算延迟情况，若有疑问请联系客服。给您带来不便，敬请谅解。
    </div>
  </div>
</template>
