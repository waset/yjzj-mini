<script setup lang="ts">
const props = withDefaults(defineProps<{
  list: Product[]
  // 排列方式
  layout?: 'grids' | 'rows'
}>(), {
  layout: 'grids',
})
</script>

<template>
  <div class="list">
    <div
      class="wrap" :class="{
        grids: layout === 'grids',
        rows: layout === 'rows',
      }"
    >
      <template v-for="(item, index) in props.list" :key="index">
        <div class="bg">
          <div
            class="box" :class="{
              col: layout === 'grids',
              row: layout === 'rows',
            }"
          >
            <div class="image">
              <product-image :src="item.banner[0]" width="300rpx" radius="16rpx" />
              <div class="badge">
                {{ item.brand.name }}
              </div>
            </div>
            <div class="info">
              <div class="title">
                {{ item.name }}
              </div>
              <div class="desc">
                {{ item.description }}
              </div>
              <div class="more">
                <div class="price">
                  {{ item.tagPrice }}
                </div>
                <div class="btns">
                  <div class="btn">
                    <div class="i-icons-buy" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .list {
    .wrap {
      padding: 32rpx;
      gap: 16rpx;

      &.grids {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }

      &.rows {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      .bg {
        background-image: linear-gradient(133.06deg, rgba(255, 255, 255, 0.4) 3.56%, rgba(238, 238, 238, 0.06) 99.09%);
        padding: 2rpx;
        border-radius: 16rpx;

        .box {
          border-radius: 16rpx;
          background: #000;
          padding: 16rpx;

          display: flex;
          align-items: center;
          justify-content: center;
          gap: 32rpx;

          &.col {
            flex-direction: column;
          }

          &.row {
            flex-direction: row;
          }

          .image {
            position: relative;

            .badge {
              position: absolute;
              top: 0;
              left: 0;
              padding: 4rpx 0;
              padding-left: 24rpx;
              padding-right: 50rpx;
              text-align: left;
              border-radius: 16rpx 0 16rpx 0;
              background: rgba(#333, 0.8);
              color: rgba(255, 255, 255, 0.9);
              font-size: 24rpx;
              line-height: 40rpx;
              clip-path: polygon( 0% 34%,0% 34%,0.159% 27.926%,0.618% 22.797%,1.353% 18.015%,2.339% 13.647%,3.55% 9.763%,4.963% 6.431%,6.551% 3.721%,8.29% 1.699%,10.155% 0.436%,12.121% 0%,100% 0%,100% 0%,99.65% 0.436%,98.7% 1.771%,97.3% 4.05%,95.6% 7.314%,93.75% 11.607%,91.9% 16.971%,90.2% 23.45%,88.8% 31.086%,87.85% 39.921%,87.5% 50%,87.5% 50%,87.129% 63.55%,86.124% 74.4%,84.641% 82.85%,82.841% 89.2%,80.882% 93.75%,78.924% 96.8%,77.124% 98.65%,75.641% 99.6%,74.635% 99.95%,74.265% 100%,0% 100%,0% 33.333% );
            }
          }
        }
      }
    }
  }
</style>
