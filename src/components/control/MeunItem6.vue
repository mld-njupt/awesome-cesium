<script setup>
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);

const onClose = () => {
  emit("close");
};
const data1 = {
  型式: "无压明流",
  长度1: "131.0m",
  洞径: "10×8m",
  进口底高程: "190.0m",
  出口底高程: "172.0m",
  最大泄流量: "900m3/s",
  工作闸门: "1扇10×6m弧形闸门",
  事故闸门: "1扇10×7.2m平板闸门",
  工作闸门启闭机: "1台QHSY-2×500/2×250kN-7.0m液压式(原为1台×37.5吨卷扬式)",
  事故闸门启闭机:
    "1台QPKY11-2×1250/2×1000kN-7.0m液压机(与工作闸门共用一级油泵)",
  长度2: "238.5m",
};
const data2 = {
  洞径: "4.5m",
  "进口断面尺寸(宽×高)": "3.5×4.5m",
  支洞及压力钢管: "2条内径Φ1.75m",
  进口底高程: "172.0m",
  最大流量: "25.8m3/s",
  进口事故闸门: "1扇3.5×4.5m平板闸门",
  启闭机: "1台QPK－1000/500kN－10m卷扬式(原为1台80吨卷扬式）",
};
const data3 = {
  长度: "24.482m",
  孔径: "1.8m",
  进口底高程: "163.0m",
  最高运用水位: "195.0m",
  最大泄流量: "48.6m3/s",
  工作闸门: "1扇1.5×1.5m弧形闸门",
  工作闸门启闭机: "1台QY-1×160KN-3.5m集成液压式(原设计为1台10吨螺杆式)",
  事故闸门: "1扇2.8×2.8m平板闸门",
  事故闸门启闭机: "1台QPY-1×800KN-30m斜吊式卷扬机(原为1台7吨斜吊式卷扬机)",
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
      <a-tab-pane key="1" tab="泄洪隧洞以及泄洪闸"
        ><div class="table-wrap">
          <div class="title1">泄洪隧洞</div>
          <div class="key-wrap">
            <div class="key-item" :key="value" v-for="(value, key) in data1">
              {{ key }}
            </div>
          </div>
          <div class="value-wrap">
            <div class="value-item" :key="key" v-for="(value, key) in data1">
              {{ value }}
            </div>
          </div>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2" tab="发电隧洞"
        ><div class="table-wrap">
          <div class="title2">发电隧洞</div>
          <div class="key-wrap">
            <div class="key-item" :key="value" v-for="(value, key) in data2">
              {{ key }}
            </div>
          </div>
          <div class="value-wrap">
            <div class="value-item" :key="key" v-for="(value, key) in data2">
              {{ value }}
            </div>
          </div>
        </div></a-tab-pane
      >
      <a-tab-pane key="3" tab="大坝底孔"
        ><div class="table-wrap">
          <div class="title3">放水底孔</div>
          <div class="key-wrap">
            <div class="key-item" :key="value" v-for="(value, key) in data3">
              {{ key }}
            </div>
          </div>
          <div class="value-wrap">
            <div class="value-item" :key="key" v-for="(value, key) in data3">
              {{ value }}
            </div>
          </div>
        </div></a-tab-pane
      >
    </a-tabs>
  </a-drawer>
</template>
<style scoped>
.table-wrap {
  display: flex;
  align-items: center;
}
.title1 {
  height: 440px;
  border: 1px solid black;
  text-align: center;
  line-height: 440px;
  padding: 0 10px;
}
.title2 {
  height: 280px;
  border: 1px solid black;
  text-align: center;
  line-height: 280px;
  padding: 0 10px;
}
.title3 {
  height: 360px;
  border: 1px solid black;
  text-align: center;
  line-height: 360px;
  padding: 0 10px;
}
.key-item {
  width: 140px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  /* border-top: 1px solid black; */
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
.key-wrap :first-child {
  border-top: 1px solid black;
}
.value-wrap :first-child {
  border-top: 1px solid black;
}
.value-item {
  width: 450px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  /* border-top: 1px solid black; */
  border-right: 1px solid black;
  border-bottom: 1px solid black;
}
</style>
