<template>
	<button class="relative text-white focus:outline-none" @click="handleChange">
		<div class="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
			<span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
				:class="{ 'rotate-45': open, ' -translate-y-2': !open }"></span>
			<span aria-hidden="true"
				class="block absolute  h-0.5 w-5 bg-current -translate-y-[1px]   transform transition duration-500 ease-in-out"
				:class="{ 'opacity-0': open }"></span>
			<span aria-hidden="true" class="block absolute  h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out"
				:class="{ '-rotate-45': open, ' translate-y-1.5': !open }"></span>
		</div>
	</button>
</template>
<script setup lang="ts">
import { ref } from 'vue';


const emit = defineEmits<{
  (e: 'update:modelValue', open: boolean): void
}>()

const open = ref(false)
const handleChange = () => {
	open.value = !open.value
	emit('update:modelValue', open.value)
}
</script>