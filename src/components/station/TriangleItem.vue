<script setup>
import {
  Cartesian3,
  Color,
  HorizontalOrigin,
  HeightReference,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
} from "cesium";
import { onMounted, onBeforeUnmount } from "vue";
import { useViewStore } from "../../stores/earth";
const props = defineProps(["position", "id", "name"]);
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
      scale: 1,
      outlineWidth: 3,
      Color: Color.WHITE,
      show: true,
      heightReference: HeightReference.CLAMP_TO_GROUND,
    },
    label: {
      // 文本。支持显式换行符“ \ n”
      text: props.name,
      // 字体样式，以CSS语法指定字体
      font: "normal 200px MicroSoft YaHei",
      // 字体颜色
      fillColor: Color.fromCssColorString("#000"),
      scale: 0.1,
      // 设置样式：FILL：填写标签的文本，但不要勾勒轮廓；OUTLINE：概述标签的文本，但不要填写；FILL_AND_OUTLINE：填写并概述标签文本。
      style: LabelStyle.FILL, //FILL_AND_OUTLINE
      // 相对于坐标的水平位置
      verticalOrigin: 5,
      // 相对于坐标的水平位置
      horizontalOrigin: HorizontalOrigin.LEFT,
      // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
      pixelOffset: new Cartesian2(13, 0),
      // 是否显示
      show: true,
      // distanceDisplayCondition: new DistanceDisplayCondition(0, 400000),
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
