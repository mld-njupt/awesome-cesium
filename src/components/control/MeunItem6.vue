<script setup>
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);

const onClose = () => {
  emit("close");
};
</script>
<template>
  <a-drawer
    title="水利工程"
    :width="720"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-tabs>
      <a-tab-pane key="1" tab="泄洪隧洞以及泄洪闸">
        <div class="tab1"></div
      ></a-tab-pane>
      <a-tab-pane key="2" tab="发电隧洞"><div class="tab2"></div></a-tab-pane>
      <a-tab-pane key="3" tab="大坝底孔"><div class="tab3"></div></a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>
<style scoped>
span {
  /* font-size: 24px; */
  font-weight: 600;
}
.tab1 {
  width: 656px;
  height: 277px;
  background-image: url("../../assets/project/隧洞.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.tab2 {
  width: 649px;
  height: 204px;
  background-image: url("../../assets/project/发电.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
.tab3 {
  width: 649px;
  height: 304px;
  background-image: url("../../assets/project/底孔.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
