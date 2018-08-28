import Vue from "vue";
import Router from "vue-router";
import Home from "@/components/Home";
import Login from "@/components/Login";
import Dashboard from "@/components/pages/Dashboard";
import Accessory from "@/components/pages/Accessory";
import Category from "@/components/pages/Category";
import Client from "@/components/pages/Client";
import Location from "@/components/pages/Location";
import Product from "@/components/pages/Product";
import Quotation from "@/components/pages/Quotation";
import SalesOrder from "@/components/pages/SalesOrder";
import Supplier from "@/components/pages/Supplier";
import NotFound_404 from "@/components/pages/404";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/Dashboard"
    },
    {
      path: "/",
      component: Home,
      children: [
        {
          path: "/Dashboard",
          component: Dashboard,
          meta: { title: "Dashboard" }
        },
        {
          path: "/Accessory",
          component: Accessory,
          meta: { title: "Accessory" }
        },
        {
          path: "/Client",
          component: Client,
          meta: { title: "Client" }
        },
        {
          path: "/Location",
          component: Location,
          meta: { title: "Location" }
        },
        {
          path: "/Product",
          component: Product,
          meta: { title: "Product" }
        },
        {
          path: "/Category",
          component: Category,
          meta: { title: "Category" }
        },
        {
          path: "/Quotation",
          component: Quotation,
          meta: { title: "Quotation" }
        },
        {
          path: "/SalesOrder",
          component: SalesOrder,
          meta: { title: "SalesOrder" }
        },
        {
          path: "/Supplier",
          component: Supplier,
          meta: { title: "Supplier" }
        }
      ]
    },
    {
      path: "/Login",
      component: Login
    },
    {
      path: "/404",
      component: NotFound_404
    },
    {
      path: "*",
      redirect: "/404"
    }
  ]
});
