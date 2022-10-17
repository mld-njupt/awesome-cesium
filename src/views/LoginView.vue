<script setup>
import { reactive, computed } from "vue";
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { notification } from "ant-design-vue";
import { useRouter } from "vue-router";

const router = useRouter();
const formState = reactive({
  username: "",
  password: "",
  remember: true,
});

const onFinish = (values) => {
  if (values.username === "admin" && values.password === "123456") {
    localStorage.setItem("isAuth", true);
    router.push("/");
  } else {
    notification.open({
      type: "error",
      message: "登录失败",
      description: "用户名密码错误",
    });
  }
};

const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const disabled = computed(() => {
  return !(formState.username && formState.password);
});
</script>
<template>
  <div class="login-wrap">
    <div class="login-content">
      <div class="title-wrap">黄山丰乐水库水雨情测报系统</div>
      <div class="form-wrap">
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            name="username"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input v-model:value="formState.username" placeholder="用户名">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password
              v-model:value="formState.password"
              placeholder="密码"
            >
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember"
                >Remember me</a-checkbox
              >
            </a-form-item>
          </a-form-item>

          <a-form-item>
            <a-button
              :disabled="disabled"
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              Log in
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<style scoped>
.login-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100%;
  background: #f0f2f5
    url(https://preview.pro.antdv.com/assets/background.ebcb9160.svg) no-repeat
    50%;
  background-size: 100%;
}
.login-content {
  height: 77.2vh;
}
.title-wrap {
  font-size: 33px;
  color: rgba(0, 0, 0, 0.85);
  font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
  font-weight: 600;
}
.form-wrap {
  margin-top: 100px;
}
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.ant-btn-primary {
  width: 100%;
}
</style>
