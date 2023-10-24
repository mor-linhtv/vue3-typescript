<script lang="ts" setup>
import iconEmpty from "@/assets/images/common/icon-empty.svg";
import { useI18n } from "vue-i18n";
interface IProps {
  textEmpty?: string;
}
const { t } = useI18n();

const props = withDefaults(defineProps<IProps>(), {
  textEmpty: "",
});
</script>

<template>
  <div
    class="flex flex-col justify-center items-center lg:h-[300px] h-[200px] border border-second-75 bg-white"
  >
    <div>
      <img
        :src="iconEmpty"
        alt="empty"
        class="lg:w-[150px] lg:w-[100px] w-[80px] opacity-40"
      />
    </div>
    <div class="2xl:text-[22px] sm:text-[18px] text-second-100">
      {{ textEmpty || t("common.MSG_NO_DATA") }}
    </div>
  </div>
</template>
<style lang="scss" scoped></style>
