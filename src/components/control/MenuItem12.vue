<script setup>
import { onMounted, ref } from "vue";
import { notification } from "ant-design-vue";
import { useSimuStore } from "../../stores/simulation";
import { useViewStore } from "../../stores/earth";
import { Cartesian3 } from "cesium";
import ExcelJs from "exceljs";
const emit = defineEmits(["close"]);
const props = defineProps(["visible"]);
const formRef = ref();
const defaultPercent = ref(0);
const showProgress = ref(false);
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
    message: "报表已生成",
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
        message: "报表可预览",
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
      message: "请先生成报表",
    });
    return;
  }
  if (!simuStore.simuData.isComputed) {
    notification["warn"]({
      message: "请先进行预览",
    });
    return;
  }
  const workbook = new ExcelJs.Workbook(); // 創建試算表檔案
  const sheet = workbook.addWorksheet("工作表範例1"); //在檔案中新增工作表 參數放自訂名稱
  sheet.addTable({
    // 在工作表裡面指定位置、格式並用columns與rows屬性填寫內容
    name: "table名稱", // 表格內看不到的，算是key值，讓你之後想要針對這個table去做額外設定的時候，可以指定到這個table
    ref: "A1", // 從A1開始
    columns: [{ name: "时间" }, { name: `${option.value.yAxis.name}` }],
    rows: data,
  });
  // 表格裡面的資料都填寫完成之後，訂出下載的callback function
  // 異步的等待他處理完之後，創建url與連結，觸發下載
  workbook.xlsx.writeBuffer().then((content) => {
    const link = document.createElement("a");
    const blobData = new Blob([content], {
      type: "application/vnd.ms-excel;charset=utf-8;",
    });
    link.download = "报表.xlsx";
    link.href = URL.createObjectURL(blobData);
    link.click();
  });
};
</script>
<template>
  <a-drawer
    title="报表整编"
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
          <div style="width: 450px">
            <a-form-item label="报表类型" style="width: 300px">
              <div class="demo-dropdown-wrap">
                <a-dropdown-button
                  @click="handleButtonClick"
                  style="width: 300px"
                >
                  请选择报表类型
                  <template #overlay>
                    <a-menu @click="handleMenuClick">
                      <a-menu-item key="1">
                        <UserOutlined />
                        降雨过程表
                      </a-menu-item>
                      <a-menu-item key="2">
                        <UserOutlined />
                        雨量日报表
                      </a-menu-item>
                      <a-menu-item key="3">
                        <UserOutlined />
                        时段最大降水量表
                      </a-menu-item>
                      <a-menu-item key="4">
                        <UserOutlined />
                        降水量摘录表
                      </a-menu-item>
                      <a-menu-item key="5">
                        <UserOutlined />
                        逐日雨量对照表
                      </a-menu-item>
                      <a-menu-item key="6">
                        <UserOutlined />
                        累计雨量报表
                      </a-menu-item>
                      <a-menu-item key="7">
                        <UserOutlined />
                        逐日雨量表
                      </a-menu-item>
                      <a-menu-item key="8">
                        <UserOutlined />
                        月年降水量统计表
                      </a-menu-item>
                      <a-menu-item key="9">
                        <UserOutlined />
                        多年平均降水量统计表
                      </a-menu-item>
                      <a-menu-item key="10">
                        <UserOutlined />
                        水位日报表
                      </a-menu-item>
                      <a-menu-item key="11">
                        <UserOutlined />
                        水位日报表（含对应库容）
                      </a-menu-item>
                      <a-menu-item key="12">
                        <UserOutlined />
                        水位月报表（日平均水位）
                      </a-menu-item>
                      <a-menu-item key="13">
                        <UserOutlined />
                        水位月报表（8：00整点水位）
                      </a-menu-item>
                      <a-menu-item key="14">
                        <UserOutlined />
                        逐日平均水位表
                      </a-menu-item>
                      <a-menu-item key="15">
                        <UserOutlined />
                        泄洪流量计算表
                      </a-menu-item>
                      <a-menu-item key="16">
                        <UserOutlined />
                        入库流量计算表
                      </a-menu-item>
                      <a-menu-item key="17">
                        <UserOutlined />
                        各月逐日流量表
                      </a-menu-item>
                      <a-menu-item key="18">
                        <UserOutlined />
                        逐日平均流量表
                      </a-menu-item>
                      <a-menu-item key="19">
                        <UserOutlined />
                        水量平衡计算表
                      </a-menu-item>
                      <a-menu-item key="20">
                        <UserOutlined />
                        水文要素摘录表
                      </a-menu-item>
                      <a-menu-item key="21">
                        <UserOutlined />
                        日均水位频率表
                      </a-menu-item>
                      <a-menu-item key="22">
                        <UserOutlined />
                        温湿度月报表
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown-button>
              </div>
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
        </a-space>
        <a-progress v-if="showProgress" :percent="defaultPercent" />
        <div class="button-wrap">
          <a-form-item>
            <a-button type="primary" @click="onSave">报表生成</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onFinish">报表预览</a-button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="onClose">报表导出</a-button>
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
.demo-dropdown-wrap :deep(.ant-dropdown-button) {
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
