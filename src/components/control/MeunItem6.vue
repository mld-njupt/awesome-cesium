<script setup>
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);

const onClose = () => {
  emit("close");
};
// const data1=[
//   {"":"",}
// ]
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
      <a-tab-pane key="1" tab="泄洪隧洞以及泄洪闸"> </a-tab-pane>
      <a-tab-pane key="2" tab="发电隧洞"><div class="tab2"></div></a-tab-pane>
      <a-tab-pane key="3" tab="大坝底孔"><div class="tab3"></div></a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>
<style scoped></style>
