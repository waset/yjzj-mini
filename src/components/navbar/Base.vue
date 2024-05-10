<script setup lang="ts">

</script>

<template>
  <div class="navbar">
    <div class="box">
      <div class="left">
        <slot name="left" />
      </div>
      <div class="center">
        <slot name="center" />
      </div>
      <div class="right" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
    .navbar {
        background: linear-gradient(180deg, rgba(0, 0, 0, .8) 43%, rgba(19, 19, 19, .1) 100%);
        box-shadow: 0 0 6rpx 0 rgba(0, 0, 0, .5);
        backdrop-filter: blur(48rpx);

        @apply fixed left-0 top-0 w-full z-100;

        padding: var(--navbar-top) var(--navbar-padding-left) var(--navbar-padding-bottom) var(--navbar-padding-right);

        .box {
            @apply flex items-center justify-between;

            height: var(--navbar-height);

            .left {
                min-width: var(--navbar-width);
            }

            .center {
                overflow: hidden;
            }

            .right {
                width: var(--navbar-width);
                height: var(--navbar-height);
            }
        }
    }
</style>
