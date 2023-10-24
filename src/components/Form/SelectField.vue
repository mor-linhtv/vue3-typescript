<script setup lang="ts">
import { useField } from "vee-validate";

import FieldWrapper from "@/components/Form/FieldWrapper.vue";

import type { FieldWrapperProps } from "@/components/Form/FieldWrapper.vue";

type Option = {
  label: string;
  value: string | number | string[];
};

interface SelectFieldProps extends FieldWrapperProps {
  name: string;
  label?: string;
  options?: Option[];
  value?: string;
  placeholder?: string;
  class?: string;
  isSubmitted?: boolean;
  isShowMessageError?: boolean;
  disabled?: boolean;
  isError?: boolean;
}

const props = withDefaults(defineProps<SelectFieldProps>(), {
  isSubmitted: true,
  isShowMessageError: true,
  disabled: false,
  isError: false,
});

const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(
  props.name,
  undefined,
  {
    initialValue: props.value,
  }
);
</script>

<template>
  <FieldWrapper
    :label="label"
    :errorMessage="isSubmitted && isShowMessageError ? errorMessage : ''"
  >
    <select
      required
      :name="name"
      :id="name"
      :value="inputValue"
      :disabled="disabled"
      @change="handleChange"
      @blur="handleBlur"
      :class="[
        'mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md border border-second-75',
        props.class,
        {
          '!border-red-600': (!!errorMessage && isSubmitted) || isError,
        },
      ]"
    >
      <option value="" selected hidden disabled>
        {{ placeholder }}
      </option>
      <option v-for="{ label, value } in options" :key="label" :value="value">
        {{ label }}
      </option>
    </select>
  </FieldWrapper>
</template>

<style lang="scss" scoped>
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  position: relative;
  opacity: 1;
}
select:required:invalid {
  color: rgb(136, 136, 136) !important;
}
option[value=""][disabled] {
  display: none;
}
option {
  position: absolute;
  color: black;
}
</style>
