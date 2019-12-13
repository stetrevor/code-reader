import Vue from "vue";
import Router from "vue-router";
import Tabs from "./views/Tabs.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/tabs"
    },
    {
      path: "/tabs",
      name: "tabs",
      component: Tabs
    },
    {
      path: "/reader/:id",
      name: "reader",
      component: () => import("./views/Reader.vue")
    }
  ]
});
