<script setup>
import { onMounted, onBeforeUnmount } from "vue";
import {
  PolygonGeometry,
  PolygonHierarchy,
  Cartesian3,
  Math,
  ImageMaterialProperty,
} from "cesium";
import kriging from "../../kriging";
import data1 from "../../assets/test/data1";
import poly from "../../assets/test/poly";
import { useViewStore } from "../../stores/earth";
// import shexian from "../assets/test/shexian.json"
const viewerStore = useViewStore();
const lats = data1.map((v) => {
  return v.lat;
});
const lngs = data1.map((v) => {
  return v.lon;
});
const values = [100, 0, 800, 100, 200];
const coords = poly[0].flat(2);
function drawKriging(viewer, lats, lngs, values, coords, ex) {
  if (values.length > 3) {
    let colors = [
      "#E80000",
      "#FF2800",
      "#FF5500",
      "#FF8100",
      "#FFAA00",
      "#FFD700",
      "#EAFF0C",
      "#C7FF2F",
      "#A0FF56",
      "#7CFF79",
      "#56FFA0",
      "#2FFFC7",
      "#0CF4EA",
      "#00C4FF",
      "#0094FF",
      "#0068FF",
      "#0038FF",
      "#0008FF",
      "#0000E8",
      "#0000B1",
    ];

    // const polygon = new PolygonGeometry({
    //   polygonHierarchy: new PolygonHierarchy(
    //     Cartesian3.fromDegreesArray(coords)
    //   ),
    // }); //构造面，方便计算范围
    let extent = PolygonGeometry.computeRectangle({
      polygonHierarchy: new PolygonHierarchy(
        Cartesian3.fromDegreesArray(coords)
      ),
    }); //范围（弧度）
    let minx = Math.toDegrees(extent.west); //转换为经纬度
    let miny = Math.toDegrees(extent.south);
    let maxx = Math.toDegrees(extent.east);
    let maxy = Math.toDegrees(extent.north);
    let canvas = null; //画布
    // eslint-disable-next-line no-inner-declarations
    function getCanvas() {
      //1.用克里金训练一个variogram对象
      let variogram = kriging.train(values, lats, lngs, "exponential", 0, 100);
      //2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
      let grid = kriging.grid(ex, variogram, (maxy - miny) / 1000);
      canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 800;
      canvas.style.display = "block";
      canvas.getContext("2d").globalAlpha = 0.75; //设置透明度
      //3.将得到的格网预测值渲染到canvas画布上
      kriging.plot(canvas, grid, [minx, maxx], [miny, maxy], colors);
    }

    getCanvas();
    if (canvas != null) {
      viewer.entities.add({
        id: "chazhi",
        polygon: {
          hierarchy: {
            positions: Cartesian3.fromDegreesArray(coords),
          },
          material: new ImageMaterialProperty({
            image: canvas, //使用贴图的方式将结果贴到面上
          }),
        },
      });
    }
  }
}
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  drawKriging(viewer, lats, lngs, values, coords, poly);

  viewer.scene.requestRender();
});
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("chazhi"));

  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  removeEntity();
});
</script>
<template><div class="legend"></div></template>
<style scoped>
.legend {
  position: fixed;
  bottom: 80px;
  right: 10px;
  width: 24px;
  height: 240px;
  background-image: url("../../assets/legend.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
