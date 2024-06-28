<script lang="ts" setup>
const { getList: getConfiguration, del: deleteConfiguration } = useConfigurationStore()
const { configurations } = storeToRefs(useConfigurationStore())

// 获取配置列表
const getList = async () => {
  await getConfiguration()
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
      duration: 2000,
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
</script>

<template>
  <navbar-back text="我的配置单" />
  <common-search />
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
