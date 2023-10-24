<script setup lang="ts">
import { BaseButton } from "@/components/Elements";
import { BaseForm, InputField } from "@/components/Form";
import { useLoading } from "@/stores/loadingSpinner";
import { useNotificationStore } from "@/stores/notifications";
import { setAuthInfo } from "@/utils/storage";
import { toTypedSchema } from "@vee-validate/zod";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { RouterLink, useRouter } from "vue-router";
import { loginWithEmailAndPassword, type LoginCredentialsDTO } from "..";
import { z } from "zod";


const router = useRouter();
const loadingState = useLoading();
const { t } = useI18n();
const storeNotify = useNotificationStore();

const messageInputRequire = (label: string) => {
  return t('common.MSG_INPUT_REQUIRE', {
    label
  })
}
const schemaLoginZod = z.object({
  user_code: z.string({ required_error: messageInputRequire(t('auth.USER_ID')) }).trim().min(1, messageInputRequire(t('auth.USER_ID'))),
  password: z.string({ required_error: messageInputRequire(t('common.PASSWORD')) }).min(1, messageInputRequire(t('common.PASSWORD'))),
});

const validationSchema = toTypedSchema(
  schemaLoginZod
);

const login = async (values: LoginCredentialsDTO) => {
  try {
    loadingState.isLoading = true;
    // const { data, code } = await loginWithEmailAndPassword(values);
    // setAuthInfo(data?.access_token as string, data?.expires_in as number);
    setAuthInfo(`dummies token: ${values.user_code}`, 10000);
    storeNotify.add({
      type: "success",
      title: "success",
      message: "login success",
    });
    router.push("/");
  }
  catch (error) {
    storeNotify.add({
      type: "error",
      title: "error",
      message: "something wrong",
    });
  }
  finally {
    loadingState.isLoading = false;
  }
};
async function onSubmit(values: LoginCredentialsDTO) {
  await login(values);
}
</script>

<template>
  <BaseForm @submit="onSubmit" :validation-schema="validationSchema">
    <div class="space-y-[34px] mb-[34px]">
      <InputField
        class="h-[45px] text-second-100 tracking-[0.2em] !font-jakarta"
        label-class="font-semibold tracking-[0.2em]" name="user_code" type="text"
        :label="t('auth.USER_ID')" />
      <InputField
        class="h-[45px] text-second-100 tracking-[0.2em] !font-jakarta"
        label-class="font-semibold tracking-[0.2em]" name="password" type="password"
        is-show-hint :label="t('common.PASSWORD')" />
    </div>
    <div>
      <div class="flex justify-start items-center mb-2 tracking-[0.2em]">
        <div class="text-xs border-b border-second-100 py-2 px-[23px]">
          <RouterLink to="/register" class="font-semibold text-second-100 hover:text-blue-500">
            {{ t("common.SIGN_UP") }}
          </RouterLink>
        </div>
      </div>
      <BaseButton type="submit"
        class="lg:w-full w-full 2xl:max-w-[695px] h-[50px] text-[20px] tracking-[5.2px] !font-bold rounded-[8px] hover:text-white hover:bg-main-150">
        {{ t("common.LOGIN") }}
      </BaseButton>
    </div>
  </BaseForm>
</template>
