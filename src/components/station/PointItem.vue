<script setup>
import {
  Cartesian3,
  Color,
  LabelStyle,
  VerticalOrigin,
  HorizontalOrigin,
  Cartesian2,
  HeightReference,
} from "cesium";
import { onMounted, onBeforeUnmount } from "vue";
import { useViewStore } from "../../stores/earth";
const props = defineProps(["position", "id", "name", "color", "size"]);
const viewerStore = useViewStore();
function addEntity(height = 500, position) {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.add({
    id: props.id,
    position: Cartesian3.fromDegrees(...position, height),
    point: {
      show: true,
      pixelSize: props.size || 17,
      scale: 1,
      heightReference: HeightReference.CLAMP_TO_GROUND,
      color: props.color || Color.ORANGE,
      // scaleByDistance: new NearFarScalar(10000, 1, 20000, 0.3),
      // translucencyByDistance: new NearFarScalar(10000, 1, 20000, 0.2),
      // distanceDisplayCondition: new DistanceDisplayCondition(0, 20000),
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
      verticalOrigin: VerticalOrigin.CENTER,
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
  addEntity(0, props.position);
});
</script>
<template>
  <div></div>
</template>
