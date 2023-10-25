import { ROUTE_NAME } from "@/constant";
import  MainLayout from "@/components/Layout/MainLayout.vue";
import { DashboardView } from "@/features/dashboard/routes"

export const protectedRoutes = [
  {
    path: "/",
    name: ROUTE_NAME.HOME,
    component: MainLayout,
    children: [
      {
        path: "",
        name: ROUTE_NAME.DASHBOARD,
        component: DashboardView
      }
    ]
  },
];
