<script setup lang="ts">
import { useField } from "vee-validate";
import { ref, toRef, watchEffect } from "vue";

import FieldWrapper from "@/components/Form/FieldWrapper.vue";
import openEyes from "@/assets/images/pw-show.svg";
import iconSearch from "@/assets/images/common/icon-search.svg";

interface InputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  maxlength?: number;
  value?: string;
  type?: "text" | "email" | "password";
  class?: string;
}

const props = withDefaults(defineProps<InputFieldProps>(), {
  type: "text",
  disabled: false,
  maxlength: 1000,
});

const inputRef = ref<HTMLInputElement | null>(null);
const name = toRef(props, "name");

interface Emits {
  (e: "onChange", value: string, name: string): void;
}

const emit = defineEmits<Emits>();
</script>

<template>
  <div class="relative h-[50px] w-[347px]">
    <input
      :name="name"
      :id="name"
      :type="type"
      :placeholder="placeholder"
      :value="value"
      :disabled="props.disabled"
      :maxlength="maxlength"
      :class="[
        'appearance-none block w-full pl-[90px] py-[10px] h-full rounded-md placeholder-second-70 focus:outline-none focus:ring-main-100 focus:border-main-100 font-roboto shadow-gray-3 lg:text-[20px] ',
        props.class,
      ]"
      ref="inputRef"
    />
    <img
      class="absolute w-[30px] h-[30px] left-[30px] top-[10px]"
      :src="iconSearch"
      alt=""
    />
  </div>
</template>

<style lang="scss" scoped>
.input-search::placeholder {
  color: #b0b0b0;
}
</style>
