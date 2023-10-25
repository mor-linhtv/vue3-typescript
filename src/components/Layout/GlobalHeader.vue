<template>
	<div>
		<div class="flex h-16 p-5 bg-white">
			<div class="text-2xl font-bold ">discovery</div>
		</div>
		<div class="flex items-center h-[67px] px-6 py-4 bg-[#285A89]">
			<HamburgerButton class="w-8 h-8" v-model="isOpen"/>
			<div class="text-2xl font-bold leading-6 text-white">ハイライト</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref, watchEffect } from "vue";
import HamburgerButton from "@/components/Elements/HamburgerButton/HamburgerButton.vue";

const emit = defineEmits<{
  (e: 'toggleSidebar', open: boolean): void
}>()

const isOpen = ref(false)

watchEffect(() => {
	emit('toggleSidebar', isOpen.value)
})
</script>
