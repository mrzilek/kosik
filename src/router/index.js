import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TermsView from "../views/TermsView.vue";
import ListView from "../views/ListView.vue";
import DetailView from "../views/DetailView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Index",
      meta: { title: "Homepage" },
      component: HomeView,
    },
    {
      path: "/terms",
      name: "Terms",
      meta: { title: "Terms" },
      component: TermsView,
    },
    {
      path: "/list",
      name: "List",
      meta: { title: "Trends list" },
      component: ListView,
    },
    {
      path: "/detail/:id",
      name: "Detail",
      meta: { title: "Image Detail" },
      props: (route) => ({ routerImageId: route.params.id }),
      component: DetailView,
    }
  ],
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
