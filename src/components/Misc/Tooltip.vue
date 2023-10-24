<script lang="ts" setup>
import { onBeforeMount, onMounted, ref, watch, watchEffect } from "vue";

type IProps = {
  tooltipText?: string;
  position?: string;
  isFixed?: boolean;
};

const props = withDefaults(defineProps<IProps>(), {
  tooltipText: "",
  position: "top",
});
const targetElement = ref<any>();
const popover = ref<any>();
const isInfoStepIntersecting = ref<boolean>(false);

onMounted(() => {
  if (targetElement.value) {
    const handler = (entries: any) => {
      isInfoStepIntersecting.value = entries[0].isIntersecting;
    };
    const observer = new window.IntersectionObserver(handler);
    observer.observe(targetElement.value);
  }
});

const showPosition = () => {
  const { top, right, bottom, left } = targetElement.value.getBoundingClientRect();
  if (popover.value) {
    popover.value.style.display = "block";
    popover.value.style.position = "fixed";
    popover.value.style.left = left + "px";
    popover.value.style.width = targetElement.value.offsetWidth + "px";
    if (window.innerWidth - right < 20) {
      popover.value.style.left = "unset";
      popover.value.style.right =
        window.innerWidth - right > 0 ? window.innerWidth - right : 0 + "px";
    }
    if (window.innerHeight - bottom < targetElement.value.offsetHeight) {
      popover.value.style.top = "unset";
      popover.value.style.bottom = window.innerHeight - top + 5 + "px";
    } else {
      popover.value.style.top = bottom + "px";
    }
  }
};
const close = () => {
  if (popover.value) {
    popover.value.style.display = "none";
  }
};
onBeforeMount(() => {
  window.addEventListener("scroll", handleScroll);
});

function handleScroll() {
  close();
}
</script>
<template>
  <div
    ref="targetElement"
    v-on:scroll.native="handleScroll"
    :tooltip="isFixed ? '' : tooltipText"
    :position="position"
    @mouseover="showPosition"
    @touchstart="showPosition"
    @mouseleave="close"
    @touchmove="close"
    @mouseout="close"
    :class="['cursor-default', isFixed ? '' : 'relative']"
  >
    <div
      v-if="isFixed && !!props.tooltipText && isInfoStepIntersecting"
      ref="popover"
      class="bg-white min-w-[100px] min-h-[50px] text-second-100 p-[10px] text-[0.7em] border border-[#666666] hidden break-words z-50 py-4"
    >
      {{ props.tooltipText }}
    </div>
    <slot />
  </div>
</template>

<style lang="scss">
[tooltip] {
  // used for slot editing
  & > * {
    display: inline-block;
  }
  z-index: 10;
  &:before,
  &:after {
    text-transform: none; /* opinion 2 */
    font-size: 0.9em; /* opinion 3 */
    line-height: 1;
    user-select: none;
    pointer-events: none;
    position: absolute;
    display: none;
    opacity: 0;
  }
  &:before {
    content: "";
    border: 5px solid transparent; /* opinion 4 */
    z-index: 11; /* absurdity 1 */
  }
  &:after {
    content: attr(tooltip); /* magic! */

    /* most of the rest of this is opinion */
    font-family: Helvetica, sans-serif;
    text-align: center;

    /*
    Let the content set the size of the tooltips
    but this will also keep them from being obnoxious
    */
    min-width: 10em;
    padding: 0.5rem;
    border-radius: 0.3rem;
    box-shadow: 0 1em 2em -0.5em rgba(0, 0, 0, 0.35);
    background: rgb(255, 255, 255);
    color: #455061;
    z-index: 10; /* absurdity 2 */
    border: 1px solid #666666;
  }
  &:hover:before,
  &:hover:after {
    display: block;
  }
  /* position: TOP */
  &:not([position]):before,
  &[position^="top"]:before {
    bottom: 100%;
    border-bottom-width: 0;
    border-top-color: #706f6f;
  }
  &:not([position]):after,
  &[position^="top"]::after {
    bottom: calc(100% + 5px);
  }

  &:not([position])::before,
  &:not([position])::after,
  &[position^="top"]::before,
  &[position^="top"]::after {
    left: 50%;
    transform: translate(-50%, -0.5em);
  }

  /* position: BOTTOM */
  &[position^="bottom"]::before {
    top: 105%;
    border-top-width: 0;
    border-bottom-color: #c5c5c5;
  }
  &[position^="bottom"]::after {
    top: calc(105% + 5px);
  }
  &[position^="bottom"]::before,
  &[position^="bottom"]::after {
    left: 50%;
    transform: translate(-50%, 0.5em);
  }

  /* position: LEFT */
  &[position^="left"]::before {
    top: 50%;
    border-right-width: 0;
    border-left-color: #c5c5c5;
    left: calc(0em - 5px);
    transform: translate(-0.5em, -50%);
  }
  &[position^="left"]::after {
    top: 50%;
    right: calc(100% + 5px);
    transform: translate(-0.5em, -50%);
  }

  /* position: RIGHT */
  &[position^="right"]::before {
    top: 50%;
    border-left-width: 0;
    border-right-color: #c5c5c5;
    right: calc(0em - 5px);
    transform: translate(0.5em, -50%);
  }
  &[position^="right"]::after {
    top: 50%;
    left: calc(100% + 5px);
    transform: translate(0.5em, -50%);
  }

  /* FX All The Things */
  &:not([position]):hover::before,
  &:not([position]):hover::after,
  &[position^="top"]:hover::before,
  &[position^="top"]:hover::after,
  &[position^="bottom"]:hover::before,
  &[position^="bottom"]:hover::after {
    animation: tooltips-vert 300ms ease-out forwards;
  }

  &[position^="left"]:hover::before,
  &[position^="left"]:hover::after,
  &[position^="right"]:hover::before,
  &[position^="right"]:hover::after {
    animation: tooltips-horz 300ms ease-out forwards;
  }
}

/* don't show empty tooltips */
[tooltip=""]::before,
[tooltip=""]::after {
  display: none !important;
}

/* KEYFRAMES */
@keyframes tooltips-vert {
  to {
    opacity: 1;
    transform: translate(-50%, 0);
  }
}

@keyframes tooltips-horz {
  to {
    opacity: 1;
    transform: translate(0, -50%);
  }
}
</style>
