<script lang="ts" setup>
import { ref, toRefs, type Ref } from "vue";

const props = defineProps({
    min: Number,
    max: Number,
    steps: Number,
    labels: Array,
});
const { min, max, steps, labels } = toRefs(props) as {
    min: Ref<number>;
    max: Ref<number>;
    steps: Ref<number>;
    labels: Ref<string[]>;
};

const inputValues = {
    min: ref(min.value + steps.value),
    max: ref(max.value - steps.value),
};
const minThumb = ref(0);
const maxThumb = ref(0);

const changeValue = (input: "minValue" | "maxValue") => {
    if (input === "minValue") {
        if (inputValues.min.value < min.value) {
            inputValues.min.value = min.value;
        } else {
            inputValues.min.value = Math.min(inputValues.min.value, inputValues.max.value - steps.value);
        }
        minThumb.value = ((inputValues.min.value - min.value) / (max.value - min.value)) * 100;
    } else if (input === "maxValue") {
        if (inputValues.max.value > max.value) {
            inputValues.max.value = max.value;
        } else {
            inputValues.max.value = Math.max(inputValues.max.value, inputValues.min.value + steps.value);
        }
        maxThumb.value = 100 - ((inputValues.max.value - min.value) / (max.value - min.value)) * 100;
    }
};
changeValue("minValue");
changeValue("maxValue");
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
                    @input="changeValue('minValue')"
                    v-model="inputValues.min"
                    class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                />

                <input
                    type="range"
                    :step="steps"
                    :min="min"
                    :max="max"
                    @input="changeValue('maxValue')"
                    v-model="inputValues.max"
                    class="absolute pointer-events-none appearance-none z-20 h-2 w-full opacity-0 cursor-pointer"
                />

                <div class="relative z-10 h-2">
                    <div class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"></div>

                    <div class="absolute z-20 top-0 bottom-0 rounded-md bg-green-300" :style="'right:' + maxThumb + '%; left:' + minThumb + '%'"></div>

                    <div class="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1" :style="'right:' + maxThumb + '%; left:' + minThumb + '%'">
                        <span class="absolute z-10 text-center bottom-8 w-max bg-white px-1 rounded right-1/2 translate-x-1/2">{{ labels[0] }}</span>
                    </div>

                    <div class="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3" :style="'right: ' + maxThumb + '%'">
                        <span class="absolute z-10 text-center bottom-8 w-max bg-white px-1 rounded right-1/2 translate-x-1/2">{{ labels[1] }}</span>
                    </div>
                </div>
            </div>

            <div class="flex justify-between items-center py-5">
                <div>
                    <input
                        @input="changeValue('minValue')"
                        v-model="inputValues.min"
                        type="number"
                        :step="steps"
                        :min="min"
                        :max="max"
                        class="px-3 py-2 border border-gray-200 rounded w-24 text-center"
                    />
                </div>
                <div>
                    <input
                        @input="changeValue('maxValue')"
                        v-model="inputValues['max']"
                        type="number"
                        :step="steps"
                        :min="min"
                        :max="max"
                        class="px-3 py-2 border border-gray-200 rounded w-24 text-center"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
