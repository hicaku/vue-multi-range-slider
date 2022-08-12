<script setup lang="ts">
import RangeSlider from "@/components/RangeSlider.vue";
</script>

<template>
    <main class="h-screen overflow-hidden bg-gray-700">
        <RangeSlider :min="0" :max="1" :steps="0.1" :labels="['Min', 'Max']" />
    </main>
</template>
