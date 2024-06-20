<script lang="ts" setup>
const props = defineProps<{
  params: checkParam
}>()
</script>

<template>
  <div>
    <div class="card">
      <div class="image">
        <image class="pic" :src="ImageUrl(props.params?.product?.banner[0]) || ''" mode="scaleToFill" />
      </div>
      <div class="info">
        <div class="row">
          <div class="name">
            {{ props.params?.desc }}
          </div>
          <div class="number">
            x{{ props.params?.number }}
          </div>
        </div>
        <div class="desc">
          {{ props.params?.product?.name || '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  height: 148rpx;
  background-color: #333333;
  padding: 16rpx 24rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24rpx;
  border-radius: 8rpx;

  .image {
    width: 116rpx;
    height: 116rpx;
    margin-right: 16rpx;
    background: url(../../../assets/svg/product-bg.svg);
    background-size: contain;
    display: flex;
    justify-content: center;
    align-items: center;
    .pic {
      width: 96rpx;
      height: 96rpx;
    }
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
    }
  }
}
</style>
