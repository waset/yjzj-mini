<script setup lang="ts">
import inviteImg from '@/assets/background/invite-img.svg'

const mineImg = ref(inviteImg)
</script>

<template>
  <div class="invietion">
    <navbar-home text="邀请推广" />
    <image
      class="invietion-img w-100"
      :src="mineImg"
      mode="widthFix"
    />
  </div>
  <!-- 推广等级 -->
  <invite-level />
</template>

<style lang="scss" scoped>
.invietion-img {
  width: 100%;
  height: 1296rpx;
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
