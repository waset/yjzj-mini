<script lang="ts" setup>
const props = defineProps<{
  configurations: Configuration[]
}>()
const emits = defineEmits<{
  del: [Required<Configuration>['no']]
}>()

const getbanner = (item: Configuration) => {
  // 筛选出 typeName 为 "机箱" 的产品
  const product = item.products?.find(p => p.typeName === '机箱')
  // 取出该产品的 banner
  const banner = product?.banner || ''

  return banner?.[0] || ''
}

// 配置单删除确认弹窗
const delItem = ref<Configuration>()
const showModel = ref(false)
function showDeleteConfirm(item: Configuration) {
  delItem.value = item
  showModel.value = true
}

const deleteFn = () => {
  showModel.value = false
  emits('del', delItem.value?.no || '')
}
</script>

<template>
  <div class="list">
    <common-model v-model:show="showModel" msg="确认删除配置单吗" icon="i-svg-warn" @ok="deleteFn" />
    <template v-for="(item, index) in props.configurations" :key="index">
      <div class="context">
        <div class="bg">
          <div class="box">
            <div class="top">
              <div class="left">
                <div class="no" @click="copyText(item.no)">
                  {{ item.no }}
                </div>
              </div>
              <div class="right">
                <div class="item">
                  <div class="i-svg-collection" />
                  <div class="count">
                    {{ item.collectNumber }}
                  </div>
                </div>
                <div class="item">
                  <div class="i-svg-purchase" />
                  <div class="count">
                    {{ item.cartNumber }}
                  </div>
                </div>
                <div class="item">
                  <div class="i-svg-deal" />
                  <div class="count">
                    {{ item.sellNumber }}
                  </div>
                </div>
              </div>
            </div>
            <div class="info">
              <div class="left">
                <div class="img">
                  <product-image :src="getbanner(item)" width="200rpx" radius="16rpx" />
                </div>
              </div>
              <div class="right">
                <template v-for="(product, i) in item.products" :key="i">
                  <div class="text">
                    {{ product.name }}
                  </div>
                </template>
              </div>
            </div>
            <div class="line" />
            <div class="bottom">
              <div class="func">
                <div class="item" @click="showDeleteConfirm(item)">
                  <div class="i-icons-del" />
                  <div class="text">
                    删除
                  </div>
                </div>
                <button class="share-btn item" open-type="share" :data-index="index">
                  <div class="i-icons-share" />
                  <div class="text">
                    分享
                  </div>
                </button>
              </div>
              <div class="operation">
                <div class="price">
                  <span>￥</span>
                  <span>{{ item.sellPrice }}</span>
                </div>
                <div
                  class="btn" @click="() => {
                    Jump('/pages/product/diy', { config_id: item.id })
                  }"
                >
                  改配
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .list {
    display: flex;
    flex-direction: column;
    gap: 32rpx;

    .context {
      padding: 0 32rpx;

      .bg {
        border-radius: 32rpx;
        padding: 2rpx;
        background-image: linear-gradient(113.84deg, rgba(255, 255, 255, 0.8) -6.55%, rgba(255, 255, 255, 0.08) 46.47%, rgba(255, 255, 255, 0.8) 92.28%);

        .box {
          display: flex;
          flex-direction: column;

          gap: 32rpx;

          padding: 32rpx 32rpx;
          border-radius: 32rpx;
          background-color: #000;

          .top {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            background: #1F1F1F;
            border-radius: 32rpx;

            padding: 24rpx 24rpx;

            .left {

              .no {
                font-size: 24rpx;
                color: #bebebe;
              }
            }

            .right {
              display: flex;
              flex-direction: row;
              gap: 16rpx;

              .item {
                display: flex;
                flex-direction: row;
                align-items: center;

                gap: 4rpx;

                .count {
                  font-size: 24rpx;
                  color: #fff;
                }
              }

            }

          }

          .info {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            gap: 16rpx;

            .right {
              display: flex;
              flex-direction: column;
              padding: 16rpx 8rpx;

              gap: 8rpx;

              .text {
                padding: 4rpx 4rpx;

                font-size: 24rpx;
                color: #fff;
              }
            }
          }

          .line {
            width: 100%;
            height: 2rpx;
            background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.6), rgba(190, 190, 190, 0.6), rgba(190, 190, 190, 0.2));
          }

          .bottom {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;

            .func {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 24rpx;

              .share-btn {
                all: unset;
                display: inline-block;
                position: static;

                &::after {
                  all: unset;
                }
              }

              .item {
                display: flex;
                flex-direction: row;
                align-items: center;

                padding: 16rpx 0;

                .text {
                  font-size: 24rpx;
                  color: #fff;
                }
              }
            }

            .operation {
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 16rpx;

              .price {
                font-size: 32rpx;
                font-weight: 600;
                color: #a7f522;
              }

              .btn {
                font-size: 28rpx;
                color: #1D2129;
                background-color: #fff;
                border-radius: 4rpx;
                padding: 12rpx 32rpx;

                display: flex;
                justify-content: center;
                align-items: center;
              }
            }

          }
        }
      }
    }
  }
</style>
