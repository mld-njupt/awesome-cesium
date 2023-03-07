<script setup>
import { RouterView } from "vue-router";
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('en');
</script>

<template>
  <a-config-provider :locale="zhCN">
    <div class="app-content">
      <RouterView />
    </div>
  </a-config-provider>
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