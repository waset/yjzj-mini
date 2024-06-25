<script lang="ts" setup>
const props = withDefaults(defineProps<{
  levelall: Levelall[]
  user: UserInfo
}>(), {
  levelall: () => [],
})
</script>

<template>
  <div class="inviation">
    <div class="flex justify-center pt-20 pb-10">
      <image
        src="@/assets/background/invite-title1.svg"
        mode="heightFix"
        style="height: 44rpx;"
      />
    </div>
    <!-- 推广等级进度 -->
    <invite-step :levelall="props.levelall" :user="props.user" />
    <div class="flex justify-center">
      <image
        style="width: 90%;"
        :src="StaticUrl('/svg/invite-label.svg')"
        mode="widthFix"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
