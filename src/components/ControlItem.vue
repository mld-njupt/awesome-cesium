<!-- eslint-disable prettier/prettier -->
<script setup>
import { useViewStore } from "../stores/earth";
import { Cartesian3 } from "cesium";
import {
  DoubleLeftOutlined,
  PlusOutlined,
  MinusOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
// 放大
const viewerStore = useViewStore()
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
        destination: Cartesian3.fromDegrees(104, 30, 15682725)
    });
}
</script>
<template>
  <div class="dashboard-icon">
    <div class="pack icon-item">
      <double-left-outlined />
    </div>
    <div class="control">
      <div class="big icon-item" v-on:click="zoomIn"><plus-outlined /></div>
      <div class="small icon-item" v-on:click="zoomOut"><minus-outlined /></div>
    </div>
    <div class="home icon-item" v-on:click="reset"><home-outlined /></div>
  </div>
</template>
<style scoped>
.dashboard-icon {
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
.pack {
  margin-bottom: 10px;
}
.control {
  width: 32px;
  height: 64px;
  margin-bottom: 10px;
}
.big {
}
.small {
}
.home {
}
</style>
