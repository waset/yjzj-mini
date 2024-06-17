<script setup lang="ts">

</script>

<template>
  <div class="select">
    <div class="line topLine" />
    <div class="line bottomLine" />
    <div class="goodsImg" />
    <div class="goodsInfo">
      <div class="row1 fs32">
        inIntel Core i9-13900KF
      </div>
      <div class="row2 fs20">
        13代13900KF+PTX4090超强组合,3A游戏畅玩。
      </div>
      <div class="row3">
        <div class="fs24 check">
          查看详情
          <div class="i-icons-right" />
        </div>
        <div class="fs32 price">
          ￥232135
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.fs20 {
  font-size: 20rpx;
}

.fs24 {
  font-size: 24rpx;
}

.fs28 {
  font-size: 28rpx;
}

.fs32 {
  font-size: 32rpx;
}

.select {
  position: relative;
  border-radius: 16rpx;
  height: 192rpx;
  background-color: rgba(#000, .2);
  padding: 16rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 9;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: url(../../assets/svg/compon-select.svg);
    background-size: 100%;
    z-index: -1;

  }

  .line {
    position: absolute;
    width: 100%;
    left: 0;
    height: 2rpx;
    background: linear-gradient(to right, rgba(#91DC10, 0), #A7F522, rgba(#91DC10, 0));
  }

  .topLine {
    top: 0;
  }

  .bottomLine {
    bottom: 0;
  }

  .goodsImg {
    width: 160rpx;
    height: 160rpx;
    margin-right: 16rpx;
    // background-color:aquamarine;
    background: url(../../assets/svg/product_bg.svg);

  }

  .goodsInfo {
    flex: 1;
    height: 100%;

    .row1 {
      font-weight: 600;
    }

    .row1,
    .row2 {
      color: #f5f5f5;
      margin-bottom: 10rpx;
    }

    .row3 {
      margin-top: 32rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .price {
        color: #A7F522;
        font-weight: 600;
      }

      .check {
        color: #BEBEBE;
      }
    }
  }
}
</style>
