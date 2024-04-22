<script setup lang="ts">
const currentUrl = ref(useRouter().currentUrl.value)

onShow(() => {
  currentUrl.value = useRouter().currentUrl.value
})

const tabbars = ref<tabbar[]>([
  {
    icon: 'i-icons-home',
    activeIcon: 'i-icons-home-active',
    path: 'pages/index',
  },
  {
    icon: 'i-icons-menu',
    activeIcon: 'i-icons-menu-active',
    path: 'pages/menu',
  },
  {
    icon: 'i-icons-rocket',
    activeIcon: 'i-icons-rocket-active',
    path: 'pages/custom',
  },
  {
    icon: 'i-icons-buy',
    activeIcon: 'i-icons-buy-active',
    path: 'pages/buy',
  },
  {
    icon: 'i-icons-me',
    activeIcon: 'i-icons-me-active',
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
