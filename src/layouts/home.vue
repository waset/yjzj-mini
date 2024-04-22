<script setup lang="ts">
const currentUrl = ref(useRouter().currentUrl.value)

onShow(() => {
  currentUrl.value = useRouter().currentUrl.value
})

const tabbars = ref<tabbar[]>([
  {
    icon: 'i-assets-home',
    activeIcon: 'i-assets-home-active',
    path: 'pages/index',
  },
  {
    icon: 'i-assets-menu',
    activeIcon: 'i-assets-menu-active',
    path: 'pages/menu',
  },
  {
    icon: 'i-assets-rocket',
    activeIcon: 'i-assets-rocket-active',
    path: 'pages/custom',
  },
  {
    icon: 'i-assets-buy',
    activeIcon: 'i-assets-buy-active',
    path: 'pages/buy',
  },
  {
    icon: 'i-assets-me',
    activeIcon: 'i-assets-me-active',
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
    <view class="mx-auto mt-5 text-center text-sm c-white opacity-25">
      [Home Layout]
    </view>
    <common-tabbar :tabbars="tabbars" :url="currentUrl" @jump="jump" />
  </view>
</template>
