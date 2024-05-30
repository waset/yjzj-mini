<script setup lang="ts">
const props = defineProps<{
  text: string
}>()
const menu = useMenuButtonBounding()

const icons = ref([
  {
    icon: 'i-icons-left',
    func: () => Back(1),
  },
  {
    icon: 'i-icons-home-active',
    func: () => Jump('/pages/index/index'),
  },
])
</script>

<template>
  <common-navbar>
    <template #left>
      <div
        class="icons" :style="{
          height: `${menu.height}px`,
        }"
      >
        <template v-for="(item, index) in icons" :key="index">
          <div v-if="index !== 0" class="interval" />
          <div class="icon">
            <div :class="item.icon" @click="item.func" />
          </div>
        </template>
      </div>
    </template>
    <template #center>
      <div class="text">
        {{ props.text }}
      </div>
    </template>
  </common-navbar>
</template>

<style lang="scss" scoped>
  .icons {
    height: inherit;
    font-size: 28rpx;
    color: #fff;
    border-radius: 60rpx;
    border: 1rpx solid rgba($color: #fff, $alpha: .2);
    display: flex;
    align-items: center;
    justify-content: center;

    .icon {
      height: 100%;
      padding: 0 10rpx;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .interval {
      width: 2rpx;
      height: 60%;
      background-color: rgba(#fff, .2);
      margin: 0 10rpx;
    }
  }

  .text {
    font-size: 32rpx;
    font-weight: 400;
    color: #fff;
  }
</style>
