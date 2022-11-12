<script setup>
import { onMounted, ref } from "vue";
import { ScreenSpaceEventHandler, Math, ScreenSpaceEventType } from "cesium";
import { useViewStore } from "../stores/earth";
const viewerStore = useViewStore();
const location = ref({
  lng: 0.0,
  lat: 0.0,
});
const getPosition = () => {
  const cesiumViewer = viewerStore.cesiumViewer;
  if (!cesiumViewer) return;
  const canvas = cesiumViewer.scene.canvas;
  //得到当前三维场景的椭球体
  const ellipsoid = cesiumViewer.scene.globe.ellipsoid;
  // 定义当前场景的画布元素的事件处理
  const handler = new ScreenSpaceEventHandler(canvas);
  //设置鼠标移动事件的处理函数，这里负责监听x,y坐标值变化
  handler.setInputAction(function (movement) {
    //捕获椭球体，将笛卡尔二维平面坐标转为椭球体的笛卡尔三维坐标，返回球体表面的点
    const cartesian = cesiumViewer.camera.pickEllipsoid(
      movement.endPosition,
      ellipsoid
    );
    if (cartesian) {
      //将笛卡尔三维坐标转为地图坐标（弧度）
      const cartographic =
        cesiumViewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
      //将地图坐标（弧度）转为十进制的度数
      const lat = Math.toDegrees(cartographic.latitude).toFixed(4);
      const lng = Math.toDegrees(cartographic.longitude).toFixed(4);
      //   const height = (
      //     cesiumViewer.camera.positionCartographic.height / 1000
      //   ).toFixed(2);
      location.value.lng = lng;
      location.value.lat = lat;
    }
  }, ScreenSpaceEventType.MOUSE_MOVE); //此枚举类型用于对鼠标事件进行分类:向下、向上、单击、双击、按住按钮时移动和移动。具体参考文档Cesium.ScreenSpaceEventType
};
onMounted(() => {
  getPosition();
});
</script>
<template>
  <div class="location-wrap">
    <div class="lng-wrap">Long. {{ location.lng }}</div>
    <div>,</div>
    <div class="lat-wrap">Lat. {{ location.lat }}</div>
  </div>
</template>
<style scoped>
.location-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 20px;
  right: 5px;
  width: 175px;
  text-align: center;
  border: 1px solid #fff;
  height: 40px;
  border-radius: 4px;
  padding: 3px 5px 3px 5px;
  background-color: rgb(12, 12, 12);
  font-size: 11px;
  opacity: 0.6;
  color: #fff;
}
</style>
