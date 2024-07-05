<script setup lang="ts">
const { levelall, inviterank, inviteuser } = storeToRefs(useInviteStore())
const { getInviteall, getInviteRank, becomePromoter } = useInviteStore()
const { user } = storeToRefs(useUserStore())
onShow(async () => {
  await getInviteall()
  await getInviteRank()
})

// 打开绑定邀请人组件
const childRef = ref<any>(null)
function bandinvite() {
  childRef.value.openShow()
}

// 成为推广员
async function become() {
  const res = await becomePromoter()
  if (res.code === 200) {
    uni.showToast({
      title: '加入成功',
      icon: 'none',
    })
  }
  else {
    if (!user.value?.promoter) {
      uni.showToast({
        title: '请先登录',
        icon: 'none',
      })
      return
    }
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
          <button class="sharebtn" open-type="share">
            <image class="mt-4" style="width: 90%;" src="@/assets/background/invite-btned.svg" mode="widthFix" />
          </button>
        </template>
      </div>
    </div>
    <popularize-bind-inviter ref="childRef" :user="user" />
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.sharebtn {
  background:none ;
  @apply flex-center w-full h-full;
}
</style>

<style>
page {
  background-image: none;
  background-color: #08050C;
}
</style>
