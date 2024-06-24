<script setup lang="ts">
const { getKey } = useAuthStore()
onLaunch(async () => {
  await getKey()
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
  }
</style>
