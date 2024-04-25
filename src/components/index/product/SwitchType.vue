<script setup lang="ts">
const props = defineProps<{
  list: string[]
  current: number
}>()
const emit = defineEmits(['update:current'])
</script>

<template>
  <div class="switch-type">
    <div class="content">
      <template v-for="(item, index) in props.list" :key="index">
        <div class="item" :class="{ active: index === props.current }" @click="emit('update:current', index)">
          <div class="btn">
            {{ item }}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .switch-type {
        @apply px-[32rpx];

        $bw: 2rpx;
        $br: 16rpx;

        .content {
            @apply flex-around;

            &::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0%;
                width: 100%;
                height: 100%;
                border-radius: $br;
                z-index: -1;
            }

            .item {
                @apply text-center relative flex-1 z-1;

                .btn {
                    @apply z-10 py-[32rpx] text-[28rpx];

                    backdrop-filter: blur(36rpx);

                    border-width: $bw 0;
                    border-style: solid;
                    border-color: rgba(255, 255, 255, 0.2);
                }

                &:first-child .btn {
                    border-width: $bw 0 $bw $bw;
                    border-top-left-radius: $br;
                    border-bottom-left-radius: $br;
                }

                &:last-child .btn {
                    border-width: $bw $bw $bw 0;
                    border-top-right-radius: $br;
                    border-bottom-right-radius: $br;
                }

                &::after {
                    content: '';
                    position: absolute;
                    opacity: 0;
                    top: -4rpx;
                    left: 30%;
                    width: 40%;
                    height: 8%;
                    border-radius: $br;
                    z-index: -2;
                    background-color: rgba($color: #A7F522, $alpha: 1);

                    transition: opacity 1s ease-in-out;
                }

                &.active::after {
                    opacity: 1;
                }
            }
        }
    }
</style>
