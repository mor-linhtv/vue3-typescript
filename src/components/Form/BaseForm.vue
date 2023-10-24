<script setup lang="ts">
import { Form } from "vee-validate";
import type { ZodType } from "zod";

type FormProps = {
  id?: string;
  validationScheme?: ZodType;
};

defineProps<FormProps>();
</script>

<template>
  <Form :id="id" :validation-schema="validationScheme">
    <slot></slot>
  </Form>
</template>
