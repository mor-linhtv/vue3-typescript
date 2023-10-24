<script setup lang="ts">
import ButtonClose from "@/components/Elements/ButtonClose.vue";

type CommonLayoutProps = {
  title?: string;
  icon?: string;
  isShowButtonClose?: boolean;
};

interface Emits {
  (e: "onClose"): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<CommonLayoutProps>(), {
  title: "",
  isShowButtonClose: true,
});
</script>

<template>
  <div class="lg:mt-[80px] lg:ml-[80px] lg:mr-[134px] mx-[24px] mt-[13px]">
    <div class="flex items-center justify-between gap-[20px]">
      <div
        :class="[
          'lg:rounded-[0px] rounded-[5px] lg:w-[400px] sm:w-[300px] w-[200px] 2xl:h-[103px] lg:h-[90px] sm:h-[60px] h-[55px] 2xl:text-[30px] lg:text-[25px] lg:font-semibold bg-main-100 flex items-center text-white sm:gap-[29px] gap-[10px] font-extrabold sm:text-[23px] text-[18px] ',
          !icon ? 'justify-center' : 'sm:pl-[33px] pl-[20px]',
        ]"
      >
        <img
          v-if="!!icon"
          :src="icon"
          alt="icon-sign-up"
          class="w-[30px] lg:w-[50px] lg:h-[56px]"
        />
        <span class="lg:mt-[10px] mt-[5px]">
          {{ props.title }}
        </span>
      </div>
      <ButtonClose
        class="w-[26px] h-[28px] lg:w-[40px] lg:h-[43px] 2xl:w-[50px] 2xl:h-[53px]"
        v-if="isShowButtonClose"
        @click="emit('onClose')"
      />
    </div>

    <div>
      <slot></slot>
    </div>
  </div>
</template>
