<script setup lang="ts">
const props = withDefaults(defineProps<{
  value?: string
  isInput?: boolean
  placeholder?: string
  padding?: string
  isFocus?: boolean
}>(), {
  isInput: false,
  placeholder: '输入关键字搜索想要的商品',
  padding: '48rpx 32rpx',
  isFocus: false,
})
const emits = defineEmits<{
  'update:value': [value: string]
  'clicking': []
}>()
const text = ref(props.value)
const update = useDebounceFn(() => {
  emits('update:value', text.value || '')
}, 1000)
const onKeyInput = (event: any) => {
  text.value = event?.target?.value
  update()
}

// 清理输入框
const clear = () => {
  text.value = ''
}
defineExpose({
  clear,
})
</script>

<template>
  <div class="search" :style="{ padding: props.padding }" @click="emits('clicking')">
    <div class="box">
      <template v-if="props.isInput">
        <input
          class="input" :value="text" type="text" :placeholder="props.placeholder" :focus="isFocus"
          @input="onKeyInput"
        >
      </template>
      <template v-else>
        <div class="text">
          {{ props.placeholder }}
        </div>
      </template>
      <div class="icons">
        <template v-if="text">
          <div class="icon" @click="onKeyInput">
            <div class="i-icons-closed" />
          </div>
        </template>
        <template v-else>
          <div class="icon">
            <div class="i-icons-search" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {

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
      height: 40rpx;
      line-height: 41rpx;
    }

    .icons {
      font-size: 28rpx;

      .icon {
        padding: 0 16rpx;
      }
    }
  }
}
</style>
