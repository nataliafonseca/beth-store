import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/product/:id",
    name: "product",
    props: true,
    component: () =>
      import(/* webpackChunkName: "product" */ "../views/ProductView.vue"),
  },
  {
    path: "/cart",
    name: "cart",
    component: () =>
      import(/* webpackChunkName: "cart" */ "../views/CartView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
  },
  {
    path: "/checkout",
    name: "checkout",
    component: () =>
      import(/* webpackChunkName: "checkout" */ "../views/CheckoutView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/User/ProfileView.vue"),
    children: [
      {
        path: "orders",
        name: "orders",
        component: () =>
          import(
            /* webpackChunkName: "orders" */ "../views/User/OrdersView.vue"
          ),
      },
      {
        path: "orders/:id",
        name: "order-details",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "order-details" */ "../views/User/OrderDetailsView.vue"
          ),
      },
      {
        path: "update",
        name: "profile-update",
        component: () =>
          import(
            /* webpackChunkName: "order-list" */ "../views/User/ProfileUpdateView.vue"
          ),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () =>
      import(/* webpackChunkName: "admin" */ "../views/Admin/AdminView.vue"),
    children: [
      {
        path: "products",
        name: "product-table",
        component: () =>
          import(
            /* webpackChunkName: "product-table" */ "../views/Admin/ProductTableView.vue"
          ),
      },
      {
        path: "products/create",
        name: "product-create",
        component: () =>
          import(
            /* webpackChunkName: "product-create" */ "../views/Admin/ProductCreateView.vue"
          ),
      },
      {
        path: "products/update/:id",
        name: "product-update",
        props: true,
        component: () =>
          import(
            /* webpackChunkName: "product-update" */ "../views/Admin/ProductUpdateView.vue"
          ),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
