<script setup lang="ts">
const DiyICons = [
  {
    text: '请选择CPU',
    icons: 'i-icons-cpu',
    value: '',
  },
  {
    text: '请选择主板',
    icons: 'i-icons-mainboard',
    value: '',
  },
  {
    text: '请选择显卡',
    icons: 'i-icons-graphics-card',
    value: '',
  },
  {
    text: '请选择硬盘',
    icons: 'i-icons-hard-disk',
    value: '',
  },
  {
    text: '请选择机箱',
    icons: 'i-icons-crate',
    value: '',
  },
  {
    text: '请选择电源',
    icons: 'i-icons-power-supply',
    value: '',
  },
  {
    text: '请选择散热',
    icons: 'i-icons-heat-dissipation',
    value: '',
  },
  {
    text: '请选择内存',
    icons: 'i-icons-storage',
    value: '',
  },
]
</script>

<template>
  <div class="diy">
    <div class="top">
      <div class="wrap">
        <div v-for="(item, index) in DiyICons" :key="index" class="line">
          <div :class="item.icons" class="icon_style" />
          {{ item.text }}
          <div class="alter" @click="Jump('/pages/custom/selectList')">
            <div class="i-icons-edit alter_icon" />
            改配
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .top {
    padding: 0 32rpx;
    box-sizing: border-box;

    .wrap {
      padding: 32rpx;
      border-radius: 16rpx;
      background-color: #000;
      word-break: break-all;

      .title {
        font-size: 40rpx;
        line-height: 48rpx;
        font-weight: 600;
        color: rgba(245, 245, 245, 1);
      }

      .desc {
        font-size: 28rpx;
        font-weight: 400;
        line-height: 40rpx;
        margin-top: 16rpx;
      }

      .line {
        height: 80rpx;
        line-height: 80rpx;
        overflow: hidden;
        margin-bottom: 20rpx;
        box-sizing: border-box;
        background: linear-gradient(90.04deg, rgba(39, 39, 39, 0) 2.8%, #272727 24.32%, #272727 49.68%, rgba(39, 39, 39, 0) 79.65%);
        border-bottom: 2rpx solid;
        border-image-source: linear-gradient(98.8deg, rgba(190, 190, 190, 0.1) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0.1) 92.04%);
        border-image-slice: 1;
        font-size: 28rpx;
        font-weight: 600;
        position: relative;
        padding: 0rpx 16rpx;

        .icon_style {
          width: 44rpx;
          height: 44rpx;
          margin-right: 12rpx;
        }

        .alter {
          min-width: 104rpx;
          height: 48rpx;
          line-height: 35rpx;
          position: absolute;
          top: 50%;
          right: 16rpx;
          transform: translateY(-50%);
          float: right;
          font-size: 24rpx;
          text-align: center;
          color: #ffffff;
          border-radius: 4rpx;
          border: 2rpx solid #a7f522;
          background: #ffffff33;
          padding: 4rpx 14rpx 4rpx 14rpx;

          .alter_icon {
            font-size: 24rpx;
          }
        }
      }
    }
  }
</style>
