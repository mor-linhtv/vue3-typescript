import { ROUTE_NAME } from "@/constant";
import { DashboardView } from "@/features/dashboard/routes"

export const protectedRoutes = [
  {
    path: "/",
    name: ROUTE_NAME.HOME,
    component: DashboardView,
  },
];
