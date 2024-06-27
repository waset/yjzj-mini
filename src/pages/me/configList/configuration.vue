<script lang="ts" setup>
const { getConfiguration } = useConfigurationStore()
const { configurations } = storeToRefs(useConfigurationStore())

// 获取配置列表
const getList = async () => {
  await getConfiguration()
}

onShow(async () => {
  await getList()
})
</script>

<template>
  <navbar-back text="我的配置单" />
  <common-search />
  <div class="configuration">
    <div class="body">
      <div class="box">
        <template v-if="configurations && configurations.length">
          <template v-for="(configuration, index) in configurations" :key="index">
            <configure-list :configuration="configuration" />
          </template>
        </template>
        <template v-else>
          <div class="empty">
            <common-empty text="您还没有配置单哦" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
