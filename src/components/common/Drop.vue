<script setup lang="ts">
interface Props {
  show: boolean
  position: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  position: 'bottom',
})

const drop = ref<HTMLElement | null>(null)

watchEffect(() => {
  if (props.show) {
    console.log(drop.value)
  }
})
</script>

<template>
  <div ref="drop" class="drop">
    <div class="btn">
      <slot />
    </div>
    <template v-if="props.show">
      <div
        class="list" :style="{
          top: props.position === 'bottom' ? '100%' : 'auto',
          bottom: props.position === 'top' ? '100%' : 'auto',
          left: props.position === 'right' ? '100%' : 'auto',
          right: props.position === 'left' ? '100%' : 'auto',
        }"
      >
        <div class="box">
          <slot name="info" />
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
    z-index: 100;

    .box{

    }
  }
}
</style>
