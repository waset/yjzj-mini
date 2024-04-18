<script setup lang="ts">
const props = defineProps<{
  url: string
  tabbars: tabbar[]
}>()

const emit = defineEmits<{
  jump: [path: string]
}>()
const safeAreaInsets = ref(uni.getSystemInfoSync().safeAreaInsets?.bottom || 0)
// const safeAreaInsets = ref(0)
</script>

<template>
  <view
    class="tabbar"
  >
    <view
      class="lists grid grid-cols-5 grid-rows-1 gap-2" :style="{
        paddingBottom: `${safeAreaInsets}px`,
      }"
    >
      <template v-for="(item, index) in props.tabbars" :key="index">
        <view
          class="item flex items-center justify-center"
          @click="(item.path === props.url) ? '' : emit('jump', item.path)"
        >
          <view
            class="rounded-12 p-2" :class="{
              interme: ((index + 1) === 3),
            }"
          >
            <view
              class="text-6" :class="[
                item.path === props.url ? item.activeIcon : item.icon,
              ]"
            />
          </view>
        </view>
      </template>
    </view>
  </view>
</template>

<style scoped lang="scss">
.tabbar {
    position: fixed;
    /* bottom: var(--window-bottom);*/
    /* padding-bottom: env(safe-area-inset-bottom);*/
    z-index: 999;
    left: 0;
    bottom: 0;
    width: 100%;

    .lists {
        height: 110rpx;
        background: rgba(255, 255, 255, 0.2);
        backdrop-filter: blur(24px);
        box-shadow: 0rpx -8rpx 112rpx 0rpx rgba(0, 70, 207, 0.03);

        .item {
            color: #FFF5F5F5;

            .interme {
                background-color: #000000;
                color: #A7F522;
            }
        }
    }
}
</style>
