<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Cartesian3, Color } from "cesium";
import { useViewStore } from "../stores/earth";
import poly from "../assets/data/liuyu";
const coords = poly[0].flat(2);
const viewerStore = useViewStore();

onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: "liuyu",
    polygon: {
      hierarchy: {
        positions: Cartesian3.fromDegreesArray(coords),
      },
      fill: true,
      material: Color.LIGHTPINK.withAlpha(0.5),
      outlineColor: Color.RED,
      outerWidth: 5,
      zIndex: 1,
    },
  });
  viewer.scene.requestRender();
});
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("liuyu"));

  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
</script>
<template><div></div></template>
<style scoped></style>
