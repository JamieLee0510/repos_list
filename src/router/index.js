import Vue from "vue";
import VueRouter from "vue-router";
import RepoView from "../views/RepoView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    // name: "Home",
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layout/BasicLayout.vue"),
    children: [
      {
        path: "/",
        redirect: "/github_repo",
      },
      {
        path: "/github_repo",
        component: RepoView,
      },
    ],
  },
];

const router = new VueRouter({
  routes,
});

export default router;
