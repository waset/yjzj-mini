<script setup lang="ts">
onLaunch(() => { })
</script>

<style lang="scss">
    /* 引入清理 */
    @import "@/assets/css/clear.scss";
    /* 引入背景图 */
    @import "@/assets/css/background.scss";

    page {
        min-height: 100vh;
        color: #fff;
        background-color: #111;
        background-image: var(--bg-img);
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
        background-attachment: fixed;
    }
</style>
