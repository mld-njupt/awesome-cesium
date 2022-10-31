<script setup>
import { ref, onMounted, markRaw } from "vue";
// import kriging from "../kriging";
import {
  Viewer,
  Ion,
  SceneMode,
  // PolygonGeometry,
  // PolygonHierarchy,
  Cartesian3,
  // Math,
  // ImageMaterialProperty,
} from "cesium";
import ControlItem from "../components/ControlItem.vue";
import LocationItem from "../components/LocationItem.vue";
import { useViewStore } from "../stores/earth";
import { ExportOutlined } from "@ant-design/icons-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const containerRef = ref();
const view = useViewStore();
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
  });
  viewer.camera.flyTo({
    destination: Cartesian3.fromDegrees(118.2443, 29.9171, 1500),
  });
  // function getCanvas(
  //   canvas,
  //   values,
  //   lngs,
  //   lats,
  //   maxx,
  //   maxy,
  //   minx,
  //   miny,
  //   colors
  // ) {
  //   //1.用克里金训练一个variogram对象
  //   let variogram = kriging.train(values, lngs, lats, "exponential", 0, 100);
  //   //2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
  //   let grid = kriging.grid(ex, variogram, (maxy - miny) / 500);
  //   canvas = document.createElement("canvas");
  //   canvas.width = 800;
  //   canvas.height = 800;
  //   canvas.style.display = "block";
  //   canvas.getContext("2d").globalAlpha = 0.75; //设置透明度
  //   //3.将得到的格网预测值渲染到canvas画布上
  //   kriging.plot(canvas, grid, [minx, maxx], [miny, maxy], colors);
  // }

  // function drawKriging(lats, lngs, values, coords) {
  //   if (values.length > 3) {
  //     let colors = [
  //       "#006837",
  //       "#1a9850",
  //       "#66bd63",
  //       "#a6d96a",
  //       "#d9ef8b",
  //       "#ffffbf",
  //       "#fee08b",
  //       "#fdae61",
  //       "#f46d43",
  //       "#d73027",
  //       "#a50026",
  //     ];
  //     const polygon = new PolygonGeometry({
  //       polygonHierarchy: new PolygonHierarchy(
  //         Cartesian3.fromDegreesArray(coords)
  //       ),
  //     }); //构造面，方便计算范围
  //     let extent = PolygonGeometry.computeRectangle({
  //       polygonHierarchy: new PolygonHierarchy(
  //         Cartesian3.fromDegreesArray(coords)
  //       ),
  //     }); //范围（弧度）
  //     let minx = Math.toDegrees(extent.west); //转换为经纬度
  //     let miny = Math.toDegrees(extent.south);
  //     let maxx = Math.toDegrees(extent.east);
  //     let maxy = Math.toDegrees(extent.north);
  //     let canvas = null; //画布
  //     getCanvas();
  //     if (canvas != null) {
  //       viewer.entities.add({
  //         polygon: {
  //           hierarchy: {
  //             positions: Cartesian3.fromDegreesArray(coords),
  //           },
  //           material: new ImageMaterialProperty({
  //             image: canvas, //使用贴图的方式将结果贴到面上
  //           }),
  //         },
  //       });
  //     }
  //   }
  // }

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
