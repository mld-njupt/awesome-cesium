<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, watch } from "vue";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  AlertOutlined,
  MenuOutlined,
} from "@ant-design/icons-vue";
import { useViewStore } from "../stores/earth";
import { useLayerStore } from "../stores/layer";
import { Cartesian3 } from "cesium";
import MenuItem10 from "./control/MenuItem10.vue";
import MenuItem9 from "./control/MenuItem9.vue";
import MenuItem8 from "../components/control/MenuItem8.vue";
import MenuItem7 from "./control/MenuItem7.vue";
import MenuItem6 from "./control/MeunItem6.vue";
import MenuItem4 from "./control/MenuItem4.vue";
import MenuItem1 from "./control/MenuItem1.vue";
import MenuItem2 from "./control/MenuItem2.vue";
import MenuItem5 from "./control/MenuItem5.vue";
import MenuItem3 from "./control/MenuItem3.vue";
import MenuItem13 from "./control/MenuItem13.vue";
import MenuItem12 from "./control/MenuItem12.vue";
import {
  DoubleLeftOutlined,
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
//dashboard是否收起
const dashboardVis = ref(true);
const handleDashboard = () => {
  dashboardVis.value = !dashboardVis.value;
};

const viewerStore = useViewStore();
const layerStore = useLayerStore();
function zoomIn() {
  const viewer = viewerStore.cesiumViewer;
  let position = viewer.camera.position;
  let cameraHeight =
    viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
  let moveRate = cameraHeight / 3.0;
  viewer.camera.moveForward(moveRate);
}
//缩小
function zoomOut() {
  const viewer = viewerStore.cesiumViewer;
  let position = viewer.camera.position;
  let cameraHeight =
    viewer.scene.globe.ellipsoid.cartesianToCartographic(position).height;
  let moveRate = cameraHeight / 3.0;
  viewer.camera.moveBackward(moveRate);
}
// 复位：复位到指定位置
function reset() {
  const viewer = viewerStore.cesiumViewer;
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(118.1758, 29.997, 50000.0),
  });
}
//menu相关
const selectedKeys = ref(["1"]);
const openKeys = ref(["sub1"]);

const handleClick = (e) => {
  switch (e.key) {
    case "10":
      showDrawer("reservoir");
      break;
    case "9":
      showDrawer("simu");
      break;
    case "8":
      showDrawer("forecast");
      break;
    case "7":
      showDrawer("rule");
      break;
    case "6":
      showDrawer("project");
      break;
    case "5":
      showDrawer("curve");
      break;
    case "4":
      showDrawer("message");
      break;
    case "12":
      showDrawer("consol");
      break;
    case "13":
      //100
      drainageVis.value = 0;
      break;
    case "3":
      //001
      drainageVis.value = 1;
      break;
    case "2":
      //010
      drainageVis.value = 2;
      break;
    case "1":
      //100
      drainageVis.value = 4;
      break;
    default:
      console.log(e.key);
      break;
  }
};

const titleClick = (e) => {
  console.log("titleClick", e);
};
//流域信息相关
//100
const drainageVis = ref(4);

//水库调度相关
const reservoirVis = ref(false);
const closeResVis = () => {
  reservoirVis.value = false;
};
//预报相关
const forecastrVis = ref(false);
const closeForeVis = () => {
  forecastrVis.value = false;
};
//预报相关
const simuVis = ref(false);
const closeSimuVis = () => {
  simuVis.value = false;
};
//调度规则相关
const ruleVis = ref(false);
const closeRuleVis = () => {
  ruleVis.value = false;
};
//水利工程相关
const projectVis = ref(false);
const closeProjectVis = () => {
  projectVis.value = false;
};
//资料整编相关
const consolidation = ref(false);
const closeconsolidation = () => {
  consolidation.value = false;
};
//基本信息相关
const messageVis = ref(false);
const closeMessageVis = () => {
  messageVis.value = false;
};
//特征曲线相关
const curveVis = ref(false);
const closeCurveVis = () => {
  curveVis.value = false;
};
//drawer相关
const showDrawer = (key) => {
  switch (key) {
    case "reservoir":
      reservoirVis.value = true;
      break;
    case "forecast":
      forecastrVis.value = true;
      break;
    case "simu":
      simuVis.value = true;
      break;
    case "rule":
      ruleVis.value = true;
      break;
    case "project":
      projectVis.value = true;
      break;
    case "message":
      messageVis.value = true;
      break;
    case "curve":
      curveVis.value = true;
      break;
    case "consol":
    consolidation.value = true;
      break;
    default:
      break;
  }
};

watch(
  () => reservoirVis,
  (val) => {
    console.log("openKeys", val);
  }
);
</script>
<template>
  <div class="dashboard">
    <div class="pack icon-item" v-on:click="handleDashboard">
      <double-left-outlined v-if="dashboardVis" />
      <menu-outlined v-if="!dashboardVis" />
    </div>
    <div class="control">
      <div class="big icon-item" v-on:click="zoomIn"><plus-outlined /></div>
      <div class="small icon-item" v-on:click="zoomOut"><minus-outlined /></div>
    </div>
    <div class="home icon-item" v-on:click="reset"><home-outlined /></div>
    <div class="dashboard-content" v-if="dashboardVis">
      <a-menu
        id="dddddd"
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
        @click="handleClick"
      >
        <a-sub-menu key="sub1" @titleClick="titleClick">
          <template #icon>
            <MailOutlined />
          </template>
          <template #title>流域信息</template>
          <a-menu-item key="1">水系</a-menu-item>
          <a-menu-item key="2">DEM</a-menu-item>
          <a-menu-item key="3">土地利用</a-menu-item>
          <a-menu-item key="13">土壤类型</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>水库信息</template>
          <a-menu-item key="4">基本信息</a-menu-item>
          <a-menu-item key="5">特征曲线</a-menu-item>
          <a-menu-item key="6">水利工程</a-menu-item>
          <a-menu-item key="12">报表整编</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #icon>
            <AlertOutlined />
          </template>
          <template #title>模拟预报</template>
          <a-menu-item key="9">模拟</a-menu-item>
          <a-menu-item key="8">预报</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>水库调度</template>
          <a-menu-item key="7">调度规则</a-menu-item>
          <a-menu-item key="10">调度方案</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <MenuItem10
      v-if="reservoirVis"
      @close="closeResVis"
      :visible="reservoirVis"
    />
    <MenuItem8
      v-if="forecastrVis"
      @close="closeForeVis"
      :visible="forecastrVis"
    />
    <MenuItem9 v-if="simuVis" @close="closeSimuVis" :visible="simuVis" />
    <MenuItem7 v-if="ruleVis" @close="closeRuleVis" :visible="ruleVis" />
    <MenuItem6
      v-if="projectVis"
      @close="closeProjectVis"
      :visible="projectVis"
    />
    <MenuItem12
      v-if="consolidation"
      @close="closeconsolidation"
      :visible="consolidation"
    />
    <MenuItem5 v-if="curveVis" @close="closeCurveVis" :visible="curveVis" />
    <MenuItem4
      v-if="messageVis"
      @close="closeMessageVis"
      :visible="messageVis"
    />
    <MenuItem1 v-if="drainageVis === 4" />
    <Suspense> <MenuItem2 v-if="drainageVis === 2" /></Suspense>
    <Suspense>
      <MenuItem3 v-if="drainageVis === 1 && !layerStore.showLayer"
    /></Suspense>
    <Suspense>
      <MenuItem13 v-if="drainageVis === 0 && !layerStore.showLayer"
    /></Suspense>
  </div>
</template>
<style scoped>
.dashboard {
  position: fixed;
  z-index: 999;
  top: 100px;
  left: 15px;
  width: 32px;
}
.icon-item {
  font-size: 14px;
  background-color: #fff;
  color: #6e6e6e;
  width: 32px;
  height: 32px;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  transition: background-color 125ms ease-in-out;
}
.dashboard-content {
  position: fixed;
  z-index: 999;
  top: 100px;
  left: 55px;
  z-index: 10;
  /* width: 259px; */
  height: 555px;
  background-color: #fff;
  /* border: 1px #000; */
  /* border-style: solid; */
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.dashboard-content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.reservoir-info-wrapper {
  position: fixed;
  top: 100px;
  left: 55px;
  width: 100%;
  height: 100%;
  margin-left: 0;
  transition: margin-left 0.3s;
}
.reservoir-info-active {
  margin-left: 255px;
}
</style>
