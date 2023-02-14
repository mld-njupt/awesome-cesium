<script setup>
import { ref, onBeforeMount } from "vue";
const props = defineProps(["height"]);
const displayType = ref("block");
onBeforeMount(() => {
  if (props.height == 0) {
    displayType.value = "none";
  } else {
    displayType.value = "block";
  }
});
</script>
<template>
  <div class="lui-column-bg" style="top: -90px">
    <div class="lui-inner" :style="`height:${props.height}%`"></div>
  </div>
</template>
<style scoped>
.lui-column-bg {
  position: relative;
  width: 50px;
  height: 90px;
  margin: 100px auto;
  background-color: transparent;
  background-color: rgba(0, 199, 159, 0.2);
}
.lui-column-bg:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 100%;
  display: block;
  border-radius: 50%;
  top: -10.5px;
  z-index: 1;
  background-color: rgb(101 221 197);
}

.lui-column-bg:after {
  position: absolute;
  content: "";
  display: block;
  height: 15px;
  width: 100%;
  border-radius: 50%;
  bottom: -10px;
  background-color: rgb(0, 255, 204);
}

.lui-inner {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background-image: linear-gradient(to top, rgb(0, 255, 204), rgb(0, 199, 159));
  text-align: center;
}
.lui-inner::before {
  position: absolute;
  content: "";
  display: v-bind(displayType);
  height: 20px;
  width: 100%;
  background-color: rgb(0, 199, 159);
  border-radius: 50%;
  top: -10.5px;
  z-index: 1;
}
.lui-inner:after {
  position: absolute;
  content: "";
  display: block;
  height: 15px;
  width: 100%;
  border-radius: 50%;
  background-color: white;
  bottom: -10px;
}
</style>
