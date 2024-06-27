<script lang="ts" setup>
const props = defineProps<{
  configuration: Configuration
}>()
</script>

<template>
  <div class="list">
    <div v-if="props.configuration.data" class="context">
      <div class="bg">
        <template v-for="(item, index) in props.configuration.data" :key="index">
          <div class="box">
            <div class="top">
              <div class="left">
                <div class="no">
                  {{ item.no }}
                </div>
              </div>
              <div class="right">
                <div class="collection">
                  <div class="i-icons-collection" />
                  <div class="count">
                    {{ item.collectNumber }}
                  </div>
                </div>
                <div class="purchase">
                  <div class="i-icons-purchase" />
                  <div class="count">
                    {{ item.cartNumber }}
                  </div>
                </div>
                <div class="deal">
                  <div class="i-icons-deal" />
                  <div class="count">
                    {{ item.sellNumber }}
                  </div>
                </div>
              </div>
            </div>
            <div class="info">
              <template v-for="(product, i) in item.products" :key="i">
                <div class="left">
                  <div class="img">
                    <product-image
                      :src="item.products?.filter(item => item.tagTitle.indexOf('机箱') > -1)[0].banner[0] || ''"
                      width="160rpx" radius="16rpx"
                    />
                  </div>
                </div>
                <div class="right">
                  <div class="text">
                    {{ product.name }}
                  </div>
                </div>
              </template>
            </div>
            <div class="bottom">
              <div class="func">
                <div class="dele">
                  <div class="i-icons-dele" />
                  <div class="text">
                    删除
                  </div>
                </div>
                <div class="share">
                  <div class="i-icons-share" />
                  <div class="text">
                    分享
                  </div>
                </div>
              </div>
              <div class="operation">
                <div class="price">
                  {{ item.sellPrice }}
                </div>
                <div class="btn">
                  改配
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
