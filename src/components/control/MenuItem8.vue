<script setup>
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { reactive, ref, watch } from "vue";

const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
const formRef = ref();
const dynamicValidateForm = reactive({
  sights: [],
});
watch(() => {
  dynamicValidateForm.sights = [];
});

const removeSight = (item) => {
  let index = dynamicValidateForm.sights.indexOf(item);

  if (index !== -1) {
    dynamicValidateForm.sights.splice(index, 1);
  }
};

const addSight = () => {
  dynamicValidateForm.sights.push({
    value: undefined,
    rain: undefined,
    id: Date.now(),
  });
};

const onFinish = (values) => {
  console.log("Received values of form:", values);
  console.log("dynamicValidateForm:", dynamicValidateForm);
};
const onClose = () => {
  emit("close");
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
      :model="dynamicValidateForm"
      @finish="onFinish"
    >
      <a-space
        v-for="(sight, index) in dynamicValidateForm.sights"
        :key="sight.id"
        style="display: flex; margin-bottom: 8px"
        align="baseline"
      >
        <a-form-item
          :name="['sights', index, 'value']"
          label="时间"
          :rules="{
            required: true,
            message: '请输入时间',
          }"
        >
          <a-input v-model:value="sight.value" />
        </a-form-item>
        <a-form-item
          label="降雨"
          :name="['sights', index, 'rain']"
          :rules="{
            required: true,
            message: '请输入降雨量',
          }"
        >
          <a-input v-model:value="sight.rain" />
        </a-form-item>
        <MinusCircleOutlined @click="removeSight(sight)" />
      </a-space>
      <a-form-item>
        <a-button type="dashed" block @click="addSight">
          <PlusOutlined />
          添加一项
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">Submit</a-button>
      </a-form-item>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onClose">确认</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
