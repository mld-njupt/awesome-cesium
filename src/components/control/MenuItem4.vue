<script setup>
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);

const onClose = () => {
  emit("close");
};
</script>
<template>
  <a-drawer
    title="基本信息"
    :width="640"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-tabs>
      <a-tab-pane key="1" tab="水库概况">
        <div class="item item1"></div
      ></a-tab-pane>
      <a-tab-pane key="2" tab="水文、气象">
        <div class="item item2"></div>
      </a-tab-pane>
      <a-tab-pane key="3" tab="特征水位及库容">
        <div class="item item3"></div
      ></a-tab-pane>
      <a-tab-pane key="4" tab="防洪任务现状">
        <div class="item item4"></div>
      </a-tab-pane>
      <a-tab-pane key="5" tab="供水任务现状">
        <div class="item item5"></div
      ></a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>
<style scoped>
.item {
  width: 600px;
  height: 450px;
  background-repeat: no-repeat;
  background-size: cover;
}
.item1 {
  background-image: url("../../assets/basicMsg/1.jpg");
}
.item2 {
  background-image: url("../../assets/basicMsg/2.jpg");
}
.item3 {
  background-image: url("../../assets/basicMsg/3.jpg");
}
.item4 {
  background-image: url("../../assets/basicMsg/4.jpg");
}
.item5 {
  background-image: url("../../assets/basicMsg/5.jpg");
}
</style>
