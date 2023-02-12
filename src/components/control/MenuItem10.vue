<script setup>
import ColumnItem from "../ColumnItem.vue";
import { ref, reactive } from "vue";
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
import VChart from "vue-echarts";
import { notification } from "ant-design-vue";
import { ShareAltOutlined } from "@ant-design/icons-vue";
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
const time1 = [
  "2023.6.10:0",
  "2023.6.10:1",
  "2023.6.10:2",
  "2023.6.10:3",
  "2023.6.10:4",
  "2023.6.10:5",
  "2023.6.10:6",
  "2023.6.10:7",
  "2023.6.10:8",
  "2023.6.10:9",
  "2023.6.10:10",
  "2023.6.10:11",
  "2023.6.10:12",
  "2023.6.10:13",
  "2023.6.10:14",
  "2023.6.11:15",
  "2023.6.10:16",
  "2023.6.10:17",
  "2023.6.10:18",
  "2023.6.10:19",
  "2023.6.10:20",
  "2023.6.10:21",
  "2023.6.10:22",
];
const data1 = [
  201, 202.24, 202.85, 203.24, 203.53, 203.77, 203.94, 204.01, 204.02, 203.96,
  203.86, 203.68, 203.47, 203.25, 203.03, 202.8, 202.56, 202.31, 202.07, 201.82,
  201.57, 201.3, 201.04,
];
const time2 = [
  "2023.3.12:0",
  "2023.3.12:1",
  "2023.3.12:2",
  "2023.3.12:3",
  "2023.3.12:4",
  "2023.3.12:5",
  "2023.3.12:6",
  "2023.3.12:7",
  "2023.3.12:8",
  "2023.3.12:9",
  "2023.3.12:0",
  "2023.3.12:1",
  "2023.3.12:2",
  "2023.3.12:3",
  "2023.3.12:4",
  "2023.3.12:5",
  "2023.3.12:6",
  "2023.3.12:7",
  "2023.3.12:8",
  "2023.3.12:9",
  "2023.3.12:0",
  "2023.3.12:1",
  "2023.3.12:2",
];
const data2 = [
  197, 197.46, 198.47, 199.06, 199.55, 199.69, 199.9, 200.14, 200.26, 199.88,
  199.68, 199.4, 199.3, 199.17, 198.85, 198.62, 198.48, 198.23, 197.9, 197.74,
  197.39, 197.22, 196.96,
];
const time3 = [
  "2023.3.30:0",
  "2023.3.30:1",
  "2023.3.30:2",
  "2023.3.30:3",
  "2023.3.30:4",
  "2023.3.30:5",
  "2023.3.30:6",
  "2023.3.30:7",
  "2023.3.30:8",
  "2023.3.30:9",
  "2023.3.30:10",
  "2023.3.30:11",
  "2023.3.30:12",
  "2023.3.30:13",
  "2023.3.30:14",
  "2023.3.30:15",
  "2023.3.30:16",
  "2023.3.30:17",
  "2023.3.30:18",
  "2023.3.30:19",
  "2023.3.30:20",
  "2023.3.30:21",
  "2023.3.30:22",
  "2023.3.31:23",
  "2023.3.32:0",
  "2023.3.33:1",
];
const data3 = [
  197, 198.02, 198.53, 199.12, 199.61, 199.85, 200.02, 200.09, 200.1, 200.04,
  199.94, 199.76, 199.55, 199.33, 199.11, 198.88, 198.64, 198.39, 198.15, 197.9,
  197.65, 197.38, 197.12, 197.1, 197.09, 197.05,
];
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
const defaultPercent = ref(0);
const showProgress = ref(false);
const showResult = ref(false);
const spanRef = ref({
  first: "",
  second: "",
});
const pillarRef = ref({
  first: 100,
  second: 0,
  third: 0,
  fourth: 0,
});
const scheduleData = reactive({
  start: "",
  end: "",
  rain: "",
  water: "",
});
const option = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  // toolbox: {
  //   feature: {
  //     dataZoom: {
  //       yAxisIndex: "none",
  //     },
  //     restore: {},
  //     saveAsImage: {},
  //   },
  // },
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
    name: "水位m",
    type: "value",
    min: 185,
    max: 215,
  },

  series: {
    name: "水位",
    type: "line",
    symbolSize: 8,
    // prettier-ignore
    data: [],
  },
});
const onClose = () => {
  emit("close");
};
const onFinish = () => {
  showProgress.value = true;
  const timer = setInterval(() => {
    const percent = defaultPercent.value;
    defaultPercent.value = percent > 100 ? 100 : percent + 5;
  }, [150]);
  setTimeout(() => {
    if (defaultPercent.value >= 100) {
      notification["success"]({
        message: "计算成功",
      });
      clearInterval(timer);
    }
  }, [3100]);
};
const onResult = () => {
  if (scheduleData.rain == "62" && scheduleData.water == "201") {
    spanRef.value.first = "10小时";
    spanRef.value.second = "24小时";
    pillarRef.value.first = 100;
    pillarRef.value.second = 0;
    pillarRef.value.third = 0;
    pillarRef.value.fourth = 0;
    option.value.xAxis.data = time1;
    option.value.series.data = data1;
    option.value.yAxis.max = Math.max(...data1);
    option.value.yAxis.min = Math.min(...data1);
  } else if (scheduleData.rain == "62" && scheduleData.water == "197") {
    spanRef.value.first = "20小时";
    spanRef.value.second = "20小时";
    pillarRef.value.first = 60;
    pillarRef.value.second = 0;
    pillarRef.value.third = 0;
    pillarRef.value.fourth = 0;
    option.value.xAxis.data = time2;
    option.value.series.data = data2;
    option.value.yAxis.max = Math.max(...data2);
    option.value.yAxis.min = Math.min(...data2);
  } else if (scheduleData.rain == "49" && scheduleData.water == "197") {
    spanRef.value.first = "23小时";
    spanRef.value.second = "26小时";
    pillarRef.value.first = 40;
    pillarRef.value.second = 0;
    pillarRef.value.third = 0;
    pillarRef.value.fourth = 0;
    option.value.xAxis.data = time3;
    option.value.series.data = data3;
    option.value.yAxis.max = Math.max(...data3);
    option.value.yAxis.min = Math.min(...data3);
  } else {
    spanRef.value.first = "10小时";
    spanRef.value.second = "24小时";
    pillarRef.value.first = 100;
    pillarRef.value.second = 0;
    pillarRef.value.third = 0;
    pillarRef.value.fourth = 0;
    option.value.xAxis.data = time1;
    option.value.series.data = data1;
    option.value.yAxis.max = Math.max(...data1);
    option.value.yAxis.min = Math.min(...data1);
  }
  showResult.value = true;
};
</script>
<template>
  <a-drawer
    title="调度"
    :width="720"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <div class="drawer-wrap">
      <a-form
        name="dynamic_form_nest_item"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
      >
        <a-space direction="vertical" :size="12">
          <div style="display: flex; justify-content: space-between">
            <a-form-item label="起始时间" style="width: 300px">
              <a-date-picker
                v-model:value="scheduleData.start"
                format="YYYY-MM-DD HH"
                :show-time="{ format: 'HH' }"
              />
            </a-form-item>
            <a-form-item label="终止时间" style="width: 300px">
              <a-date-picker
                v-model:value="scheduleData.end"
                format="YYYY-MM-DD HH"
                :show-time="{ format: 'HH' }"
              />
            </a-form-item>

            <a-button type="primary" style="margin-left: -20px" ghost>
              <share-alt-outlined />
              链接数据
            </a-button>
          </div>
          <div style="display: flex; justify-content: space-between">
            <a-form-item label="降雨量设置" style="width: 300px">
              <a-input
                style="width: 200px"
                suffix="mm/d"
                v-model:value="scheduleData.rain"
              />
            </a-form-item>

            <a-button type="primary" style="margin-left: 20px" ghost>
              <share-alt-outlined />
              链接数据
            </a-button>
          </div>
          <div style="display: flex; justify-content: space-between">
            <a-form-item label="初始库水位" style="width: 300px">
              <a-input
                style="width: 200px"
                suffix="m"
                v-model:value="scheduleData.water"
              />
            </a-form-item>
            <a-button type="primary" style="margin-left: 20px" ghost>
              <share-alt-outlined />
              链接数据
            </a-button>
          </div>
        </a-space>
        <a-progress v-if="showProgress" :percent="defaultPercent" />
        <div class="button-wrap" style="width: 88%; margin: 0 auto">
          <a-form-item>
            <a-button
              type="primary"
              @click="
                () => {
                  notification['success']({
                    message: '保存成功',
                  });
                }
              "
              >保存设置</a-button
            >
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onFinish">进行计算</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onResult">查看结果</a-button>
          </a-form-item>
        </div>
      </a-form>
      <div v-if="showResult" class="res-wrap">
        <div class="pillar-wrap">
          <div class="pillar-label"></div>
          <div class="pillar-content">
            <div class="res-item">
              <div class="item-content">
                <ColumnItem :height="pillarRef.first" />
              </div>
              <div class="item-title">泄洪洞</div>
            </div>
            <div class="res-item">
              <div class="item-content">
                <ColumnItem :height="pillarRef.second" />
              </div>
              <div class="item-title">发电/供水</div>
            </div>
            <div class="res-item">
              <div class="item-content">
                <ColumnItem :height="pillarRef.third" />
              </div>
              <div class="item-title">底孔闸</div>
            </div>
            <div class="res-item">
              <div class="item-content">
                <ColumnItem :height="pillarRef.fourth" />
              </div>
              <div class="item-title">溢流坝</div>
            </div>
          </div>
          <div class="pillar-label"></div>
        </div>
        <div class="span-wrap">
          <div class="span-label">开启时长</div>
          <div class="span-content">
            <div class="span-item">{{ spanRef.first }}</div>
            <div class="span-item">{{ spanRef.second }}</div>
            <div class="span-item"></div>
            <div class="span-item"></div>
          </div>
          <div class="span-label"></div>
        </div>
        <div class="water-wrap">
          <div class="water-label">调度水量</div>
          <div class="water-content">
            <div class="water-item" style="text-align: left">645m³/s</div>
            <div class="water-item" style="text-align: center">645m³/s</div>
            <div class="water-item">645m³/s</div>
            <div class="water-item">645m³/s</div>
          </div>
          <div class="water-label"></div>
        </div>
        <div class="chart-wrap">
          <v-chart class="chart" :option="option"></v-chart>
        </div>
      </div>
    </div>
  </a-drawer>
</template>
<style scoped>
.res-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}
.res-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-title {
  top: -170px;
}
.pillar-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pillar-label {
  width: 10%;
}
.pillar-content {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.span-wrap {
  top: -160px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.span-label {
  width: 10%;
}
.span-content {
  flex: 1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.span-item {
  width: 50px;
  text-align: center;
}
.water-wrap {
  top: -150px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.water-label {
  width: 10%;
}
.water-content {
  flex: 1%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.water-item {
  width: 60px;
  text-align: right;
}
.chart {
  top: -140px;
  width: 500px;
  height: 350px;
}
</style>
