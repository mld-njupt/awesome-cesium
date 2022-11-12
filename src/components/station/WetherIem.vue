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
import zhan1 from "../../assets/zhan1.png";
const props = defineProps(["position", "id"]);
const viewerStore = useViewStore();
function addPolygon(position) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#ffffff";
  ctx.lineWidth = 2;
  ctx.moveTo(0, 0);
  ctx.lineTo(15, 10);
  ctx.stroke();
  ctx.moveTo(15, 10);
  ctx.lineTo(0, 20);
  ctx.stroke();
  ctx.stroke();
  ctx.moveTo(15, 10);
  ctx.lineTo(70, 10);
  ctx.stroke();
  ctx.moveTo(70, 10);
  ctx.lineTo(60, 4);
  ctx.stroke();
  ctx.moveTo(70, 10);
  ctx.lineTo(60, 16);
  ctx.stroke();
  ctx.moveTo(37.5, 10);
  ctx.lineTo(37.5, 70);
  ctx.stroke();
  ctx.moveTo(22.5, 70);
  ctx.lineTo(52.5, 70);
  ctx.stroke();
  let image = new Image();
  image.src = canvas.toDataURL("image/jpg");
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: props.id,
    position: Cartesian3.fromDegrees(position[0], position[1], 0.1),
    billboard: {
      image: zhan1,
      height: 50,
      width: 50,
      sizeInMeters: false,
      horizontalOrigin: HorizontalOrigin.LEFT,
      scale: 1,
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
