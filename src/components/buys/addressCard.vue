<script lang="ts" setup>
const props = defineProps<{
  width: number
}>()
const { addressList, nowAddress, addressString } = storeToRefs(useAddressStore())
// 查询 是否有默认的地址
const arr = ref<addresslist[]>([])
// 判断地址是否存 单独的数组中
const findObjectById = (id: number) => {
  return addressString.value.find(obj => obj.id === id)?.str
}
onShow(() => {
  // 找出是否存在 默认地址 如果不存在 返回空

  function findDefault() {
    arr.value = addressList.value.filter(item => item.isDefault === 1)

    if (arr.value.length > 0) {
      nowAddress.value = arr.value[0]
    }
  }

  if (nowAddress.value.username === '')
    findDefault()
})
</script>

<template>
  <div class="addressCard">
    <div class="center_info" :style="{ width: `${props.width}rpx` }">
      <div v-if="nowAddress.username" class="nameMobile">
        <div style="display: flex;align-items: center;">
          <div class="usernameRow">
            <div class="i-icons-address" /> {{ nowAddress.username }}
          </div>
          <div style="font-size: 28rpx;">
            {{ nowAddress.phone }}
          </div>
          <div v-if="nowAddress.isDefault === 1" class="isdefault">
            默认
          </div>
        </div>
        <div class="i-icons-right" />
      </div>
      <div v-else class="addressInfoTips" style="width: 156rpx;">
        <div class="i-icons-address" />
        <div>收货地址</div>
      </div>
      <div v-if="!nowAddress.address" class="shadel" />
      <div v-if="nowAddress.address" style="font-size: 28rpx;padding-left: 57rpx">
        <span>{{ findObjectById(nowAddress.id) }}{{ nowAddress.address }}</span>
      </div>
      <div v-else class="addressInfoTips">
        <div> 请选择/添加收货地址</div>
        <div class="i-icons-right" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
$max-width: 686rpx;

.addressCard {
  width: 100%;
  height: 192rpx;
  position: relative;
  margin: 0 auto;
  border-radius: 8rpx;
  overflow: hidden;
  padding: 32rpx;
  box-sizing: border-box;

  .center_info {
    height: 128rpx;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    .addressInfoTips {
      width: 100%;
      font-size: 28rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nameMobile {
      width: 100%;

      display: flex;
      align-items: center;
      justify-content: space-between;

      .usernameRow {
        display: flex;
        align-items: center;

      }

      view {
        margin-right: 16rpx;
      }

      .isdefault {
        width: 96rpx;
        height: 48rpx;
        line-height: 48rpx;
        font-size: 24rpx;
        border: 2rpx solid transparent;
        border-radius: 8rpx;
        display: flex;
        align-self: center;
        justify-content: center;
        background-clip: padding-box, border-box;
        background-origin: padding-box, border-box;
        background-image: linear-gradient(to right, #6F706E, #6F706E), linear-gradient(135deg, rgba(#fff, 1), rgba(#fff, 0.1), rgba(#fff, 1), );
      }
    }

    .shadel {
      width: 100%;
      height: 2rpx;
      border-top: 1px dashed #fff;
      /* 在顶部创建一条1像素宽，黑色，虚线的边框 */
    }
  }

  // background-color: rgba($color: #848484, $alpha: 0.5);
  &::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50%;
    background-image: radial-gradient(circle at 0 50%,
        transparent 0,
        transparent 20rpx,
        rgba($color: #848484, $alpha: 0.5) 20rpx);
  }

  z-index: -1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    right: 0;
    width: 50%;
    background-image: radial-gradient(circle at 100% 50%,
        transparent 0,
        transparent 20rpx,
        rgba($color: #848484, $alpha: 0.5) 20rpx);
    z-index: -1;
  }

  background-repeat: no-repeat;
  background-position: left center,
  right center;

}
</style>
