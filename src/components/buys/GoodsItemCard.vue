<script lang="ts" setup>
const props = defineProps<{
  list?: sDetail[]
  showborder: boolean
}>()
const emit = defineEmits<{
  (e: 'check', index: number): void
}>()
</script>

<template>
  <div>
    <div
      v-for="(item, index) in props.list" :key="index"
      :class="[props.showborder ? 'gradient-border goodsCard' : 'goodsCard']"
      :style="{ margin: props.showborder ? '30rpx auto 0' : '0' }"
    >
      <div class="goodsInfo" :style="{ margin: props.showborder ? ' 32rpx auto' : '0' }">
        <div class="goodsInfo-flex">
          <div class="goodsImg">
            <div class="i-svg-product-bg" />
            <div class="img">
              <product-image :src="item?.productSnapshot?.banner[0] || ''" width="120rpx" height="120rpx" />
            </div>
          </div>
          <div class="goodsOptions">
            <div class="goodsTitle">
              {{ item.productSnapshot.name || '自由定制' }}
            </div>
            <div class="options" @click="emit('check', index)">
              配置详情
              <div class="i-icons-right" />
            </div>

            <div class="priceAndNum">
              <div class="price">
                ￥{{ item.productSnapshot.sellPrice }}
              </div>
              <div class="Number">
                x {{ item.totalNumber }}
              </div>
            </div>
          </div>
        </div>
        <div v-show="!props.showborder" class="borderBottomLine" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.i-svg-product-bg {
  width: 100%;
  height: 100%;
}

.gradient-border {
  position: relative;
}

.gradient-border::before {
  content: "";
  border-radius: 32rpx;
  padding: 2rpx;
  inset: 0;
  position: absolute;
  background: linear-gradient(135deg, rgba(#FFFFFF, 0.8), rgba(#FFFFFF, 0.08), rgba(#FFFFFF, 0.8));
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
}

.goodsCard {
  width: 686rpx;
  height: 248rpx;
  border: 2rpx solid transparent;
  border-radius: 32rpx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;

  .borderBottomLine {
    width: 100%;
    margin-top: 12rpx;
    height: 2rpx;
    background: linear-gradient(to right, rgba(#fff, 0.1), rgba(#fff, 0.4), rgba(#fff, 0.4), rgba(#fff, 0.1));
  }

  .goodsInfo {
    width: 622rpx;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .goodsInfo-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .goodsImg {
      position: relative;
      width: 160rpx;
      height: 160rpx;

      .img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .goodsOptions {
      width: 400rpx;
      height: 144rpx;

      .goodsTitle {
        font-weight: 500;
        font-size: 28rpx;
        color: #fff;
        margin-bottom: 20rpx;
      }

      .options {
        font-size: 24rpx;
        font-weight: 400;
        color: #BEBEBE;
        margin-bottom: 16rpx;
        display: flex;
        align-items: center;
      }

      .priceAndNum {
        display: flex;
        justify-content: space-between;

        .price {
          font-size: 28rpx;
          font-weight: 500;
          color: #A7F522;

        }

        .Number {
          font-size: 24rpx;
          padding: 4rpx 24rpx;
          background-color: rgba($color: #fff, $alpha: 0.2);
          border-radius: 80rpx;
        }
      }

    }

  }

}
</style>
