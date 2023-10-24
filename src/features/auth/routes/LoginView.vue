<script setup lang="ts">
import { useI18n } from "vue-i18n";
import AuthLayout from "../components/AuthLayout.vue";
import LoginForm from "../components/LoginForm.vue";

const { t } = useI18n();
const onSuccess = () => {};

</script>

<template>
  <AuthLayout title="Log in">
    <div class="min-h-screen py-10 font-jakarta bg-[#f0f2f5]">
      <div
        class="flex flex-col p-10 lg:border w-[450px] mx-auto rounded-lg bg-white shadow-lg"
      >
        <div
          class="text-blue-500 text-[25px] font-extrabold mb-4"
        >
          {{ t("common.LOGIN") }}
        </div>
        <LoginForm @success="onSuccess" />
      </div>
    </div>
  </AuthLayout>
</template>
