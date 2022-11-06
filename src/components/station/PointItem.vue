<script setup>
import {
  Cartesian3,
  Color,
  // NearFarScalar,
  // DistanceDisplayCondition,
  HeightReference,
} from "cesium";
import { onMounted, onBeforeUnmount } from "vue";
import { useViewStore } from "../../stores/earth";
const props = defineProps(["position", "id"]);
const viewerStore = useViewStore();
function addEntity(height = 500, position) {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: props.id,
    position: Cartesian3.fromDegrees(...position, height),
    point: {
      show: true,
      pixelSize: 38,
      heightReference: HeightReference.CLAMP_TO_GROUND,
      color: Color.ORANGE,
      // scaleByDistance: new NearFarScalar(10000, 1, 20000, 0.3),
      // translucencyByDistance: new NearFarScalar(10000, 1, 20000, 0.2),
      // distanceDisplayCondition: new DistanceDisplayCondition(0, 20000),
    },
  });
}
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById(props.id));
}
onBeforeUnmount(() => {
  removeEntity();
});
onMounted(() => {
  addEntity(0, props.position);
});
</script>
<template>
  <div></div>
</template>
