<script setup lang="ts">
import ModalBase from "@/components/modal/ModalBase.vue";
import { useI18n } from "vue-i18n";
import { BaseButton } from "../Elements";

type PopupSuccess = {
  isOpen?: boolean;
  iconPopup?: any;
  message: string;
  title: string;
  class?: string;
  isLogout?: boolean;
};
interface Emits {
  (e: "onSubmit"): void;
  (e: "onCancel"): void;
}

const { t } = useI18n();

const props = withDefaults(defineProps<PopupSuccess>(), {});

const emit = defineEmits<Emits>();

const handleSubmit = () => {
  emit("onSubmit");
};

const handleCancel = () => {
  emit("onCancel");
};
</script>

<template>
  <div>
    <ModalBase
      @onClose="emit('onCancel')"
      :isOpen="props.isOpen"
      :class="props.class"
      class="lg:w-[721px] sm:w-[600px] w-[400px] lg:!rounded-[15px] lg:px-[50px] lg:pt-[80px] lg:pb-[80px] sm:pt-[60px] sm:pb-[60px] pt-[50px] pb-[50px]"
    >
      <div
        class="lg:text-3xl sm:text-2xl text-xl font-semibold flex justify-center flex-shrink-0 items-center text-second-100 sm:pb-[40px] pb-[30px] text-center"
      >
        {{ title }}
      </div>
      <div
        class="lg:text-2xl sm:text-xl text-lg flex justify-center flex-shrink-0 items-center text-second-100 text-center"
      >
        {{ message }}
      </div>
      <div class="flex justify-center lg:pt-[60px] pt-[40px]" v-if="!isLogout">
        <BaseButton type="submit" @click="handleSubmit" class="w-[200px] text-xl">
          {{ t("common.LB_OK") }}
        </BaseButton>
      </div>
      <div class="flex justify-center lg:pt-[60px] pt-[40px]" v-if="isLogout">
        <BaseButton
          @click="handleCancel"
          class="w-[200px] text-xl mr-[20px] bg-gray-50 hover:bg-gray-40 !text-[#333] hover:!text-white"
        >
          {{ t("common.LB_CANCEL") }}
        </BaseButton>
        <BaseButton
          @click="handleSubmit"
          class="w-[200px] text-xl hover:text-white hover:bg-main-150"
        >
          {{ t("common.LB_OK") }}
        </BaseButton>
      </div>
    </ModalBase>
  </div>
</template>
