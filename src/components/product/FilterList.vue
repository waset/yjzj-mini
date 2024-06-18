<script setup lang="ts">
interface selectItem {
  name: string
  id: number
}
const demoArr = ref<selectItem[]>([{
  name: '100w-300w',
  id: 1,
}, {
  name: '100w-300w',
  id: 2,
}, {
  name: '100w-300w',
  id: 3,
}])
</script>

<template>
  <div class="selectitembox">
    <div v-for="(item, index) in demoArr" :key="index" class="selectitem">
      {{ item.name }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.selectitembox {
  display: flex;
  flex-wrap: wrap;

  .notselectitem {
    width: fit-content;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    padding: 0 16rpx;
    margin: 0 32rpx 32rpx 0;
    color: #fff;
    height: 72rpx;
    font-size: 28rpx;
    border: 2rpx solid transparent;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;

  }

  .selectitem {
    width: fit-content;
    width: -webkit-fit-content;
    width: -moz-fit-content;
    padding: 0 16rpx;
    margin: 0 32rpx 32rpx 0;
    color: #A7F522;
    height: 72rpx;
    font-size: 28rpx;
    border: 2rpx solid transparent;
    border-radius: 8rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    background-clip: padding-box, border-box;
    background-origin: padding-box, border-box;
    background-image: linear-gradient(to right, #6F706E, #6F706E), linear-gradient(135deg, rgba(#A7F522, 1), rgba(#A7F522, 0.1), rgba(#A7F522, 1));
  }
}
</style>
