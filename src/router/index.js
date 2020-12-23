import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/custom-list",
    name: "custom-list",
    component: () => import("../views/CustomList.vue"),
  },
];

const router = new VueRouter({
  routes,
});

export default router;
