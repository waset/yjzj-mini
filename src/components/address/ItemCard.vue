<script setup lang="ts">
const props = defineProps<{
  addressdata: addresslist[]
  addressStr: addressStrs[]
}>()
const emits = defineEmits(['deleteAddress', 'setDefault', 'editAddress'])

// 调用父组件中的删除
const delAddressFn = (item: number) => {
  emits('deleteAddress', item)
}
// 判断地址是否存 单独的数组中
const findObjectById = (id: number) => {
  return props.addressStr.find(obj => obj.id === id)?.str
}
// 设置默认地址
const setDefaultAddress = async (item: addresslist) => {
  emits('setDefault', item)
}
// 调用父组件编辑地址
const editAddress = (item: addresslist) => {
  emits('editAddress', item)
}
</script>

<template>
  <div v-for="(item, index) in props.addressdata" :key="index" class="addressCard">
    <div class="name">
      <div class="i-icons-address" />
      <span class="username"> {{ item.username }}</span>
      <span> {{ item.phone }}</span>
      <div v-if="item.isDefault === 1" class="isdefault">
        默认
      </div>
    </div>
    <div class="addressInfo">
      <span>{{ findObjectById(item.id) }}</span>
      <span>{{ item.address }}</span>
    </div>
    <div class="line" />
    <div class="edit">
      <div class="select-default" @click="setDefaultAddress(item)">
        <div v-if="item.isDefault === 1" class="default">
          <div class="i-icons-correct" />
        </div>
        <div v-if="item.isDefault === 2" class="no-default" />
        <span class="text"> 设为默认地址</span>
      </div>
      <div class="operation">
        <div class="item" @click="editAddress(item)">
          <div class="i-icons-edit" />
          编辑
        </div>
        <div class="item" @click="delAddressFn(item.id)">
          <div class="i-icons-del" />
          删除
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$Be: #BEBEBE;
$theme: #A7F522;
$iconSize: 48rpx;
$fs28: 28rpx;
$fs24: 24rpx;
$pd32: 32rpx;
$m16: 16rpx;
$sp: space-between;

.addressCard {
  position: relative;
  margin: 0 auto;
  width: 686rpx;
  box-sizing: border-box;
  padding: $pd32;
  margin-bottom: 32rpx;

  .name {
    display: flex;
    align-items: center;

    .username {

      font-size: 32rpx;
      font-weight: 600;
      margin-right: 16rpx;
    }

    .i-icons-address {
      width: $iconSize;
      height: $iconSize;
    }

    .isdefault {
      color: $theme;
      width: 96rpx;
      height: $iconSize;
      line-height: $iconSize;
      font-size: $fs24;
      border: 2rpx solid transparent;
      border-radius: 8rpx;
      display: flex;
      margin-left: $m16;
      align-self: center;
      justify-content: center;
      background-clip: padding-box, border-box;
      background-origin: padding-box, border-box;
      background-image: linear-gradient(to right, #6F706E, #6F706E), linear-gradient(135deg, rgba($theme, 1), rgba($theme, 0.1), rgba($theme, 1));
    }
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    background-image: radial-gradient(circle at 0 66%,
        transparent 0,
        transparent 20rpx,
        rgba($color: #848484, $alpha: 0.5) 20rpx);
    z-index: -1;
    border-top-left-radius: 8rpx;
    border-bottom-left-radius: 8rpx;

  }

  &::before {
    border-top-right-radius: 8rpx;
    border-bottom-right-radius: 8rpx;
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    right: 0;
    width: 50%;
    background-image: radial-gradient(circle at 100% 66%,
        transparent 0,
        transparent 20rpx,
        rgba($color: #848484, $alpha: 0.5) 20rpx);
    z-index: -1;
  }

  .addressInfo {
    width: 586rpx;
    height: 80rpx;
    font-size: $fs28;
    padding-left: 46rpx;
    box-sizing: border-box;
    margin-top: $m16;

    span {
      margin-right: $m16;
    }
  }

  .line {
    width: 100%;
    height: 2rpx;
    background: linear-gradient(to right, rgba(#fff, 0.3), rgba(#fff, 0.03), rgba(#fff, 0.3));
    margin-top: $m16;
  }

  .edit {
    display: flex;
    align-items: center;
    justify-content: $sp;
    margin-top: $m16;

    .select-default {
      display: flex;
      align-items: center;

      .default {
        width: $iconSize;
        height: $iconSize;
        background-color: $theme;
        border-radius: 50%;
        color: #000;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .no-default {
        width: $iconSize;
        height: $iconSize;
        border: 2rpx solid #fff;
        border-radius: 50%;
      }

      .text {
        margin-left: $m16;
        font-size: $fs28;
      }

    }

    .operation {
      font-size: $fs28;
      display: flex;
      align-items: center;
      justify-content: center;

      .item {
        display: flex;
        align-items: center;
        margin-left: 32rpx;
        width: 112rpx;
        height: 48rpx;
        display: flex;
        align-items: center;
        justify-content: $sp;

        .i-icons-edit,
        .i-icons-del {
          width: $iconSize;
          height: $iconSize;
        }

      }
    }
  }
}
</style>
