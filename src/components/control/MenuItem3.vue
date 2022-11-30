<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Cartesian3, ImageMaterialProperty } from "cesium";
import { useViewStore } from "../../stores/earth";
import poly from "../../assets/data/liuyu";
const colors = [
  { r: 158, g: 158, b: 158 },
  { r: 0, g: 127, b: 0 },
  { r: 0, g: 158, b: 0 },
  { r: 0, g: 255, b: 0 },
  { r: 165, g: 0, b: 0 },
  { r: 0, g: 212, b: 0 },
  { r: 255, g: 255, b: 0 },
  { r: 0, g: 186, b: 0 },
  { r: 255, g: 255, b: 127 },
  { r: 0, g: 255, b: 255 },
];
const legends = [
  "水田",
  "早地",
  "有林地",
  "灌木丛",
  "疏林地",
  "其它林地",
  "高覆盖度草地",
  "河渠",
  "农村居民点",
];
const coords = poly[0].flat(2);
const viewerStore = useViewStore();
const response = await fetch("http://43.142.17.108:9000/tudiliyong33.tif");
const arrayBuffer = await response.arrayBuffer();
const tiff = await GeoTIFF.fromArrayBuffer(arrayBuffer);
const image = await tiff.getImage();
const [red = [], green = red, blue = red] = await image.readRasters();
// 将像素信息写入canvas
const canvas = document.createElement("canvas");
let width = image.getWidth();
let height = image.getHeight();
canvas.width = width;
canvas.height = height;
let ctx = canvas.getContext("2d");
let imageData = ctx.createImageData(width, height);
const dataMap = new Map();
let colorIndex = 0;
for (let i = 0; i < imageData.data.length / 4; i += 1) {
  if (dataMap.has(red[i]) && dataMap.has(green[i]) && dataMap.has(blue[i])) {
    // console.log(dataMap.get(red[i]))
    imageData.data[i * 4 + 0] = dataMap.get(red[i]).r;
    imageData.data[i * 4 + 1] = dataMap.get(red[i]).g;
    imageData.data[i * 4 + 2] = dataMap.get(red[i]).b;
    imageData.data[i * 4 + 3] = 255;
  } else {
    imageData.data[i * 4 + 0] = colors[colorIndex];
    imageData.data[i * 4 + 1] = colors[colorIndex];
    imageData.data[i * 4 + 2] = colors[colorIndex];
    imageData.data[i * 4 + 3] = 255;
    dataMap.set(red[i], colors[colorIndex]);
    dataMap.set(green[i], colors[colorIndex]);
    dataMap.set(blue[i], colors[colorIndex]);
    colorIndex++;
  }
  // imageData.data[i * 4 + 0] = red[i];
  // imageData.data[i * 4 + 1] = green[i] || 0;
  // imageData.data[i * 4 + 2] = blue[i] || 0;
  // imageData.data[i * 4 + 3] = red[i] === 255 ? 0 : 255;
  //   imageData.data[i * 4 + 3] = 0;
}
ctx.putImageData(imageData, 0, 0);
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: "dem",
    polygon: {
      hierarchy: {
        positions: Cartesian3.fromDegreesArray(coords),
      },
      material: new ImageMaterialProperty({
        image: canvas, //使用贴图的方式将结果贴到面上
      }),
      zIndex: 5,
    },
  });
  viewer.scene.requestRender();
});
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("dem"));

  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
</script>
<template>
  <div class="legend-wrap">
    <div class="legend"></div>
    <div class="text-wrap">
      <div class="text-item" :key="item" v-for="item in legends">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.legend-wrap {
  position: fixed;
  bottom: 80px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 130px;
  height: 200px;
  background: rgba(255, 255, 255, 0.8);
}
.legend {
  width: 45px;
  height: 170px;
  background-image: url("../../assets/土地图例.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.text-wrap {
  height: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 170px;
}
.text-item {
  font-size: 8px;
  color: black;
  font-weight: 700;
}
</style>
