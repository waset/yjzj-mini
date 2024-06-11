<!-- eslint-disable ts/no-use-before-define -->
<script setup lang="ts">
type keys = 'left' | 'right'
interface List {
  name: 'all' | 'price' | 'sales' | 'layout' | 'filte'
  label?: string
  icons: string[]
  value?: number
  click: (...args: any[]) => void
  isShow?: boolean
}

const props = withDefaults(defineProps<{
  hasLayout: boolean
}>(), {
  hasLayout: true,
})

const emits = defineEmits<{
  change: [name: List['name'], value: List['value']]
}>()

const idx = ref(0)
const fns = ref<{ [key in keys]: List[] }>({
  left: [
    {
      name: 'all',
      label: '综合',
      icons: [],
      value: 0,
      click: (index: number) => switchTab('left', index),
    },
    {
      name: 'price',
      label: '价格',
      icons: ['i-icons-arrow-up', 'i-icons-arrow-down'],
      value: 0,
      click: (index: number) => switchTab('left', index),
    },
    {
      name: 'sales',
      label: '销量',
      icons: ['i-icons-arrow-up', 'i-icons-arrow-down'],
      value: 0,
      click: (index: number) => switchTab('left', index),
    },
  ],
  right: [
    {
      name: 'layout',
      icons: ['i-icons-switch-square', 'i-icons-menu'],
      value: 0,
      isShow: !props.hasLayout,
      click: (index: number) => switchTab('right', index),
    },
    {
      name: 'filte',
      label: '',
      icons: ['i-icons-screen'],
      click: (index: number) => switchTab('right', index),
    },
  ],
})

const switchTab = (id: keys, index: number) => {
  const item = fns.value[id][index]

  if (id === 'left') {
    if (idx.value === index && item.icons.length > 1) {
      item.value = Number(!item.value)
    }
    idx.value = index
  }

  if (id === 'right') {
    if (item.icons.length > 1) {
      item.value = Number(!item.value)
    }
  }

  emits('change', item.name, item.value)
}
</script>

<template>
  <div class="func">
    <div class="warp">
      <div class="bg">
        <div class="box">
          <div class="left">
            <template v-for="(item, index) in fns.left" :key="index">
              <div
                class="item" :style="{
                  '--show': Number(idx === index),
                }" @click="item.click(index)"
              >
                <div class="label">
                  {{ item.label }}
                </div>
                <div class="icons">
                  <div :class="[item.icons[item.value || 0], item.value ? 'text-white' : '']" />
                </div>
              </div>
            </template>
          </div>
          <div class="right">
            <template v-for="(item, index) in fns.right" :key="index">
              <template v-if="!item.isShow">
                <div class="item" @click="item.click(index)">
                  <div class="icons">
                    <div :class="[item.icons[item.value || 0]]" />
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" soped>
  .func {
    padding: 0 32rpx;

    .warp {
      background-image: linear-gradient(133.06deg,
          rgba(255, 255, 255, 0.4) 3.56%,
          rgba(238, 238, 238, 0.06) 99.09%);
      padding: 2rpx;
      border-radius: 16rpx;

      .bg {
        border-radius: 16rpx;
        background: #000;

        .box {
          @apply flex-between;
          border-radius: 16rpx;

          .left {
            display: flex;
            align-items: center;
            color: #f5f5f5;
            font-size: 28rpx;
            font-weight: 400;
            line-height: 40rpx;
            text-align: center;
            border-radius: 16rpx;

            .item {
              padding: 32rpx;
              @apply flex-center;
              position: relative;
              z-index: 1;

              .icons {
                padding-left: 4rpx;
                font-size: 20rpx;
                @apply flex-center;
                flex-direction: column;
              }

              &::before {
                content: "";
                position: absolute;
                z-index: -1;
                top: -6rpx;
                width: 50%;
                height: 50%;
                background: #a7f522;
                border-radius: 8rpx;
                opacity: var(--show);
              }

              &::after {
                content: "";
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(#000, 0.4);
                backdrop-filter: blur(20rpx);
              }

              &:first-child {
                &::after {
                  border-top-left-radius: 16rpx;
                  border-bottom-left-radius: 16rpx;
                }
              }
            }
          }

          .right {
            display: flex;
            align-items: center;
            color: #f5f5f5;
            font-size: 40rpx;
            font-weight: 400;
            line-height: 40rpx;
            text-align: center;
            padding-right: 16rpx;

            .item {
              padding: 28rpx 16rpx;
              @apply flex-center;
              position: relative;
              z-index: 1;

              .icons {
                @apply flex-center;
              }
            }
          }
        }
      }
    }
  }
</style>
