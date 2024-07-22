<script setup lang="ts">
const { getTerms } = useTermsStore()
const terms = ref<Terms>()

onLoad(async (options) => {
  const req = options as { code: TermsCode }
  if (!req.code) {
    uni.showToast({
      title: '缺少参数',
      icon: 'none',
    })
    return
  }
  terms.value = await getTerms(req.code)
})
</script>

<template>
  <div class="terms">
    <navbar-back :text="terms?.name" />
    <div class="body">
      <rich-text :nodes="terms?.content" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.terms {
  .body {
    padding: 20rpx;
  }
}
</style>
