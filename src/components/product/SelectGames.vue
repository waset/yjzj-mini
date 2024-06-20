<script setup lang="ts">
const selectId = ref<number>(0)

const isSelect = (item: number) => {
  return item === selectId.value
}

const searchText = ref<string>('')
</script>

<template>
  <div>
    <div class="search">
      <input v-model="searchText" type="text" placeholder="输入关键字搜索想要的商品">
      <div class="i-icons-search" />
    </div>

    <div v-for="(item, index) in [1, 2, 3]" :key="index">
      <div class="select" @click="selectId = item">
        <div v-if="isSelect(item)" class="selectbg" />
        <div v-if="isSelect(item)" class="selected">
          <div class="i-icons-correct" />
        </div>

        <div class="goodsImg" />
        <div class="goodsInfo">
          <div class="name">
            荒野大镖客2:老根的救赎
          </div>
        </div>
      </div>
    </div>

    <div class="confirm">
      确定
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  display: flex;
  height: 88rpx;
  justify-content: space-between;
  align-items: center;
  border: 1rpx solid #A7F522;
  border-radius: 44rpx;
  padding: 0 24rpx;
  margin-bottom: 32rpx;
}

.select {
  position: relative;
  border-radius: 16rpx;
  height: 140rpx;
  background-color: rgba(#000, 0.2);
  padding: 20rpx;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32rpx;
  z-index: 9;

  .selected {
    position: absolute;
    top: 0;
    left: 0;
    width: 69rpx;
    height: 69rpx;
    background-color: #A7F522;
    clip-path: polygon(0% 98.571%, 98.571% 0%, 22.857% 0%, 22.857% 0%, 19.15% 0.299%, 15.633% 1.165%, 12.353% 2.551%, 9.358% 4.41%, 6.695% 6.695%, 4.41% 9.358%, 2.551% 12.353%, 1.165% 15.633%, 0.299% 19.15%, 0% 22.857%, 0% 98.571%);

    .i-icons-correct {
      color: #000;
    }
  }

  .goodsImg {
    width: 100rpx;
    height: 100rpx;
    border-radius: 16rpx;
    background-color: #fff;
  }

  .goodsInfo {
    flex: 1;

    .name {
      margin-left: 48rpx;
      width: fit-content;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      font-size: 28rpx;
      font-weight: 600;
      padding: 0 24rpx;
      background: linear-gradient(135deg, rgba(#BEBEBE, .1), rgba(#BEBEBE, .4), rgba(#BEBEBE, .4), rgba(#BEBEBE, .1));
    }
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
