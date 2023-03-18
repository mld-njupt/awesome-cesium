<script setup>
import { ref, onMounted } from "vue";
import { useViewStore } from "../stores/earth";
import {
  ScreenSpaceEventHandler,
  defined,
  ScreenSpaceEventType,
  Color,
} from "cesium";
import PointItem from "./station/PointItem.vue";
import TriangleItem from "./station/TriangleItem.vue";
import WetherIem from "./station/WetherIem.vue";
import { useSimuStore } from "../stores/simulation";
import { useClickStore } from "../stores/click";
import InterItem from "./station/InterItem.vue";
const simuStore = useSimuStore();
const clickStore = useClickStore();
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
const moveStack = ref([]);
// const clickStack = ref([]);
const viewerStore = useViewStore();
//站点三角形标志
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.moveTo(100, 0);
ctx.lineTo(50, 140);
ctx.lineTo(0, 0);
ctx.fillStyle = "#ffa500";
ctx.fill();
let image = new Image();
image.src = canvas.toDataURL("image/jpg");
onMounted(() => {
  const viewer = viewerStore.cesiumViewer;
  const scene = viewer.scene;
  const clickStack = clickStore.clickStack;
  const handler = new ScreenSpaceEventHandler(scene.canvas);
  handler.setInputAction(function (movement) {
    if (clickStack.length > 0) return;
    // console.log(clickStack.value.length);
    let pickedObject = viewer.scene.pick(movement.endPosition);
    let pickEntity;
    if (defined(pickedObject) && pickedObject.id !== "") {
      const station_type = pickedObject.id.id.split("/")[0];
      if (moveStack.value.length != 0) return;
      switch (station_type) {
        case "yuliang":
          // pickEntity = viewer.entities.getById(pickedObject.id.id);
          pickedObject.id._point._pixelSize._value = 21;
          pickedObject.id._label._fillColor._value =
            Color.fromCssColorString("#0093ef");
          viewer._container.style.cursor = "pointer";
          viewer.scene.requestRender();
          moveStack.value.push({
            entity: pickedObject.id,
            id: pickedObject.id.id,
            prev: 17,
            cur: 21,
          });
          break;
        case "shuiwei":
          pickEntity = viewer.entities.getById(pickedObject.id.id);
          pickEntity._billboard._scale._value = 1.5;
          pickedObject.id._label._fillColor._value =
            Color.fromCssColorString("#0093ef");
          viewer._container.style.cursor = "pointer";
          viewer.scene.requestRender();
          moveStack.value.push({
            entity: pickedObject.id,
            id: pickedObject.id.id,
            prev: 1,
            cur: 1.5,
          });
          break;
        case "qixiang":
          pickEntity = viewer.entities.getById(pickedObject.id.id);
          pickEntity._billboard._scale._value = 1.5;
          pickedObject.id._label._fillColor._value =
            Color.fromCssColorString("#0093ef");
          viewer._container.style.cursor = "pointer";
          viewer.scene.requestRender();
          moveStack.value.push({
            entity: pickedObject.id,
            id: pickedObject.id.id,
            prev: 1,
            cur: 1.5,
          });
          break;
        default:
          break;
      }
    } else {
      if (moveStack.value.length == 0) return;
      const prevEntityMsg = moveStack.value.pop();
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
    }
  }, ScreenSpaceEventType.MOUSE_MOVE);
  handler.setInputAction(function (e) {
    let pickedObject = viewer.scene.pick(e.position, 3, 3);
    let pickEntity;
    if (defined(pickedObject) && pickedObject.id !== "") {
      const station_type = pickedObject.id.id.split("/")[0];
      if (clickStack.length > 0) {
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
            viewer._container.style.cursor = "default";
            viewer.scene.requestRender();
          }
        }
      }
      switch (station_type) {
        case "yuliang":
          pickedObject.id._point._pixelSize._value = 21;
          pickedObject.id._label._fillColor._value =
            Color.fromCssColorString("#0093ef");
          viewer._container.style.cursor = "pointer";
          viewer.scene.requestRender();
          clickStack.push({
            entity: pickedObject.id,
            id: pickedObject.id.id,
            prev: 17,
            cur: 21,
          });
          break;
        case "shuiwei":
          pickEntity = viewer.entities.getById(pickedObject.id.id);
          pickEntity._billboard._scale._value = 1.5;
          pickedObject.id._label._fillColor._value =
            Color.fromCssColorString("#0093ef");
          viewer._container.style.cursor = "pointer";
          viewer.scene.requestRender();
          clickStack.push({
            entity: pickedObject.id,
            id: pickedObject.id.id,
            prev: 1,
            cur: 1.5,
          });
          break;
        case "qixiang":
          pickEntity = viewer.entities.getById(pickedObject.id.id);
          pickEntity._billboard._scale._value = 1.5;
          pickedObject.id._label._fillColor._value =
            Color.fromCssColorString("#0093ef");
          viewer._container.style.cursor = "pointer";
          viewer.scene.requestRender();
          clickStack.push({
            entity: pickedObject.id,
            id: pickedObject.id.id,
            prev: 1,
            cur: 1.5,
          });
          break;
        default:
          break;
      }
    } else {
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
    }
  }, ScreenSpaceEventType.LEFT_CLICK);
  handler.setInputAction(function (e) {
    const pickedObject = scene.pick(e.position, 3, 3);
    if (!defined(pickedObject)) {
      //处理掉模拟结果
      simuStore.simuData.showSimu = false;
      simuStore.simuData.isSave = false;
      simuStore.simuData.end = "";
      simuStore.simuData.start = "";
    }
  }, ScreenSpaceEventType.RIGHT_CLICK);
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
          <div class="none-active" v-if="!checked.checked2"></div>
          <div class="active1" v-if="checked.checked2"></div>
          <div class="name">水位站</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked2" size="small" />
          </div>
        </div>
        <div class="item">
          <div class="none-active" v-if="!checked.checked3"></div>
          <div class="active2" v-if="checked.checked3"></div>
          <div class="name">气象站</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked3" size="small" />
          </div>
        </div>
      </div>
      <div class="sub right">
        <div class="item">
          <div class="name">雨量插值</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked4" size="small" />
          </div>
        </div>
      </div>
    </div>
    <PointItem
      v-if="checked.checked1"
      :id="'yuliang/0'"
      :name="'岗村'"
      :position="[118.1259, 30.0262]"
    />
    <PointItem
      v-if="checked.checked1"
      :id="'yuliang/1'"
      :name="'芳村'"
      :position="[118.1619, 30.0604]"
    />
    <PointItem
      v-if="checked.checked1"
      :id="'yuliang/2'"
      :name="'洽舍'"
      :position="[118.2, 29.9333]"
    />
    <PointItem
      v-if="checked.checked1"
      :id="'yuliang/3'"
      :name="'富溪'"
      :position="[118.2144, 30.0017]"
    />
    <PointItem
      v-if="checked.checked1"
      :id="'yuliang/4'"
      :name="'蒸发站'"
      :position="[118.2567, 29.89155]"
    />
    <PointItem
      v-if="checked.checked1"
      :id="'yuliang/5'"
      :name="'丰乐'"
      :position="[118.24636, 29.899213]"
    />
    <PointItem
      v-if="checked.checked1"
      :id="'yuliang/6'"
      :name="'尾水'"
      :position="[118.247711, 29.896816]"
    />
    <TriangleItem
      v-if="checked.checked2"
      :id="'shuiwei/0'"
      :name="'尾水'"
      :position="[118.247711, 29.896816]"
    />
    <TriangleItem
      v-if="checked.checked2"
      :id="'shuiwei/1'"
      :name="'丰乐'"
      :position="[118.24636, 29.899213]"
    />
    <WetherIem
      v-if="checked.checked3"
      :id="'qixiang/0'"
      :name="'富溪'"
      :position="[118.2144, 30.0017]"
    />
    <InterItem v-if="checked.checked4" />
    <!-- <MessageItem /> -->
  </div>
</template>
<style scoped>
.reservoir-info-content {
  position: fixed;
  top: 100px;
  right: 10px;
  width: 254px;
  /* height: 114px; */
  opacity: 1;
  border-radius: 3px;
  background: rgba(255, 255, 255, 0.8);
  /* background-color: rgba(0, 0, 0, .5); */
  z-index: 999;
}
.reservoir-info-header {
  width: 100%;
  height: 22px;
  opacity: 1;
  background: rgb(255, 255, 255);
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
  display: flex;
  align-items: center;
  width: 100%;
  height: 24px;
  opacity: 1;
  border-radius: 3px;
  background: rgb(255, 255, 255);
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  margin-bottom: 8px;
  border-radius: 3px;
  padding: 0 4px;
  /* align-items: center; */
}
.item .sign {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: transparent;
}
.item .sign.active {
  background-color: rgba(255, 141, 26, 1);
}
/* .active1 {
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-size: cover;
} */
.none-active {
  width: 16px;
  height: 16px;
}
.active1 {
  width: 16px;
  height: 20px;
  background-image: url("../assets/tri.png");
  background-repeat: no-repeat;
  background-size: contain;
  /* margin-top: 6px; */
}
.active2 {
  width: 16px;
  height: 20px;
  background-image: url("../assets/zhan1.png");
  background-repeat: no-repeat;
  background-size: contain;
  /* margin-top: 6px; */
}
.item .name {
  line-height: 22px;
}
</style>
