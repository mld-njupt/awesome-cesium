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
import { useLayerStore } from "../../stores/layer";
// import shexian from "../assets/test/shexian.json"
const viewerStore = useViewStore();
const layerStore = useLayerStore();
const lats = data1.map((v) => {
  return v.lat;
});
const lngs = data1.map((v) => {
  return v.lon;
});
const values = [
  [26, 303, 169, 704, 220],
  [200, 55, 80, 123, 20],
  [130, 29, 124, 60, 213],
  [362, 701, 433, 106, 18],
  [9, 65, 62, 191, 54],
  [1, 406, 102, 403, 661],
  [38, 83, 74, 39, 50],
  [17, 74, 113, 41, 160],
  [324, 175, 156, 164, 114],
  [1, 59, 47, 110, 181],
  [90, 85, 162, 62, 151],
  [124, 30, 81, 91, 28],
  [132, 135, 43, 183, 329],
  [172, 71, 41, 51, 30],
  [30, 37, 127, 89, 296],
  [88, 135, 125, 21, 24],
  [66, 113, 38, 74, 142],
  [142, 702, 157, 232, 29],
  [84, 127, 18, 27, 100],
  [150, 158, 140, 162, 362],
  [260, 54, 5, 145, 59],
  [72, 175, 435, 197, 163],
  [100, 338, 41, 123, 132],
  [8, 84, 57, 15, 71],
  [54, 100, 676, 120, 175],
  [45, 139, 64, 20, 101],
  [135, 294, 262, 129, 250],
  [53, 257, 87, 60, 75],
  [116, 27, 125, 177, 146],
  [219, 552, 29, 90, 42],
  [12, 49, 65, 39, 172],
  [138, 142, 269, 279, 290],
  [161, 166, 86, 96, 6],
  [52, 191, 150, 167, 248],
  [395, 153, 132, 84, 105],
  [187, 113, 119, 41, 92],
  [419, 426, 431, 236, 52],
  [143, 48, 56, 89, 53],
  [23, 176, 169, 163, 479],
  [71, 185, 84, 65, 56],
  [40, 85, 63, 117, 253],
  [213, 162, 155, 36, 74],
  [30, 89, 190, 86, 230],
  [161, 119, 297, 331, 363],
  [39, 156, 9, 18, 54],
  [200, 92, 139, 88, 219],
  [538, 646, 36, 247, 42],
  [33, 12, 15, 70, 208],
  [83, 314, 460, 235, 179],
  [20, 45, 44, 11, 123],
  [116, 267, 192, 171, 342],
  [26, 103, 169, 224, 52],
  [200, 55, 80, 123, 20],
  [130, 29, 124, 60, 213],
  [362, 301, 433, 106, 78],
  [9, 65, 62, 191, 54],
  [201, 206, 182, 203, 261],
  [38, 83, 74, 39, 50],
  [17, 74, 113, 41, 160],
  [324, 175, 156, 164, 114],
  [1, 59, 47, 110, 181],
  [90, 85, 162, 62, 151],
  [124, 30, 81, 91, 28],
  [132, 135, 43, 183, 329],
  [172, 71, 41, 51, 30],
  [30, 37, 127, 89, 296],
  [88, 135, 125, 21, 24],
  [66, 113, 38, 74, 142],
  [142, 702, 157, 232, 29],
  [84, 127, 18, 27, 100],
  [150, 158, 140, 162, 362],
  [260, 54, 5, 145, 59],
  [72, 175, 435, 197, 163],
  [100, 338, 41, 123, 132],
  [8, 84, 57, 15, 71],
  [54, 100, 676, 120, 175],
  [45, 139, 64, 20, 101],
  [135, 294, 262, 129, 250],
  [53, 257, 87, 60, 75],
  [116, 27, 125, 177, 146],
  [219, 552, 29, 90, 42],
  [12, 49, 65, 39, 172],
  [138, 142, 269, 279, 290],
  [161, 166, 86, 96, 6],
  [52, 191, 150, 167, 248],
  [395, 153, 132, 84, 105],
  [187, 113, 119, 41, 92],
  [419, 426, 431, 236, 52],
  [143, 48, 56, 89, 53],
  [23, 176, 169, 163, 479],
  [71, 185, 84, 65, 56],
  [40, 85, 63, 117, 253],
  [213, 162, 155, 36, 74],
  [30, 89, 190, 86, 230],
  [161, 119, 297, 331, 363],
  [39, 156, 9, 18, 54],
  [200, 92, 139, 88, 219],
  [538, 646, 36, 247, 42],
  [33, 12, 15, 70, 208],
  [83, 314, 460, 235, 179],
  [20, 45, 44, 11, 123],
  [116, 267, 192, 171, 342],
  [26, 103, 169, 224, 52],
  [200, 55, 80, 123, 20],
  [130, 29, 124, 60, 213],
  [362, 301, 433, 106, 78],
  [9, 65, 62, 191, 54],
  [201, 206, 182, 203, 261],
  [38, 83, 74, 39, 50],
  [17, 74, 113, 41, 160],
  [324, 175, 156, 164, 114],
  [1, 59, 47, 110, 181],
  [90, 85, 162, 62, 151],
  [124, 30, 81, 91, 28],
  [132, 135, 43, 183, 329],
  [172, 71, 41, 51, 30],
  [30, 37, 127, 89, 296],
  [88, 135, 125, 21, 24],
  [66, 113, 38, 74, 142],
  [142, 702, 157, 232, 29],
  [84, 127, 18, 27, 100],
  [150, 158, 140, 162, 362],
  [260, 54, 5, 145, 59],
  [72, 175, 435, 197, 163],
  [100, 338, 41, 123, 132],
  [8, 84, 57, 15, 71],
  [54, 100, 676, 120, 175],
  [45, 139, 64, 20, 101],
  [135, 294, 262, 129, 250],
  [53, 257, 87, 60, 75],
  [116, 27, 125, 177, 146],
  [219, 552, 29, 90, 42],
  [12, 49, 65, 39, 172],
  [138, 142, 269, 279, 290],
  [161, 166, 86, 96, 6],
  [52, 191, 150, 167, 248],
  [395, 153, 132, 84, 105],
  [187, 113, 119, 41, 92],
  [419, 426, 431, 236, 52],
  [143, 48, 56, 89, 53],
  [23, 176, 169, 163, 479],
  [71, 185, 84, 65, 56],
  [40, 85, 63, 117, 253],
  [213, 162, 155, 36, 74],
  [30, 89, 190, 86, 230],
  [161, 119, 297, 331, 363],
  [39, 156, 9, 18, 54],
  [200, 92, 139, 88, 219],
  [538, 646, 36, 247, 42],
  [33, 12, 15, 70, 208],
  [83, 314, 460, 235, 179],
  [20, 45, 44, 11, 123],
  [116, 267, 192, 171, 342],
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
  layerStore.showLayer = true;
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
  layerStore.showLayer = false;
  //添加掩膜
  !viewer.entities.getById("polygon/liuyu") &&
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
  <div class="unit">mm</div>
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
  width: 36px;
  height: 240px;
  background-image: url("../../assets/legend.png");
  background-size: cover;
  background-repeat: no-repeat;
}
.unit {
  position: fixed;
  bottom: 320px;
  right: 10px;
  font-size: 8px;
  color: black;
  font-weight: 700;
}
</style>
