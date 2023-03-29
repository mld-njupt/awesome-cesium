<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import { notification } from "ant-design-vue";
import { useSimuStore } from "../../stores/simulation";
import { useViewStore } from "../../stores/earth";
import { Cartesian3 } from "cesium";
import VChart from "vue-echarts";
import { ShareAltOutlined, UploadOutlined,SelectOutlined,PlusOutlined} from "@ant-design/icons-vue";
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
const formRef = ref();
const defaultPercent = ref(0);
const showProgress = ref(false);
// const formRes = reactive({
//   start: "",
//   end: "",
//   rainfall: "",
//   evaporation: "",
//   temperature: "",
// });
const simuStore = useSimuStore();
const viewerStore = useViewStore();
const onSave = () => {
  if (!simuStore.simuData.end || !simuStore.simuData.start) {
    notification["warn"]({
      message: "请先选择时间",
    });
    return;
  }
  notification["success"]({
    message: "保存成功",
  });
  simuStore.simuData.isSave = true;
};
const onFinish = () => {
  if (!simuStore.simuData.isSave) {
    notification["warn"]({
      message: "请先保存结果",
    });
    return;
  }
  const xuanzevalue = ref(0);
 const value = ref(1);
const xuanze1 = () =>{
  alert('s')
  xuanzevalue.value='1'
}
    const value2 = ref('1');
      const value3 = ref('1');
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
      simuStore.simuData.isComputed = true;
      clearInterval(timer);
    }
  }, [3100]);
};
// let timer;
onMounted(() => {
  // timer = setInterval(() => {
  //   document.getElementsByClassName("ant-picker-header-view")[1].innerHTML =
  //     "hour";
  //   document.getElementsByClassName("ant-picker-header-view")[3].innerHTML =
  //     "hour";
  //   // console.log(document.getElementsByClassName("ant-picker-header-view"));
  // }, 100);
  simuStore.simuData.start = "";
  simuStore.simuData.end = "";
});
// onBeforeUnmount(() => {
//   clearInterval(timer);
// });
const yuxingable=ref(false)
const duquable=ref(false)
const yuxingxuanzhe = () => {
  console.log(simuStore.simuData.rainfall)
  if(simuStore.simuData.rainfall==""){
    alert('请输入降水设置')
      duquable.value=false
    return;
  }
  duquable.value=true
      visible.value = true;
}
const lianjieshuju = () => {
  yuxingable.value=true
}
  const visible = ref(false);
    const showModal = () => {
      visible.value = true;
    };
    const handleOk = e => {
      console.log(e);
      visible.value = false;}
const duquwenjin = () => { yuxingable.value=true}
const dianjijiangshui = () => { 
  console.log(simuStore.simuData.rainfall)
    if(simuStore.simuData.rainfall==""){
 
      duquable.value=false
    return;
  }
  
  duquable.value=true }
 const option1 = ref({
  backgroundColor: '#fff',
  title: {
    padding:20,
            text: "芝加哥雨型",
            left:"center",
            textStyle: {
             
              fontFamily:'微软雅黑',
                        color: '#000',
                        fontSize:15,
                    },
            
          
          },
  //         legend: {
  //           icon: 'rect',
  //   data: ['降水设置'],
  //   right: '7%',
  //   top:'4%',
  // },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },

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
    data: [1,2,3,4,5,6,7,8,9,10,11,12,13
   
],
  },
  yAxis: {
    name: "mm/d",
    nameTextStyle: {
            padding: [, 0, 10, -30]    // 四个数字分别为上右下左与原位置距离
        },
    type: "value",
    max: 0.30,
    splitNumber :7,
  },

  series: {
  /*   name: "降水设置", */
    type: "bar",
   /*  symbolSize: 18, */
    // prettier-ignore
    data: [0.024096386,
0.048192771,
0.072289157,
0.180722892,
0.253012048,
0.120481928,
0.084337349,
0.072289157,
0.060240964,
0.048192771,
0.024096386,
0.012048193,
0,
],
  },
});
const option2 = ref({
  backgroundColor: '#fff',
  title: {
    padding:20,
             text: "2020.7.6大暴雨",
            left:"center",
            textStyle: {
             
              fontFamily:'微软雅黑',
                        color: '#000',
                        fontSize:15,
                    },
            
          
          },
  //         legend: {
  //           icon: 'rect',
  //   data: ['降水设置'],
  //   right: '7%',
  //   top:'4%',
  // },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },

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
    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23
   
],
  },
  yAxis: {
    name: "mm/d",
    nameTextStyle: {
            padding: [, 0, 10, -30]    // 四个数字分别为上右下左与原位置距离
        },
    type: "value",
    max: 0.45,
    splitNumber :7,
  },

  series: {
  /*   name: "降水设置", */
    type: "bar",
   /*  symbolSize: 18, */
    // prettier-ignore
    data: [0,
0.005586592,
0,
0,
0,
0.005586592,
0.072625698,
0.089385475,
0.139664804,
0.407821229,
0.240223464,
0,
0,
0.011173184,
0.027932961,
0,
0,
0,
0,
0,
0,
0,
0,

],
  },
});
 const option3 = ref({
  backgroundColor: '#fff',
  title: {
    padding:20,
            text: "2013.6.30大暴雨",
            left:"center",
            textStyle: {
             
              fontFamily:'微软雅黑',
                        color: '#000',
                        fontSize:15,
                    },
            
          
          },
  //         legend: {
  //           icon: 'rect',
  //   data: ['降水设置'],
  //   right: '7%',
  //   top:'4%',
  // },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },

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
    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36
   
],
  },
  yAxis: {
    name: "mm/d",
    nameTextStyle: {
            padding: [, 0, 10, -30]    // 四个数字分别为上右下左与原位置距离
        },
    type: "value",
    max: 0.17,
    splitNumber :7,
  },

  series: {
  /*   name: "降水设置", */
    type: "bar",
   /*  symbolSize: 18, */
    // prettier-ignore
    data: [0.00232876,
0.003645016,
0.003240014,
0.003240014,
0.003290639,
0.001215005,
0.001215005,
0.001215005,
0.003645016,
0.003645016,
0.003645016,
0.039082671,
0.095782919,
0.069761555,
0.023490103,
0.144686883,
0.125854301,
0.055181491,
0.06409153,
0.019440085,
0.091732901,
0.098820432,
0.009922543,
0.004758771,
0.001721258,
0.011137549,
0.01134005,
0.031185136,
0.015491318,
0.019338835,
0.012656305,
0.010226295,
0.007492533,
0.002531261,
0.003948767,
0,
0,
0,
0,

],
  },
});
const bodystyle = {
  height: '480px',
  overflow: 'hidden',
  overflowY: 'scroll',
}
const value = ref(1);
const onClose = () => {
  if (!simuStore.simuData.isSave) {
    notification["warn"]({
      message: "请先保存结果",
    });
    return;
  }
  if (!simuStore.simuData.isComputed) {
    notification["warn"]({
      message: "请先进行计算",
    });
    return;
  }
  //simuStore.simuData.showSimu = true;
  //simuStore.simuData.flag = 2;
  emit("close");
  const viewer = viewerStore.cesiumViewer;
  // viewer.camera.flyTo({
  //   //经度、纬度、高度
  //   destination: Cartesian3.fromDegrees(
  //     118.24563658584941,
  //     29.899203558525926,
  //     5000
  //   ),
  // });
  simuStore.forecastpicture.isShow =true;
 
  simuStore.forecastpicture2.isShow =true;

};
</script>
<template>
  <a-drawer
    title="预报"
    :width="650"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="
      () => {
        emit('close');
      }
    "
  >
    <div class="drawer-wrap">
      <a-form
        ref="formRef"
        name="dynamic_form_nest_item"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        :model="simuStore.simuData"
      >
        <a-space direction="vertical" :size="12">
          <div>
            <a-form-item label="情景名称" style="width: 300px">
              <a-input style="width: 200px" />
            </a-form-item>
          </div>
          <div>
            <a-form-item label="起始时间" style="width: 300px">
              <a-date-picker
                v-model:value="simuStore.simuData.start"
                format="YYYY-MM-DD HH"
                :show-time="{ format: 'HH' }"
              />
            </a-form-item>
          </div>
          <div>
            <a-form-item label="终止时间" style="width: 300px">
              <a-date-picker
                v-model:value="simuStore.simuData.end"
                format="YYYY-MM-DD HH"
                :show-time="{ format: 'HH' }"
              />
            </a-form-item>
          </div>
          <div   class="jiangshui" style="display: flex">
            <a-form-item   label="降水设置" style="width: 300px">
              <a-input
              class="jiangshui" 
                style="width: 170px"
                v-model:value="simuStore.simuData.rainfall"
                suffix="mm/d"
                @change="dianjijiangshui"
                :disabled="yuxingable"
              />
            </a-form-item>
                  <a-button type="primary" :disabled="yuxingable" size="small" @click="yuxingxuanzhe" style="margin-top: 5px;" ghost>
            <select-outlined />
            雨型选择  
            </a-button>
           
            <a-modal v-model:visible="visible" title="雨型选择"  :body-style="bodystyle" width="830px" @ok="handleOk">
      
 <div class="legend">
   <div> <v-chart class="chart1"  :option="option1" ></v-chart>  </div>
 <div> <v-chart class="chart1"  :option="option2" ></v-chart>  </div>
  <div> <v-chart class="chart1"  :option="option3" ></v-chart>  </div>
<!--  <v-chart class="chart1"  :option="option2" ></v-chart>
  <v-chart class="chart1"  :option="option3" ></v-chart> -->
  <div class="zidingyi">  <div>自定义+</div><!-- <plus-outlined /> -->

      </div>
  <!--     <a-radio-group v-model="xuanzevalue" @change="onChange">
      <a-radio :xuanzevalue="1">
       芝加哥雨型
      </a-radio>
      <a-radio :xuanzevalue="2">
      2013.6.30大暴雨
      </a-radio>
      <a-radio :xuanzevalue="3">
       2020.7.6大暴雨
      </a-radio>
   
    </a-radio-group> -->
        <a-radio-group v-model:value="value">
      <a-radio  class="xuanze1" :value="1">芝加哥雨型</a-radio>
      <a-radio  class="xuanze2" :value="2">2013.6.30大暴雨</a-radio>
      <a-radio  class="xuanze3" :value="3">2020.7.6大暴雨</a-radio>

    </a-radio-group>
    </div>



    </a-modal>
    
            <a-upload name="file">          
            <a-button type="primary" :disabled="duquable" size="small" @click="duquwenjin"   style="margin-top: 5px;margin-left: 5px;" ghost>
              <upload-outlined></upload-outlined>
              读取文件  
            </a-button>
          </a-upload>
            <a-button type="primary" size="small"  :disabled="duquable"  @click="lianjieshuju"  style="margin-top: 5px; margin-left: 5px;" ghost>
              <share-alt-outlined />
              链接数据
            </a-button>


          </div>
<!--           <div style="display: flex">
            <a-form-item label="蒸发量设置" style="width: 300px">
              <a-input
                style="width: 200px"
                v-model:value="simuStore.simuData.evaporation"
                suffix="mm/d"
              />
            </a-form-item>
            <a-button type="primary" style="margin-left: 20px" ghost>
              <share-alt-outlined />
              链接数据
            </a-button>
          </div> -->
          <div style="display: flex">
            <!-- <a-form-item label="气温设置" style="width: 300px">
              <a-input
                style="width: 170px"
                v-model:value="simuStore.simuData.temperature"
                suffix="℃"
              />
            </a-form-item> -->
            <!-- <a-button type="primary" style="margin-left: 115px" ghost>
              <share-alt-outlined />
              链接数据
            </a-button> -->
          </div>
        </a-space>
        <a-progress v-if="showProgress" :percent="defaultPercent" />
        <div class="button-wrap">
          <a-form-item>
            <a-button type="primary" @click="onSave">保存设置</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onFinish">进行计算</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onClose">查看结果</a-button>
          </a-form-item>
        </div>
      </a-form>
    </div>

    <!-- <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onClose">确认</a-button>
      </a-space>
    </template> -->
  </a-drawer>
</template>
<style scoped>
.zijiage{
    position: relative;
   /*  top: 80px; */
 /*  left: -215px;  */
 top: -20px;
 left: 185px;
}
.xuanze1{
   position: relative;
   top: -30px;
 left: -305px;
}
.xuanze2{
   position: relative;
    top: -35px;
 left: -0px;
}
.xuanze3{
   position: relative;
    top: 270px;
 left: -560px;
}
.zidingyi{
  position: relative;
  top: 100px;
  left: 200px;
}
.chart1{
    width: 400px;
  height: 300px;
}
.legend {
  /* position: fixed;
  bottom: 80px;
  right: 70px; */
  display:flex;
  flex-wrap:wrap;
  width: 1000px;

 
}
.jiangshui{
  display: flex;

}
.button-wrap {
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 30px;
}

/* .loading-wrap {
  position: absolute;
  width: 200px;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
} */
</style>
