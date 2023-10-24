<script setup lang="ts">
import { useNotificationStore } from "@/stores/notifications";

import ToastNotification from "./ToastNotification.vue";

const store = useNotificationStore();
</script>

<template>
  <div
    aria-live="assertive"
    class="z-50 flex flex-col fixed inset-0 space-y-4 items-end pointer-events-none pt-[1px]"
  >
    <ToastNotification
      v-for="notification in store.notifications"
      :key="notification.id"
      :notification="notification"
      @dismiss="store.dismiss(notification.id)"
    />
  </div>
</template>
