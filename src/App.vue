<script setup>
import { RouterView } from "vue-router";
</script>

<template>
  <div class="app-content">
    <RouterView />
  </div>
</template>

<style scoped>
.app-content {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
* {
  user-select: none;
  font-family: "Microsoft Yahei" !important;
}
</style>
