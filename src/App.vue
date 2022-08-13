<script setup lang="ts">
import RangeSlider from "@/components/RangeSlider.vue";
import { ref } from "vue";

const range = ref([0.1, 0.9]); // start value

const changeValue = ([minValue, maxValue]: [number, number]) => {
    console.log("minValue", minValue);
    console.log("maxValue", maxValue);
    range.value = [minValue, maxValue];
    console.log("range", range.value);
};
</script>

<template>
    <main class="h-screen overflow-hidden bg-gray-700">
        <RangeSlider v-model="range" @changeValue="changeValue" :range="range" :min="0" :max="1" :steps="0.1" :labels="['Min', 'Max']" />
    </main>
</template>
