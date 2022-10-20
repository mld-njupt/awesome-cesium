<!-- eslint-disable prettier/prettier -->
<script setup>
import { ref, watch } from "vue";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  AlertOutlined,
} from "@ant-design/icons-vue";
import { useViewStore } from "../stores/earth";
import { Cartesian3 } from "cesium";
import {
  DoubleLeftOutlined,
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
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
    destination: Cartesian3.fromDegrees(104, 30, 15682725),
  });
}
const selectedKeys = ref(["1"]);
const openKeys = ref(["sub1"]);

const handleClick = (e) => {
  console.log("click", e);
};

const titleClick = (e) => {
  console.log("titleClick", e);
};

watch(
  () => openKeys,
  (val) => {
    console.log("openKeys", val);
  }
);
</script>
<template>
  <div class="dashboard">
    <div class="pack icon-item">
      <double-left-outlined />
    </div>
    <div class="control">
      <div class="big icon-item" v-on:click="zoomIn"><plus-outlined /></div>
      <div class="small icon-item" v-on:click="zoomOut"><minus-outlined /></div>
    </div>
    <div class="home icon-item" v-on:click="reset"><home-outlined /></div>
    <div class="dashboard-content">
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
          <a-menu-item key="5">特征信息</a-menu-item>
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
          <a-menu-item key="9">底孔闸</a-menu-item>
          <a-menu-item key="10">泄洪洞闸</a-menu-item>
          <a-menu-item key="11">发电引水隧洞</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
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
  width: 259px;
  height: 555px;
  background-color: #fff;
  border: 1px #000;
  border-style: solid;
  overflow: auto;
  scrollbar-width: none; /* firefox */
  -ms-overflow-style: none; /* IE 10+ */
}
.dashboard-content::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
