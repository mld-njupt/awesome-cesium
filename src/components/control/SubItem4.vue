<script setup>
import { reactive } from "vue";
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
console.log(emit);
const form = reactive({
  switch: "",
  degree: "",
  time: "",
  name: "",
});
const rules = {
  name: [
    {
      required: true,
      message: "请输入方案名称",
    },
  ],
  time: [
    {
      required: true,
      message: "请输入时间",
    },
  ],
  degree: [
    {
      required: true,
      message: "请输入开度",
    },
  ],
  switch: [
    {
      required: true,
      message: "请输入开关",
    },
  ],
};

const onClose = () => {
  console.log(emit("close"));
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
    <a-form :model="form" :rules="rules" layout="vertical">
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="开关" name="switch">
            <a-input v-model:value="form.switch" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="开度" name="degree">
            <a-input v-model:value="form.degree" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row :gutter="16">
        <a-col :span="12">
          <a-form-item label="时间" name="time">
            <a-input v-model:value="form.time" style="width: 100%" />
          </a-form-item>
        </a-col>
        <a-col :span="12">
          <a-form-item label="方案名称" name="name">
            <a-input v-model:value="form.name" style="width: 100%" />
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
    <template #extra>
      <a-space>
        <a-button @click="onClose">取消</a-button>
        <a-button type="primary" @click="onClose">确认</a-button>
      </a-space>
    </template>
  </a-drawer>
</template>
