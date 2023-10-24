<script setup lang="ts">
import CommonLayout from "@/components/Form/CommonLayout.vue";
import { ROUTE_NAME } from "@/constant";
import { onMounted, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import AuthLayout from "../components/AuthLayout.vue";
import RegisterForm from "../components/RegisterForm/RegisterForm.vue";

export type IRegisterForm = {
  name: string;
  gender: string;
  development: string;
};

const router = useRouter();
const { t } = useI18n();


const isOpenPopupConfirm = ref(false);

const valueForm = ref<IRegisterForm>({
  name: "",
  gender: "",
  development: "",
});

const handleShowConfirm = (values: any) => {
  isOpenPopupConfirm.value = true;
  valueForm.value = values;
};

const handleSubmitForm = () => {
  isOpenPopupConfirm.value = false;
  router.push({
    path: ROUTE_NAME.LOGIN,
  });
};

const handleClosePopupConfirmRegister = () => {
  isOpenPopupConfirm.value = false;
};

const handleClose = () => {
  router.push({
    path: ROUTE_NAME.LOGIN,
  });
};
</script>

<template>
  <AuthLayout title="Register">
    <PopupConfirmRegister
      v-if="isOpenPopupConfirm"
      :isOpen="isOpenPopupConfirm"
      :valueForm="valueForm"
      @success="handleSubmitForm"
      @onClose="handleClosePopupConfirmRegister"
    />
    <CommonLayout
      :title="t('auth.LB_SIGN_UP')"
      :isShowButtonClose="true"
      @onClose="handleClose"
    >
      <RegisterForm @success="handleShowConfirm" />
    </CommonLayout>
  </AuthLayout>
</template>
