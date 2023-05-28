<template>
  <div class="bg-quiz-blue-200 w-36 h-[.30rem]">
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
}

const props = defineProps<Props>();

const barPercentageWidth = computed<number>(
  () => (100 * props.value) / props.maxValue
);
</script>
