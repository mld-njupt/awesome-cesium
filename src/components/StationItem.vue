<script setup>
import { reactive, watch } from "vue";

const dynamicValidateForm = reactive({
  sights: [],
});
watch(() => {
  dynamicValidateForm.sights = [];
});
const checked = reactive({
  //雨量
  checked1: false,
  //水位
  checked2: false,
  //气象
  checked3: false,
  //插值
  checked4: false,
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
            <a-switch v-model:checked="checked.checked1" size="small" />
          </div>
        </div>
        <div class="item">
          <div class="sign" :class="{ active: checked.checked2 }"></div>
          <div class="name">水位站</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked2" size="small" />
          </div>
        </div>
        <div class="item">
          <div class="sign" :class="{ active: checked.checked3 }"></div>
          <div class="name">气象站</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked3" size="small" />
          </div>
        </div>
      </div>
      <div class="sub right">
        <div class="item">
          <!-- <div class="sign" :class="{active: checked.checked3}"></div> -->
          <div class="name">雨量插值</div>
          <div class="switch">
            <a-switch v-model:checked="checked.checked4" size="small" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.reservoir-info-content {
  position: fixed;
  top: 100px;
  right: 20px;
  width: 254px;
  /* height: 114px; */
  opacity: 1;
  border-radius: 3px;
  background: rgba(204, 204, 204, 0.8);
  /* background-color: rgba(0, 0, 0, .5); */
}
.reservoir-info-header {
  width: 100%;
  height: 22px;
  opacity: 1;
  background: rgba(204, 204, 204, 1);
  border: 1px solid rgba(0, 0, 0, 1);
  display: flex;
}
.reservoir-info-header-item {
  width: 50%;
  text-align: center;
}
.reservoir-info-header-item:last-child {
  border-left: 1px solid rgba(0, 0, 0, 1);
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
  width: 100%;
  height: 24px;
  opacity: 1;
  border-radius: 3px;
  background: rgba(204, 204, 204, 1);
  display: flex;
  justify-content: space-between;
  font-size: 10px;
  margin-bottom: 8px;
  border-radius: 3px;
  padding: 0 4px;
  /* align-items: center; */
}
.item .sign {
  width: 10px;
  height: 10px;
  margin-top: 6px;
  border-radius: 50%;
  background-color: transparent;
}
.item .sign.active {
  background-color: rgba(255, 141, 26, 1);
}
.item .name {
  line-height: 22px;
}
</style>
