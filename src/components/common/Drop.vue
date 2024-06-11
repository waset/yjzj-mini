<script setup lang="ts">
interface Props {
  show: boolean
  name?: string
  info?: string[]
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  name: 'popup',
  width: '100%',
  height: '60%',
})

const emit = defineEmits<{
  close: []
}>()

function close() {
  emit('close')
}
</script>

<template>
  <div v-if="props.show" class="drop">
    <div class="wrap" :style="{ width: props.width, height: props.height }">
      <slot name="info">
        <div class="title" @click="close">
          <div v-if="props.info" class="func">
            <template v-for="item in props.info" :key="item">
              {{ props.info }}
            </template>
          </div>
        </div>
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
