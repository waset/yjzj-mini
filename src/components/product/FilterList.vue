<script setup lang="ts">
const emit = defineEmits<{
  confirm: [selected: selectItem[]]
}>()

const demoArr = ref<selectItem[]>([{
  name: '100w',
  id: 1,
}, {
  name: '200w',
  id: 2,
}, {
  name: '300w',
  id: 3,
}, {
  name: '300w',
  id: 4,
}, {
  name: '300w',
  id: 5,
}])

const selected = ref<selectItem[]>([])

const changeSelect = (item: selectItem) => {
  const foundItem = selected.value.some(obj => obj.id === item.id)

  if (!foundItem) {
    selected.value.push(item)
  }
  else {
    selected.value = selected.value.filter(obj => obj.id !== item.id)
  }
}

const isSelect = (item: selectItem): boolean => {
  const foundItem = selected.value.some(obj => obj.id === item.id)
  return foundItem
}

const confirm = () => {
  emit('confirm', selected.value)
}
</script>

<template>
  <div>
    <div class="selectitembox">
      <div
        v-for="(item, index) in demoArr" :key="index" :class="[isSelect(item) ? 'selectitem' : 'notselectitem']"
        @click="changeSelect(item)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="confirm" @click="confirm">
      确定
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
    background: #6F706E;
  }

  .selectitem {
    box-sizing: border-box;
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
    background-image: linear-gradient(to right, #6F706E, #6F706E), linear-gradient(109deg, rgba(#A7F522, 1), rgba(#fff, .1), rgba(#A7F522, 1));
  }
}

.confirm {
  width: 440rpx;
  height: 80rpx;
  position: fixed;
  bottom: calc(32rpx + env(safe-area-inset-bottom));
  left: 50%;
  transform: translateX(-50%);
  padding: 10px 20px 10px 20px;
  border-radius: 4rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #A7F522;
  color: #1D2129;
  font-size: 28rpx;
}

.confirm:active {
  background-color: #82c410;

}
</style>
