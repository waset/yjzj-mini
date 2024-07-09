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

const search = async (val: string) => {
  params.value.no = val || undefined
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
</script>

<template>
  <navbar-back text="我的配置单" />
  <common-search :value="params?.no" placeholder="请输入配置单编号进行搜索" is-input @update:value="search" />
  <div class="configuration">
    <div class="body">
      <div class="box">
        <template v-if="configurations && configurations.length">
          <div class="list-box">
            <template v-for="(item, index) in configurations" :key="index">
              <configure-list :configuration="item" @del="(no) => deleteFn(no)" />
            </template>
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

<style lang="scss" scoped>
.configuration {

  .body {

    .box {

      .list-box {
        display: flex;
        flex-direction: column;

        gap: 32rpx;
      }
    }
  }
}
</style>
