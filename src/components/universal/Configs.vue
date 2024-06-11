<script setup lang="ts">
// 商品配置详情
const props = defineProps<{
  // 产品信息
  product: BuyProduct | Product
}>()

const emits = defineEmits<{
  showDetail: [product: BuyProduct | Product]
}>()
// 要显示的详情
const showConfigs = ref<BuyProduct | Product | null>(null)
// 是否显示详情
const showConfigsSwitch = ref(false)
// 显示详情方法
function showConfigsFn(product: BuyProduct | Product) {
  showConfigs.value = product
  showConfigsSwitch.value = true
}

function showInfo() {
  emits('showDetail', props.product)
  showConfigsFn(props.product)
}
</script>

<template>
  <common-popup v-model:show="showConfigsSwitch" name="配置详情">
    <div class="configs">
      <div v-if="showConfigs" class="wrap">
        <template v-for="(item, index) in showConfigs.params" :key="index">
          <div class="item">
            <div v-if="item.banner" class="image">
              <product-image :src="item.banner[0]" width="60rpx" height="60rpx" />
            </div>
            <div class="info">
              <div class="top">
                <div class="type">
                  {{ item.desc }}
                </div>
                <div v-if="item.number" class="num">
                  <span>x</span>
                  <span>{{ item.number }}</span>
                </div>
              </div>
              <div class="desc">
                {{ item.name || item.paramValue }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </common-popup>
  <div v-if="props.product" class="info" @click="showInfo">
    <span>配置详情</span>
    <div class="i-icons-right" />
  </div>
</template>

<style scoped lang="scss">
.configs {
  .wrap {
    .item {
      @apply flex-between;
      background: rgba(132, 132, 132, 0.2);
      border-radius: 8rpx 8rpx 8rpx 8rpx;
      margin-bottom: 32rpx;
      padding: 22rpx 24rpx;

      .image {
        margin-right: 20rpx;
      }

      .info {
        flex: 1;

        .top {
          @apply flex-between;

          .type {
            flex: 1;
            font-size: 32rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: rgba(167, 245, 34, 1);
          }

          .num {
            font-family: PingFang SC;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            color: rgba(190, 190, 190, 1);
          }
        }

        .desc {
          padding-top: 16rpx;
          font-size: 28rpx;
          font-weight: 400;
          line-height: 40rpx;
          color: rgba(190, 190, 190, 1);
        }
      }
    }
  }
}

.info {
  display: flex;
  flex-direction: row;
  align-items: center;

  font-size: 24rpx;
  color: #bebebe;
}
</style>
