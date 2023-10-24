<script setup lang="ts">
import { RouterView } from "vue-router";
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-gray-100">
    <div class="flex flex-col flex-1 w-0 overflow-hidden">
      <main class="relative flex-1 overflow-y-auto focus:outline-none">
        <RouterView />
      </main>
    </div>
  </div>
</template>
