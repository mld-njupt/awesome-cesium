<script setup>
import { ref } from "vue";
import { useViewStore } from "../../stores/earth";
import {
  Cartesian3,
  EllipsoidalOccluder,
  Cartesian2,
  ScreenSpaceEventHandler,
  Ellipsoid,
  defined,
  ScreenSpaceEventType,
  SceneTransforms,
  Cartographic,
  Math,
} from "cesium";
import { onMounted } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import {
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  DataZoomComponent,
} from "echarts/components";
import { shuiwei, yuliang, qixiang } from "../../assets/data/station_data";
import handleData from "../../utils/handleData";
import VChart from "vue-echarts";

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
]);

const station_msg = ref();
const showConfig = ref({
  chart: false,
  msg: true,
});
const showPosition = ref();
const showLoading = ref(false);
const option = ref({
  // title: {
  //   text: "Rainfall vs Evaporation",
  //   left: "center",
  // },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  // legend: {
  //   data: ["Evaporation", "Rainfall"],
  //   left: 10,
  // },
  toolbox: {
    feature: {
      dataZoom: {
        yAxisIndex: "none",
      },
      restore: {},
      saveAsImage: {},
    },
  },
  axisPointer: {
    link: [
      {
        xAxisIndex: "all",
      },
    ],
  },
  dataZoom: [
    {
      show: true,
      realtime: true,
      start: 30,
      end: 70,
      xAxisIndex: [0, 1],
    },
    {
      type: "inside",
      realtime: true,
      start: 30,
      end: 70,
      xAxisIndex: [0, 1],
    },
  ],
  // grid: [
  //   {
  //     left: 60,
  //     right: 50,
  //     height: "35%",
  //   },
  //   {
  //     left: 60,
  //     right: 50,
  //     top: "55%",
  //     height: "35%",
  //   },
  // ],
  grid: {
    left: "12%",
    right: "15%",
    bottom: "20%",
  },
  xAxis: {
    // type: "category",
    boundaryGap: false,
    axisLine: { onZero: true },
    data: [],
  },
  yAxis: {
    name: "Evaporation(m^3/s)",
    type: "value",
    max: 500,
  },

  series: {
    name: "Evaporation",
    type: "line",
    symbolSize: 8,
    // prettier-ignore
    data: [],
  },
});
const viewerStore = useViewStore();
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  const scene = viewer.scene;
  const handler = new ScreenSpaceEventHandler(scene.canvas);
  let click_point, c, target_position, cartesian_2;
  //注册鼠标点击事件
  handler.setInputAction(function (e) {
    const pickedObject = scene.pick(e.position, 3, 3);
    // 屏幕坐标转世界坐标——关键点
    const ellipsoid = viewer.scene.globe.ellipsoid;
    const cartesian = viewer.camera.pickEllipsoid(e.position, ellipsoid);
    //将笛卡尔坐标转换为地理坐标
    const cartographic = Cartographic.fromCartesian(cartesian);
    //将弧度转为度的十进制度表示
    const lon = Math.toDegrees(cartographic.longitude);
    const lat = Math.toDegrees(cartographic.latitude);

    const point2 = { longitude: lon, latitude: lat };
    click_point = Cartesian3.fromDegrees(point2.longitude, point2.latitude);

    c = new Cartesian2(e.position.x, e.position.y);
    target_position = e.position;
    cartesian_2 = cartesian;
    if (defined(pickedObject) && pickedObject && defined(pickedObject.id)) {
      if (!viewer.entities.getById(pickedObject.id.id)._polygon) {
        const station_type = viewer.entities
          .getById(pickedObject.id.id)
          ._id.split("/")[0];
        const station_id = viewer.entities
          .getById(pickedObject.id.id)
          ._id.split("/")[1];
        switch (station_type) {
          case "yuliang":
            station_msg.value = yuliang[station_id];
            option.value.xAxis.data = [];
            option.value.series.data = [];
            showLoading.value = true;
            fetch(
              "http://43.142.17.108:9001/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/1/20000101/20221010/100000"
            )
              .then((response) => response.json())
              .then((data) => {
                const { timeData, resData } = handleData(data, "雨量");
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                showLoading.value = false;
              });
            break;
          case "shuiwei":
            station_msg.value = shuiwei[station_id];
            option.value.xAxis.data = [];
            option.value.series.data = [];
            showLoading.value = true;
            fetch(
              "http://43.142.17.108:9001/api/monitor/%E6%A0%87%E5%87%86%E6%B0%B4%E6%83%85%E8%A1%A8/1/20000101/20221010/100000"
            )
              .then((response) => response.json())
              .then((data) => {
                const { timeData, resData } = handleData(data, "水位");
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                showLoading.value = false;
              });
            break;
          case "qixiang":
            station_msg.value = qixiang[station_id];
            option.value.xAxis.data = [];
            option.value.series.data = [];
            showLoading.value = true;
            fetch(
              "http://43.142.17.108:9001/api/monitor/%E7%94%B5%E5%8E%8B%E6%B8%A9%E5%BA%A6%E8%A1%A8/1/20000101/20221010/100000"
            )
              .then((response) => response.json())
              .then((data) => {
                const { timeData, resData } = handleData(data, "测站电压");
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                showLoading.value = false;
              });
            break;
          default:
            break;
        }
        showPosition.value = e.position;
        showInfo(e.position);
      }

      // viewer.trackedEntity = viewer.entities.getById(pickedObject.id.id);
    } else {
      hideInfo();
      // viewer.trackedEntity = undefined;
    }
  }, ScreenSpaceEventType.LEFT_CLICK);
  viewer.scene.postRender.addEventListener(() => {
    console.log("render");
    if (showPosition.value) {
      const position = SceneTransforms.wgs84ToWindowCoordinates(
        viewer.scene,
        cartesian_2
      );
      showInfo(position);
    }
  });
  const info = document.getElementById("info");
  function showInfo(position) {
    info.style.display = "block";
    info.style.left = position.x + 20 + "px";
    info.style.top = position.y - 200 + "px";
  }

  function hideInfo() {
    info.style.display = "none";
  }
  fetch(
    "http://43.142.17.108:9001/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/1/20000101/20221010/100000"
  )
    .then((response) => response.json())
    .then((data) => {
      const { timeData, resData } = handleData(data, "雨量");
      option.value.xAxis.data = timeData;
      option.value.series.data = resData;
    });
  // .then((data) => console.log(data));
});
const showChart = () => {
  showConfig.value.chart = true;
  showConfig.value.msg = false;
};
const showMsg = () => {
  showConfig.value.chart = false;
  showConfig.value.msg = true;
};
</script>
<template>
  <div id="info">
    <div class="tab">
      <div class="tab-item" v-on:click="showMsg">站点信息</div>
      <div class="tab-item" v-on:click="showChart">监测曲线</div>
    </div>
    <div class="content">
      <div v-if="showLoading" class="loading">
        <a-spin size="large" />
      </div>
      <div class="msg content-item" v-if="showConfig.msg">
        <a-descriptions
          bordered
          :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }"
          size="small"
        >
          <a-descriptions-item
            v-for="(value, key) in station_msg"
            :label="key"
            :key="key"
            >{{ value }}</a-descriptions-item
          >
        </a-descriptions>
      </div>
      <v-chart
        class="chart content-item"
        v-if="showConfig.chart"
        :option="option"
      ></v-chart>
    </div>
  </div>
</template>
<style scoped>
#info {
  position: fixed;
  width: 500px;
  height: 400px;
  z-index: 1000;
  display: none;
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
}

.tab {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
}

.tab-item {
  width: 50%;
  height: 50px;
  border: 1px solid rgba(255, 255, 255, 0.6);
  text-align: center;
  line-height: 50px;
  background-color: rgba(0, 0, 0, 0.2);
}

.content {
  width: 100%;
  height: 350px;
  position: relative;
}

.content-item {
  width: 100%;
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
  width: 100%;
  height: 100%;
  z-index: 998;
}
</style>
