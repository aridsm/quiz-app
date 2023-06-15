<template>
  <div
    class="px-4 py-2 w-fit rounded-sm text-[.83rem] tracking-wider leading-none block text-quiz-grey-400"
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
    classes = "bg-quiz-blue";
  } else if (props.color === ChipColors.White) {
    classes = "bg-quiz-white";
  } else if (props.color === ChipColors.Pink) {
    classes = "bg-quiz-pink";
  }
  return classes;
});
</script>
