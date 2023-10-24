<script lang="tsx">
import {
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  XCircleIcon,
} from "@heroicons/vue/24/outline";
import { XMarkIcon } from "@heroicons/vue/24/solid";

export const icons = {
  success: (
    <CheckCircleIcon class="w-6 h-6 text-green-500" aria-hidden="true" />
  ),
  warning: (
    <ExclamationCircleIcon class="w-6 h-6 text-yellow-500" aria-hidden="true" />
  ),
  error: <XCircleIcon class="w-6 h-6 text-red-500" aria-hidden="true" />,
};
</script>

<script setup lang="tsx">
import { DURATION } from "@/constant";
import { TransitionRoot } from "@headlessui/vue";
type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
  };
};

interface Emits {
  (e: "dismiss"): void;
}

const props = defineProps<NotificationProps>();
const emit = defineEmits<Emits>();

const icon = icons[props.notification.type];

const onDismiss = () => {
  emit("dismiss");
};
setTimeout(() => {
  onDismiss();
}, DURATION);
</script>

<template>
  <div class="flex flex-col items-center w-full space-y-4 sm:items-end">
    <TransitionRoot
      :show="true"
      as="template"
      enter="transform ease-out duration-300 transition"
      enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
      enterTo="translate-y-0 opacity-100 sm:translate-x-0"
      leave="transition ease-in duration-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        class="w-full max-w-sm overflow-hidden bg-white rounded-lg shadow-lg pointer-events-auto ring-1 ring-black ring-opacity-5"
      >
        <div class="p-4" role="alert" :aria-label="notification.title">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <component :is="icon" />
            </div>
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p class="text-sm font-medium text-gray-900">
                {{ notification.title }}
              </p>
              <p class="mt-1 text-sm text-gray-500">
                {{ notification.message }}
              </p>
            </div>
            <div class="flex flex-shrink-0 ml-4">
              <button
                @click="onDismiss"
                class="inline-flex text-gray-400 bg-white rounded-md hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span class="sr-only">Close</span>
                <XMarkIcon class="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>
