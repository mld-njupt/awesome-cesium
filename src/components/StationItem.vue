<script setup>
import { onMounted, ref } from "vue";
import {
  PolygonGeometry,
  PolygonHierarchy,
  Cartesian3,
  Math,
  ImageMaterialProperty,
} from "cesium";
import kriging from "../kriging";
import PointItem from "./station/PointItem.vue";
import TriangleItem from "./station/TriangleItem.vue";
import WetherIem from "./station/WetherIem.vue";
import MessageItem from "./station/MessageItem.vue";
import data from "../assets/test/data";
import beijing from "../assets/test/bj";
import { useViewStore } from "../stores/earth";
const viewerStore = useViewStore();
const lats = data.features.map((v) => {
  return v.attributes.x;
});
const lngs = data.features.map((v) => {
  return v.attributes.y;
});
const values = data.features.map((v) => {
  return v.attributes.z;
});
const coords = beijing[0].flat(2);
const checked = ref({
  //雨量
  checked1: false,
  //水位
  checked2: false,
  //气象
  checked3: false,
  //插值
  checked4: false,
});
function drawKriging(viewer, lats, lngs, values, coords, ex) {
  if (values.length > 3) {
    let colors = [
      "#006837",
      "#1a9850",
      "#66bd63",
      "#a6d96a",
      "#d9ef8b",
      "#ffffbf",
      "#fee08b",
      "#fdae61",
      "#f46d43",
      "#d73027",
      "#a50026",
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
      let variogram = kriging.train(values, lngs, lats, "exponential", 0, 100);
      //2.使用刚才的variogram对象使polygons描述的地理位置内的格网元素具备不一样的预测值；
      let grid = kriging.grid(ex, variogram, (maxy - miny) / 500);
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
// const handleCheck1 = (value) => {
//   checked.value.checked1 = value;
// };
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  drawKriging(viewer, lngs, lats, values, coords, beijing);
});
</script>
<template>
  <div class="reservoir-info-content">
    <div class="reservoir-info-header">
      <div class="reservoir-info-header-item">监测站信息</div>
      <div class="reservoir-info-header-item">插值信息</div>
    </div>
    <div class="content">
      <div class="sub left">
        <div class="item">
          <div class="sign" :class="{ active: checked.checked1 }"></div>
          <div class="name">雨量站</div>
          <div class="switch">
            <a-switch
              v-model:checked="checked.checked1"
              size="small"
              id="checked1"
            />
          </div>
        </div>
        <div class="item">
          <div class="sign" :class="{ active: checked.checked2 }"></div>
          <div class="name">水位站</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked2" size="small" />
          </div>
        </div>
        <div class="item">
          <div class="sign" :class="{ active: checked.checked3 }"></div>
          <div class="name">气象站</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked3" size="small" />
          </div>
        </div>
      </div>
      <div class="sub right">
        <div class="item">
          <!-- <div class="sign" :class="{active: checked.checked3}"></div> -->
          <div class="name">雨量插值</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked4" size="small" />
          </div>
        </div>
      </div>
    </div>
    <PointItem
      v-if="checked.checked1"
      :id="1"
      :position="[118.2443, 29.9171]"
    />
    <PointItem
      v-if="checked.checked1"
      :id="2"
      :position="[118.2463, 29.9191]"
    />
    <TriangleItem
      v-if="checked.checked2"
      :id="3"
      :position="[118.2483, 29.9211]"
    />
    <WetherIem
      v-if="checked.checked3"
      :id="4"
      :position="[118.2423, 29.9151]"
    />
    <MessageItem />
  </div>
</template>
<style scoped>
.reservoir-info-content {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 254px;
  /* height: 114px; */
  opacity: 1;
  border-radius: 3px;
  background: rgba(204, 204, 204, 0.8);
  /* background-color: rgba(0, 0, 0, .5); */
  z-index: 999;
}
.reservoir-info-header {
  width: 100%;
  height: 22px;
  opacity: 1;
  background: rgba(204, 204, 204, 1);
  /* border: 1px solid rgba(0, 0, 0, 1); */
  display: flex;
}
.reservoir-info-header-item {
  width: 50%;
  text-align: center;
}
.reservoir-info-header-item:last-child {
  /* border-left: 1px solid rgba(0, 0, 0, 1); */
}
.content {
  display: flex;
  width: 100%;
}
.sub {
  width: 50%;
  padding: 6px 12px;
}
.item {
  width: 100%;
  height: 24px;
  opacity: 1;
  border-radius: 3px;
  background: rgba(204, 204, 204, 1);
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  margin-bottom: 8px;
  border-radius: 3px;
  padding: 0 4px;
  /* align-items: center; */
}
.item .sign {
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background-color: transparent;
}
.item .sign.active {
  background-color: rgba(255, 141, 26, 1);
}
.item .name {
  line-height: 22px;
}
</style>
