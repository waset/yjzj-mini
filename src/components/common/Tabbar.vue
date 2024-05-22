<script setup lang="ts">
const props = defineProps<{
  url: string
}>()
const emit = defineEmits<{
  jump: [path: string]
}>()
// tabbar数据
const lists = useTabbarList()
/**
 * 是否居中
 *
 * @param index 当前下标
 */
function isCenter(index: number) {
  if (lists.length % 2 === 0)
    return false

  return (index + 1) === Math.ceil(lists.length / 2)
}
</script>

<template>
  <div class="tabbar">
    <div class="lists">
      <template v-for="(item, index) in lists" :key="index">
        <div class="item" @click="(item?.pagePath === props.url) ? '' : emit('jump', item?.pagePath || '')">
          <div class="rounded-12 p-2" :class="{ interme: isCenter(index) }">
            <div
              class="text-6" :class="[
                item?.pagePath === props.url ? item.activeIcon : item?.icon,
              ]"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .tabbar {
    @apply: fixed z-999 bottom-0 left-0 w-full;

    padding-top: var(--tabbar-padding-top);
    padding-bottom: var(--tabbar-padding-bottom);

    background: linear-gradient(180deg, rgba(19, 19, 19, .1) 100%, rgba(0, 0, 0, .8) 43%);
    box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, .5);
    backdrop-filter: blur(48rpx);

    .lists {
      height: var(--tabbar-height);

      @apply: flex items-center justify-around;

      .item {
        @apply: flex items-center justify-center;

        color: #FFF5F5F5;

        .interme {
          background-color: #000000;
          color: #A7F522;
        }
      }
    }
  }
</style>
