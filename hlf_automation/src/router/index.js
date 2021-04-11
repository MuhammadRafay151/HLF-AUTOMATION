import Vue from "vue";
import VueRouter from "vue-router";S
import scriptsRoutes from "./Scripts"
import NProgress from "nprogress"
import 'nprogress/nprogress.css';
Vue.use(VueRouter);

const routes = [
    ...scriptsRoutes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start()
  }
  next()
});


router.afterEach(() => {
  NProgress.done()
});

export default router;
