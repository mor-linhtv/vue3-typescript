<script lang="ts">
export interface FieldWrapperProps {
  label?: string;
  errorMessage?: string;
  labelStyle?: string;
}
</script>

<script setup lang="ts">
defineProps<FieldWrapperProps>();
</script>

<template>
  <div>
    <label class="block text-sm font-medium text-second-100" :class="labelStyle">
      {{ label }}
    </label>
    <slot></slot>
    <div
      v-if="errorMessage"
      role="alert"
      :aria-label="errorMessage"
      class="text-sm font-semibold text-red-500"
    >
      {{ errorMessage }}
    </div>
  </div>
</template>
