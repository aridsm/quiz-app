<template>
  <div
    class="px-4 py-2 w-fit rounded-sm text-[.83rem] tracking-wider leading-none block"
    :class="colorClasses"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ChipColors } from "~/enums/chipColors";

interface Props {
  color?: ChipColors;
}

const props = withDefaults(defineProps<Props>(), {
  color: ChipColors.Green,
});

const colorClasses = computed<string>(() => {
  let classes: string = "";
  if (props.color === ChipColors.Green) {
    classes = "bg-quiz-green-light text-quiz-blue-400";
  } else if (props.color === ChipColors.White) {
    classes = "bg-quiz-white text-quiz-blue-400";
  } else if (props.color === ChipColors.Pink) {
    classes = "bg-quiz-pink text-quiz-white";
  }
  return classes;
});
</script>
