<script setup lang="ts">
import { useField } from "vee-validate";
import { ref, toRef, watchEffect } from "vue";

import FieldWrapper from "@/components/Form/FieldWrapper.vue";
import openEyes from "@/assets/images/pw-show.svg";
import closedEyes from "@/assets/images/pw-hide.svg";

interface InputFieldProps {
  name: string;
  label?: string;
  type?: "text" | "email" | "password";
  value?: string;
  class?: string;
  labelClass?: string;
  placeholder?: string;
  isSubmitted?: boolean;
  isShowMessageError?: boolean;
  disabled?: boolean;
  isError?: boolean;
  isShowHint?: boolean;
  isShowIcon?: boolean;
  icon?: string;
  isShowBorderBottom?: boolean;
  maxlength?: number;
  classWrap?: string;
  classIconEyes?: string;
  classIcon?: string;
}

const props = withDefaults(defineProps<InputFieldProps>(), {
  type: "text",
  isSubmitted: true,
  isShowMessageError: true,
  disabled: false,
  isError: false,
  maxlength: 1000,
  classWrap: "",
  value: "",
});

const inputRef = ref<HTMLInputElement | null>(null);
const name = toRef(props, "name");
const eyesSrc = ref(closedEyes);

const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(
  name,
  undefined,
  {
    initialValue: props.value,
  }
);

interface Emits {
  (e: "onChange", value: string, name: string): void;
}

const emit = defineEmits<Emits>();

watchEffect(() => {
  emit("onChange", inputValue.value, props.name);
});

watchEffect(() => {
  if (!!props.value) {
    inputValue.value = props.value || "";
  }
});

const handleToggleShowPassword = () => {
  if (inputRef.value) {
    inputRef.value.type = inputRef.value.type == "password" ? "text" : "password";
    eyesSrc.value = inputRef.value.type == "password" ? closedEyes : openEyes;
  }
};

const handleClickButton = () => {};
</script>

<template>
  <FieldWrapper
    :label="label"
    :labelStyle="labelClass"
    :errorMessage="isSubmitted && isShowMessageError ? errorMessage : ''"
    class="relative"
  >
    <div :class="['relative flex items-center justify-end mt-3', props.classWrap]">
      <input
        :name="name"
        :id="name"
        :type="type"
        :placeholder="placeholder"
        :value="inputValue"
        :disabled="props.disabled"
        :maxlength="maxlength"
        :class="[
          'appearance-none block w-full px-3 py-2 border border-second-75 rounded-md placeholder-second-70 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-roboto ',
          {
            '!border-red-600 text-red-600': (!!errorMessage && isSubmitted) || isError,
          },

          isShowHint ? 'pr-[60px]' : '',
          props.isShowBorderBottom ? 'input-border-bottom' : '',
          props.class,
        ]"
        @input="handleChange"
        @blur="handleBlur"
        ref="inputRef"
      />
      <img
        @click="handleToggleShowPassword"
        :class="[
          'w-4 cursor-pointer absolute right-[20px]',
          props.classIconEyes,
        ]"
        v-if="isShowHint"
        :src="eyesSrc"
        alt=""
      />
      <img
        @click="handleClickButton"
        :class="[
          'w-4 bottom-[6px] cursor-pointer absolute right-[20px]',
          props.classIcon,
        ]"
        v-if="isShowIcon"
        :src="icon"
        alt=""
      />
    </div>
  </FieldWrapper>
</template>

<style lang="scss" scoped>
.input-border-bottom {
  border: unset;
  border-bottom: 1px solid #737373;
}

input::-ms-reveal,
input::-ms-clear {
  display: none;
}
</style>
