import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Dashboard from "../views/Dashboard.vue";
import AddOrder from "../components/AddOrder.vue";
import Order from "../components/Order.vue";
import OrderList from "../components/OrderList.vue";
import AddTutorial from "../components/AddTutorial.vue";
import Tutorial from "../components/Tutorial.vue";
import TutorialsList from "../components/TutorialsList.vue";
import Settings from "../components/Settings.vue";
import StallMenu from "../views/StallMenu.vue";
import Menu from "../components/Menu.vue";
import Cart from "../components/Cart.vue";
import Home from "../views/Home.vue";
import firebase from "firebase";
import store from "../store";
import ForgotPassword from "../components/ForgotPassword.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/login/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
    beforeEnter(to, from, next) {
      const user = firebase.auth().currentUser;
      if (user) {
        next({ name: "Dashboard" });
      } else {
        next();
      }
    },
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      authRequired: true,
    },
    children: [
      {
        path: "/dashboard/addorder",
        name: "AddOrder",
        component: AddOrder,
      },
      {
        path: "/dashboard/order",
        name: "Order",
        component: Order,
      },
      {
        path: "/dashboard/orderlist",
        name: "OrderList",
        component: OrderList,
      },
      {
        path: "/dashboard/addmenu",
        name: "AddMenu",
        component: AddTutorial,
      },
      {
        path: "/dashboard/menu",
        name: "Menu",
        component: Tutorial,
      },
      {
        path: "/dashboard/menulist",
        name: "MenuList",
        component: TutorialsList,
      },
      {
        path: "/dashboard/settings",
        name: "Settings",
        component: Settings,
      },
    ],
  },
  {
    path: "/:id", //temporary, next time add in :id for routing
    name: "Stall_1",
    component: StallMenu,
    children: [
      {
        path: "/:id/menu",
        name: "Menu",
        component: Menu,
      },
      {
        path: "/:id/cart",
        name: "Cart",
        component: Cart,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (store.getters.user.loggedIn) {
      next();
    } else {
      alert("You must be logged in to see this page");
      next({
        path: "/login",
      });
    }
  } else {
    next();
  }
});

export default router;
