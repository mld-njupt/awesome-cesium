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
import { Cartesian3 } from "cesium";
import SubItem4 from "../components/control/SubItem4.vue";
import MenuItem8 from "../components/control/MenuItem8.vue";
import MenuItem7 from "./control/MenuItem7.vue";
import MenuItem6 from "./control/MeunItem6.vue";
import MenuItem4 from "./control/MenuItem4.vue";
import MenuItem1 from "./control/MenuItem1.vue";
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
// 放大
const viewerStore = useViewStore();
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
    destination: Cartesian3.fromDegrees(118.2443, 29.9171, 1500),
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
    case "8":
      showDrawer("forecast");
      break;
    case "7":
      showDrawer("rule");
      break;
    case "6":
      showDrawer("project");
      break;
    case "4":
      showDrawer("message");
      break;
    default:
      console.log(e.key);
      break;
  }
};

const titleClick = (e) => {
  console.log("titleClick", e);
};
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
//基本信息相关
const messageVis = ref(false);
const closeMessageVis = () => {
  messageVis.value = false;
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
    case "rule":
      ruleVis.value = true;
      break;
    case "project":
      projectVis.value = true;
      break;
    case "message":
      messageVis.value = true;
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
        </a-sub-menu>
        <a-sub-menu key="sub2" @titleClick="titleClick">
          <template #icon>
            <AppstoreOutlined />
          </template>
          <template #title>水库信息</template>
          <a-menu-item key="4">基本信息</a-menu-item>
          <a-menu-item key="5">特征曲线</a-menu-item>
          <a-menu-item key="6">水利工程</a-menu-item>
          <a-menu-item key="7">调度规则</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <template #icon>
            <AlertOutlined />
          </template>
          <template #title>预报预警</template>
          <a-menu-item key="8">预报</a-menu-item>
          <a-menu-item key="9">预警</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub4">
          <template #icon>
            <SettingOutlined />
          </template>
          <template #title>水库调度</template>
          <a-menu-item key="10">底孔闸</a-menu-item>
          <a-menu-item key="11">泄洪洞闸</a-menu-item>
          <a-menu-item key="12">发电引水隧洞</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <SubItem4
      v-if="reservoirVis"
      @close="closeResVis"
      :visible="reservoirVis"
    />
    <MenuItem8
      v-if="forecastrVis"
      @close="closeForeVis"
      :visible="forecastrVis"
    />
    <MenuItem7 v-if="ruleVis" @close="closeRuleVis" :visible="ruleVis" />
    <MenuItem6
      v-if="projectVis"
      @close="closeProjectVis"
      :visible="projectVis"
    />
    <MenuItem4
      v-if="messageVis"
      @close="closeMessageVis"
      :visible="messageVis"
    />
    <!-- <MenuItem1 /> -->
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
