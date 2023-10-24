<script setup lang="ts">
import { ROUTE_NAME } from "@/constant";
import router from "@/router";
import { protectedRoutes } from "@/router/protected";
import { useLoading } from "@/stores/loadingSpinner";
import { getToken } from "@/utils/storage";
import { useI18n } from "vue-i18n";
import type { RouteRecordName } from "vue-router";

const { t } = useI18n();
const loadingState = useLoading();

const isProtected = (name: RouteRecordName | null | undefined) => {
  return protectedRoutes.find((c) => name?.toString().includes(c.name));
};

router.beforeEach((to, from, next) => {
  const isAuth = getToken();
  if (isProtected(to.name) && !isAuth) {
    window.location.href = `/${ROUTE_NAME.LOGIN}`;
  } else {
    next();
  }
});

</script>

<template>
  <slot></slot>
</template>
