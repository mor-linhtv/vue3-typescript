<script setup lang="ts">
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import ButtonClose from "../Elements/ButtonClose.vue";

type ModalBaseProps = {
  title?: string;
  message?: string;
  isShowButtonClose?: boolean;
  isOpen?: boolean;
  class?: string;
  isAllowCloseOutSide?: boolean;
  enterBg?: string;
  enterFromBg?: string;
  enterToBg?: string;
  leaveBg?: string;
  leaveFromBg?: string;
  leaveToBg?: string;
  enterContent?: string;
  enterFromContent?: string;
  enterToContent?: string;
  leaveContent?: string;
  leaveFromContent?: string;
  leaveToContent?: string;
};

interface Emits {
  (e: "onClose"): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<ModalBaseProps>(), {
  title: "",
  message: "",
  class: "",
  isOpen: false,
  isAllowCloseOutSide: true,
  enterBg: "duration-300 ease-out",
  enterFromBg: "opacity-0",
  enterToBg: "opacity-100",
  leaveBg: "duration-200 ease-in",
  leaveFromBg: "opacity-100",
  leaveToBg: "opacity-0",
  enterContent: "duration-300 ease-out",
  enterFromContent: "opacity-0 scale-95",
  enterToContent: "opacity-100 scale-100",
  leaveContent: "duration-200 ease-in",
  leaveFromContent: "opacity-100 scale-100",
  leaveToContent: "opacity-0",
});

const handleClose = () => {
  emit("onClose");
};
</script>

<template>
  <TransitionRoot appear :show="props.isOpen" as="template">
    <Dialog
      as="div"
      @close="props.isAllowCloseOutSide ? handleClose() : ''"
      class="relative z-10"
    >
      <TransitionChild
        as="template"
        :enter="enterBg"
        :enter-from="enterFromBg"
        :enter-to="enterToBg"
        :leave="leaveBg"
        :leave-from="leaveFromBg"
        :leave-to="leaveToBg"
      >
        <div class="fixed inset-0 bg-black bg-opacity-25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full items-center justify-center p-4 text-center">
          <TransitionChild
            as="template"
            :enter="enterContent"
            :enter-from="enterFromContent"
            :enter-to="enterToContent"
            :leave="leaveContent"
            :leave-from="leaveFromContent"
            :leave-to="leaveToContent"
          >
            <DialogPanel
              :class="[
                'w-full min-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all',
                props.class,
              ]"
            >
              <div
                v-if="props.isShowButtonClose"
                class="flex justify-end lg:mt-[17px] lg:mr-[49px] lg:mb-[49px] mb-[19px]"
              >
                <ButtonClose @click="handleClose" />
              </div>

              <slot />
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
