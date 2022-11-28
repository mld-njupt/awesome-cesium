<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Cartesian3, ImageMaterialProperty } from "cesium";
import { useViewStore } from "../../stores/earth";
import poly from "../../assets/data/liuyu";
const colors = [
  { r: 255, g: 20, b: 147 },
  { r: 180, g: 148, b: 209 },
  { r: 152, g: 150, b: 72 },
  { r: 242, g: 170, b: 65 },
  { r: 232, g: 224, b: 220 },
  { r: 253, g: 144, b: 144 },
  { r: 255, g: 144, b: 179 },
  { r: 254, g: 252, b: 54 },
  { r: 219, g: 110, b: 101 },
];
const legends = [
  "黄棕壤",
  "石灰（岩）土",
  "石质土",
  "粗骨图",
  "红壤",
  "红壤",
  "红壤",
  "黄壤",
];
const coords = poly[0].flat(2);
const viewerStore = useViewStore();
const response = await fetch("http://43.142.17.108:9000/turangleixing.tif");
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
    imageData.data[i * 4 + 3] = red[i] === 255 ? 0 : 255;
  } else {
    imageData.data[i * 4 + 0] = colors[colorIndex];
    imageData.data[i * 4 + 1] = colors[colorIndex];
    imageData.data[i * 4 + 2] = colors[colorIndex];
    imageData.data[i * 4 + 3] = red[i] === 255 ? 0 : 255;
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
      zIndex: 2,
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
  <div class="legend">
    <div class="text-wrap">
      <div class="text-item" :key="item" v-for="item in legends">
        {{ item }}
      </div>
    </div>
  </div>
</template>
<style scoped>
.legend {
  position: fixed;
  bottom: 80px;
  right: 82px;
  width: 45px;
  height: 150px;
  background-image: url("../../assets/土壤图例.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.text-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 80px;
  right: 10px;
  height: 150px;
}
.text-item {
  font-size: 8px;
  color: black;
  font-weight: 700;
}
</style>
