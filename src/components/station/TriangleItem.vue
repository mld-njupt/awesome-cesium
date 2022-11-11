<script setup>
import {
  Cartesian3,
  Color,
  HorizontalOrigin,
  HeightReference,
  // NearFarScalar,
  // DistanceDisplayCondition,
} from "cesium";
import { onMounted, onBeforeUnmount } from "vue";
import { useViewStore } from "../../stores/earth";
const props = defineProps(["position", "id"]);
const viewerStore = useViewStore();
function addPolygon(position) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(50, 140);
  ctx.lineTo(0, 0);
  ctx.fillStyle = "#ffa500";
  ctx.fill();
  let image = new Image();
  image.src = canvas.toDataURL("image/jpg");
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: props.id,
    position: Cartesian3.fromDegrees(position[0], position[1], 0.1),
    billboard: {
      image: image,
      height: 50,
      width: 50,
      sizeInMeters: false,
      horizontalOrigin: HorizontalOrigin.LEFT,
      scale: 2,
      outlineWidth: 3,
      Color: Color.WHITE,
      show: true,
      heightReference: HeightReference.CLAMP_TO_GROUND,
      // scaleByDistance: new NearFarScalar(10000, 1, 20000, 0.3),
      // translucencyByDistance: new NearFarScalar(10000, 1, 20000, 0.2),
      // distanceDisplayCondition: new DistanceDisplayCondition(0, 20000),
    },
  });

  viewer.scene.requestRender();
}
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById(props.id));

  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
onMounted(() => {
  addPolygon(props.position);
});
</script>
<template>
  <div></div>
</template>
