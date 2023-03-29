<script setup>
import { ref, onBeforeMount } from "vue";
const props = defineProps(["height"]);
const displayType = ref("block");
const shuiweigaodu = ref(194.86);
const shezhideshuiwei = ref(0);
const jinggaovisible = ref(false);
const visible = ref(false);

const showModal = () => {
  visible.value = true;
};
const handleOk = (e) => {
  const dom = document.getElementsByClassName("mi")[0];
  if (shuiweigaodu.value >= shezhideshuiwei.value) {
    jinggaovisible.value = true;
    dom.style.color = "red";
  } else {
    dom.style.color = "blue";
  }
  visible.value = false;
};
const handleOk1 = (e) => {
  jinggaovisible.value = false;
};
</script>
<template>
  <div class="shuiwei">
    <span>丰乐站实时水位:</span>
    <span class="mi" id="mi">{{ shuiweigaodu + "米" }}</span>
    <a-button type="text" class="shezhi" size="small" @click="showModal">设置</a-button>
  </div>
  <div class="shezhikuang">
    <a-modal v-model:visible="visible" title="设置" @ok="handleOk" style="top: 300px">
      <div class="wrap">
        <span>警戒水位设置：</span>
        <!--    <input type="text" v-model="shezhideshuiwei"  class="shuru" style="border:0px;">  -->
        <a-input class="shuru" size="small" v-model:value="shezhideshuiwei" style="border: 0px" placeholder="水位" />
        <span class="mi2">米</span>
      </div>
    </a-modal>
    <a-modal v-model:visible="jinggaovisible" title="警告！" style="top: 200px" @ok="handleOk1">
      <div class="jinggao"></div>
    </a-modal>
  </div>
</template>
<style scoped>
.jinggao {
  width: 400px;
  height: 154px;
  background-image: url("../assets/警告.png");
  background-size: cover;
  background-repeat: no-repeat;
  margin-left: 40px;
}

.ant-input {
  margin-right: 100px;
  width: 60px;
}

.wrap {
  text-align: center;
  position: relative;
  left: -10px;
}

.mi {
  position: relative;
  left: 10px;
  color: blue;
}

.mi2 {
  position: relative;
  left: 42px;
}

.shuru {
  color: red;
  margin-right: -40px;
}

.shuru:focus {
  outline: none;
}

.shezhi {
  position: relative;
  top: 3px;
  left: 11px;
}

.shuiwei {
  line-height: 30px;
  text-align: center;
  display: flex;
  justify-content: space-around;
  position: absolute;
  width: 254px;
  height: 30px;
  z-index: 1000;
  top: 50px;
  right: 10px;
  opacity: 1;
  /*  border-radius: 3px; */
  /*   background: rgba(255, 255, 255, 0.8); */
  background: white;
}

.shezhikuang {
  margin-top: 300px;
  position: absolute;
  z-index: 1000;
  top: 100px;
  width: 100px;
  height: 100px;
  right: 500px;
}
</style>
