<script setup>
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons-vue";
import { ref, reactive } from "vue";
const emit = defineEmits(["onChange"]);
const selVal = ref("2022");
const positions = [
  2, 39.27, 77.27, 114.27, 152.27, 188.27, 225.27, 263.27, 300.27, 338.27,
  374.27, 412.27,
];
const thumbPosition = reactive({ left: "2px", index: 0, multiple: 0 });
const years = [
  2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032,
];
const isDown = ref(false);
const handleDown = (e) => {
  if (e.button == 0) isDown.value = true;
};
const handleUp = (e) => {
  if (e.button == 0) isDown.value = false;
};
const debounce = (fn, delay) => {
  let debounceTimer;
  return (...args) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }
    debounceTimer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};
//拖拽暂时不做了
const handleMove = debounce((e) => {
  console.log(e.movementX);
  if (isDown.value && e.movementX > 0 && thumbPosition.index != 11) {
    thumbPosition.index++;
    thumbPosition.left = `${positions[thumbPosition.index]}px`;
    emit("onChange", thumbPosition.index);
  } else if (isDown.value && e.movementX < 0 && thumbPosition.index != 0) {
    thumbPosition.index--;
    thumbPosition.left = `${positions[thumbPosition.index]}px`;
    emit("onChange", thumbPosition.index);
  }
}, 800);
const handleClick = (index) => {
  thumbPosition.left = `${positions[index]}px`;
  emit("onChange", thumbPosition.multiple * 12 + index);
};
const handleLR = (type) => {
  if (type == "left" && thumbPosition.index > 0) {
    thumbPosition.index--;
    thumbPosition.left = `${positions[thumbPosition.index]}px`;
    emit("onChange", thumbPosition.multiple * 12 + thumbPosition.index);
  } else if (type == "right" && thumbPosition.index < 11) {
    thumbPosition.index++;
    thumbPosition.left = `${positions[thumbPosition.index]}px`;
    emit("onChange", thumbPosition.multiple * 12 + thumbPosition.index);
  }
};
const handleSel = (v) => {
  thumbPosition.left = "2px";
  thumbPosition.index = 0;
  thumbPosition.multiple = v;
  emit("onChange", parseInt(v) * 12);
};
</script>
<template>
  <div class="time-wrap">
    <!-- <div class="go">
      <play-square-outlined  />
    </div> -->
    <div class="sel-year">
      <a-select
        ref="select"
        v-model:value="selVal"
        style="width: 120px"
        @focus="focus"
        @change="handleSel"
      >
        <a-select-option
          v-for="(year, index) in years"
          :key="index"
          :value="index"
          @change="handleSel"
          >{{ year }}</a-select-option
        >
      </a-select>
    </div>
    <div class="content">
      <div class="line">
        <div
          @mousedown="handleDown"
          @mouseup="handleUp"
          class="thumb"
          :style="thumbPosition"
        ></div>
      </div>
      <div class="scale-wrap">
        <div class="scale-item" @click="handleClick(0)">
          <div class="scale"></div>
          <div class="scale-label">1月</div>
        </div>
        <div class="scale-item" @click="handleClick(1)">
          <div class="scale"></div>
          <div class="scale-label">2月</div>
        </div>
        <div class="scale-item" @click="handleClick(2)">
          <div class="scale"></div>
          <div class="scale-label">3月</div>
        </div>
        <div class="scale-item" @click="handleClick(3)">
          <div class="scale"></div>
          <div class="scale-label">4月</div>
        </div>
        <div class="scale-item" @click="handleClick(4)">
          <div class="scale"></div>
          <div class="scale-label">5月</div>
        </div>
        <div class="scale-item" @click="handleClick(5)">
          <div class="scale"></div>
          <div class="scale-label">6月</div>
        </div>
        <div class="scale-item" @click="handleClick(6)">
          <div class="scale"></div>
          <div class="scale-label">7月</div>
        </div>
        <div class="scale-item" @click="handleClick(7)">
          <div class="scale"></div>
          <div class="scale-label">8月</div>
        </div>
        <div class="scale-item" @click="handleClick(8)">
          <div class="scale"></div>
          <div class="scale-label">9月</div>
        </div>
        <div class="scale-item" @click="handleClick(9)">
          <div class="scale"></div>
          <div class="scale-label">10月</div>
        </div>
        <div class="scale-item" @click="handleClick(10)">
          <div class="scale"></div>
          <div class="scale-label">11月</div>
        </div>
        <div class="scale-item" @click="handleClick(11)">
          <div class="scale"></div>
          <div class="scale-label">12月</div>
        </div>
      </div>
    </div>
    <div class="indicator" @click="handleLR('left')">
      <caret-left-outlined />
    </div>
    <div class="indicator" @click="handleLR('right')">
      <caret-right-outlined />
    </div>
  </div>
</template>
<style scoped>
.time-wrap {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
}
.go {
  width: 64px;
  height: 68px;
  font-size: 28px;
  background-color: #fff;
  color: #6e6e6e;
  padding: 0;
  margin: 0;
  overflow: hidden;
  cursor: pointer;
  text-align: center;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.sel-year {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  height: 68px;
  background-color: #fff;
}
.content {
  display: flex;
  flex-direction: column;
  width: 510px;
  height: 68px;
  background-color: #f3f3f3;
  padding: 0 40px 0 40px;
}
.line {
  background-color: rgba(110, 110, 110, 0.4);
  width: 100%;
  height: 4px;
  margin-top: 15px;
  position: relative;
}
.thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  background-color: #fff;
  border: 2px solid #0079c1;
  border-radius: 16px;
  height: 16px;
  position: absolute;
  touch-action: none;
  width: 16px;
  transition: all 125ms ease-in-out;
  z-index: 1;
  cursor: pointer;
}
.scale-wrap {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.scale-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}
.scale {
  margin-top: 20px;
  width: 1px;
  height: 8px;
  background: rgba(110, 110, 110, 0.4);
}
.scale-label {
  font-size: 12px;
  white-space: nowrap;
  width: 20px;
  text-align: center;
  user-select: none;
}
.indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 68px;
  width: 64px;
  height: 68px;
  font-size: 28px;
  background-color: #fff;
  color: #6e6e6e;
  cursor: pointer;
}
</style>
