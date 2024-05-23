<script setup lang="ts">
/**
 * 页面参数
 */
interface PageReq {
  key: CategoryKey
}
const { categorys } = useProductStore()
/**
 * 当前产品类目
 */
const category = ref<CategorysItem>({} as CategorysItem)
/**
 * 页面加载获取数据
 */
onLoad((params) => {
  const { key } = params as PageReq
  category.value = categorys[key]
})
const fns = ref({
  index: 0,
  left: [
    {
      label: '综合',
      icons: [],
      value: 0,
    },
    {
      label: '价格',
      icons: ['i-icons-arrow-up', 'i-icons-arrow-down'],
      value: 0,
    },
    {
      label: '销量',
      icons: ['i-icons-arrow-up', 'i-icons-arrow-down'],
      value: 0,
    },
  ],
  right: [
    {
      label: '',
      icons: ['i-icons-switch-square', 'i-icons-menu'],
      value: 0,
      switch: true,
    },
    {
      label: '',
      icons: ['i-icons-screen'],
      value: 0,
      switch: false,
    },
  ],
})
</script>

<template>
  <div class="category">
    <navbar-back :text="category.label" />
    <common-search />
    <div class="func">
      <div class="warp">
        <div class="bg">
          <div class="box">
            <div class="left">
              <template v-for="(item, index) in fns.left" :key="index">
                <div
                  class="item" :style="{
                    '--show': fns.index === index ? 1 : 0,
                  }" @click="fns.index === index ? fns.left[index].value = Number(!fns.left[index].value) : fns.index = index"
                >
                  <div class="label">
                    {{ item.label }}
                  </div>
                  <div class="icons">
                    <div :class="[item.icons[item.value], item.value ? 'text-white' : '']" />
                  </div>
                </div>
              </template>
            </div>
            <div class="right">
              <template v-for="(item, index) in fns.right" :key="index">
                <div class="item" @click="item.switch ? fns.right[index].value = Number(!fns.right[index].value) : ''">
                  <div class="icons">
                    <div :class="[item.icons[item.value]]" />
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" soped>
  .category {
    .func {
      padding: 0 32rpx;

      .warp {
        background-image: linear-gradient(133.06deg, rgba(255, 255, 255, 0.4) 3.56%, rgba(238, 238, 238, 0.06) 99.09%);
        padding: 2rpx;
        border-radius: 16rpx;

        .bg {
          border-radius: 16rpx;
          background: #000;

          .box {
            @apply flex-between;
            border-radius: 16rpx;

            .left {
              display: flex;
              align-items: center;
              color: #F5F5F5;
              font-size: 28rpx;
              font-weight: 400;
              line-height: 40rpx;
              text-align: center;
              border-radius: 16rpx;

              .item {
                padding: 32rpx;
                @apply flex-center;
                position: relative;
                z-index: 1;

                .icons {
                  padding-left: 4rpx;
                  font-size: 20rpx;
                  @apply flex-center;
                  flex-direction: column;
                }

                &::before {
                  content: '';
                  position: absolute;
                  z-index: -1;
                  top: -6rpx;
                  width: 50%;
                  height: 50%;
                  background: #A7F522;
                  border-radius: 8rpx;
                  opacity: var(--show);
                }

                &::after {
                  content: '';
                  position: absolute;
                  z-index: -1;
                  top: 0;
                  left: 0;
                  width: 100%;
                  height: 100%;
                  background: rgba(#000, 0.4);
                  backdrop-filter: blur(20rpx);
                }

                &:first-child {
                  &::after {
                    border-top-left-radius: 16rpx;
                    border-bottom-left-radius: 16rpx;
                  }
                }
              }

            }

            .right {
              display: flex;
              align-items: center;
              color: #F5F5F5;
              font-size: 40rpx;
              font-weight: 400;
              line-height: 40rpx;
              text-align: center;
              padding-right: 16rpx;

              .item {
                padding: 28rpx 16rpx;
                @apply flex-center;
                position: relative;
                z-index: 1;

                .icons {
                  @apply flex-center;
                }
              }
            }
          }
        }

      }
    }
  }
</style>
