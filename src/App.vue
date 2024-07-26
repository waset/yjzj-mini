<script setup lang="ts">
const { getKey } = useAuthStore()
onLaunch(async () => {
  await getKey()
})

const checkForUpdate = () => {
  // #ifdef MP
  const updateManager = uni.getUpdateManager()
  updateManager.onCheckForUpdate((res) => {
    // 是否有新版本
    if (res.hasUpdate) {
      // 下载成功
      updateManager.onUpdateReady(() => {
        uni.showModal({
          title: '更新提示',
          content: '新版本已经准备好，是否重启应用？',
          success(res) {
            if (res.confirm) {
              updateManager.applyUpdate()
            }
          },
        })
      })
      // 下载失败
      updateManager.onUpdateFailed(() => {
        // 新版本下载失败
        uni.showModal({
          title: '更新失败',
          content: '请删除当前小程序历史记录，并重新搜索打开',
          showCancel: false,
        })
      })
    }
  })
  // #endif
}

onShow(() => {
  checkForUpdate()
})
</script>

<style lang="scss">
  // 引入 uview 样式
  @import "uview-plus/index.scss";
  // 引入清理
  @import "@/assets/css/clear.scss";

  page {
    color: #fff;
    height: 100%;

    font-size: 32rpx;
    font-weight: 400;
    line-height: 40rpx;
  }
</style>
