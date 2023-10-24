<script setup lang="ts">
import MetaHead from '@/components/Layout/MetaHead.vue';
interface LayoutProps {
  title: string;
}

defineProps<LayoutProps>();
</script>

<template>
  <div>
    <MetaHead :title="title" />
    <slot></slot>
  </div>
</template>
