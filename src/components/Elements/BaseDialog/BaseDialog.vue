<script lang="ts">
import { DialogTitle, DialogDescription, DialogPanel } from "@headlessui/vue";
import {
  Dialog,
  TransitionRoot,
  TransitionChild,
} from "@headlessui/vue";

export const BaseDialogTitle = DialogTitle;
export const BaseDialogDescription = DialogDescription;
</script>

<script setup lang="ts">
type BaseDialogProps = {
  isOpen: boolean;
};

interface Emits {
  (e: "close"): void;
}

defineProps<BaseDialogProps>();
const emit = defineEmits<Emits>();

const close = () => {
  emit("close");
};
</script>

<template>
  <TransitionRoot :show="isOpen" as="template">
    <Dialog as="div" class="relative z-10" :open="isOpen" @close="close">
      <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
        leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>
      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen">
          <TransitionChild as="template" enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel>
              <slot></slot>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
