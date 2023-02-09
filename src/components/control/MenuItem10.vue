<script setup>
import { ref } from "vue";
import { notification } from "ant-design-vue";
import { ShareAltOutlined } from "@ant-design/icons-vue";
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
const formRef = ref();
const defaultPercent = ref(0);
const showProgress = ref(false);
const onClose = () => {
  emit("close");
};
const onFinish = () => {
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
      clearInterval(timer);
    }
  }, [3100]);
};
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
    <a-form
      ref="formRef"
      name="dynamic_form_nest_item"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-space direction="vertical" :size="12">
        <div style="display: flex">
          <a-form-item label="起始时间" style="width: 300px">
            <a-date-picker />
          </a-form-item>
          <a-form-item label="终止时间" style="width: 300px">
            <a-date-picker />
          </a-form-item>

          <a-button type="primary" style="margin-left: -20px">
            <share-alt-outlined />
            链接数据
          </a-button>
        </div>
        <div style="display: flex">
          <a-form-item label="降雨量设置" style="width: 300px">
            <a-input style="width: 200px" suffix="mm/d" />
          </a-form-item>

          <a-button type="primary" style="margin-left: 20px">
            <share-alt-outlined />
            链接数据
          </a-button>
        </div>
        <div style="display: flex">
          <a-form-item label="初始库水位" style="width: 300px">
            <a-input style="width: 200px" suffix="m" />
          </a-form-item>
          <a-button type="primary" style="margin-left: 20px">
            <share-alt-outlined />
            链接数据
          </a-button>
        </div>
      </a-space>
      <a-progress v-if="showProgress" :percent="defaultPercent" />
      <div class="button-wrap">
        <a-form-item>
          <a-button
            type="primary"
            @click="
              () => {
                notification['success']({
                  message: '保存成功',
                });
              }
            "
            >保存结果</a-button
          >
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onFinish">进行计算</a-button>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onClose">查看结果</a-button>
        </a-form-item>
      </div>
    </a-form>
  </a-drawer>
</template>
