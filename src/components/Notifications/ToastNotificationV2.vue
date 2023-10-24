<script lang="tsx">
import { XCircleIcon } from "@heroicons/vue/24/outline";

export const icons = {
  success: "",
  warning: "",
  error: "",
};
const classNames = {
  success: "",
  warning: "!bg-[#FFA903] !text-black",
  error: "!bg-white !text-red-500 shadow-lg",
};
</script>

<script setup lang="tsx">
import { TransitionRoot } from "@headlessui/vue";
import { DURATION } from "../../constant/index";
type NotificationProps = {
  notification: {
    id: string;
    type: keyof typeof icons;
    title: string;
    message?: string;
    class?: string;
  };
};

interface Emits {
  (e: "dismiss"): void;
}

const props = defineProps<NotificationProps>();
const emit = defineEmits<Emits>();

const icon = icons[props.notification.type];
const className = classNames[props.notification.type];

const onDismiss = () => {
  emit("dismiss");
};

setTimeout(() => {
  onDismiss();
}, DURATION);
</script>

<template>
  <div class="flex flex-col items-center justify-center w-full">
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
        :class="[
          'max-w-sm lg:min-w-[502px] w-full bg-blue-500 rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden text-white',
          className,
          props.notification.class,
        ]"
      >
        <div class="p-2 lg:p-2" role="alert" :aria-label="notification.title">
          <p
            class="lg:text-lg text-sm flex justify-center gap-[10px] items-center font-semibold"
          >
            <component :is="icon" /> {{ notification.message }}
          </p>
        </div>
      </div>
    </TransitionRoot>
  </div>
</template>
