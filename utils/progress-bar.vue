<template>
  <div class="bg-quiz-blue-200 w-36 h-[.30rem] relative">
    <div
      v-if="showValue"
      class="bg-quiz-green-light text-quiz-green-dark text-base absolute w-7 h-7 rounded-full grid place-items-center -top-[0.7rem] -ml-3"
      :style="{ left: barPercentageWidth + '%' }"
    >
      {{ value }}
    </div>
    <div
      class="bg-quiz-green-light h-full"
      :style="{ width: barPercentageWidth + '%' }"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
  maxValue: number;
  value: number;
  showValue?: boolean;
}

const props = defineProps<Props>();

const barPercentageWidth = computed<number>(
  () => (100 * props.value) / props.maxValue
);
</script>
