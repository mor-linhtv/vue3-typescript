<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";
import ButtonClose from "../Elements/ButtonClose.vue";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();


interface Emits {
  (e: "onClose"): void;
}
const emit = defineEmits<Emits>();

const handleConfirmLogout = () => {
};

const isActive = (name: string) => {
  const currentModuleName = route.path.split("/")[1];
  return currentModuleName.includes(name);
};
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <ButtonClose class="block lg:hidden" @click="emit('onClose')" />
    </div>
    <div class="mt-[90px] flex flex-col gap-[37px]">
      <div :class="[
        'item-tab-detail text-second-100 font-medium',
      ]">
        {{ 'menu item' }}
      </div>
      <div class="text-main-100 item-tab-detail" @click="handleConfirmLogout">
        {{ t("auth.LOGOUT") }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.item-tab-detail {
  border-radius: 4px 4px 0px 0px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  background: rgba(0, 0, 0, 0.04);
  display: flex;
  padding: 10px 10px 10px 16px;
  align-items: center;
  gap: 10px;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  &:hover {
    background: #327dee;
    color: #fff;
  }
}
</style>
