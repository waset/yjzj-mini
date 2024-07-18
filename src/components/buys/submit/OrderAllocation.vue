<script lang="ts" setup>
const props = defineProps<{
  // params: checkParam
  allocationList?: any
  nowgoodsPer?: any
}>()
</script>

<template>
  <div>
    <template v-for="(item, index) in props.allocationList" :key="index">
      <div class="card">
        <div class="image">
          <product-image :src="ImageUrl(item?.banner[0]) || ''" mode="scaleToFill" :background="false" width="100rpx" />
        </div>
        <div class="info">
          <div class="row">
            <div class="name">
              {{ item.name }}
            </div>
            <div class="number">
              x{{ item.number || 1 }}
            </div>
          </div>
          <div class="desc">
            {{ item.description }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  background-color: #333333;
  padding: 16rpx 24rpx;
  box-sizing: border-box;

  margin-bottom: 24rpx;
  border-radius: 8rpx;

  .image {
    margin-right: 20rpx;
  }

  .info {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .row {
      display: flex;
      justify-content: space-between;

      .name {
        font-size: 32rpx;
        color: #A7F522;
      }

      .number {
        color: #bebebe;
        font-size: 28rpx;
      }
    }

    .desc {
      color: #bebebe;
      font-size: 28rpx;

      padding-top: 16rpx;
    }
  }
}
</style>
