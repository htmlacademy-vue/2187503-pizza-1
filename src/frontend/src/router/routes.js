export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index.vue"),
    meta: { layout: "AppLayoutMain" },
    children: [
      {
        path: "/loginModel",
        name: "LoginModel",
        component: () => import("../views/Login.vue"),
        meta: { layout: "AppLayoutMain" },
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile.vue"),
    meta: { layout: "AppLayoutMain" },
  },
  {
    path: "/popup",
    name: "Popup",
    component: () => import("../views/Popup.vue"),
    meta: { layout: "AppLayoutDefault" },
  },
];
