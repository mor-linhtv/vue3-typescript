<script lang="ts">
import { BaseSpinner } from "../BaseSpinner";

export const variants = {
  primary: "bg-blue-500 text-white hover:bg-gray-50:text-blue-600",
  primaryBlur: "bg-blue-35 text-second-100",
  inverse: "bg-second-100 text-blue-600 hover:bg-blue-600:text-white",
  danger: "bg-red-600 text-white hover:bg-red-50:text-red-600",
};

export const sizes = {
  sm: "py-2 px-4 text-sm",
  md: "lg:py-2 lg:px-6 text-md",
  lg: "lg:h-[48px] text-lg hover:opacity-90",
  "lg-rounded":
    "py-2 lg:py-4 px-auto mx-auto text-[20px] lg:text-[28px] font-extrabold lg:font-semibold tracking-[0.2em] rounded-full ",
  xl:
    "py-[10px] xl:py-[20px] px-auto text-[16px] lg:text-[36px] font-bold tracking-[0.2em]",
};

interface BaseButtonProps {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  isLoading?: boolean;
  disabled?: boolean;
}
</script>

<script setup lang="ts">
withDefaults(defineProps<BaseButtonProps>(), {
  variant: "primary",
  size: "md",
  isLoading: false,
});
</script>

<template>
  <button :disabled="disabled"
    class="flex items-center justify-center font-medium border border-gray-300 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-blue-35 disabled:text-second-100 focus:outline-none"
    :class="[variants[variant], sizes[size]]">
    <slot v-if="!isLoading" name="startIcon"></slot>
    <BaseSpinner v-if="isLoading" size="sm" textCurrent="text-current" />
    <slot></slot>
    <slot v-if="!isLoading" name="endIcon"></slot>
  </button>
</template>
