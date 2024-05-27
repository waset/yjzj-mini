<script setup lang="ts">
const { types, products } = storeToRefs(useProductStore())
const { categorys, getCategorys, getProducts } = useProductStore()
/**
 * 当前产品类目
 */
const category = ref<CategorysItem>({} as CategorysItem)
/**
 * 页面参数
 */
interface PageReq {
  key: CategoryKey
}
const Params = ref({} as PageReq)
/**
 * 页面加载获取数据
 */
onLoad((params) => {
  Params.value = params as PageReq
  category.value = categorys[Params.value.key]
})
/**
 * 当前类目索引
 */
const classIndex = ref(0)
const layout = ref(true)
/**
 * 获取当前类目产品
 */
const getProduct = async () => {
  await getProducts({
    typeID: types.value[classIndex.value].id,
    typeParentID: categorys[Params.value.key].value,
  }, 1, 20)
}
/**
 * 页面显示获取数据
 */
onShow(async () => {
  await getCategorys(Params.value.key, 1, 20)
  await getProduct()
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
      click: (index: number) => {
        layout.value = !layout.value
        fns.value.right[index].value = Number(!layout.value)
      },
    },
    {
      label: '',
      icons: ['i-icons-screen'],
      value: 0,
      click: () => {},
    },
  ],
})
</script>

<template>
  <div class="category">
    <navbar-back :text="category.label" />
    <common-search />
    <div class="classify">
      <div class="items">
        <template v-for="(item, index) in types" :key="index">
          <div
            class="item" :class="{
              active: classIndex === index,
            }" @click=" async () => {
              classIndex = index
              await getProduct()
            }"
          >
            <div class="logo">
              <product-image :src="item.logo" width="160rpx" :background="classIndex === index" />
            </div>
            <div class="name">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="func">
      <div class="warp">
        <div class="bg">
          <div class="box">
            <div class="left">
              <template v-for="(item, index) in fns.left" :key="index">
                <div
                  class="item" :style="{
                    '--show': fns.index === index ? 1 : 0,
                  }"
                  @click="() => {
                    if (fns.index === index) {
                      fns.left[index].value = Number(!fns.left[index].value)
                    }
                    else {
                      fns.index = index
                    }
                  }"
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
                <div class="item" @click="item.click(index)">
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
    <div class="list">
      <product-list
        :list="products" :layout="layout ? 'grids' : 'rows'" @click="(item) => {
          Jump('/pages/product/detail', { id: item.id })
        }"
      />
    </div>
  </div>
</template>

<style lang="scss" soped>
  .category {
    .classify {
      padding-bottom: 32rpx;

      .items {
        display: flex;
        flex-wrap: nowrap;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;

        .item {
          @apply flex-center;
          flex-direction: column;
          padding: 0 16rpx;

          scroll-snap-align: center;
          scroll-snap-stop: always;

          &:first-child {
            padding-left: 64rpx;
          }

          &:last-child {
            padding-right: 64rpx;
          }

          .name {
            font-size: 24rpx;
            font-weight: 400;
            line-height: 34rpx;
            padding: 16rpx 0;
            color: #BEBEBE;
          }

          &.active {
            .name {
              color: #FFFFFF;
            }
          }
        }
      }
    }

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
