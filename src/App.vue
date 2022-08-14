<script setup lang="ts">
import RangeSlider from "@/components/RangeSlider.vue";
import { ref } from "vue";

const range = ref([0.1, 0.9]); // start value

const changeValue = ([minValue, maxValue]: [number, number]) => {
    console.log("newMinValue", minValue);
    console.log("newMaxValue", maxValue);
    console.log("newRange", range.value);
};
</script>

<template>
    <main class="h-screen overflow-hidden bg-gray-700">
        <RangeSlider @changeValue="changeValue" v-model="range" :min="0" :max="1" :steps="0.1" :labels="['Min', 'Max']" />
    </main>
</template>
