<script setup lang="ts">
import { onMounted, ref } from 'vue';

const model = defineModel<string>({ required: true });

const input = ref<HTMLInputElement | null>(null);

onMounted(() => {
    if (input.value?.hasAttribute('autofocus')) {
        input.value?.focus();
    }
});

defineExpose({ focus: () => input.value?.focus() });
</script>

<template>
    <input
        class="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm py-2 px-4 w-full"
        v-model="model"
        ref="input"
    />
</template>


<style scoped>
input{
    box-shadow: 0 0 1.4px inset rgb(46, 46, 46);
    border: none !important;
    outline: none !important;
}
input:focus{
    box-shadow: 0 0 2.3px   rgb(98, 97, 97);
}
</style>
