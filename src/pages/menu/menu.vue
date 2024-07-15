<script lang="ts" setup>
const { getProducts: useGetProduct } = useProductStore()
const { categorys, products } = storeToRefs(useProductStore())
// 菜单数据
const categorysArray = computed(() => {
  const result: Array<CategorysItem & { name: string }> = []
  const keys = Object.keys(categorys.value) as Array<keyof typeof categorys.value>
  keys.map((key) => {
    if (key === 'diyGoods')
      return false

    result.push({
      label: categorys.value[key].label,
      value: categorys.value[key].value,
      icon: categorys.value[key].icon,
      name: key,
    })
    return true
  })
  return result
})
// 左侧滚动条位置
const leftScrollTop = ref(0)
// 右侧滚动条位置
const rightScrollTop = ref(0)
// 当前选中菜单
const current = ref(0)
// 菜单高度
const menuHeight = ref(0)
// 按钮高度
const menuItemHeight = ref(0)
onShow(async () => {
  await getProducts()
})
// 产品数量
const productLength = ref(30)
// 获取产品列表
async function getProducts() {
  products.value = []
  await useGetProduct({ typeParentID: categorysArray.value[current.value].value }, 1, productLength.value)
}
// 切换菜单
async function swichMenu(index: number) {
  if (index === current.value)
    return
  current.value = index
  // 如果为0，意味着尚未初始化
  if (menuHeight.value === 0 || menuItemHeight.value === 0) {
    await getElRect('menu-scroll', menuHeight)
    await getElRect('menu-item', menuItemHeight)
  }
  // 将菜单菜单活动item垂直居中
  leftScrollTop.value = index * menuItemHeight.value + menuItemHeight.value / 2 - menuHeight.value / 2
  rightScrollTop.value = 0
  await getProducts()
}
// 获取元素高度
function getElRect(elClass: string, dataVal: Ref<number>) {
  return new Promise((resolve, reject) => {
    const query = uni.createSelectorQuery()
    query.select(`.${elClass}`).fields({
      size: true,
    }, (res) => {
      // 如果节点尚未生成，res值为null，循环调用执行
      if (!res) {
        setTimeout(() => {
          getElRect(elClass, dataVal)
        }, 10)
        reject(new Error('节点未找到'))
      }
      const result = res as UniApp.NodeInfo
      dataVal.value = result.height || 0
      resolve(dataVal.value)
    }).exec()
  })
}
</script>

<template>
  <div class="menu">
    <navbar-home text="分类" />
    <common-search @clicking="Jump('/pages/search/search')" />
    <div class="wrap">
      <div class="left">
        <scroll-view scroll-y scroll-with-animation class="menu-scroll scroll" :scroll-top="leftScrollTop">
          <template v-for="(item, index) in categorysArray" :key="index">
            <div class="list">
              <view class="menu-item item" :class="{ active: current === index }" @tap.stop="swichMenu(index)">
                <div class="background">
                  <div class="i-icons-push-bg icon" />
                </div>
                <div class="icons">
                  <div :class="item.icon" class="icon" />
                </div>
                <div class="text">
                  {{ item.label }}
                </div>
              </view>
            </div>
          </template>
        </scroll-view>
      </div>
      <div class="right">
        <div class="top" @click="Jump('/pages/product/category', { key: categorysArray[current].name })">
          <div class="title" :data-text="categorysArray[current].label">
            {{ categorysArray[current].label }}
          </div>
          <div class="more">
            查看更多>>
          </div>
        </div>
        <div class="product">
          <scroll-view
            scroll-y scroll-with-animation class="scroll" :scroll-top="rightScrollTop"
            @scroll="(detail: any) => { rightScrollTop = detail.scrollTop }"
          >
            <div
              class="gradientBorder" :style="{
                height: products.length ? 'auto' : '100%',
              }"
            >
              <template v-if="products.length">
                <div class="list">
                  <template v-for="(item, index) in products" :key="index">
                    <div
                      class="item" :class="{
                        last: index === productLength - 1,
                      }" @click="() => {
                        if (index === productLength - 1) {
                          Jump('/pages/product/category', { key: categorysArray[current].name })
                        }
                        else if (item.typeParentID === categorys.diy.value) {
                          Jump('/pages/product/diy', { id: item.id })
                        }
                        else {
                          Jump('/pages/product/detail', { id: item.id })
                        }
                      }"
                    >
                      <div class="image" data-last-text="查看更多>>">
                        <product-image :src="item.banner[0]" width="160rpx" height="160rpx" border-radius="28rpx" />
                      </div>
                      <div class="name">
                        {{ item.name }}
                      </div>
                    </div>
                  </template>
                </div>
              </template>
              <template v-else>
                <div class="empty">
                  <common-empty text="暂无商品" />
                </div>
              </template>
            </div>
            <!-- <div class="py-2" /> -->
          </scroll-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .menu {
    display: flex;
    flex-direction: column;
    height: var(--body-min-height);

    .wrap {
      flex: 1;
      display: flex;
      overflow: hidden;

      .left {
        height: 100%;
        overflow: hidden;

        .scroll {
          height: 100%;

          .list {
            padding-bottom: 50rpx;

            .item {
              position: relative;
              color: #BEBEBE;

              transition: color 1s;
              @apply flex-center flex-col;

              .background {
                position: absolute;
                z-index: -1;
                width: 100%;
                height: 100%;
                overflow: hidden;
                color: rgba(167, 245, 34, 1);
                opacity: 0;
                transition: opacity 0.4s;

                .icon {
                  width: 100%;
                  height: 100%;
                }
              }

              &.active {
                z-index: 0;
                color: #fff;

                .background {
                  opacity: 1;
                }
              }

              .icons {
                font-size: 48rpx;
                padding: 8rpx;
              }

              .text {
                font-size: 28rpx;
                padding: 0 8rpx;
              }
            }
          }
        }
      }

      .right {
        flex: 1;
        height: 100%;
        padding: 0 24rpx;
        overflow: hidden;
        @apply flex flex-col;

        .top {
          @apply flex-between;
          background: linear-gradient(98.8deg, rgba(190, 190, 190, 0) 5.58%, rgba(190, 190, 190, 0.4) 35.3%, rgba(190, 190, 190, 0.4) 65.93%, rgba(190, 190, 190, 0) 92.04%);
          border-radius: 0rpx 4rpx 4rpx 0rpx;
          padding: 8rpx;
          padding-top: 24rpx;

          .title {
            font-size: 36rpx;
            font-weight: bold;
            font-style: italic;
            letter-spacing: 4rpx;

            display: flex;

            position: relative;

            &::before {
              content: attr(data-text);
              position: absolute;
              left: 8rpx;
              top: 8rpx;
              width: 100%;
              height: 100%;
              color: rgba(167, 245, 34, 0.2);
              z-index: -1;
            }
          }

          .more {
            @apply underline underline-offset-3;
            font-size: 28rpx;
          }
        }

        .product {
          padding-top: 32rpx;
          padding-bottom: 16rpx;
          overflow: hidden;
          flex: 1;

          .scroll {
            height: 100%;

            .gradientBorder {
              border-radius: 32rpx;
              padding: 2rpx;
              background-image: linear-gradient(to right bottom, rgba(#BEBEBE, 1) 0%, rgba(0, 0, 0, 0.1) 80%, rgba(0, 0, 0, 0.1) 80%, rgba(#BEBEBE, 1) 100%);

              .empty,
              .list {
                min-height: 100%;
                border-radius: 32rpx;
                padding: 16rpx;
                background-color: #000;
              }

              .list {
                @apply grid grid-cols-3 gap-[22rpx];

                .item {
                  @apply flex-center flex-col;
                  justify-content: start;

                  .image {
                    width: 100%;
                  }

                  .name {
                    font-weight: 400;
                    font-size: 24rpx;
                    color: #FFFFFF;
                    line-height: 40rpx;
                    text-align: left;
                    font-style: normal;
                    text-transform: none;

                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;

                    @apply hyphens-manual whitespace-normal break-all;
                  }

                  &.last {
                    .image {
                      position: relative;
                      z-index: 1;

                      &::after {
                        content: attr(data-last-text);
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background-color: rgba(0, 0, 0, 0.5);
                        z-index: 2;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 24rpx;
                      }
                    }

                    .name {
                      color: rgba(#fff, 0.5);
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>

<route lang="json">
{
  "layout": "home"
}
</route>
