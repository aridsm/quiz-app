<template>
  <span class="relative">
    <div class="tooltip-activator" :class="activatorClasses">
      <slot />
    </div>
    <quiz-x-card
      class="opacity-0 absolute py-2 tooltip text-quiz-green-dark bg-quiz-green-light transition text-xs -left-2 block w-max z-[999]"
      >{{ title }}
    </quiz-x-card>
  </span>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  activatorClasses?: string;
}

defineProps<Props>();
</script>

<style scoped>
.tooltip-activator:hover ~ .tooltip {
  @apply opacity-100;
}

.tooltip {
  box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.06);
  bottom: calc(100% + 5px);
}

.tooltip::after {
  content: "";
  top: calc(100% - 4px);
  @apply block absolute bg-quiz-green-light w-2 h-2 rotate-45;
}
</style>
