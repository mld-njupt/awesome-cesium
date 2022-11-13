<script setup>
import { ref } from "vue";
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
import VChart from "vue-echarts";
import { x, y } from "../../assets/data/shuikurong";
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
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
const onClose = () => {
  emit("close");
};
const option2 = ref({
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
    data: x,
  },
  yAxis: {
    name: "水库容曲线（万 m^3）",
    type: "value",
    min: 185,
    max: 215,
  },

  series: {
    name: "库容",
    type: "line",
    symbolSize: 8,
    // prettier-ignore
    data: y,
  },
});
const option1 = ref({
  //   title: {
  //     text: "Stacked Line",
  //   },
  tooltip: {
    trigger: "axis",
  },
  // legend: {
  //   data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
  // },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  toolbox: {
    feature: {
      saveAsImage: {},
    },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: [
      0.93194, 9.03106, 19.46646, 49.68239, 79.89833, 92.67001, 106.68772,
      129.8948, 147.1833, 149.51959,
    ],
  },
  yAxis: {
    type: "value",
    max: 210,
    min: 190,
  },
  series: {
    name: "e = 1米",
    type: "line",
    stack: "Total",
    data: [
      190.26809, 190.59937, 190.98163, 192.97572, 196.44786, 198.53752,
      201.10499, 205.571, 209.03677, 209.98603,
    ],
  },
});
const selVal = ref("1");
const handleChange = (v) => {
  switch (v) {
    case "1":
      option1.value.xAxis.data = [
        0.93194, 9.03106, 19.46646, 49.68239, 79.89833, 92.67001, 106.68772,
        129.8948, 147.1833, 149.51959,
      ];
      option1.value.series.data = [
        190.26809, 190.59937, 190.98163, 192.97572, 196.44786, 198.53752,
        201.10499, 205.571, 209.03677, 209.98603,
      ];
      option1.value.series.name = "e = 1米";
      break;
    case "2":
      option1.value.xAxis.data = [
        49.68239, 70.55319, 90.33373, 120.54967, 183.31782, 204.18862,
        251.84881, 277.39218, 280.81873,
      ];
      option1.value.series.data = [
        192.02645, 192.50427, 192.97572, 194.92522, 199.48678, 201.62741,
        206.61583, 209.51459, 209.98603,
      ];
      option1.value.series.name = "e = 2米";
      break;
    case "3":
      option1.value.xAxis.data = [
        161.201, 170.54614, 205.27889, 252.93908, 302.93555, 323.80635,
        345.76742, 375.98336, 398.10018,
      ];
      option1.value.series.data = [
        195.11634, 195.44763, 196.97028, 199.48678, 202.67224, 204.14392,
        205.61559, 208.08751, 209.98603,
      ];
      option1.value.series.name = "e = 3米";
      break;
    case "4":
      option1.value.xAxis.data = [
        191.41694, 241.25766, 291.25413, 332.99574, 384.08247, 414.29841,
        453.85948, 472.394, 531.57985, 545.59756,
      ];
      option1.value.series.data = [
        194.92522, 195.97004, 197.53729, 199.10453, 201.24515, 202.7678,
        204.71093, 205.71116, 209.08774, 209.98603,
      ];
      option1.value.series.name = "e = 4米";
      break;
    case "5":
      option1.value.xAxis.data = [
        241.25766, 313.37095, 363.21167, 413.20814, 443.42408, 473.64002,
        511.95507, 560.70552, 583.91261, 646.52501, 665.21528,
      ];
      option1.value.series.data = [
        196.01464, 197.01487, 198.0597, 199.62694, 200.76734, 201.76757,
        203.23925, 205.18874, 206.18898, 209.03677, 209.94144,
      ];
      option1.value.series.name = "e = 5米";
      break;
    case "6":
      option1.value.xAxis.data = [
        313.37095, 364.45769, 393.42761, 482.8294, 523.48074, 572.23119,
        640.76218, 679.07723, 708.2029, 768.47902, 813.80293, 841.68258,
      ];
      option1.value.series.data = [
        197.01487, 197.82398, 198.3018, 199.81807, 200.72274, 201.672,
        203.19465, 204.23948, 205.18874, 207.18284, 208.84564, 209.98603,
      ];
      option1.value.series.name = "全开";
      break;
    default:
      break;
  }
};
</script>
<template>
  <a-drawer
    title="特征曲线"
    :width="720"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-tabs>
      <a-tab-pane key="1" tab="丰乐水库泄洪洞泄量曲线">
        <div class="chart-wrap">
          <div class="sel-wrap">
            <a-select
              ref="select"
              v-model:value="selVal"
              style="width: 120px"
              @focus="focus"
              @change="handleChange"
            >
              <a-select-option value="1">e = 1米</a-select-option>
              <a-select-option value="2">e = 2米</a-select-option>
              <a-select-option value="3">e = 3米</a-select-option>
              <a-select-option value="4">e = 4米</a-select-option>
              <a-select-option value="5">e = 5米</a-select-option>
              <a-select-option value="6">全开</a-select-option>
            </a-select>
          </div>
          <v-chart class="chart" :option="option1"></v-chart></div
      ></a-tab-pane>
      <a-tab-pane key="2" tab="水库库容曲线">
        <v-chart class="chart" :option="option2"></v-chart
      ></a-tab-pane>
    </a-tabs>
  </a-drawer>
</template>
<style scoped>
.chart {
  width: 600px;
  height: 600px;
}
.chart-wrap {
  position: relative;
  width: 600px;
  height: 600px;
}
.sel-wrap {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
}
</style>
