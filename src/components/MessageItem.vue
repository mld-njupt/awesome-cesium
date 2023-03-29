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
const option = ref({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      animation: false,
    },
  },
  toolbox: {
    feature: {
      myDownload: {
        show: true,
        title: "下载数据",
        icon: "path://M921.84736468 997.93033544H101.54506534c-24.68943392 0-44.71162586-20.00838352-44.71162584-44.71162585V631.455181c0-24.70324234 20.02219194-44.71162586 44.71162584-44.71162585s44.71162586 20.00838352 44.71162586 44.71162585v277.05190275h730.87904765V631.455181c0-24.70324234 20.02219194-44.71162586 44.71162583-44.71162585 24.68943392 0 44.71162586 20.00838352 44.71162586 44.71162585V953.21870959c0 24.70324234-20.02219194 44.71162586-44.71162586 44.71162585z M511.69621502 839.9897621c-24.68943392 0-44.71162586-20.00838352-44.71162585-44.71162585V70.54383027c0-24.70324234 20.02219194-44.71162586 44.71162585-44.71162586s44.71162586 20.00838352 44.71162585 44.71162586v724.73430598c0 24.70324234-20.02219194 44.71162586-44.71162585 44.71162585z M511.69621502 869.73307344c-14.37455297 0-27.92060144-6.93182094-36.30230524-18.61373431L323.62569491 639.87831001c-14.41597819-20.04980875-9.84539506-47.998027 10.21822209-62.41400518 20.02219194-14.37455297 47.94279339-9.85920347 62.3863884 10.21822208l115.47971803 160.70225499 115.45210121-160.68844659c14.443595-20.09123397 42.37800485-24.60658347 62.38638839-10.23203048 20.04980875 14.41597819 24.62039188 42.33657964 10.21822208 62.40019679l-151.75440644 211.2272207a44.65639221 44.65639221 0 0 1-36.31611365 18.64135112z",
        onclick: function () {
          const data = option.value.xAxis.data.map((v, i) => {
            return [v, option.value.series.data[i]];
          });
          const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
          const sheet = workbook.addWorksheet("工作表範例1"); //在檔案中新增工作表 參數放自訂名稱

          sheet.addTable({
            // 在工作表裡面指定位置、格式並用columns與rows屬性填寫內容
            name: "table名稱", // 表格內看不到的，算是key值，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
            ref: "A1", // 從A1開始
            columns: [{ name: "时间" }, { name: `${option.value.yAxis.name}` }],
            rows: data,
          });

          // 表格裡面的資料都填寫完成之後，訂出下載的callback function
          // 異步的等待他處理完之後，創建url與連結，觸發下載
          workbook.xlsx.writeBuffer().then((content) => {
            const link = document.createElement("a");
            const blobData = new Blob([content], {
              type: "application/vnd.ms-excel;charset=utf-8;",
            });
            link.download = "监测数据.xlsx";
            link.href = URL.createObjectURL(blobData);
            link.click();
          });
        },
      },
      myClose: {
        show: true,
        title: "关闭弹窗",
        icon: "path://M886.528 908.032c-28.096 28.096-73.856 28.096-102.016 0L138.304 261.824c-28.096-28.16-28.16-73.856 0-102.016 28.032-28.16 73.792-28.16 102.08 0l646.144 646.144C914.624 834.24 914.752 879.872 886.528 908.032L886.528 908.032zM885.76 261.504 239.616 907.648c-28.224 28.224-73.92 28.224-102.08 0-28.16-28.096-28.16-73.728 0.064-102.016L783.744 159.552c28.224-28.16 73.984-28.16 102.016-0.064C913.984 187.648 913.856 233.344 885.76 261.504L885.76 261.504z",
        onclick: function () {
          hideInfo();
          const clickStack = clickStore.clickStack;
          const viewer = viewerStore.cesiumViewer;
          if (clickStack.length == 0) return;
          const prevEntityMsg = clickStack.pop();
          if (prevEntityMsg) {
            if (prevEntityMsg.id.includes("yuliang")) {
              //雨量站
              prevEntityMsg.entity._point._pixelSize._value = 17;
              prevEntityMsg.entity._label._fillColor._value =
                Color.fromCssColorString("#000000");
              viewer._container.style.cursor = "default";
              viewer.scene.requestRender();
            } else {
              //水位站和气象站都用此即可
              const prevEntity = viewer.entities.getById(prevEntityMsg.id);
              prevEntity._billboard._scale._value = prevEntityMsg.prev;
              prevEntityMsg.entity._label._fillColor._value =
                Color.fromCssColorString("#000000");
              viewer._container.style.cursor = "default";
              viewer.scene.requestRender();
            }
          }
        },
      },
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
    max: 220,
  },

  series: {
    name: "雨量",
    type: "bar",
    symbolSize: 8,
    // prettier-ignore
    data: [],
  },
});
const handleZoom = (t) => {
  // console.log(t);

  // if (t.end - t.start <= 5) {
  //   option.value.series.type = "bar";
  //   option.value.dataZoom[0].start = t.start;
  //   option.value.dataZoom[0].end = t.end;
  //   option.value.dataZoom[1].start = t.start;
  //   option.value.dataZoom[1].end = t.end;
  // } else {
  //   if (option.value.series.type == "line") return;
  //   option.value.series.type = "line";
  // }
};
const selectTime = () => {




  //console.log(selectType.value);
  // console.log(option.value.dataZoom[0].start);
  // option.value.dataZoom[0].start = 100;

  switch (selectType.value) {
    case "yuliang":
      // station_msg.value = yuliang[station_id];
      option.value.xAxis.data = [];
      option.value.series.data = [];
      option.value.yAxis.name = "雨量";
      option.value.series.name = "雨量";
      option.value.yAxis.max = 220;
      showLoading.value = true;
      //  console.log(simuStore.simuData.end.format(
      //           "YYYYMMDD"
      //         ))
      //  console.log(simuStore.simuData.start.format(
      //           "YYYYMMDD"
      //         ))
      if (simuStore.simuData.end.format(
        "YYYYMMDD"
      ) > 20231007) {
        alert("终止时间范围溢出")
        //     notification["warn"]({
        //   message: "终止时间范围溢出",
        // });
        return;
      }
      if (simuStore.simuData.start.format(
        "YYYYMMDD"
      ) < 20000000) {
        alert("起始时间范围过小")
        return;
      }

      fetch(
        // "http://43.142.17.108:9001/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/1/20000101/20221010/100000"
        `http://127.0.0.1:9005/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/1/${simuStore.simuData.start.format(
          "YYYYMMDD"
        )}/${simuStore.simuData.end.format("YYYYMMDD")}/14978`
      )
        .then((response) => response.json())
        .then((data) => {
          const { timeData, resData } = handleData(data, "雨量", "时间");
          option.value.series.type = "bar";
          option.value.xAxis.data = timeData;
          option.value.series.data = resData;
          option.value.yAxis.min = 0;
          showLoading.value = false;
        });
      break;
    case "shuiwei":
      //  station_msg.value = shuiwei[station_id];
      option.value.xAxis.data = [];
      option.value.series.data = [];
      option.value.yAxis.name = "水位";
      option.value.series.name = "水位";
      option.value.yAxis.max = 210;
      option.value.yAxis.min = 180;
      showLoading.value = true;
      if (simuStore.simuData.end.format(
        "YYYYMMDD"
      ) > 20230716) {
        alert("终止时间范围溢出")

      }
      if (simuStore.simuData.start.format(
        "YYYYMMDD"
      ) < 20000000) {
        alert("起始时间范围过小")

      }
      fetch(
        `http://127.0.0.1:9005/api/monitor/%E6%A0%87%E5%87%86%E6%B0%B4%E6%83%85%E8%A1%A8/1/${simuStore.simuData.start.format(
          "YYYYMMDD"
        )}/${simuStore.simuData.end.format("YYYYMMDD")}/14978`
      )
        .then((response) => response.json())
        .then((data) => {
          const { timeData, resData } = handleData(data, "水位", "时间");
          option.value.series.type = "line";
          option.value.xAxis.data = timeData;
          option.value.series.data = resData;
          showLoading.value = false;
        });
      break;
    case "qixiang":
      //  station_msg.value = qixiang[station_id];
      option.value.xAxis.data = [];
      option.value.series.data = [];
      option.value.yAxis.name = "测站电压";
      option.value.series.name = "测站电压";
      showLoading.value = true;
      if (simuStore.simuData.end.format(
        "YYYYMMDD"
      ) > 20170203) {
        alert("终止时间范围溢出")


      }
      if (simuStore.simuData.start.format(
        "YYYYMMDD"
      ) < 20050813) {
        alert("起始时间范围过小")

      }
      fetch(
        `http://127.0.0.1:9005/api/monitor/%E7%94%B5%E5%8E%8B%E6%B8%A9%E5%BA%A6%E8%A1%A8/1/${simuStore.simuData.start.format(
          "YYYYMMDD"
        )}/${simuStore.simuData.end.format("YYYYMMDD")}/14978`
      )
        .then((response) => response.json())
        .then((data) => {
          const { timeData, resData } = handleData(
            data,
            "测站电压",
            "时间"
          );
          option.value.series.type = "line";
          option.value.xAxis.data = timeData;
          option.value.series.data = resData;
          option.value.yAxis.max = 18;
          option.value.yAxis.min = 8;
          showLoading.value = false;
        });
      break;
    default:
      break;
  }
}


const defineTime = () => {
  let start = moment(
    simuStore.simuData.start.toString() || "20000101"
  ).isBefore(moment("2018-12-31"))
    ? moment(simuStore.simuData.start.toString() || "20000101")
    : moment("2018-12-31");
  start = moment(simuStore.simuData.start.toString() || "20000101").isAfter(
    moment("1978.1.1")
  )
    ? start
    : moment("1978.1.1");
  let end = moment(simuStore.simuData.end.toString() || "20221010").isBefore(
    moment("2018-12-31")
  )
    ? moment(simuStore.simuData.end.toString() || "20221010")
    : moment("2018-12-31");
  end = moment(simuStore.simuData.end.toString() || "20221010").isAfter(
    moment("1978.1.1")
  )
    ? end
    : moment("1978.1.1");
  return { start, end };
};
const defineForeTime = () => {
  let start = moment(
    simuStore.simuData.start.toString() || "20230616"
  ).isBefore(moment("2023-06-20"))
    ? moment(simuStore.simuData.start.toString() || "20230616")
    : moment("2023-06-16");
  start = moment(simuStore.simuData.start.toString() || "20230616").isAfter(
    moment("2023.06.16")
  )
    ? start
    : moment("2023.06.16");
  let end = moment(simuStore.simuData.end.toString() || "20230620").isBefore(
    moment("2023-06-20")
  )
    ? moment(simuStore.simuData.end.toString() || "20230620")
    : moment("2023-06-20");
  end = moment(simuStore.simuData.end.toString() || "20230620").isAfter(
    moment("2023.06.16")
  )
    ? end
    : moment("2023.06.16");
  return { start, end };
};
// const handleSel = () => {
//   showLoading.value = true;
//   fetch(
//     `http://43.142.17.108:9001/api/simulate/${simuDataCfg.value.type}/${
//       simuDataCfg.value.frequency
//     }/${moment(simuStore.simuData.start.toString() || "20100203").format(
//       "YYYYMMDD"
//     )}/${moment(simuStore.simuData.end.toString() || "20120304").format(
//       "YYYYMMDD"
//     )}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const { timeData, resData } = handleData(data, "amount", "full_date");
//       option.value.xAxis.data = timeData;
//       option.value.series.data = resData;
//       if (simuDataCfg.value.type === "daily") {
//         option.value.yAxis.name = "径流";
//         option.value.series.name = "径流";
//         option.value.yAxis.max = 730;
//         showLoading.value = false;
//       } else if (simuDataCfg.value.type === "dailysand") {
//         option.value.yAxis.name = "泥沙";
//         option.value.series.name = "泥沙";
//         option.value.yAxis.max = 1.3;
//         showLoading.value = false;
//       } else if (
//         simuDataCfg.value.type === "dailyTN" &&
//         simuDataCfg.value.frequency === "month"
//       ) {
//         option.value.yAxis.max = 0.15;
//         showLoading.value = false;
//       } else if (
//         simuDataCfg.value.type === "dailyTN" &&
//         simuDataCfg.value.frequency === "year"
//       ) {
//         option.value.yAxis.max = 0.05;
//         showLoading.value = false;
//       } else if (simuDataCfg.value.type === "dailyTN") {
//         option.value.yAxis.name = "总氮";
//         option.value.series.name = "总氮";
//         option.value.yAxis.max = 1.7;
//         showLoading.value = false;
//       } else if (
//         simuDataCfg.value.type === "dailyTP" &&
//         simuDataCfg.value.frequency === "month"
//       ) {
//         option.value.yAxis.max = 2;
//         showLoading.value = false;
//       } else if (
//         simuDataCfg.value.type === "dailyTP" &&
//         simuDataCfg.value.frequency === "year"
//       ) {
//         option.value.yAxis.max = 2;
//         showLoading.value = false;
//       } else if (simuDataCfg.value.type === "dailyTP") {
//         option.value.yAxis.name = "总磷";
//         option.value.series.name = "总磷";
//         option.value.yAxis.max = 11.2;
//         showLoading.value = false;
//       }
//     });
// };
//外部toolbox需要调用
let hideInfo;
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  const scene = viewer.scene;
  const handler = new ScreenSpaceEventHandler(scene.canvas);
  // let click_point, c, target_position,
  // let cartesian_2;
  //注册鼠标点击事件
  handler.setInputAction(function (e) {
    const today = moment().format("YYYYMMDD");
    const pickedObject = scene.pick(e.position, 3, 3);
    // 屏幕坐标转世界坐标——关键点
    // const ellipsoid = viewer.scene.globe.ellipsoid;
    // const cartesian = viewer.camera.pickEllipsoid(e.position, ellipsoid);
    // cartesian_2 = cartesian;
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
        selectType.value = station_type
        switch (station_type) {
          case "yuliang":
            station_msg.value = yuliang[station_id];

            option.value.xAxis.data = [];
            option.value.series.data = [];
            option.value.yAxis.name = "雨量";
            option.value.series.name = "雨量";
            option.value.yAxis.max = 220;
            showLoading.value = true;
            fetch(
              `http://127.0.0.1:9005/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/2/20000101/${today}/100000`
            )
              .then((response) => response.json())
              .then((data) => {
                const { timeData, resData } = handleData(data, "雨量", "时间");
                option.value.series.type = "bar";
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                option.value.yAxis.min = 0;
                showLoading.value = false;
              });
            break;
          case "shuiwei":
            station_msg.value = shuiwei[station_id];
            option.value.xAxis.data = [];
            option.value.series.data = [];
            option.value.yAxis.name = "水位";
            option.value.series.name = "水位";
            option.value.yAxis.max = 210;
            option.value.yAxis.min = 180;
            showLoading.value = true;
            fetch(
              `http://127.0.0.1:9005/api/monitor/%E6%A0%87%E5%87%86%E6%B0%B4%E6%83%85%E8%A1%A8/7/20000101/${today}/100000`
            )
              .then((response) => response.json())
              .then((data) => {
                const { timeData, resData } = handleData(data, "水位", "时间");
                option.value.series.type = "line";
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                showLoading.value = false;
              });
            break;
          case "qixiang":
            station_msg.value = qixiang[station_id];
            option.value.xAxis.data = [];
            option.value.series.data = [];
            option.value.yAxis.name = "测站电压";
            option.value.series.name = "测站电压";
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
                option.value.series.type = "line";
                option.value.xAxis.data = timeData;
                option.value.series.data = resData;
                option.value.yAxis.max = 18;
                option.value.yAxis.min = 8;
                showLoading.value = false;
              });
            break;
          default:
            break;
        }
        if (
          pickedObject.id.id.includes("simu") &&
          simuStore.simuData.flag == 1
        ) {
          if (showPosition.value) {
            hideInfo();
          }
          showSimuInfo(e.position);
          showSimuPosition.value = e.position;
          showLoading.value = true;
          const { start, end } = defineTime();
          fetch(
            `http://43.142.17.108:9001/api/monitor/水库降雨流量/输出入库流量/${start.format(
              "YYYYMMDD"
            )}/${end.format("YYYYMMDD")}/14978`
          )
            .then((response) => response.json())
            .then((data) => {
              const { timeData, resData } = handleData(
                data,
                "输出入库流量",
                "时间"
              );
              option.value.yAxis.name = "入库流量m³/s";
              option.value.series.name = "入库流量";
              option.value.series.type = "line";
              option.value.yAxis.max = Math.max(...resData);
              option.value.yAxis.min = Math.min(...resData);
              option.value.xAxis.data = timeData;
              option.value.series.data = resData;
              showLoading.value = false;
            });
        } else if (
          pickedObject.id.id.includes("simu") &&
          simuStore.simuData.flag == 2
        ) {
          if (showPosition.value || showForePosition.value) {
            hideInfo();
          }
          showForeInfo(e.position);
          showForePosition.value = e.position;
          const { start, end } = defineForeTime();
          showLoading.value = true;
          const resData = fore_all_data.filter((v) => {
            return (
              parseInt(v["日"]) >=
              parseInt(start.format("YYYYMMDD").slice(-2)) ||
              parseInt(v["日"]) <= parseInt(end.format("YYYYMMDD").slice(-2))
            );
          });
          const timeData = resData.map((v) => {
            return v["年"] + "." + v["月"] + "." + v["日"] + ":" + v["时"];
          });
          const data = resData.map((v) => {
            return v["流量(m³/s)"];
          });
          option.value.yAxis.name = "流量m³/s";
          option.value.series.name = "流量";
          option.value.series.type = "line";
          option.value.yAxis.max = Math.max(...data);
          option.value.yAxis.min = Math.min(...data);
          option.value.xAxis.data = timeData;
          option.value.series.data = data;
          showLoading.value = false;
        } else {
          if (showSimuPosition.value || showForePosition.value) {
            hideInfo();
          }
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
  // viewer.scene.postRender.addEventListener(() => {
  //   if (showPosition.value) {
  //     const position = SceneTransforms.wgs84ToWindowCoordinates(
  //       viewer.scene,
  //       cartesian_2
  //     );
  //     showInfo(position);
  //   }
  //   if (showSimuPosition.value) {
  //     const position = SceneTransforms.wgs84ToWindowCoordinates(
  //       viewer.scene,
  //       cartesian_2
  //     );
  //     showSimuInfo(position);
  //   }
  // });
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
  hideInfo = () => {
    info.style.display = "none";
    simuInfo.style.display = "none";
    foreInfo.style.display = "none";
    showPosition.value = false;
    showSimuPosition.value = false;
    showForeInfo.value = false;
    // console.log(window.innerWidth);
    // simuInfo.style.left = `-${window.innerWidth / 2}px`;
  };
  const today = moment().format("YYYYMMDD");
  fetch(
    `http://127.0.0.1:9005/api/monitor/%E6%A0%87%E5%87%86%E9%9B%A8%E6%83%85%E8%A1%A8/1/20000101/${today}/100000`
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
const handleSimuTab = (type) => {
  console.log("out init");
  const paramsMap = {
    flow: "输出入库流量",
    silt: "输出泥沙",
    water: "入库水量",
  };
  const nameMap = {
    flow: "入库流量",
    silt: "泥沙",
    water: "入库水量",
  };
  const unitMap = {
    flow: "m³/s",
    silt: "t",
    water: "t",
  };
  return () => {
    console.log("init");
    showSimuConfig.value.flow = false;
    showSimuConfig.value.silt = false;
    showSimuConfig.value.water = false;
    showSimuConfig.value[type] = true;
    showLoading.value = true;
    const { start, end } = defineTime();
    fetch(
      `http://43.142.17.108:9001/api/monitor/水库降雨流量/${paramsMap[type]
      }/${start.format("YYYYMMDD")}/${end.format("YYYYMMDD")}/14978`
    )
      .then((response) => response.json())
      .then((data) => {
        const { timeData, resData } = handleData(data, paramsMap[type], "时间");
        if (type === "water") {
          option.value.grid.left = "16%";
        } else {
          option.value.grid.left = "12%";
        }
        option.value.series.type = "line";
        option.value.yAxis.name = nameMap[type] + unitMap[type];
        option.value.series.name = nameMap[type];
        option.value.yAxis.max = Math.max(...resData);
        option.value.yAxis.min = Math.min(...resData);
        option.value.xAxis.data = timeData;
        option.value.series.data = resData;
        showLoading.value = false;
      });
  };
};
</script>
<template>
  <div id="info">
    <div class="tab" v-drag>
      <div v-on:click="showMsg" :class="showConfig.msg ? 'tab-item active' : 'tab-item'">
        站点信息
      </div>
      <div v-on:click="showChart" :class="showConfig.chart ? 'tab-item active' : 'tab-item'">
        监测曲线
      </div>
    </div>
    <div class="content">
      <div v-if="showLoading && showConfig.chart" class="loading">
        <a-spin size="large" />
      </div>
      <div class="msg content-item" v-if="showConfig.msg">
        <a-descriptions bordered :column="{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }" size="small">
          <a-descriptions-item v-for="(value, key) in station_msg" :label="key" :key="key">{{ value
          }}</a-descriptions-item>
        </a-descriptions>
      </div>
      <a-form-item label="起始时间" style="width: 237px" v-if="showConfig.chart" id="time1">
        <a-date-picker v-model:value="simuStore.simuData.start" />
      </a-form-item>
      <a-button type="primary" class="jiansuo" value="small" v-if="showConfig.chart" @click="selectTime">检索</a-button>
      <a-form-item label="终止时间" style="width: 237px" v-if="showConfig.chart" id="time2">
        <a-date-picker v-model:value="simuStore.simuData.end" />
      </a-form-item>

      <v-chart class="chart content-item" v-if="showConfig.chart" :option="option" @datazoom="handleZoom"></v-chart>
    </div>
  </div>
  <div id="simu-info">
    <div class="tab" v-drag>
      <div @click="handleSimuTab('flow')()" :class="showSimuConfig.flow ? 'simu-tab-item active' : 'simu-tab-item'">
        入库流量
      </div>
      <div @click="handleSimuTab('water')()" :class="showSimuConfig.water ? 'simu-tab-item active' : 'simu-tab-item'">
        入库水量
      </div>
      <div @click="handleSimuTab('silt')()" :class="showSimuConfig.silt ? 'simu-tab-item active' : 'simu-tab-item'">
        泥沙
      </div>
    </div>
    <div class="content">
      <div v-if="showLoading" class="loading">
        <a-spin size="large" />
      </div>
      <v-chart class="content-item" :option="option" @datazoom="handleZoom"></v-chart>
      <!--     -->
    </div>
  </div>
  <div id="fore-info">
    <div class="fore-tab" v-drag style="text-align: center">入库流量</div>
    <div class="content">
      <v-chart class="content-item" :option="option"></v-chart>
    </div>
  </div>
  <!-- <div id="simu-info">
          <div class="select-wrap" v-drag>
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
          <div class="content">
            <div v-if="showLoading" class="loading">
              <a-spin size="large" />
            </div>
            <v-chart
              class="content-item"
              :option="option"
              @datazoom="handleZoom"
            ></v-chart>
          </div>
        </div> -->
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
  display: none;
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
}

#simu-info {
  position: absolute;
  width: 500px;
  height: 400px;
  z-index: 1000;
  display: none;
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
}

#fore-info {
  position: absolute;
  width: 500px;
  height: 400px;
  z-index: 1000;
  display: none;
  background: rgba(255, 255, 255, 0.8);
  /* border: 2px solid greenyellow; */
  border-radius: 4px;
}

.jiansuo {
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
