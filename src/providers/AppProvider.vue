<script setup lang="tsx">
import { useI18n } from "vue-i18n";
import { AppNotifications } from "@/components/Notifications";
import { AuthProvider } from "@/providers";
import { useLoading } from "@/stores/loadingSpinner";
import { BaseSpinner } from "@/components/Elements";
import router from "@/router";
import { useLocale } from "@/hooks/useLocale";

const loadingState = useLoading();
const { locale } = useI18n();
router.beforeEach(() => {
  const { currentLocale } = useLocale();
  locale.value = currentLocale.value;
});
</script>

<template>
  <AppNotifications />
  <div
    class="fixed top-0 left-0 z-50 bg-white bg-opacity-25"
    v-if="loadingState.isLoading"
  >
    <div class="flex items-center justify-center w-screen h-screen">
      <BaseSpinner size="xl" />
    </div>
  </div>
  <AuthProvider>
    <slot></slot>
  </AuthProvider>
</template>
