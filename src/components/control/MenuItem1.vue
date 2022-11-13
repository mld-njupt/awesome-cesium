<script setup>
import { Cartesian3, Color } from "cesium";
import { onMounted, onBeforeUnmount } from "vue";
import { useViewStore } from "../../stores/earth";
import line_data from "../../assets/data/line.json";
const viewerStore = useViewStore();
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  line_data.features.map((v, i) => {
    viewer.entities.remove(viewer.entities.getById(`polyline${i}`));
  });

  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  line_data.features.map((v, i) => {
    const lineArr = v.geometry.coordinates.reduce((pre, cur) => {
      return pre.concat(cur);
    }, []);
    viewer.entities.add({
      id: `polyline${i}`,
      polyline: {
        positions: Cartesian3.fromDegreesArray(lineArr),
        show: true,
        material: Color.GREEN,
        width: 10,
        clampToGround: true,
        eyeOffset: new Cartesian3(0, 0, -100),
      },
    });
  });

  viewer.scene.requestRender();
});
</script>
<template><div></div></template>
<style scoped></style>
