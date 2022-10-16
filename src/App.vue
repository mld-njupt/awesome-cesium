<script setup>
import { ref, onMounted, markRaw } from "vue";
import { Viewer, Ion, SceneMode } from "cesium";

import { useViewStore } from "./stores/earth";
const containerRef = ref();
onMounted(() => {
  let defaultAccessToken =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyMGE1MDBiMS0xY2MyLTRmZmUtOTFiNy0xYWVmZjUxYjEzM2IiLCJpZCI6NDQ3NjgsImlhdCI6MTYxNDMyODY0MX0.GqhvtZhSC93LRwbLByGDPqIBji566Lqsha7-ZOArTN0";
  Ion.defaultAccessToken = defaultAccessToken;
  const viewer = new Viewer(containerRef.value, {
    animation: false, //是否创建动画小器件，左下角仪表
    baseLayerPicker: false, //是否显示图层选择器
    fullscreenButton: false, //是否显示全屏按钮
    geocoder: false, //是否显示geocoder小器件，右上角查询按钮
    homeButton: false, //是否显示Home按钮
    infoBox: false, //是否显示信息框
    sceneModePicker: false, //是否显示3D/2D选择器
    selectionIndicator: false, //是否显示选取指示器组件
    timeline: false, //是否显示时间轴
    sceneMode: SceneMode.SCENE3D, //设定3维地图的默认场景模式:Cesium.SceneMode.SCENE2D、Cesium.SceneMode.SCENE3D、Cesium.SceneMode.MORPHING
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    navigationInstructionsInitiallyVisible: false,
    showRenderLoopErrors: false, //是否显示渲染错误
  });

  const rawViewer = markRaw(viewer);
  useViewStore.setCesiumViewer(rawViewer);
});
</script>

<template>
  <div class="cesiumContainer" ref="containerRef"></div>
</template>

<style scoped>
.cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
