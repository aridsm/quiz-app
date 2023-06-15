<template>
  <div
    class="z-[999] tooltip opacity-0 pointer-events-none transition absolute w-max bg-quiz-blue text-quiz-blue-dark py-2 px-4 rounded-md text-sm"
    :class="{ 'opacity-100': tooltip.isShown }"
    :style="{
      top: `${tooltip.position.top - 20}px`,
      left: `${tooltip.position.left - 10}px`,
    }"
  >
    {{ tooltip.text }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useTooltip } from "~/store/tooltip";

const tooltipStore = useTooltip();
const { tooltip } = storeToRefs(tooltipStore);
</script>

<style scoped>
.tooltip {
  box-shadow: 4px 4px 10px 0 rgba(13, 10, 31, 0.2);
}
.tooltip::after {
  content: "";
  top: calc(100% - 4px);
  @apply block absolute bg-quiz-blue w-2 h-2 rotate-45;
}
</style>
