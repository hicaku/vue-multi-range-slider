<script lang="ts" setup>
import { ref, toRefs, type Ref } from "vue";

const props = defineProps({
    min: Number,
    max: Number,
    modelValue: Array,
    steps: Number,
    labels: Array,
});
const emits = defineEmits(["update:modelValue", "changeValue"]);

const { min, max, modelValue, steps, labels } = toRefs(props) as {
    min: Ref<number>;
    max: Ref<number>;
    modelValue: Ref<[number, number]>;
    steps: Ref<number>;
    labels: Ref<string[]>;
};

const minValue = ref(modelValue.value[0]);
const maxValue = ref(modelValue.value[1]);
const minThumb = ref(0);
const maxThumb = ref(0);

const changeValues = (input: "initial" | "minValue" | "maxValue") => {
    if (input === "initial") {
        updateMinValue();
        updateMaxValue();
    } else if (input === "minValue") {
        updateMinValue();
    } else if (input === "maxValue") {
        updateMaxValue();
    }
    if (input !== "initial") {
        emits("update:modelValue", [minValue.value, maxValue.value]);
        emits("changeValue", [minValue.value, maxValue.value]);
    }
};

const updateMinValue = () => {
    if (minValue.value < min.value) {
        minValue.value = min.value;
    } else {
        minValue.value = Math.min(minValue.value, maxValue.value - steps.value);
    }
    minThumb.value = ((minValue.value - min.value) / (max.value - min.value)) * 100;
};
const updateMaxValue = () => {
    if (maxValue.value > max.value) {
        maxValue.value = max.value;
    } else {
        maxValue.value = Math.max(maxValue.value, minValue.value + steps.value);
    }
    maxThumb.value = 100 - ((maxValue.value - min.value) / (max.value - min.value)) * 100;
};
changeValues("initial");
</script>
<style>
input[type="range"]::-webkit-slider-thumb {
    @apply w-6 h-6 appearance-none pointer-events-auto;
}
</style>
<template>
    <div class="h-screen flex justify-center items-center">
        <div init class="relative max-w-xl w-full">
            <div>
                <input
                    type="range"
                    :step="steps"
                    :min="min"
                    :max="max"
                    @input="changeValues('minValue')"
                    v-model="minValue"
                    class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                />

                <input
                    type="range"
                    :step="steps"
                    :min="min"
                    :max="max"
                    @input="changeValues('maxValue')"
                    v-model="maxValue"
                    class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                />

                <div class="relative z-10 h-2">
                    <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

                    <div class="absolute z-20 top-0 bottom-0 rounded-md bg-blue-500" :style="'right:' + maxThumb + '%; left:' + minThumb + '%'"></div>

                    <div class="absolute z-30 w-6 h-6 top-0 left-0 bg-blue-500 rounded-full -mt-2 -ml-1" :style="'right:' + maxThumb + '%; left:' + minThumb + '%'">
                        <span class="absolute z-10 text-center bottom-8 w-max bg-white px-1 rounded right-1/2 translate-x-1/2">{{ labels[0] }}</span>
                    </div>

                    <div class="absolute z-30 w-6 h-6 top-0 right-0 bg-blue-500 rounded-full -mt-2 -mr-3" :style="'right: ' + maxThumb + '%'">
                        <span class="absolute z-10 text-center bottom-8 w-max bg-white px-1 rounded right-1/2 translate-x-1/2">{{ labels[1] }}</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center py-5">
                <div>
                    <input @input="changeValues('minValue')" v-model="minValue" type="number" :step="steps" :min="min" :max="max" class="px-3 py-2 border border-gray-200 rounded w-24 text-center" />
                </div>
                <div>
                    <input @input="changeValues('maxValue')" v-model="maxValue" type="number" :step="steps" :min="min" :max="max" class="px-3 py-2 border border-gray-200 rounded w-24 text-center" />
                </div>
            </div>
        </div>
    </div>
</template>
