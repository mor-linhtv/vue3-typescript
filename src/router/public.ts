const LoginView = () => import("@/features/auth/routes/LoginView.vue");
const RegisterView = () => import("@/features/auth/routes/RegisterView.vue");
const NotFound = () => import("@/components/Misc/NotFound.vue");

import { ROUTE_NAME } from "@/constant";

export const publicRoutes :any = [
  {
    path: "/login",
    name: ROUTE_NAME.LOGIN,
    component: LoginView,
  },
  {
    path: "/register",
    name: ROUTE_NAME.REGISTER,
    component: RegisterView,
  },
  {
    path: '/not-found',
    name: 'PageNotExist',
    component: NotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: '/not-found',
  },
];
