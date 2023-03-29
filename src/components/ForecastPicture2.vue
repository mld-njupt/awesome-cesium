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
const simuStore = useSimuStore();
const hideInfo =()=>{

simuStore.forecastpicture2.isShow =false;

}

const option = ref({
  backgroundColor: '#fff',
  title: {
    padding:20,
            text: "降水设置",
            left:"center",
            textStyle: {
             
              fontFamily:'微软雅黑',
                        color: '#000',
                        fontSize:15,
                    },
            
          
          },
          legend: {
            icon: 'rect',
    data: ['降水设置'],
    right: '7%',
    top:'4%',
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  toolbox: {
    feature: {
 
      myClose: {
        show: true,
        title: "关闭弹窗",
        icon: "path://M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z",
        onclick: function () {
          hideInfo()
  
        },
      },
    },
  },

  dataZoom: [
    {
      id: 'dataZoomX',
      show: true,
      realtime: true,
      start: 30,
      end: 70,
      /* height:'10', */
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
   // name:'日期(6月30日0时-7月1日0时)',
    nameLocation: "middle",
    nameGap: 0,
    boundaryGap: false,
    axisLine: { onZero: true },
    data: [
   
],
  },
  yAxis: {
    name: "mm/d",
    nameTextStyle: {
            padding: [, 0, 10, -30]    // 四个数字分别为上右下左与原位置距离
        },
    type: "value",
    max: 80,
    splitNumber : 10,
  },

  series: {
    name: "降水设置",
    type: "line",
   /*  symbolSize: 18, */
    // prettier-ignore
    data: [],
  },
});
onMounted(() => {

    if(  simuStore.simuData.start.format(
          "YYYY-MM-DD"
        )=="2023-06-30"){
      option.value.xAxis.data=data630
      option.value.series.data=shuzu630
     
    }

    else if( simuStore.simuData.start.format(
          "YYYY-MM-DD"
        )=="2023-04-12"){
            option.value.xAxis.data=data412
            option.value.series.data=shuzu412

    }
          else if( simuStore.simuData.start.format(
          "YYYY-MM-DD"
        )=="2023-04-29"){
            option.value.xAxis.data=data429
            option.value.series.data=shuzu429

    }
    
    else{
     
      option.value.xAxis.data=data76
      option.value.series.data=shuzu76
    }
});
// onBeforeUnmount(() => {
//   clearInterval(timer);
// });

const data412=ref([
   "2023-4-12-00",
    "2023-4-12-01",
    "2023-4-12-02",
    "2023-4-12-03",
    "2023-4-12-04",
    "2023-4-12-05",
    "2023-4-12-06",
    "2023-4-12-07",
    "2023-4-12-08",
    "2023-4-12-09",
    "2023-4-12-10",
       "2023-4-12-11",
    "2023-4-12-12",
    "2023-4-12-13",
    "2023-4-12-14",
    "2023-4-12-15",
    "2023-4-12-16",
    "2023-4-12-17",
    "2023-4-12-18",
    "2023-4-12-19",
    "2023-4-12-20",
    "2023-4-12-21",
   "2023-4-12-22",
    "2023-4-12-23",
    "2023-4-13-00",
    "2023-4-13-01",
   "2023-4-13-02",
    "2023-4-13-03",
       "2023-4-13-04",
    "2023-4-13-05",
   "2023-4-13-06",
    "2023-4-13-07",
      "2023-4-13-08",
   "2023-4-13-09",
    "2023-4-13-10",
])
const data429=ref([ 
   "2023-4-29-00",
     "2023-4-29-01",
      "2023-4-29-02",
      "2023-4-29-03",
        "2023-4-29-04",
      "2023-4-29-05",
      "2023-4-29-06",
      "2023-4-29-07",
        "2023-4-29-08",
      "2023-4-29-09",
      "2023-4-29-10",
  "2023-4-29-11",
    "2023-4-29-12",
    "2023-4-29-13",
    "2023-4-29-14",
    "2023-4-29-15",
    "2023-4-29-16",
    "2023-4-29-17",
    "2023-4-29-18",
    "2023-4-29-19",
    "2023-4-29-20",
    "2023-4-29-21",
    "2023-4-29-22",
    "2023-4-29-23",
    "2023-4-30-00",
   

 
    "2023-4-30-01",
    "2023-4-30-02",
    "2023-4-30-03",
    "2023-4-30-04",
    "2023-4-30-05",
    "2023-4-30-06",
    
  
])

const data630=ref([ "2013-6-30-00",
    "2013-6-30-01",
    "2013-6-30-02",
    "2013-6-30-03",
    "2013-6-30-04",
    "2013-6-30-05",
    "2013-6-30-06",
    "2013-6-30-07",
    "2013-6-30-08",
    "2013-6-30-09",
    "2013-6-30-10",
    "2013-6-30-11",
    "2013-6-30-12",
    "2013-6-30-13",
    "2013-6-30-14",
    "2013-6-30-15",
    "2013-6-30-16",
    "2013-6-30-17",
    "2013-6-30-18",
    "2013-6-30-19",
    "2013-6-30-20",
    "2013-6-30-21",
    "2013-6-30-22",
    "2013-6-30-23",
    "2013-7-1-00",
])
const data76=ref([ 
"2013-7-6-09",
    "2013-7-6-10",
    "2013-7-6-11",
    "2013-7-6-12",
    "2013-7-6-13",
    "2013-7-6-14",
    "2013-7-6-15",
    "2013-7-6-16",
    "2013-7-6-17",
    "2013-7-6-18",
    "2013-7-6-19",
    "2013-7-6-20",
    "2013-7-6-21",
    "2013-7-6-22",
    "2013-7-6-23",
    "2013-7-7-00",
  
    "2013-7-7-01",
    "2013-7-7-02",
    "2013-7-7-03",
    "2013-7-7-04",
    "2013-7-7-05",
    "2013-7-7-06",
    "2013-7-7-07",
    "2013-7-7-08",
    "2013-7-7-09",
    "2013-7-7-10",
    "2013-7-7-11",
    "2013-7-7-12",
    "2013-7-7-13",
    "2013-7-7-14",
    "2013-7-7-15",
    "2013-7-7-16",
    "2013-7-7-17",
    "2013-7-7-18",
    "2013-7-7-19",
    "2013-7-7-20",
    "2013-7-7-21",
    "2013-7-7-22",
    "2013-7-7-23",
])
const shuzu412=ref([0,
1,
0,
0,
0,
1,
6,
11,
22,
43,
13,
11,
9,
2,
1,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
])
const shuzu429=ref([0,
1,
0,
0,
0,
1,
4,
6,
15,
21,
10,
7,
6,
5,
4,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
])
const shuzu630=ref([0,
1,
0,
0,
0,
1,
13,
16,
25,
73,
43,
0,
0,
2,
5,
0,
0,
0,
0,
0,
0,
0,
0,
0,
0,
],)
const shuzu76=ref([
0.46,
0.72,
0.64,
0.64,
0.65,
0.24,
0.24,
0.24,
0.72,
0.72,
0.72,
7.72,
18.92,
13.78,
4.64,
28.58,
24.86,
10.9,
12.66,
3.84,
18.12,
19.52,
1.96,
0.94,
0.34,
2.2,
2.24,
6.16,
3.06,
3.82,
2.5,
2.02,
1.48,
0.5,
0.78,
0,
0,
0,
0,

],)
</script>
<template>


<v-chart class="chart content-item" :option="option" ></v-chart> 


</template>
<style scoped>



.content-item {

  overflow: auto;
  position: absolute;
  width: 500px;
  height: 350px;
  z-index: 1000;
  top: 50px;
right:  00px;
}
.chart1{
  width: 100px;
  height: 100px;
  color: black;
}
</style>

