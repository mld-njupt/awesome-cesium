import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      beforeEnter: (to) => {
        const auth = localStorage.getItem("isAuth");
        // reject the navigation
        if (
          // 检查用户是否已登录
          !auth &&
          // ❗️ 避免无限重定向
          to.name !== "login"
        ) {
          // 将用户重定向到登录页面
          return { name: "login" };
        }
      },
    },
    {
      path: "/login",
      name: "login",
      beforeEnter: (to) => {
        const auth = localStorage.getItem("isAuth");
        // reject the navigation
        if (
          // 检查用户是否已登录
          auth &&
          // ❗️ 避免无限重定向
          to.name !== "home"
        ) {
          // 将用户重定向到登录页面
          return { name: "home" };
        }
      },
      component: () => import("../views/LoginView.vue"),
    },
  ],
});

export default router;
