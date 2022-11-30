<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import { Cartesian3, Color } from "cesium";
import { useViewStore } from "../stores/earth";
import PointItem from "./station/PointItem.vue";
import poly from "../assets/data/shuiku";
const coords = poly[0].flat(2);
const viewerStore = useViewStore();

onMounted(() => {
  console.log("Load");
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: "polygon/shuiku",
    polygon: {
      hierarchy: {
        positions: Cartesian3.fromDegreesArray(coords),
      },
      show: true,
      fill: true,
      material: Color.fromCssColorString("#C3D8E9"),
      clampToGround: true, //开启贴地
      zIndex: 5,
    },
  });
  viewer.scene.requestRender();
});
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("polygon/shuiku"));
  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
</script>
<template>
  <PointItem
    :id="'simu'"
    :name="''"
    :position="[118.24563658584941, 29.899203558525926]"
    :color="Color.YELLOW"
    :size="25"
  />
</template>
<style scoped></style>
