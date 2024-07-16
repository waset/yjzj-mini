<script setup lang="ts">
const props = defineProps<{
  addressdata: addresslist[]
  select: boolean
}>()

const emits = defineEmits<{
  deleteAddress: [id: number]
  setDefault: [item: addresslist, index: number]
  editAddress: [item: addresslist]
}>()

const { nowAddress } = storeToRefs(useAddressStore())

// 调用父组件中的删除
const delAddressFn = (id: number) => {
  emits('deleteAddress', id)
}

// 设置默认地址
const setDefaultAddress = async (item: addresslist, index: number) => {
  emits('setDefault', item, index)
}
// 调用父组件编辑地址
const editAddress = (item: addresslist) => {
  emits('editAddress', item)
}

// 设置当前地址
const setNowAddress = (index: number) => {
  if (props.select === false)
    return

  nowAddress.value = props.addressdata[index]
  Jump('/pages/buy/submitOrder', {}, 1)
}

const isDefault = (item: number) => {
  return item === defaultNum.yes
}
</script>

<template>
  <div v-for="(item, index) in props.addressdata" :key="index" class="addressCard" @click="setNowAddress(index)">
    <div class="name">
      <div class="i-icons-address" />
      <span class="username"> {{ item.username }}</span>
      <span> {{ item.phone }}</span>
      <div v-if="isDefault(item.isDefault)" class="isdefault">
        默认
      </div>
    </div>
    <div class="addressInfo">
      <span>{{ getPcaDetails([item.provinceCode, item.cityCode, item.countryCode]) }}</span>
      <span>{{ item.address }}</span>
    </div>
    <div class="line" />
    <div class="edit">
      <div class="select-default" @click.stop="setDefaultAddress(item, index)">
        <div v-if="isDefault(item.isDefault)" class="default">
          <div class="i-icons-correct" />
        </div>
        <div v-if="!isDefault(item.isDefault)" class="no-default" />
        <span class="text"> 设为默认地址</span>
      </div>
      <div class="operation">
        <div class="item" @click.stop="editAddress(item)">
          <div class="icon i-icons-edit" />
          编辑
        </div>
        <div class="item" @click.stop="delAddressFn(item.id)">
          <div class="icon i-icons-del" />
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
      max-width: 340rpx;
      overflow: hidden; //超出隐藏
      text-overflow: ellipsis; //文本超出时显示省略号
      white-space: nowrap; //设置文本不换行
      font-size: 32rpx;
      font-weight: 600;
      margin-right: 16rpx;
    }

    .icon i-icons-address {
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
    overflow: hidden; //超出隐藏

    text-overflow: ellipsis; //文本超出时显示省略号

    display: -webkit-box;

    -webkit-box-orient: vertical; //子元素排列 vertical（竖排）orhorizontal（横排）

    -webkit-line-clamp: 2; //内容限制的行数

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

        .icon {
          width: $iconSize;
          height: $iconSize;
        }

      }
    }
  }
}
</style>
