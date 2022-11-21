<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Cartesian3, ImageMaterialProperty } from "cesium";
import { useViewStore } from "../../stores/earth";
import poly from "../../assets/data/liuyu";
const coords = poly[0].flat(2);
const viewerStore = useViewStore();
const response = await fetch("http://43.142.17.108:9000/tudiliyong.tif");
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
  imageData.data[i * 4 + 3] = red[i] === 255 ? 0 : 255;
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
<template><div></div></template>
<style scoped></style>
