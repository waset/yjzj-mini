<script setup lang="ts">
import mainbg from '@/assets/background/invite-mainbg.svg'

const mainbgImg = ref(mainbg)
</script>

<template>
  <div class="invietion">
    <navbar-back text="邀请推广" />
    <!-- 海报 -->
    <invite-banner />

    <div :style="`background-image: url(${mainbgImg})`" class="main">
      <!-- 推广等级 -->
      <invite-level />
      <!-- 榜单排名 -->
      <invite-ranking />
      <image
        style="width: 100%;"
        class="mt-20"
        src="@/assets/background/invite-program.svg"
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
    <image
      style="width: 100%;"
      class="mt-10"
      src="@/assets/background/invite-foot.svg"
      mode="widthFix"
    />
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
  background-color: #0F0820;
  padding: 0;
  margin: 0;
}
</style>
