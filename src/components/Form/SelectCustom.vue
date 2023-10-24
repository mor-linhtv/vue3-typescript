<script setup lang="ts">
import FieldWrapper from "@/components/Form/FieldWrapper.vue";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { useField } from "vee-validate";
import { onMounted, ref, toRef, watch, watchEffect } from "vue";
import type { FieldWrapperProps } from "./FieldWrapper.vue";
import iconArrowDropdown from "@/assets/images/common/icon-arrow-dropdown.svg";

type Option = {
  label: string;
  value: string | number | string[];
  typeDepartment?: string | number;
};

interface SelectFieldProps extends FieldWrapperProps {
  name: string;
  label?: string;
  options?: Option[];
  value?: string;
  option?: Option;
  placeholder?: string;
  class?: string;
  classWrap?: string;
  isSubmitted?: boolean;
  isShowMessageError?: boolean;
  disabled?: boolean;
  isError?: boolean;
  isShowBorderBottom?: boolean;
  classSelected?: string;
  classPlaceholder?: string;
}

const props = withDefaults(defineProps<SelectFieldProps>(), {
  isSubmitted: true,
  isShowMessageError: true,
  disabled: false,
  isError: false,
});

const valueProp = toRef(props, "value");

interface Emits {
  (e: "onChange", value: string, name: string): void;
}

const { value: inputValue, errorMessage, handleBlur, handleChange } = useField(
  props.name,
  undefined,
  {
    initialValue: props.value,
  }
);

const emit = defineEmits<Emits>();
const selectedOption = ref<any>();

onMounted(() => {
  const data = props.options?.find((item) => item.value === props.value);
  if (!!data) {
    inputValue.value = data?.value?.toString() ?? "";
    selectedOption.value = data;
  }
});

watchEffect(() => {
  if (valueProp.value) {
    selectedOption.value = props.options?.find((item) => item.value == valueProp.value);
    inputValue.value = selectedOption.value?.value?.toString() ?? "";
  }
});

const handleChangeVal = (val: string) => {
  inputValue.value = val;
  selectedOption.value = props.options?.find((item) => item.value == val);
  emit("onChange", inputValue.value, props.name);
}
</script>

<template>
  <FieldWrapper
    :label="label"
    :errorMessage="isSubmitted && isShowMessageError ? errorMessage : ''"
    :class="classWrap"
  >
    <Listbox v-model="inputValue" :disabled="disabled" v-slot="{ open }">
      <div class="relative">
        <ListboxButton
          :class="[
            'relative w-full cursor-pointer rounded-lg bg-white text-left focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm border border-second-75 font-roboto',
            (!!errorMessage && isSubmitted) || isError ? '!border-red-600' : '',
            props.isShowBorderBottom ? 'input-border-bottom' : '',
            props.class,
          ]"
        >
          <span
            v-if="!!inputValue"
            :class="[
              'block truncate 2xl:text-[20px] sm:text-[16px] text-[14px] items-center lg:w-[calc(100%-70px)] w-[calc(100%-50px)] pb-[1px] ',
              props.classSelected,
            ]"
          >
            {{ selectedOption?.label || "" }}</span
          >
          <span
            :class="[
              'block truncate 2xl:text-[20px] sm:text-[16px] text-[14px] items-center text-red placeholder lg:w-[calc(100%-70px)] w-[calc(100%-50px)] pb-[1px]',
              props.classSelected,
              props.classPlaceholder,
            ]"
            v-if="!inputValue"
          >
            {{ placeholder }}</span
          >
          <span
            class="cursor-pointer absolute inset-y-0 right-0 flex items-center 2xl:pr-[50px] pr-[20px]"
          >
            <img
              :class="[
                open ? 'rotate-[180deg] duration-200 ' : 'duration-100',
                'lg:w-[21px] lg:h-[19px] w-[17px] h-[12px]',
              ]"
              :src="iconArrowDropdown"
              alt="iconArrowDropdown"
            />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute right-[0] r z-10 w-full overflow-auto rounded-md bg-white mt-[2px] text-base sm:text-sm shadow-gray-3"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="option in options"
              :key="option.value.toString()"
              :value="option.value"
              as="template"
              @click="() => handleChangeVal(option.value.toString())"
            >
              <li
                :class="[
                  active ? 'bg-[#68A4FF]' : 'text-[#666]',
                  'relative cursor-pointer select-none py- pl-10 pr-4',
                  '2xl:min-h-[60px] sm:min-h-[45px] min-h-[34px] !text-[14px] lg:pl-[20px] pl-[24px] flex items-center',
                ]"
              >
                <span
                  :class="[
                    'block',
                    '2xl:min-h-[60px] sm:min-h-[45px] min-h-[34px] !text-[14px] items-center font-roboto break-word-custom flex',
                  ]"
                  >{{ option.label }}
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>
  </FieldWrapper>
</template>

<style lang="scss" scoped>
.placeholder {
  color: rgb(136, 136, 136) !important;
}
.input-border-bottom {
  border: unset;
  border-bottom: 1px solid #737373;
}
.break-word {
  word-break: break-word;
}
</style>
