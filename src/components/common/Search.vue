<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: string
  isInput?: boolean
  placeholder?: string
}>(), {
  isInput: false,
  placeholder: '输入关键字搜索想要的商品',
})
const emits = defineEmits<{
  'update:value': [value: string]
}>()
const text = ref('')
const update = useDebounceFn(() => {
  emits('update:value', text.value)
}, 1000)
const onKeyInput = (event: any) => {
  text.value = event.target.value
  update()
}
</script>

<template>
  <div class="search">
    <div class="box">
      <template v-if="props.isInput">
        <input class="input" :value="props.value" type="text" :placeholder="props.placeholder" @input="onKeyInput">
      </template>
      <template v-else>
        <div class="text">
          {{ props.placeholder }}
        </div>
      </template>
      <div class="i-icons-search" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  padding: 48rpx 32rpx;

  .box {
    @apply flex-between;
    font-size: 28rpx;
    line-height: 40rpx;
    font-weight: 400;
    padding: 24rpx;
    background: rgba(0, 0, 0, 0.2);
    border: 1rpx solid rgba(167, 245, 34, .6);
    border-radius: 160rpx;
    .input {
      flex: 1;
    }
  }
}
</style>
