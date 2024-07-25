<script setup lang="ts">
const { levelall, inviterank, inviteuser } = storeToRefs(useInviteStore())
const { getInviteall, getInviteRank, becomePromoter, bandInviter } = useInviteStore()
const { user, shareCode, isLogin } = storeToRefs(useUserStore())
const { getUserInfo, hasGoLogin } = useUserStore()
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
  if (hasGoLogin()) {
    return
  }
  const res = await becomePromoter()
  if (res.code === 200) {
    uni.showToast({
      title: '加入成功',
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

// 确认换绑分享人弹窗显隐
const showModel = ref(false)
// 该分享邀请人邀请码
const shareCodeInner = ref('')
// 绑定邀请人
async function bindCode(code: string) {
  const res = await bandInviter(code)
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
}
async function bindShareCode(code: string) {
  // 没登陆
  if (!isLogin.value) {
    // 存储分享者邀请码
    shareCode.value = code
    return hasGoLogin()
  }
  // 登录且没有加入邀请人计划
  if (user.value.phone && user.value.promoterStatus !== 1) {
    await bindCode(code)
  }
  // 登录且加入邀请人计划
  if (user.value.phone && user.value.promoterStatus === 1) {
    // 分享者不是自己和已绑定的邀请人
    if (code !== user.value.inviteCode)
      showModel.value = true
  }
}

// 换绑分享人的邀请码
async function ChangeBind() {
  await bindCode(shareCodeInner.value)
  showModel.value = false
}

onLoad((params) => {
  if (params?.inviteCode) {
    shareCode.value = params?.inviteCode
    shareCodeInner.value = params.inviteCode
    bindShareCode(params.inviteCode)
  }
})

// #ifdef MP
onShareAppMessage(() => {
  // 如果是邀请人 则分享时携带邀请码
  const params = !user.value.inviteCode ? {} : { inviteCode: user.value.inviteCode }
  return {
    title: '快来加入推广人计划吧！',
    imageUrl: StaticUrl('/images/share_cover.png'),
    path: UrlAndParams('/pages/popularize/invitetion', params),
  }
})
// #endif
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
    <common-model v-model:show="showModel" msg="确认邀请人换绑为该分享者" icon="i-svg-warn" @ok="ChangeBind" />
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
  background: none;
  @apply flex-center w-full h-full;
}
</style>

<style>
page {
  background-image: none;
  background-color: #08050C;
}
</style>
