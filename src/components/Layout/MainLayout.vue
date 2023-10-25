<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <GlobalHeader @toggle-sidebar="$event => isOpenSidebar = $event" />
    <div class="flex flex-1 h-full">
      <SideBar :class="{'w-[312px]': isOpenSidebar, 'w-0': !isOpenSidebar}" />
      <main class="relative flex-1 overflow-y-auto focus:outline-none">
        <RouterView />
      </main>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import GlobalHeader from "./GlobalHeader.vue";
import SideBar from "./SideBar.vue";

const isOpenSidebar = ref(false);
</script>

