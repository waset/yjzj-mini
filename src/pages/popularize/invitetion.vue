<script setup lang="ts">
const { levelall, inviterank, inviteuser } = storeToRefs(useInviteStore())
const { getInviteall, getInviteRank, bandInviter, becomePromoter } = useInviteStore()
const { user } = storeToRefs(useUserStore())
const { getUserInfo } = useUserStore()
onShow(async () => {
  await getInviteall()
  await getInviteRank()
})

// 绑定邀请人显隐
const showModel = ref(false)
// 邀请人邀请码
const code = ref('')
function bandinvite() {
  showModel.value = true
}

// 确认绑定
async function confirm() {
  const res = await bandInviter(code.value)
  if (res.code === 200) {
    uni.showToast({
      title: '绑定成功',
      icon: 'none',
    })
    await getUserInfo()
  }
  else {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
  showModel.value = false
}

// 成为推广员
async function become() {
  const res = await becomePromoter()
  if (res.code === 200) {
    uni.showToast({
      title: '成为推广员成功',
      icon: 'none',
    })
  }
  else {
    uni.showToast({
      title: res.msg,
      icon: 'none',
    })
  }
}
</script>

<template>
  <div class="invietion">
    <navbar-back text="邀请推广" />
    <!-- 海报 -->
    <invite-banner :inviteuser="inviteuser" :user="user" @bandinvite="bandinvite" @become="become" />
    <div :style="`background-image: url(${StaticUrl('/svg/invite-mainbg.svg')})`" class="main">
      <!-- 推广等级 -->
      <invite-level :user="user" :levelall="levelall" />
      <!-- 榜单排名 -->
      <invite-ranking :inviterank="inviterank" />
      <image style="width: 100%;" class="mt-20" :src="StaticUrl('/svg/invite-program.svg')" mode="widthFix" />
      <!-- 按钮图片 -->
      <div class="flex justify-center">
        <template v-if="user.promoterStatus !== 1">
          <image style="width: 90%;" src="@/assets/background/invite-btn.svg" mode="widthFix" @click="become" />
        </template>
        <template v-else>
          <image style="width: 90%;" src="@/assets/background/invite-btned.svg" mode="widthFix" />
        </template>
      </div>
    </div>
    <common-model v-model:show="showModel" msg="绑定邀请人" icon="i-svg-success" @ok="confirm">
      <template #inp>
        <div class="codeinp flex-center pt-2">
          <input v-model="code" placeholder="请输入邀请人邀请码" type="text" class="inp mt-1">
        </div>
      </template>
    </common-model>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.codeinp {
  border-radius: 8rpx 8rpx 8rpx 8rpx;

  .inp {
    font-size: 26rpx;
    color: #000;
    background: #D9D9D9;
    width: 66%;
    border-radius: 12rpx;
    padding: 2rpx 0;
  }
}
</style>

<style>
page {
  background-image: none;
  background-color: #08050C;
}
</style>
