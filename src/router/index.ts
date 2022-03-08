import { createRouter, createWebHistory } from "vue-router";

import Index from "@/pages/Index.vue";

const routes = [
  {
    path: "/",
    component: Index,
    meta: {
      title: "Cargofive Test",
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
