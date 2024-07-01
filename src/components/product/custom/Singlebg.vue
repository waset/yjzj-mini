<script lang='ts' setup>
</script>

<template>
  <div class="body">
    <div class="selected">
      <div class="icon i-icons-correct" />
    </div>
    <div class="selectbg">
      <image class="image" src="@/assets/svg/compon-select.svg" mode="scaleToFill" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.selected {
  position: absolute;
  top: 0;
  left: 0;
  width: 69rpx;
  height: 69rpx;
  background-color: #A7F522;
  clip-path: polygon(0% 98.571%, 98.571% 0%, 22.857% 0%, 22.857% 0%, 19.15% 0.299%, 15.633% 1.165%, 12.353% 2.551%, 9.358% 4.41%, 6.695% 6.695%, 4.41% 9.358%, 2.551% 12.353%, 1.165% 15.633%, 0.299% 19.15%, 0% 22.857%, 0% 98.571%);
  z-index: 3;

  .icon {
    color: #000;
  }
}

.selectbg {
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0.2;
  z-index: -1;

  .image {
    border-radius: 16rpx;
    width: 100%;
    height: 100%;
  }
}
</style>
