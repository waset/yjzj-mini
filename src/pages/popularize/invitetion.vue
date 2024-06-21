<script setup lang="ts">
const { levelall, inviterank } = storeToRefs(useInviteStore())
const { getInviteall, getInviteRank } = useInviteStore()
onShow(async () => {
  await getInviteall()
  await getInviteRank()
})
</script>

<template>
  <div class="invietion">
    <navbar-back text="邀请推广" />
    <!-- 海报 -->
    <invite-banner />
    <div :style="`background-image: url(${StaticUrl('/svg/invite-mainbg.svg')})`" class="main">
      <!-- 推广等级 -->
      <invite-level :levelall="levelall" />
      <!-- 榜单排名 -->
      <invite-ranking :inviterank="inviterank" />
      <image
        style="width: 100%;"
        class="mt-20"
        :src="StaticUrl('/svg/invite-program.svg')"
        mode="widthFix"
      />
      <div class="flex justify-center">
        <image
          style="width: 90%;"
          src="@/assets/background/invite-btn.svg"
          mode="widthFix"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main {
  width: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>

<style>
page {
  background-image: none;
  background-color: #08050C;
}
</style>
