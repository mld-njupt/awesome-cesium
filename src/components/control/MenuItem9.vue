<script setup>
import { onMounted, ref } from "vue";
import { notification } from "ant-design-vue";
import { useSimuStore } from "../../stores/simulation";
import { useViewStore } from "../../stores/earth";
import { Cartesian3 } from "cesium";
import { UploadOutlined } from "@ant-design/icons-vue";
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

onMounted(() => {
  simuStore.simuData.start = "";
  simuStore.simuData.end = "";
});

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
  simuStore.simuData.showSimu = true;
  simuStore.simuData.flag = 1;
  emit("close");
  const viewer = viewerStore.cesiumViewer;
  viewer.camera.flyTo({
    //经度、纬度、高度
    destination: Cartesian3.fromDegrees(
      118.24563658584941,
      29.899203558525926,
      5000
    ),
  });
};
</script>
<template>
  <a-drawer
    title="模拟"
    :width="550"
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
            <a-form-item label="方案名称" style="width: 300px">
              <a-input style="width: 200px" />
            </a-form-item>
          </div>
          <div>
            <a-form-item label="起始时间" style="width: 300px">
              <a-date-picker v-model:value="simuStore.simuData.start" />
            </a-form-item>
          </div>
          <div>
            <a-form-item label="终止时间" style="width: 300px">
              <a-date-picker v-model:value="simuStore.simuData.end" />
            </a-form-item>
          </div>
          <div style="display: flex">
            <a-form-item label="降雨量设置" style="width: 300px">
              <a-input
                style="width: 200px"
                v-model:value="simuStore.simuData.rainfall"
                :disabled="
                  !!simuStore.simuData.start && !!simuStore.simuData.end
                "
                suffix="mm/d"
              />
            </a-form-item>
            <a-upload name="file">
              <a-button type="primary" style="margin-left: 20px" ghost>
                <upload-outlined></upload-outlined>
                读取数据
              </a-button>
            </a-upload>
          </div>
          <div style="display: flex">
            <a-form-item label="蒸发量设置" style="width: 300px">
              <a-input
                style="width: 200px"
                v-model:value="simuStore.simuData.evaporation"
                :disabled="
                  !!simuStore.simuData.start && !!simuStore.simuData.end
                "
                suffix="mm/d"
              />
            </a-form-item>
            <a-upload name="file">
              <a-button type="primary" style="margin-left: 20px" ghost>
                <upload-outlined></upload-outlined>
                读取数据
              </a-button>
            </a-upload>
          </div>
          <div style="display: flex">
            <a-form-item label="气温设置" style="width: 300px">
              <a-input
                style="width: 200px"
                v-model:value="simuStore.simuData.temperature"
                :disabled="
                  !!simuStore.simuData.start && !!simuStore.simuData.end
                "
                suffix="℃"
              />
            </a-form-item>
            <a-upload name="file">
              <a-button type="primary" style="margin-left: 20px" ghost>
                <upload-outlined></upload-outlined>
                读取数据
              </a-button>
            </a-upload>
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
<style>
.drawer-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.ant-form-item-label {
  text-align: initial !important;
}
.button-wrap {
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  margin-top: 30px;
}
.ant-upload-list-item-info {
  display: none !important;
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
