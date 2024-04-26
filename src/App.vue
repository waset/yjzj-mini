<script setup lang="ts">
onLaunch(() => { })
</script>

<style lang="scss">
    // 引入 uview 样式
    @import "uview-plus/index.scss";
    // 引入清理
    @import "@/assets/css/clear.scss";
    // 引入背景图
    @import "@/assets/css/background.scss";

    page {
        color: #fff;
        background-color: #111;
        background-image: var(--bg-img);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>
