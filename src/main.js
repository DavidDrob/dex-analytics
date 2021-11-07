import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import "./index.css";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      props: true,
      component: () => import("./views/Main.vue"),
    },
    {
      path: "/tokens",
      name: "Tokens",
      props: true,
      component: () => import("./views/Tokens.vue"),
    },
    {
      path: "/pools",
      name: "Pools",
      component: () => import("./views/Pools.vue"),
    },
  ],
});

createApp(App).use(router).mount("#app");
