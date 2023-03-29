<script setup>
import ColumnItem from "../ColumnItem.vue";
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, LineChart, BarChart } from "echarts/charts";
import ForecastPicture from "../ForecastPicture.vue";
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
const time1 = [
  "2023.6.30:0",
  "2023.6.30:1",
  "2023.6.30:2",
  "2023.6.30:3",
  "2023.6.30:4",
  "2023.6.30:5",
  "2023.6.30:6",
  "2023.6.30:7",
  "2023.6.30:8",
  "2023.6.30:9",
  "2023.6.30:10",
  "2023.6.30:11",
  "2023.6.30:12",
  "2023.6.30:13",
  "2023.6.30:14",
  "2023.6.30:15",
  "2023.6.30:16",
  "2023.6.30:17",
  "2023.6.30:18",
  "2023.6.30:19",
  "2023.6.30:20",
  "2023.6.30:21",
  "2023.6.30:22",
  "2023.6.30:23",
  "2023.6.30:23",
  "2023.7.0:0",
];
const data1 = [
201,
202.24,
202.85,
203.24,
203.53,
203.77,
203.94,
204.01,
204.02,
203.96,
203.86,
203.68,
203.47,
203.25,
203.03,
202.98,
202.9,
202.8,
202.56,
202.31,
202.07,
201.82,
201.57,
201.3,
201.04,

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
  "2023.3.12:10",
  "2023.3.12:11",
  "2023.3.12:12",
  "2023.3.12:13",
  "2023.3.12:14",
  "2023.3.12:15",
  "2023.3.12:16",
  "2023.3.12:17",
  "2023.3.12:18",
  "2023.3.12:19",
  "2023.3.12:20",
  "2023.3.12:21",
  "2023.3.12:22",
  "2023.3.12:23",
];
const data2 = [
197,
197.46,
198.47,
199.06,
199.55,
199.69,
199.9,
200.14,
200.26,
199.88,
199.68,
199.4,
199.3,
199.17,
199.1,
198.85,
198.62,
198.48,
198.23,
197.9,
197.74,
197.39,
197.22,
196.96,

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
  "2023.3.30:23",
  "2023.3.31:0",
  "2023.3.31:1",
];
const data3 = [
197,
198.02,
198.53,
199.12,
199.61,
199.85,
200.02,
200.09,
200.1,
200.04,
199.94,
199.76,
199.55,
199.33,
199.11,
198.88,
198.64,
198.39,
198.15,
197.9,
197.65,
197.38,
197.12,
197.1,
197.09,
197.05,

];
const data4 = [
198.930396,
199.530156,
200.129916,
200.809644,
200.81964,
200.989572,
201.039552,
201.189492,
201.399408,
201.46938,
202.31904,
203.428596,
204.098328,
204.1683,
204.048348,
203.938392,
203.808444,
203.56854,
203.31864,
203.058744,
202.788852,
202.51896,
202.229076,
201.939192,
201.649308,
201.349428,
201.059544,
200.789652,

];
const time4 = [
  "2023.7.6:20",
  "2023.7.6:21",
  "2023.7.6:22",
  "2023.7.6:23",
  "2023.7.7:1",
  "2023.7.7:2",
  "2023.7.7:3",
  "2023.7.7:4",
  "2023.7.7:5",
  "2023.7.7:6",
  "2023.7.7:7",
  "2023.7.7:8",
  "2023.7.7:9",
  "2023.7.7:10",
  "2023.7.7:11",
  "2023.7.7:12",
  "2023.7.7:13",
  "2023.7.7:14",
  "2023.7.7:15",
  "2023.7.7:16",
  "2023.7.7:17",
  "2023.7.7:18",
  "2023.7.7:19",
  "2023.7.7:20",
  "2023.7.7:21",
  "2023.7.7:22",
  "2023.7.7:23",
  "2023.7.8:0",
];

const jindutiaoshow1=ref(true)
const jindutiaoshow2=ref(false)
const qian20=()=>{
  if( scheduleData.rain == "197" && scheduleData.water == "201"){
    pillarRef.value.first=0
        pillarRef.value.fujia='6米'
spanRef.value.first = "20小时";
  }
  
}
const hou8=()=>{
  if( scheduleData.rain == "197" && scheduleData.water == "201"){
    pillarRef.value.first=50
    pillarRef.value.fujia='3米'
     spanRef.value.first = "8小时";

  }

}
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
  fujia:'',
});
const waterRef = ref({
  first: 100,
  second: 0,
  third: 0,
  fourth: 0,
});
const scheduleData = reactive({
  name: "",
  start: "",
  end: "",
  rain: "",
  water: "",
});
const schemeRef = ref([]);
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
const onSave = () => {
  notification["success"]({
    message: "保存成功",
  });
  let scheme = localStorage.getItem("dispatch-scheme");
  if (scheme) {
    scheme = JSON.parse(scheme);
  } else {
    scheme = [];
  }
  scheme = [
    ...scheme,
    {
      name: scheduleData.name,
      start: scheduleData.start.toString(),
      end: scheduleData.end.toString(),
      rain: scheduleData.rain,
      water: scheduleData.water,
    },
  ];
  schemeRef.value = scheme;
  localStorage.setItem("dispatch-scheme", JSON.stringify(scheme));
};
const onFinish = () => {
  showProgress.value = true;
  if (defaultPercent.value >= 100) {
    defaultPercent.value = 0;
  }
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
  if (scheduleData.rain == "179" && scheduleData.water == "201") {
    spanRef.value.first = "26小时";
    spanRef.value.second = "提前开启48小时";
    pillarRef.value.first = 50;
    pillarRef.value.fujia='3米'
    waterRef.value.first = 2927;
    waterRef.value.second = 483.8;
    waterRef.value.third = 0;
    waterRef.value.fourth = 0;
    option.value.xAxis.data = time1;
    option.value.series.data = data1;
    option.value.yAxis.max = Math.max(...data1);
    option.value.yAxis.min = Math.min(...data1);
    jindutiaoshow2.value=false
 

  } else if (scheduleData.rain == "120" && scheduleData.water == "197") {
    spanRef.value.first = "20小时";
    spanRef.value.second = "20小时";
    pillarRef.value.first = 50;
      pillarRef.value.fujia='3米'
    waterRef.value.first = 2370.3;
    waterRef.value.second = 201.6;
    waterRef.value.third = 0;
    waterRef.value.fourth = 0;
    option.value.xAxis.data = time2;
    option.value.series.data = data2;
    option.value.yAxis.max = Math.max(...data2);
    option.value.yAxis.min = Math.min(...data2);
      jindutiaoshow2.value=false
 jindutiaoshow1.value=true
   
  } else if (scheduleData.rain == "49" && scheduleData.water == "197") {
    spanRef.value.first = "23小时";
    spanRef.value.second = "26小时";
    pillarRef.value.first = 33;
      pillarRef.value.fujia='2米'
    waterRef.value.first = 1704.4;
    waterRef.value.second = 262.1;
    waterRef.value.third = 0;
    waterRef.value.fourth = 0;
    option.value.xAxis.data = time3;
    option.value.series.data = data3;
    option.value.yAxis.max = Math.max(...data3);
    option.value.yAxis.min = Math.min(...data3);
     jindutiaoshow2.value=false
      jindutiaoshow1.value=true
  }
  else if (scheduleData.rain == "197" && scheduleData.water == "201") {
    spanRef.value.first = "20小时";
    spanRef.value.second = "提前开启48小时";
    pillarRef.value.first = 0;
    pillarRef.value.fujia='6米'
    waterRef.value.first = 5522.7;
    waterRef.value.second = 766;
    waterRef.value.third = 0;
    waterRef.value.fourth = 0;
    option.value.xAxis.data = time4;
    option.value.series.data = data4;
    option.value.yAxis.max = Math.max(...data4);
    option.value.yAxis.min = Math.min(...data4);
    jindutiaoshow1.value=false
    jindutiaoshow2.value=true
     jindutiaoshow1.value=true
  }  else {
   
  
    spanRef.value.first = "10小时";
    spanRef.value.second = "24小时";
    pillarRef.value.first = 0;
    waterRef.value.first = 2230;
    waterRef.value.second = 241.9;
    waterRef.value.third = 0;
      pillarRef.value.fujia='3米'
    waterRef.value.fourth = 0;
    option.value.xAxis.data = time1;
    option.value.series.data = data1;
    option.value.yAxis.max = Math.max(...data1);
    option.value.yAxis.min = Math.min(...data1);
      jindutiaoshow2.value=false
       jindutiaoshow1.value=true
 

  // 单个样式
//ss[0].style.background="rgb(black);"

    // jindutiao2.style.background =rgb(68, 114, 196);
  }
  showResult.value = true;
};
const handleChange = (e, v) => {
  const scheme = schemeRef.value.filter((item) => {
    return v.value == item.name;
  })[0];
  // console.log(scheme);
  scheduleData.name = scheme.name;
  scheduleData.start = moment(scheme.start);
  scheduleData.end = moment(scheme.end);
  scheduleData.water = scheme.water;
  scheduleData.rain = scheme.rain;
  // console.log(scheduleData);
};
// let timer;
// onMounted(() => {
//   timer = setInterval(() => {
//     document.getElementsByClassName("ant-picker-header-view")[1].innerHTML =
//       "hour";
//     document.getElementsByClassName("ant-picker-header-view")[3].innerHTML =
//       "hour";
//     // console.log(document.getElementsByClassName("ant-picker-header-view"));
//   }, 100);
// });
// onBeforeUnmount(() => {
//   clearInterval(timer);
// });
 const value = ref(1);
onMounted(() => {

  let scheme = localStorage.getItem("dispatch-scheme");
  if (scheme) {
    scheme = JSON.parse(scheme);
    schemeRef.value = scheme;
    console.log(schemeRef.value);
  }
});
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
            <a-form-item label="情景名称" style="width: 300px">
              <a-input style="width: 200px" v-model:value="scheduleData.name" />
            </a-form-item>
            <a-form-item style="width: 300px">
              <a-select style="width: 200px" @change="handleChange">
                <a-select-option
                  :value="item.name"
                  :key="index"
                  v-for="(item, index) in schemeRef"
                  >{{ item.name }}</a-select-option
                >
                <!-- <a-select-option value="lucy">Lucy</a-select-option>
                <a-select-option value="Yiminghe">yiminghe</a-select-option> -->
              </a-select>
            </a-form-item>
          </div>
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
            <a-button type="primary" @click="onSave">保存设置</a-button>
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
   <!--    <span>00</span> <span id="time1"  @click="qian20"></span> <span id="time2" v-if="jindutiaoshow1" class="time2"> </span> <span id="time3" v-if="jindutiaoshow2" @click="hou8"> </span> -->
      <!-- <p class="time1"></p><p class="time2"></p> -->
      <div class="timeaxis">
        <span class="jindu"  > 调度进度</span>
        <span class="zero">0%

           </span>
           <span id="time1"  @click="qian20"></span>
         <span id="time2" v-if="jindutiaoshow1" class="time2"></span>
       <span id="time3" v-if="jindutiaoshow2" @click="hou8"></span>
           <span class="hundred">100%</span>
           
           </div>
      <div class="xian"></div>
      <div class="biaoti"> <span>泄洪洞</span><span>发电/供水</span><span>底孔闸</span><span>溢流坝</span></div>
        <div class="pillar-wrap">
          <div class="pillar-label"></div>
          <div class="pillar-content">
            <div class="res-item">
              <div class="item-content">
                <ColumnItem
                  :height="pillarRef.first"
                  v-bind:key="pillarRef.first"
                />
                <div class="item-label" style="visibility:hidden;">
                  {{ `开\n度\n${( pillarRef.first ) }\nm` }}
                </div>
              </div>
            <!--   <div class="item-title">泄洪洞</div> -->
            </div>
            <div class="res-item">
              <div class="item-content">
                <ColumnItem :height="0" />
                <div class="item-label"></div>
              </div>
             <!--  <div class="item-title" style="left: -4%">发电/供水</div> -->
            </div>
            <div class="res-item">
              <div class="item-content">
                <ColumnItem :height="100" />
                <div class="item-label"></div>
              </div>
             <!--  <div class="item-title" style="left: 8%">底孔闸</div> -->
            </div>
            <div class="res-item">
              <div class="item-content">
                <ColumnItem :height="100" />
                <div class="item-label"></div>
              </div>
              <!-- <div class="item-title" style="left: 8%">溢流坝</div> -->
            </div>
          </div>
          <div class="pillar-label"></div>
        </div>
         <div class="kaidu">  <div class="span-label">开度</div>
         
          <div class="span-content">
            <div class="span-item">{{pillarRef.fujia}}</div>
            <div class="span-item" style="left: -2%"></div>
            <div class="span-item"></div>
            <div class="span-item"></div>
          </div> </div>
        <div class="span-wrap">
          <div class="span-label">开启时长</div>
         
          <div class="span-content">
            <div class="span-item">{{ spanRef.first }}</div>
            <div class="span-item1" style="left: -2%">{{ spanRef.second }}</div>
            <div class="span-item"></div>
            <div class="span-item"></div>
          </div>
          <div class="span-label"></div>
        </div>
        <!--  <div class="xian"></div> -->
        <div class="water-wrap">
          <div class="water-label">调度水量</div>
          
          <div class="water-content">
            <div class="water-item">
              {{ `${waterRef.first}m³/s` }}
            </div>
            <div class="water-item" >
              {{ `${waterRef.second}m³/s` }}
            </div>
            <div class="water-item">{{ `${waterRef.third}m³/s` }}</div>
            <div class="water-item">{{ `${waterRef.fourth}m³/s` }}</div>
            
          </div>
        
          <div class="water-label"></div>
          
         
        </div>
           
            <div class="diaodushuiwei">调度水位</div>
 <div class="xian2"></div>
        <div class="chart-wrap">
        <!--    <div class="xian2"></div> -->
          <v-chart class="chart" :option="option"></v-chart>
        </div>
      </div>
    </div>
  </a-drawer>
</template>
<style scoped>
.biaoti{
  width: 580px;
    display: flex;
  /* flex-direction: column; */
  justify-content: space-around;
 /*  align-items: center; */
 margin-left: -35px;
}
.diaodushuiwei{
  position: relative;
  top: -115px;
  left: -300px;
}
.xian{
    width: 650px;
  height: 1px;

  background: rgb(68, 114, 196);
  margin-left: -30px;
  margin-top: 15px;
  margin-bottom: 25px;
}
.xian2{
    position: relative;
  top: -170px;
 /*  left: -300px; */
    width: 650px;
  height: 1px;
  margin-left: -30px;
  margin-top: 15px;
  margin-bottom: 25px;
  background: rgb(68, 114, 196);
 /*  margin-top: 15px;
  margin-bottom: 25px; */
}
.jindu{
  position: relative;
  left: -189px;
}
.hundred{
  position: relative;
left: 10px;

}
.zero{

position: relative;
left: -10px;


}
.timeaxis{
   display: flex;

  justify-content: space-between;
  align-items: center;
  margin-left: -68px;
}
#time1{
display: inline-block;
text-align: center;
line-height: 17px;
font-weight:bold;/*加粗*/
font-size: 2px;
  width: 70px;
  height: 14px;
  background: rgb(68, 114, 196);

}
#time2{
  display: inline-block;

  width: 30px;
  height: 14px;
  background: rgb(68, 114, 196);

}
#time1:hover{
  cursor: pointer;
  
          
}
#time2:hover{
  cursor: pointer;

}
#time3{
  
 /*  float: left; */
  width: 30px;
  height: 14px;
  background: rgb(255, 192, 0);
/*   margin-bottom: 30px;
  margin-left: 40px; */
}
#time3:hover{
  cursor: pointer;

}


.res-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin-left: 28px;
}
.res-item {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
}
.item-title {
  width: 70px;
  /* text-align: center; */
  top: -170px;
}
.item-content {
  display: flex;
  align-items: center;
}
.item-label {
  width: 14px;
  top: -80px;
  margin-left: 16px;
  white-space: pre-wrap;
}
.pillar-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.pillar-label {
  width: 10%;
  top: -85px;
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
.kaidu {
  top: -160px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
.span-item1 {
  width:100px;
  text-align: center;
  margin-left: 5px;
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
  width: 70px;
  /* text-align: right; */
}
.chart-wrap{
   width: 600px;
  height: 400px;
}
.chart {
  top: -203px;

  width: 630px;
  height: 400px;
}
</style>
