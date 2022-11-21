<script setup>
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);

const onClose = () => {
  emit("close");
};
</script>
<template>
  <a-drawer
    title="调度规则"
    :width="720"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-tabs>
      <a-tab-pane key="1" tab="防洪调度">
        <span>任务与原则</span>
        <br />
        调度任务:根据设计及批准的防洪标准、防洪调度方式、各防洪特征水位，对入库洪水进行调蓄，确保水库防洪安全;同时应充分考虑了下游河道的防洪安全要求。
        调度原则:黄山市丰乐水库工程管理处应严格执行经批准的汛期调度运用计划，服从黄山市水利局的统一指挥调度，不得任意超蓄，也不能任意压缩或增加泄量。
        汛限水位及时间
        5月1日至8月31日汛限水位201m，9月1日至4月30日最高水位控制在203m，不得任意超蓄。
        <br />
        <span>调度方式</span>
        <br />
        当来水小于20年一遇(即水位低于206.83m)时，考虑下游岩寺镇河道近期防洪标准(丰乐河安全泄量:1300m/s)，按总泄量小于910m/s控制泄量;当遇超过20年一遇洪水(即水位高于206.83m)时为确保水库大坝安全，泄洪洞闸门全开泄洪，坝顶开敞溢洪道自由下泄。洪峰过后，逐步减少下泄流量，减轻下游河道行洪压力，待水位降至201m汛限水位，来水量小于50m/s时，关闭泄洪洞闸门，利用发电降低库水位。
        <div class="tab1"></div
      ></a-tab-pane>
      <a-tab-pane key="2" tab="供水调度">
        <span>供水任务与原则</span>
        <br />
        在保证歙县、徽州区、屯溪新城区城市供水的基础上，尽可能的满足下游河道生态用水和工农业生产用水，统筹兼顾，最大限度的发挥丰乐水库工程效益。
        供水次序
        先保城镇生活供水，再农田灌溉、河道生态用水，再其次发电和工业生产用水。
        <br />
        <span>调度方式</span>
        <br />
        原则上，汛期库水位控制在193米以上，非汛期库水位控制在196米以上。当汛期库水位低于193米时，非汛期库水位低于196米，为保证城镇供水，大坝机组停止发电。汛期，当库水位高于201米时，大坝机组满负荷发电，在条件允许的情况下，尽可能利用发电引水降低库水位，减少弃水。灌溉和生态用水充分利用发电尾水进行补水。
        <div class="tab2"></div>
      </a-tab-pane>
      <!-- <a-tab-pane key="3" tab="Tab 3">Content of Tab Pane 3</a-tab-pane> -->
    </a-tabs>
  </a-drawer>
</template>
<style scoped>
span {
  /* font-size: 24px; */
  font-weight: 600;
}
.tab1 {
  width: 600px;
  height: 300px;
  background-image: url("../../assets/rule/防洪调度.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.tab2 {
  width: 600px;
  height: 300px;
  background-image: url("../../assets/rule/供水调度.jpg");
  background-size: contain;
  background-repeat: no-repeat;
}
</style>
