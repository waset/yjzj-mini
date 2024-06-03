<script lang="ts" setup>
interface optionsList {
  name: string
  price: number
  number: number
}
const props = defineProps<{
  list: optionsList[]
}>()
</script>

<template>
  <div v-for="(item, index) in props.list" :key="index" class="goodsCard">
    <div class="goodsInfo">
      <div class="goodsImg">
        <div class="i-svg-product-bg" />
      </div>
      <div class="goodsOptions">
        <div class="goodsTitle">
          {{ item.name }}
        </div>
        <div class="options">
          配置详情   <div class="i-icons-right" />
        </div>

        <div class="priceAndNum">
          <div class="price">
            ￥{{ item.price }}
          </div>
          <div class="Number">
            x {{ item.number }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.i-svg-product-bg {
  width: 100%;
  height: 100%;
}
.goodsCard {
  width: 686rpx;
  height: 248rpx;
  margin: 30rpx auto 0;
  border: 2rpx solid transparent;
  border-radius: 32rpx;
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
  background-image: linear-gradient(to right, #222, #222), linear-gradient(135deg, rgba(#fff, 0.8), rgba(#fff, 0.08), rgba(#fff, 0.8), );
  display: flex;
  align-items: center;
  justify-content: center;

  .goodsInfo {
    width: 622rpx;
    height: 200rpx;
    // background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .goodsImg {
      width: 200rpx;
      height: 200rpx;
      // background-color: #fff;

    }

    .goodsOptions {
      width: 400rpx;
      height: 144rpx;
      // background-color: antiquewhite;

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
