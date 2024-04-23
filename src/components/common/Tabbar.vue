<script setup lang="ts">
const props = defineProps<{
  url: string
  tabbars: tabbar[]
}>()

const emit = defineEmits<{
  jump: [path: string]
}>()

/**
 * 是否居中
 *
 * @param index 当前下标
 */
function isCenter(index: number) {
  if (props.tabbars.length % 2 === 0)
    return false

  return (index + 1) === Math.ceil(props.tabbars.length / 2)
}
</script>

<template>
  <div class="tabbar">
    <div class="lists">
      <template v-for="(item, index) in props.tabbars" :key="index">
        <div class="item" @click="(item.path === props.url) ? '' : emit('jump', item.path)">
          <div class="rounded-12 p-2" :class="{ interme: isCenter(index) }">
            <div
              class="text-6" :class="[
                item.path === props.url ? item.activeIcon : item.icon,
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

    padding-top: var(--tab-bar-padding-interval);
    padding-bottom: calc(var(--tab-bar-padding-interval) + env(safe-area-inset-bottom));
    // height: var(--tab-bar-height);

    background: linear-gradient(180deg, rgba(19, 19, 19, .1) 100%, rgba(0, 0, 0, .8) 43%);
    box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, .5);
    backdrop-filter: blur(48rpx);

    .lists {
      @apply: grid grid-cols-5 grid-rows-1 gap-2;

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
