<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Cartesian3, Color, PolylineDashMaterialProperty } from "cesium";
import { useViewStore } from "../stores/earth";
import poly from "../assets/data/liuyu";
const coords = poly[0].flat(2);
const viewerStore = useViewStore();

onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: "neiliuyu",
    polyline: {
      positions: Cartesian3.fromDegreesArray(coords),
      width: 1,
      material: new PolylineDashMaterialProperty({
        color: Color.BLACK,
        dashLength: 15, //短划线长度
        clampToGround: true, //开启贴地
      }),
      zIndex: 5,
    },
  });
  viewer.entities.add({
    id: "liuyu",
    polyline: {
      positions: Cartesian3.fromDegreesArray(coords),
      width: 5,
      material: Color.fromCssColorString("#A7A2B4"),
      clampToGround: true, //开启贴地
      zIndex: 3,
    },
  });
  viewer.scene.requestRender();
});
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("liuyu"));
  viewer.entities.remove(viewer.entities.getById("neiliuyu"));
  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
</script>
<template><div></div></template>
<style scoped></style>
