<script setup lang="ts">
interface Props {
  show: boolean
  position: 'top' | 'bottom' | 'left' | 'right'
  list: {
    name: string
    label: string
  }[]
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
})

const emits = defineEmits<{
  click: [name: Props['list'][0]['name']]
}>()
</script>

<template>
  <div
    class="drop" :style="{
      '--top': props.position === 'bottom' ? '100%' : 'auto',
      '--bottom': props.position === 'top' ? '100%' : 'auto',
      '--left': props.position === 'right' ? '100%' : 'auto',
      '--right': props.position === 'left' ? '100%' : 'auto',
    }"
  >
    <div class="btn">
      <slot />
    </div>
    <template v-if="props.show">
      <div class="list">
        <div class="box">
          <div class="menu">
            <template v-for="(i, idx) in list" :key="idx">
              <div v-if="idx !== 0" class="line" />
              <div class="item" @click="emits('click', i.name)">
                {{ i.label }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.drop {
  position: relative;

  .list {
    position: absolute;

    --offset: 20%;

    top: calc(var(--top) + var(--offset));
    bottom: calc(var(--bottom) + var(--offset));
    left: calc(var(--left) + var(--offset));
    right: calc(var(--right) + var(--offset));

    z-index: 90;

    .menu {
      display: flex;
      flex-direction: column;
      align-items: center;

      width: 200%;
      border-radius: 8rpx;
      border: 2rpx solid #bdbdbd;

      backdrop-filter: blur(5px);
      background-color: rgba(255, 255, 255, 0.2);

      .item {
        all: unset;
        display: flex;
        justify-content: center;

        font-size: 28rpx;

        width: 60%;
        padding: 24rpx 32rpx;

      }

      .line {
        width: 80%;
        height: 2rpx;
        background-image: linear-gradient(134deg, rgba(190, 190, 190, 0.2), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.8), rgba(190, 190, 190, 0.2));
      }
    }
  }
}
</style>
