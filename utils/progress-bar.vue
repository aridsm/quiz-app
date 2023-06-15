<template>
  <div class="bg-quiz-grey-200 w-36 h-[.30rem] relative">
    <div
      v-if="showValue"
      class="bg-quiz-blue text-quiz-blue text-base absolute w-7 h-7 rounded-full grid place-items-center -top-[0.7rem] -ml-3"
      :style="{ left: barPercentageWidth + '%' }"
    >
      {{ value }}
    </div>
    <div
      class="bg-quiz-blue h-full transition bar-progress"
      :style="{ transform: `scaleX(${barPercentageWidth})` }"
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

const barPercentageWidth = computed<number>(() => props.value / props.maxValue);
</script>

<style scoped>
.bar-progress {
  transform-origin: 0 0;
  -webkit-transform-origin: 0 0;
}
</style>
