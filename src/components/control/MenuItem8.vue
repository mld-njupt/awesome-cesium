<script setup>
import { ref } from "vue";
import { notification } from "ant-design-vue";
import { useSimuStore } from "../../stores/simulation";
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
const formRef = ref();
// const formRes = reactive({
//   start: "",
//   end: "",
//   rainfall: "",
//   evaporation: "",
//   temperature: "",
// });
const simuStore = useSimuStore();
const onFinish = (values) => {
  notification["success"]({
    message: "计算成功",
  });
  console.log("Received values of form:", values);
  console.log("simuStore.simuData:", simuStore.simuData);
};
const onClose = () => {
  emit("close");
};
</script>
<template>
  <a-drawer
    title="调度"
    :width="350"
    :visible="props.visible"
    :body-style="{ paddingBottom: '80px' }"
    :footer-style="{ textAlign: 'right' }"
    @close="onClose"
  >
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      :model="simuStore.simuData"
      @finish="onFinish"
    >
      <a-space direction="vertical" :size="12">
        <a-form-item label="起始时间">
          <a-date-picker v-model:value="simuStore.simuData.start" />
        </a-form-item>
        <a-form-item label="终止时间">
          <a-date-picker v-model:value="simuStore.simuData.end" />
        </a-form-item>
        <a-form-item label="降雨量设置">
          <a-input
            v-model:value="simuStore.simuData.rainfall"
            :disabled="!!simuStore.simuData.start && !!simuStore.simuData.end"
          />
        </a-form-item>
        <a-form-item label="蒸发量设置">
          <a-input
            v-model:value="simuStore.simuData.evaporation"
            :disabled="!!simuStore.simuData.start && !!simuStore.simuData.end"
          />
        </a-form-item>
        <a-form-item label="气温设置">
          <a-input
            v-model:value="simuStore.simuData.temperature"
            :disabled="!!simuStore.simuData.start && !!simuStore.simuData.end"
          />
        </a-form-item>
      </a-space>
      <div class="button-wrap">
        <a-form-item>
          <a-button type="primary">保存结果</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">进行计算</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onClose">查看结果</a-button>
        </a-form-item>
      </div>
    </a-form>
    <!-- <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onClose">确认</a-button>
      </a-space>
    </template> -->
  </a-drawer>
</template>
<style scoped>
.button-wrap {
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
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
