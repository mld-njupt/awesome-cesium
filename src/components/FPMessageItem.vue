<script setup>
import { ref } from "vue";
import { useViewStore } from "../stores/earth";
import { useSimuStore } from "../stores/simulation";
import { useClickStore } from "../stores/click";
import {
  ScreenSpaceEventHandler,
  defined,
  ScreenSpaceEventType,
  Color
  // SceneTransforms,
} from "cesium";
import { onMounted } from "vue";
import { notification } from "ant-design-vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";
import ForecastPicture2 from "./ForecastPicture2.vue";
import ForecastPicture from "./ForecastPicture.vue";
import { shuiwei, yuliang, qixiang } from "../assets/data/station_data";
import { fore_data, fore_all_data } from "../assets/data/forcastData";
import handleData from "../utils/handleData";
import VChart from "vue-echarts";
import moment from "moment";
import ExcelJs from "exceljs";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
  LineChart,
  UniversalTransition,
  BarChart,
]);
const vDrag = (el) => {
  const oDiv = el; // 当前元素
  // const minTop = oDiv.getAttribute("drag-min-top");
  const ifMoveSizeArea = 20;
  oDiv.onmousedown = (e) => {
    let target = oDiv;
    while (
      window.getComputedStyle(target).position !== "absolute" &&
      target !== document.body
    ) {
      target = target.parentElement;
    }

    document.onselectstart = () => {
      return false;
    };
    if (!target.getAttribute("init_x")) {
      target.setAttribute("init_x", target.offsetLeft);
      target.setAttribute("init_y", target.offsetTop);
    }

    const initX = parseInt(target.getAttribute("init_x"));
    const initY = parseInt(target.getAttribute("init_y"));

    // 鼠标按下，计算当前元素距离可视区的距离
    const disX = e.clientX - target.offsetLeft;
    const disY = e.clientY - target.offsetTop;
    document.onmousemove = (e) => {
      // 通过事件委托，计算移动的距离
      // 因为浏览器里并不能直接取到并且使用clientX、clientY,所以使用事件委托在内部做完赋值
      const l = e.clientX - disX;
      const t = e.clientY - disY;
      // 计算移动当前元素的位置，并且给该元素样式中的left和top值赋值
      target.style.left = l + "px";
      target.style.top = t + "px";
      if (
        Math.abs(l - initX) > ifMoveSizeArea ||
        Math.abs(t - initY) > ifMoveSizeArea
      ) {
        target.setAttribute("dragged", "");
      } else {
        target.removeAttribute("dragged");
      }
    };
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      document.onselectstart = null;
    };
    // return false不加的话可能导致黏连，拖到一个地方时div粘在鼠标上不下来，相当于onmouseup失效
    return false;
  };
};
const viewerStore = useViewStore();
const simuStore = useSimuStore();
const simuStoress = useSimuStore();
const clickStore = useClickStore();
const station_msg = ref();
//控制普通弹窗的tab显示
const showConfig = ref({
  chart: false,
  msg: true,
});
const selectType = ref("");
//控制模拟和预报弹窗的tab显示
const showSimuConfig = ref({
  flow: true,
  water: false,
  silt: false,
});
const showPosition = ref();
const showSimuPosition = ref();
const showForePosition = ref();
// const simuDataCfg = ref({
//   type: "daily",
//   frequency: "day",
// });
const showLoading = ref(false);








let hideInfo;
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  const scene = viewer.scene;
  const handler = new ScreenSpaceEventHandler(scene.canvas);
  // let click_point, c, target_position,
  // let cartesian_2;
  //注册鼠标点击事件
  // handler.setInputAction(function (e) {
  //   const pickedObject = scene.pick(e.position, 3, 3);
  //   // 屏幕坐标转世界坐标——关键点
  //   // const ellipsoid = viewer.scene.globe.ellipsoid;
  //   // const cartesian = viewer.camera.pickEllipsoid(e.position, ellipsoid);
  //   // cartesian_2 = cartesian;
  //   if (
  //     defined(pickedObject) &&
  //     pickedObject &&
  //     defined(pickedObject.id) &&
  //     !pickedObject.id.id.includes("polyline")
  //   ) {
  //     if (!viewer.entities.getById(pickedObject.id.id)._polygon) {
  //       const station_type = viewer.entities
  //         .getById(pickedObject.id.id)
  //         ._id.split("/")[0];
  //       const station_id = viewer.entities
  //         .getById(pickedObject.id.id)
  //         ._id.split("/")[1];
  //       selectType.value = station_type
  //       switch (station_type) {
  //         case "yuliang":
  //           station_msg.value = yuliang[station_id];

  //           option.value.xAxis.data = [];
  //           option.value.series.data = [];
  //           option.value.yAxis.name = "雨量";
  //           option.value.series.name = "雨量";
  //           option.value.yAxis.max = 220;
  //           showLoading.value = true;
  //           fetch(
  //             "http://43.142.17.108:9001/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/1/20000101/20221010/100000"

  //           )
  //             .then((response) => response.json())
  //             .then((data) => {
  //               const { timeData, resData } = handleData(data, "雨量", "时间");
  //               option.value.series.type = "bar";
  //               option.value.xAxis.data = timeData;
  //               option.value.series.data = resData;
  //               option.value.yAxis.min = 0;
  //               showLoading.value = false;
  //             });
  //           break;
  //         case "shuiwei":
  //           station_msg.value = shuiwei[station_id];
  //           option.value.xAxis.data = [];
  //           option.value.series.data = [];
  //           option.value.yAxis.name = "水位";
  //           option.value.series.name = "水位";
  //           option.value.yAxis.max = 210;
  //           option.value.yAxis.min = 180;
  //           showLoading.value = true;
  //           fetch(
  //             "http://43.142.17.108:9001/api/monitor/%E6%A0%87%E5%87%86%E6%B0%B4%E6%83%85%E8%A1%A8/1/20000101/20221010/100000"
  //           )
  //             .then((response) => response.json())
  //             .then((data) => {
  //               const { timeData, resData } = handleData(data, "水位", "时间");
  //               option.value.series.type = "line";
  //               option.value.xAxis.data = timeData;
  //               option.value.series.data = resData;
  //               showLoading.value = false;
  //             });
  //           break;
  //         case "qixiang":
  //           station_msg.value = qixiang[station_id];
  //           option.value.xAxis.data = [];
  //           option.value.series.data = [];
  //           option.value.yAxis.name = "测站电压";
  //           option.value.series.name = "测站电压";
  //           showLoading.value = true;
  //           fetch(
  //             "http://43.142.17.108:9001/api/monitor/%E7%94%B5%E5%8E%8B%E6%B8%A9%E5%BA%A6%E8%A1%A8/1/20000101/20221010/100000"
  //           )
  //             .then((response) => response.json())
  //             .then((data) => {
  //               const { timeData, resData } = handleData(
  //                 data,
  //                 "测站电压",
  //                 "时间"
  //               );
  //               option.value.series.type = "line";
  //               option.value.xAxis.data = timeData;
  //               option.value.series.data = resData;
  //               option.value.yAxis.max = 18;
  //               option.value.yAxis.min = 8;
  //               showLoading.value = false;
  //             });
  //           break;
  //         default:
  //           break;
  //       }
  //       if (
  //         pickedObject.id.id.includes("simu") &&
  //         simuStore.simuData.flag == 1
  //       ) {
  //         if (showPosition.value) {
  //           hideInfo();
  //         }
  //         showSimuInfo(e.position);
  //         showSimuPosition.value = e.position;
  //         showLoading.value = true;
  //         const { start, end } = defineTime();
  //         fetch(
  //           `http://43.142.17.108:9001/api/monitor/水库降雨流量/输出入库流量/${start.format(
  //             "YYYYMMDD"
  //           )}/${end.format("YYYYMMDD")}/14978`
  //         )
  //           .then((response) => response.json())
  //           .then((data) => {
  //             const { timeData, resData } = handleData(
  //               data,
  //               "输出入库流量",
  //               "时间"
  //             );
  //             option.value.yAxis.name = "入库流量m³/s";
  //             option.value.series.name = "入库流量";
  //             option.value.series.type = "line";
  //             option.value.yAxis.max = Math.max(...resData);
  //             option.value.yAxis.min = Math.min(...resData);
  //             option.value.xAxis.data = timeData;
  //             option.value.series.data = resData;
  //             showLoading.value = false;
  //           });
  //       } else if (
  //         pickedObject.id.id.includes("simu") &&
  //         simuStore.simuData.flag == 2
  //       ) {
  //         if (showPosition.value || showForePosition.value) {
  //           hideInfo();
  //         }
  //         showForeInfo(e.position);
  //         showForePosition.value = e.position;
  //         const { start, end } = defineForeTime();
  //         showLoading.value = true;
  //         const resData = fore_all_data.filter((v) => {
  //           return (
  //             parseInt(v["日"]) >=
  //             parseInt(start.format("YYYYMMDD").slice(-2)) ||
  //             parseInt(v["日"]) <= parseInt(end.format("YYYYMMDD").slice(-2))
  //           );
  //         });
  //         const timeData = resData.map((v) => {
  //           return v["年"] + "." + v["月"] + "." + v["日"] + ":" + v["时"];
  //         });
  //         const data = resData.map((v) => {
  //           return v["流量(m³/s)"];
  //         });
  //         option.value.yAxis.name = "流量m³/s";
  //         option.value.series.name = "流量";
  //         option.value.series.type = "line";
  //         option.value.yAxis.max = Math.max(...data);
  //         option.value.yAxis.min = Math.min(...data);
  //         option.value.xAxis.data = timeData;
  //         option.value.series.data = data;
  //         showLoading.value = false;
  //       } else {
  //         if (showSimuPosition.value || showForePosition.value) {
  //           hideInfo();
  //         }
  //         showPosition.value = e.position;
  //         showInfo(e.position);
  //       }
  //     }

  //     // viewer.trackedEntity = viewer.entities.getById(pickedObject.id.id);
  //   } else {
  //     hideInfo();
  //     // viewer.trackedEntity = undefined;
  //   }
  // }, ScreenSpaceEventType.LEFT_CLICK);

  const info = document.getElementById("info");
  function showInfo(position) {
    info.style.display = "block";
    info.style.left = position.x + 50 + "px";
    info.style.top = position.y - 200 + "px";
  }
  const simuInfo = document.getElementById("simu-info");
  function showSimuInfo(position) {
    simuInfo.style.display = "block";
    // simuInfo.style.left = `-${window.innerWidth / 2}px`;
    simuInfo.style.left = position.x - 200 + "px";
    simuInfo.style.top = position.y - 400 + "px";
  }
  const foreInfo = document.getElementById("fore-info");
  function showForeInfo(position) {
    foreInfo.style.display = "block";
    // foreInfo.style.left = `-${window.innerWidth / 2}px`;
    foreInfo.style.left = position.x - 200 + "px";
    foreInfo.style.top = position.y - 400 + "px";
  }
  const hideInfo = () => {
    info.style.display = "none";
    simuInfo.style.display = "none";
    foreInfo.style.display = "none";
    showPosition.value = false;
    showSimuPosition.value = false;
    showForeInfo.value = false;
    // console.log(window.innerWidth);
    // simuInfo.style.left = `-${window.innerWidth / 2}px`;
  };



});
const showyubao = () => {
  simuStore.forecastpicture2.isShow= false;
  simuStore.forecastpicture.isShow= true;
};
const showjiangshui = () => {
  simuStore.forecastpicture.isShow= false;
  simuStore.forecastpicture2.isShow= true;
};

</script>
<template>

  <div id="info">
    <div class="tab" v-drag>
      <div v-on:click="showjiangshui" :class="showConfig.msg ? 'tab-item active' : 'tab-item'">
       降水设置
      </div>
      
      <div v-on:click="showyubao" :class="showConfig.chart ? 'tab-item active' : 'tab-item'">
        预报结果
      </div>
 <ForecastPicture  v-if="simuStore.forecastpicture.isShow" />
  <ForecastPicture2  v-if="simuStore.forecastpicture2.isShow" />
    </div>
    <div class="content">
      <div v-if="showLoading && showConfig.chart" class="loading">
        <a-spin size="large" />
      </div>
  
 

     
    </div>
  </div>



</template>
<style scoped>
html,
body {
  position: relative !important;
}

#info {
  position: absolute;
  width: 500px;
  height: 400px;
  z-index: 1000;
/* display: none; */
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
  top: 300px;
right:  300px;
}

#simu-info {
  position: absolute;
  width: 500px;
  height: 400px;
  z-index: 1000;
  /* display: none; */
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
}

#fore-info {
  position: absolute;
  width: 500px;
  height: 400px;
  z-index: 1000;
 /*  display: none; */
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
}
.jiansuo{
  position: absolute;
  top: 40px;
  left: 430px;
/*  left: 220px; */
  z-index: 100;

}
.fore-tab {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  cursor: grab;

  background-color: rgba(0, 0, 0, 0.25);
}

/* .select-wrap {
  width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 40px;
  cursor: grab;
  background-color: rgba(0, 0, 0, 0.2);
} */
.tab {
  width: 500px;
  height: 50px;
  display: flex;
  align-items: center;
  cursor: grab;
}

.tab-item {
  width: 50%;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.25);
}

.simu-tab-item {
  width: 33.3%;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.25);
}

.active {
  background-color: rgba(0, 0, 0, 0.1);
}

.tab-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.simu-tab-item:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.content {
  width: 500px;
  height: 350px;
  position: relative;
}

.content-item {
  width: 500px;
  height: 350px;
  overflow: auto;
}

.msg {
  z-index: 999;
}

.loading {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100%;
  z-index: 99;
}

#time1 {
  position: absolute;
  top: 2px;
  left: 6px;
  z-index: 100;
}

#time2 {
  position: absolute;
  top: 2px;
  right: 42px;
  z-index: 100;
}
</style>
