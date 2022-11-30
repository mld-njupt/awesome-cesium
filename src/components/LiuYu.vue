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
    id: "polyline/neiliuyu",
    polyline: {
      positions: Cartesian3.fromDegreesArray(coords),
      width: 1,
      material: new PolylineDashMaterialProperty({
        color: Color.BLACK,
        dashLength: 15, //短划线长度
        clampToGround: true, //开启贴地
      }),
      zIndex: 6,
    },
  });
  viewer.entities.add({
    id: "polygon/liuyu",
    polygon: {
      hierarchy: {
        positions: Cartesian3.fromDegreesArray(coords),
      },
      show: true,
      fill: true,
      material: Color.WHITE.withAlpha(0.5),
      clampToGround: true, //开启贴地
      zIndex: 4,
    },
  });
  viewer.entities.add({
    id: "polyline/liuyu",
    polyline: {
      positions: Cartesian3.fromDegreesArray(coords),
      width: 7,
      material: Color.fromCssColorString("#FFBEE8"),
      clampToGround: true, //开启贴地
      zIndex: 6,
    },
  });
  viewer.scene.requestRender();
});
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("polyline/liuyu"));
  viewer.entities.remove(viewer.entities.getById("polygon/liuyu"));
  viewer.entities.remove(viewer.entities.getById("polyline/neiliuyu"));
  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
</script>
<template><div></div></template>
<style scoped></style>
