<script setup lang="ts">
const currentUrl = ref(useRouter().currentUrl.value)

onShow(() => {
  currentUrl.value = useRouter().currentUrl.value
})

const tabbars = ref<tabbar[]>([
  {
    icon: 'i-icon-home',
    activeIcon: 'i-icon-home-active',
    path: 'pages/index',
  },
  {
    icon: 'i-icon-menu',
    activeIcon: 'i-icon-menu-active',
    path: 'pages/menu',
  },
  {
    icon: 'i-icon-rocket',
    activeIcon: 'i-icon-rocket-active',
    path: 'pages/custom',
  },
  {
    icon: 'i-icon-buy',
    activeIcon: 'i-icon-buy-active',
    path: 'pages/buy',
  },
  {
    icon: 'i-icon-me',
    activeIcon: 'i-icon-me-active',
    path: 'pages/me',
  },
])

function jump(path: string) {
  path = path.replace('pages/', '')
  useRouter().switchTab({
    url: path,
  })
}
</script>

<template>
  <view class="px-10 py-20 text-center">
    <slot />
    <app-footer />
    <view class="mx-auto mt-5 text-center text-sm c-white opacity-25">
      [Home Layout]
    </view>
    <common-tabbar :tabbars="tabbars" :url="currentUrl" @jump="jump" />
  </view>
</template>
