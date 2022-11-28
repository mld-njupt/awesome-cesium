<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Cartesian3, ImageMaterialProperty } from "cesium";
import { useViewStore } from "../../stores/earth";
import poly from "../../assets/data/liuyu";
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
for (let i = 0; i < imageData.data.length / 4; i += 1) {
  imageData.data[i * 4 + 0] = red[i];
  imageData.data[i * 4 + 1] = green[i] || 0;
  imageData.data[i * 4 + 2] = blue[i] || 0;
  // imageData.data[i * 4 + 3] = red[i] === 0 ? 0 : 255;
  imageData.data[i * 4 + 3] = red[i] === 255 ? 0 : 255;
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
  <div></div>
  <!-- <div class="legend">
    <div class="top">1598.7m</div>
    <div class="bottom">155.8m</div>
  </div> -->
</template>
<style scoped>
.legend {
  position: fixed;
  bottom: 80px;
  right: 70px;
  width: 40px;
  height: 154px;
  background-image: url("../../assets/dem/DEM图例.png");
  background-size: contain;
  background-repeat: no-repeat;
}
.top {
  position: fixed;
  bottom: 224px;
  right: 15px;
}
.bottom {
  position: fixed;
  bottom: 74px;
  right: 20px;
}
</style>
