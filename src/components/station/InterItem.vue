<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import {
  PolygonGeometry,
  PolygonHierarchy,
  Cartesian3,
  Math,
  ImageMaterialProperty,
  Color,
} from "cesium";
import kriging from "../../kriging";
import data1 from "../../assets/test/data1";
import poly from "../../assets/data/liuyu";
import TimeSlider from "./TimeSlider.vue";
import { useViewStore } from "../../stores/earth";
// import shexian from "../assets/test/shexian.json"
const viewerStore = useViewStore();
const lats = data1.map((v) => {
  return v.lat;
});
const lngs = data1.map((v) => {
  return v.lon;
});
const values = [
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
  [100, 0, 800, 100, 200],
  [200, 50, 0, 100, 400],
  [100, 0, 800, 100, 500],
  [100, 300, 200, 100, 200],
  [500, 0, 800, 600, 200],
  [100, 350, 200, 700, 200],
  [250, 160, 600, 300, 200],
  [700, 40, 700, 200, 100],
  [100, 0, 500, 800, 300],
  [100, 210, 240, 640, 200],
  [200, 80, 490, 720, 100],
  [300, 40, 700, 300, 200],
];
const isLoading = ref(false);
const coords = poly[0].flat(2);
function drawKriging(viewer, lats, lngs, values, coords, ex) {
  return new Promise((reslove) => {
    setTimeout(() => {
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
          let variogram = kriging.train(
            values,
            lats,
            lngs,
            "exponential",
            0,
            100
          );
          //2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
          let grid = kriging.grid(ex, variogram, (maxy - miny) / 1000);
          // console.log(grid);
          canvas = document.createElement("canvas");
          canvas.width = 800;
          canvas.height = 800;
          canvas.style.display = "block";
          canvas.getContext("2d").globalAlpha = 1; //设置透明度
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
              zIndex: 3,
            },
          });
        }
      }
      reslove();
    }, 100);
  });
}
const handleTimeChange = (index) => {
  removeEntity();
  const viewer = viewerStore.cesiumViewer;
  isLoading.value = true;
  drawKriging(viewer, lats, lngs, values[index], coords, poly).then(() => {
    isLoading.value = false;
    viewer.scene.requestRender();
  });
};
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("polygon/liuyu"));
  isLoading.value = true;
  drawKriging(viewer, lats, lngs, values[0], coords, poly).then(() => {
    isLoading.value = false;
    viewer.scene.requestRender();
  });
});
function removeEntity() {
  const viewer = viewerStore.cesiumViewer;
  viewer.entities.remove(viewer.entities.getById("chazhi"));
  viewer.scene.requestRender();
}
onBeforeUnmount(() => {
  const viewer = viewerStore.cesiumViewer;
  //添加掩膜
  viewer.entities.add({
    id: "polygon/liuyu",
    polygon: {
      hierarchy: {
        positions: Cartesian3.fromDegreesArray(coords),
      },
      show: true,
      fill: true,
      material: Color.WHITE.withAlpha(0.3),
      clampToGround: true, //开启贴地
      zIndex: 4,
    },
  });
  removeEntity();
});
</script>
<template>
  <TimeSlider @on-change="handleTimeChange" />
  <div v-if="isLoading" class="loading-wrap"><a-spin /></div>
  <div class="legend"></div>
</template>
<style scoped>
.loading-wrap {
  width: 100vw;
  height: 100vh;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
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
