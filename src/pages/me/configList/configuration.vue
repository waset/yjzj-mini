<script lang="ts" setup>
const { getList: getConfiguration, del: deleteConfiguration } = useConfigurationStore()
const { configurations, lastPage } = storeToRefs(useConfigurationStore())

const params = ref<ConfigurationListReq>({
  page: 1,
  pageSize: 10,
})

// 获取配置列表
const getList = async () => {
  try {
    await getConfiguration(params.value)
  }
  catch (error) {
    console.error('获取配置列表失败:', error)
  }
}

onShow(async () => {
  await getList()
})

const deleteFn = async (no: Required<Configuration>['no']) => {
  // 删除配置单
  const code = await deleteConfiguration(no)
  if (code === 200) {
    uni.showToast({
      title: '删除成功',
      icon: 'none',
      duration: 1000,
      success: () => {
        setTimeout(() => {
          getList()
        }, 1000)
      },
    })
  }
  else {
    uni.showToast({
      title: '删除配置单失败，请稍后再试',
      icon: 'none',
      duration: 2000,
    })
  }
}

const search = async (val: string | undefined) => {
  params.value.no = val
  await getList()
}

// 触底加载更多
onReachBottom(() => {
  if (params.value.page < lastPage.value) {
    params.value.page += 1
    getList()
  }
  else {
    uni.showToast({
      title: '没有更多了',
      icon: 'none',
    })
  }
})

// #ifdef MP
onShareAppMessage(async ({ from, target }) => {
  if (from === 'button' && target?.dataset?.index !== undefined) {
    const shareItem = configurations.value[target.dataset.index]
    // 筛选出 typeName 为 "机箱" 的产品
    const product = shareItem?.products?.find(p => p.typeName === '机箱')
    // 取出该产品的 banner
    const banner = ImageUrl(product?.banner[0])

    return {
      title: `配置单${shareItem?.id}`,
      path: `/pages/product/diy?config_id=${shareItem?.id}`,
      imageUrl: banner,
    }
  }

  return {
    title: '一剑装机',
    path: '/pages/index/index',
  }
})
// #endif
</script>

<template>
  <navbar-back text="我的配置单" />
  <common-search :value="params?.no" placeholder="请输入配置单编号进行搜索" is-input @update:value="search" />
  <div class="configuration">
    <div class="body">
      <div class="box">
        <template v-if="configurations && configurations.length">
          <div class="list-box">
            <configure-list :configurations="configurations" @del="(no) => deleteFn(no)" />
          </div>
        </template>
        <template v-else>
          <div class="empty-box">
            <div class="empty">
              <common-empty text="您还没有配置单哦" />
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
