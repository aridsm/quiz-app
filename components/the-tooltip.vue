<template>
  <div
    class="z-[999] tooltip opacity-0 pointer-events-none transition absolute w-max bg-quiz-green-light text-quiz-green-dark py-2 px-4 rounded-md text-xs"
    :class="{ 'opacity-100': tooltip.isShown }"
    :style="{
      top: `${tooltip.position.top - 10}px`,
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
  box-shadow: 4px 4px 10px 0 rgba(32, 25, 78, 0.3);
}
.tooltip::after {
  content: "";
  top: calc(100% - 4px);
  @apply block absolute bg-quiz-green-light w-2 h-2 rotate-45;
}
</style>
