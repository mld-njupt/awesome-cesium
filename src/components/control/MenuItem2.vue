<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import {
  Cartesian3,
  ImageMaterialProperty,
  UrlTemplateImageryProvider,
} from "cesium";
import { useViewStore } from "../../stores/earth";
import poly from "../../assets/data/liuyu";
const coords = poly[0].flat(2);
const layer = ref({});
const viewerStore = useViewStore();
// const response = await fetch("http://43.142.17.108:9000/dem3.tif");
// const arrayBuffer = await response.arrayBuffer();
// const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
// const image = await tiff.getImage();
// const [red = [], green = [], blue = []] = await image.readRasters();
// // 将像素信息写入canvas
// const canvas = document.createElement("canvas");
// let width = image.getWidth();
// let height = image.getHeight();
// canvas.width = width;
// canvas.height = height;
// let ctx = canvas.getContext("2d");
// let imageData = ctx.createImageData(width, height);
// for (let i = 0; i < imageData.data.length / 4; i += 1) {
//   imageData.data[i * 4 + 0] = red[i];
//   imageData.data[i * 4 + 1] = green[i] || 0;
//   imageData.data[i * 4 + 2] = blue[i] || 0;
//   // imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
//   imageData.data[i * 4 + 3] = red[i] === 255;
// }
// ctx.putImageData(imageData, 0, 0);
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  const imageryLayers = viewer.scene.imageryLayers;

  const osmImageryProvider = new UrlTemplateImageryProvider({
    url: "http://43.142.17.108:9000/dem/{z}/{x}/{y}.png",
    subdomains: ["0", "1", "2", "3", "4", "5", "6", "7"],
    show: true,
  });
  layer.value = imageryLayers.addImageryProvider(osmImageryProvider);
  viewer.scene.requestRender();
});
onBeforeUnmount(() => {
  const viewer = viewerStore.cesiumViewer;
  console.log(layer.value);
  viewer.scene.imageryLayers.remove(layer.value);
  viewer.scene.requestRender();
});
</script>
<template>
  <div class="legend-wrap">
    <div class="legend"></div>
    <div class="text-wrap">
      <div class="top">1598.7m</div>
      <div class="bottom">155.8m</div>
    </div>
  </div>
</template>
<style scoped>
.legend-wrap {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 80px;
  right: 10px;
  width: 110px;
  height: 184px;
  background: rgba(255, 255, 255, 0.8);
}
.legend {
  /* position: fixed;
  bottom: 80px;
  right: 70px; */
  width: 40px;
  height: 154px;
  background-image: url("../../assets/dem/DEM图例2.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.text-wrap {
  height: 154px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
}
</style>
