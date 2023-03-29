<script setup>
import { ref, onMounted, markRaw } from "vue";
import {
  Viewer,
  Ion,
  SceneMode,
  Cartesian3,
  ScreenSpaceEventType,
  MapboxStyleImageryProvider,
} from "cesium";
import ControlItem from "../components/ControlItem.vue";
import LocationItem from "../components/LocationItem.vue";
import StationItem from "../components/StationItem.vue";
import LiuYu from "../components/LiuYu.vue";
import ShuiKu from "../components/ShuiKu.vue";
import MessageItem from "../components/MessageItem.vue";
// import ForecastPicture from "../components/ForecastPicture.vue";
// import ForecastPicture2 from "../components/ForecastPicture2.vue";
import FPMessageItem from "../components/FPMessageItem.vue";
/* import WaterLevel from "../components/WaterLevel.vue"; */
import WaterLevel from "../components/WaterLevel.vue";
import { useViewStore } from "../stores/earth";
import { useSimuStore } from "../stores/simulation";
import { ExportOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";
// import polygon from "../assets/test/model_area.json";
const router = useRouter();
const containerRef = ref();
const view = useViewStore();
const simuStore = useSimuStore();
const logout = () => {
  localStorage.removeItem("isAuth");
  router.push("/login");
};
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
    sceneMode: SceneMode.SCENE3D, //设定3维地图的默认场景模式:SceneMode.SCENE2D、SceneMode.SCENE3D、SceneMode.MORPHING
    navigationHelpButton: false, //是否显示右上角的帮助按钮
    scene3DOnly: true, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
    navigationInstructionsInitiallyVisible: false,
    showRenderLoopErrors: false, //是否显示渲染错误
    // imageryProvider: new IonImageryProvider({ assetId: 4 }),
    imageryProvider: new MapboxStyleImageryProvider({
      username: "mld-nj",
      styleId: "clb0khdkv004a14rxkumct99r",
      accessToken:
        "pk.eyJ1IjoibWxkLW5qIiwiYSI6ImNrbG0xeTF0MjAzZXMycG1mNHgwOTI1MTYifQ.gCNpd2DiVypcH1a8g-iiYA",
    }),
  });
  viewer.scene.fxaa = false;
  viewer.scene.postProcessStages.fxaa.enabled = false;
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(118.1758, 29.997, 50000.0),
  });
  viewer.scene.requestRenderMode = true;
  // viewer.scene.globe.depthTestAgainstTerrain = true;
  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(
    ScreenSpaceEventType.LEFT_DOUBLE_CLICK
  );
  // drawKriging(viewer, lngs, lats, values, coords, beijing);
  const supportsImageRenderingPixelated =
    viewer.cesiumWidget._supportsImageRenderingPixelated;
  if (supportsImageRenderingPixelated) {
    var vtxf_dpr = window.devicePixelRatio;
    while (vtxf_dpr >= 2.0) {
      vtxf_dpr /= 2.0;
    }
    viewer.resolutionScale = vtxf_dpr;
  }
  const rawViewer = markRaw(viewer);
  view.setCesiumViewer(rawViewer);
});
</script>

<template>
  <div class="header">
    黄山丰乐水库水雨情测报系统
    <div class="logout" v-on:click="logout">
      <export-outlined />
    </div>
  </div>
  <div class="cesiumContainer" ref="containerRef"></div>
  <ControlItem v-if="view.cesiumViewer" />
  <LocationItem v-if="view.cesiumViewer" />
  <StationItem v-if="view.cesiumViewer" />
  <MessageItem v-if="view.cesiumViewer" />
  <WaterLevel v-if="view.cesiumViewer" />
  <FPMessageItem v-if="view.cesiumViewer&&(simuStore.forecastpicture.isShow||simuStore.forecastpicture2.isShow)" />
  <!-- <ForecastPicture  v-if="simuStore.forecastpicture.isShow" />
  <ForecastPicture2  v-if="simuStore.forecastpicture2.isShow" /> -->
  <LiuYu v-if="view.cesiumViewer" />
  <ShuiKu v-if="view.cesiumViewer && simuStore.simuData.showSimu" />
</template>

<style scoped>

.header {
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  width: 100vw;
  background-color: #112e51;
  color: #fff;
  padding: 0px 15px 0px 15px;
  font-family: "Merriweather", serif;
  font-size: 22px;
  margin: 0;
  line-height: 50px;
  font-weight: 400;
  height: 50px;
}
.logout {
  cursor: pointer;
}
.cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
