<script lang="ts" setup>
const props = defineProps<{
  list?: sDetail[]
}>()
const emit = defineEmits<{
  (e: 'check', index: number): void
}>()

const isSrc = (Item: any) => {
  console.log(Item)

  const arr = Item.filter((obj: any) => obj.productSnapshot.typeID === 18)
  console.log(arr[0].productSnapshot.banner[0])

  return arr[0].productSnapshot.banner[0]
}
</script>

<template>
  <div>
    <div v-for="(item, index) in props.list" :key="index" class="goodsCard">
      <div class="goodsInfo">
        <div class="goodsInfo-flex">
          <div class="goodsImg">
            <div class="i-svg-product-bg" />
            <div class="img">
              <template v-if="item.productTypeName !== '配置单'">
                <product-image :src="item?.productSnapshot?.banner[0] || ''" width="120rpx" height="120rpx" />
              </template>
              <template v-else>
                <product-image :src="isSrc(item?.details) || ''" width="120rpx" height="120rpx" />
              </template>
            </div>
          </div>
          <div class="goodsOptions">
            <div class="goodsTitle">
              <template v-if="item.productTypeName !== '配置单'">
                {{ item.productSnapshot.name || '自由定制' }}
              </template>
              <template v-else>
                {{ item.productTypeName + item.productConfigSnapshot.shareCode }}
              </template>
            </div>
            <div class="options" @click="emit('check', index)">
              配置详情
              <div class="i-icons-right" />
            </div>

            <div class="priceAndNum">
              <div class="price">
                <template v-if="item.productTypeName !== '配置单'">
                  ￥{{ item.productSnapshot.sellPrice }}
                </template>
                <template v-else>
                  ￥{{ item.sellPrice }}
                </template>
              </div>
              <div class="Number">
                <template v-if="item.productTypeName !== '配置单'">
                  x {{ item.totalNumber }}
                </template>
                <template v-else>
                  x {{ item.totalNumber }}
                </template>
              </div>
            </div>
          </div>
        </div>
        <div class="borderBottomLine" />
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
  // width: 686rpx;
  margin: 0;
  height: 248rpx;
  border: 2rpx solid transparent;
  border-radius: 32rpx;
  box-sizing: border-box;
  // display: flex;
  // align-items: center;
  // justify-content: center;

  .borderBottomLine {
    width: 100%;
    margin-top: 12rpx;
    height: 2rpx;
    background: linear-gradient(to right, rgba(#fff, 0.1), rgba(#fff, 0.4), rgba(#fff, 0.4), rgba(#fff, 0.1));
  }

  .goodsInfo {
    // width: 622rpx;
    // margin: 0;
    // display: flex;
    // flex-direction: column;
    // justify-content: space-between;

    .goodsInfo-flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .goodsImg {
      position: relative;
      width: 200rpx;
      height: 200rpx;

      .img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }

    .goodsOptions {
      // width: 400rpx;
      // height: 144rpx;
      flex: 1;
      padding-left: 24rpx;

      .goodsTitle {
        font-weight: 500;
        font-size: 28rpx;
        color: #fff;
        margin-bottom: 4rpx;
        overflow: hidden; //超出隐藏
        text-overflow: ellipsis; //文本超出时显示省略号
        display: -webkit-box;
        -webkit-box-orient: vertical; //子元素排列 vertical（竖排）orhorizontal（横排）
        -webkit-line-clamp: 2; //内容限制的行数

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
