<script setup>
import {
  Cartesian3,
  Color,
  HorizontalOrigin,
  HeightReference,
  Cartesian2,
  LabelStyle,
} from "cesium";
import { onMounted, onBeforeUnmount } from "vue";
import { useViewStore } from "../../stores/earth";
import zhan1 from "../../assets/zhan1.png";
const props = defineProps(["position", "id", "name"]);
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
      verticalOrigin: -11,
      // 相对于坐标的水平位置
      horizontalOrigin: 1,
      // 该属性指定标签在屏幕空间中距此标签原点的像素偏移量
      pixelOffset: new Cartesian2(40, 20),
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
