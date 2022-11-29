<script setup>
import { ref } from "vue";
import { useViewStore } from "../../stores/earth";
import { useSimuStore } from "../../stores/simulation";
import {
  ScreenSpaceEventHandler,
  defined,
  ScreenSpaceEventType,
  SceneTransforms,
} from "cesium";
import { onMounted } from "vue";
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
import { shuiwei, yuliang, qixiang } from "../../assets/data/station_data";
import handleData from "../../utils/handleData";
import VChart from "vue-echarts";
import moment from "moment";

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
const viewerStore = useViewStore();
const simuStore = useSimuStore();
const station_msg = ref();
const showConfig = ref({
  chart: false,
  msg: true,
});
const showPosition = ref();
const showSimuPosition = ref();
const simuDataCfg = ref({
  type: "daily",
  frequency: "day",
});
const showLoading = ref(false);
const option = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
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
    name: "雨量",
    type: "value",
    max: 20,
  },

  series: {
    name: "雨量",
    type: "line",
    symbolSize: 8,
    // prettier-ignore
    data: [],
  },
});
const handleZoom = (t) => {
  if (t.end - t.start <= 5) {
    option.value.series.type = "bar";
    option.value.dataZoom[0].start = t.start;
    option.value.dataZoom[0].end = t.end;
    option.value.dataZoom[1].start = t.start;
    option.value.dataZoom[1].end = t.end;
  } else {
    if (option.value.series.type == "line") return;
    option.value.series.type = "line";
  }
};
const handleSel = () => {
  showLoading.value = true;
  fetch(
    `http://43.142.17.108:9001/api/simulate/${simuDataCfg.value.type}/${
      simuDataCfg.value.frequency
    }/${moment(simuStore.simuData.start.toString()).format(
      "YYYYMMDD"
    )}/${moment(simuStore.simuData.end.toString()).format("YYYYMMDD")}`
  )
    .then((response) => response.json())
    .then((data) => {
      const { timeData, resData } = handleData(data, "amount", "full_date");
      option.value.xAxis.data = timeData;
      option.value.series.data = resData;
      if (simuDataCfg.value.type === "daily") {
        option.value.yAxis.name = "径流";
        option.value.series.name = "径流";
        option.value.yAxis.max = 730;
        showLoading.value = false;
      } else if (simuDataCfg.value.type === "dailysand") {
        option.value.yAxis.name = "泥沙";
        option.value.series.name = "泥沙";
        option.value.yAxis.max = 1.3;
        showLoading.value = false;
      } else if (
        simuDataCfg.value.type === "dailyTN" &&
        simuDataCfg.value.frequency === "month"
      ) {
        option.value.yAxis.max = 0.15;
        showLoading.value = false;
      } else if (
        simuDataCfg.value.type === "dailyTN" &&
        simuDataCfg.value.frequency === "year"
      ) {
        option.value.yAxis.max = 0.05;
        showLoading.value = false;
      } else if (simuDataCfg.value.type === "dailyTN") {
        option.value.yAxis.name = "总氮";
        option.value.series.name = "总氮";
        option.value.yAxis.max = 1.7;
        showLoading.value = false;
      } else if (
        simuDataCfg.value.type === "dailyTP" &&
        simuDataCfg.value.frequency === "month"
      ) {
        option.value.yAxis.max = 2;
        showLoading.value = false;
      } else if (
        simuDataCfg.value.type === "dailyTP" &&
        simuDataCfg.value.frequency === "year"
      ) {
        option.value.yAxis.max = 2;
        showLoading.value = false;
      } else if (simuDataCfg.value.type === "dailyTP") {
        option.value.yAxis.name = "总磷";
        option.value.series.name = "总磷";
        option.value.yAxis.max = 11.2;
        showLoading.value = false;
      }
    });
};
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  const scene = viewer.scene;
  const handler = new ScreenSpaceEventHandler(scene.canvas);
  // let click_point, c, target_position,
  let cartesian_2;
  //注册鼠标点击事件
  handler.setInputAction(function (e) {
    const pickedObject = scene.pick(e.position, 3, 3);
    // 屏幕坐标转世界坐标——关键点
    const ellipsoid = viewer.scene.globe.ellipsoid;
    const cartesian = viewer.camera.pickEllipsoid(e.position, ellipsoid);
    cartesian_2 = cartesian;
    if (
      defined(pickedObject) &&
      pickedObject &&
      defined(pickedObject.id) &&
      !pickedObject.id.id.includes("polyline")
    ) {
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
                const { timeData, resData } = handleData(data, "雨量", "时间");
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                option.value.yAxis.name = "雨量";
                option.value.series.name = "雨量";
                option.value.yAxis.max = 20;
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
                const { timeData, resData } = handleData(data, "水位", "时间");
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                option.value.yAxis.name = "水位";
                option.value.series.name = "水位";
                option.value.yAxis.max = 400;
                showLoading.value = false;
              });
            break;
          case "qixiang":
            station_msg.value = qixiang[station_id];
            option.value.xAxis.data = [];
            option.value.series.data = [];
            option.value.yAxis.name = "测站电压";
            option.value.series.name = "测站电压";
            option.value.yAxis.max = 20;
            showLoading.value = true;
            fetch(
              "http://43.142.17.108:9001/api/monitor/%E7%94%B5%E5%8E%8B%E6%B8%A9%E5%BA%A6%E8%A1%A8/1/20000101/20221010/100000"
            )
              .then((response) => response.json())
              .then((data) => {
                const { timeData, resData } = handleData(
                  data,
                  "测站电压",
                  "时间"
                );
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                showLoading.value = false;
              });
            break;
          default:
            break;
        }
        if (pickedObject.id.id.includes("simu")) {
          showSimuPosition.value = e.position;
          fetch(
            `http://43.142.17.108:9001/api/simulate/${simuDataCfg.value.type}/${simuDataCfg.value.frequency}/20150204/20180507`
          )
            .then((response) => response.json())
            .then((data) => {
              const { timeData, resData } = handleData(
                data,
                "amount",
                "full_date"
              );
              option.value.xAxis.data = timeData;
              option.value.series.data = resData;
              showSimuInfo(e.position);
            });
        } else {
          showPosition.value = e.position;
          showInfo(e.position);
        }
      }

      // viewer.trackedEntity = viewer.entities.getById(pickedObject.id.id);
    } else {
      hideInfo();
      // viewer.trackedEntity = undefined;
    }
  }, ScreenSpaceEventType.LEFT_CLICK);
  viewer.scene.postRender.addEventListener(() => {
    if (showPosition.value) {
      const position = SceneTransforms.wgs84ToWindowCoordinates(
        viewer.scene,
        cartesian_2
      );
      showInfo(position);
    }
    if (showSimuPosition.value) {
      const position = SceneTransforms.wgs84ToWindowCoordinates(
        viewer.scene,
        cartesian_2
      );
      showSimuInfo(position);
    }
  });
  const info = document.getElementById("info");
  function showInfo(position) {
    info.style.display = "block";
    info.style.left = position.x + 50 + "px";
    info.style.top = position.y - 200 + "px";
  }
  const simuInfo = document.getElementById("simu-info");
  function showSimuInfo(position) {
    simuInfo.style.display = "block";
    simuInfo.style.left = position.x + 50 + "px";
    simuInfo.style.top = position.y - 200 + "px";
  }
  function hideInfo() {
    info.style.display = "none";
    simuInfo.style.display = "none";
    showPosition.value = false;
    showSimuInfo.value = false;
  }
  fetch(
    "http://43.142.17.108:9001/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/1/20000101/20221010/100000"
  )
    .then((response) => response.json())
    .then((data) => {
      const { timeData, resData } = handleData(data, "雨量", "时间");
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
      <div v-if="showLoading && showConfig.chart" class="loading">
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
        @datazoom="handleZoom"
      ></v-chart>
    </div>
  </div>
  <div id="simu-info">
    <div class="content">
      <div class="select-wrap">
        <a-select
          ref="select"
          v-model:value="simuDataCfg.type"
          style="width: 120px"
          placeholder="请选择类型"
          @change="handleSel('type')"
        >
          <a-select-option value="daily">径流</a-select-option>
          <a-select-option value="dailysand">泥沙</a-select-option>
          <a-select-option value="dailyTN">总氮</a-select-option>
          <a-select-option value="dailyTP">总磷</a-select-option>
        </a-select>
        <a-select
          ref="select"
          v-model:value="simuDataCfg.frequency"
          style="width: 120px"
          placeholder="请选择频率"
          @change="handleSel('frequency')"
        >
          <a-select-option value="day">逐日</a-select-option>
          <a-select-option value="month">逐月</a-select-option>
          <a-select-option value="year">逐年</a-select-option>
        </a-select>
      </div>
      <div v-if="showLoading" class="loading">
        <a-spin size="large" />
      </div>
      <v-chart class="chart content-item" :option="option"></v-chart>
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
#simu-info {
  position: fixed;
  width: 500px;
  height: 400px;
  z-index: 1000;
  /* display: none; */
  left: 400px;
  top: 200px;
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
}
.select-wrap {
  width: 260px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 40px;
  /* margin: 0 auto; */
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
