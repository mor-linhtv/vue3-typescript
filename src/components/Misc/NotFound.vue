<script lang="ts" setup>
import icon404 from "@/assets/images/common/icon-404.svg";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
  <div
    class="flex flex-col justify-center items-center lg:h-[300px] h-[200px] bg-white mt-[100px]"
  >
    <div>
      <img
        :src="icon404"
        alt="404"
        class="lg:w-[150px] lg:w-[100px] w-[80px] opacity-60"
      />
    </div>
    <div class="2xl:text-[22px] sm:text-[18px] text-second-100">
      <div class="text-center">{{ t("common.NOT_FOUND_404") }}</div>
    </div>
  </div>
</template>
