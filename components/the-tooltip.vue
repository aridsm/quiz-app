<template>
  <div
    ref="tooltipElement"
    class="z-[999] tooltip opacity-0 pointer-events-none transition absolute w-max max-w-[230px] bg-quiz-blue text-quiz-blue-dark py-2 px-4 rounded-md text-sm"
    :class="{ 'on-right-side': onRightSide }"
    :style="{
      top: styles.top,
      left: styles.left,
    }"
  >
    {{ tooltip.text }}
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, reactive, ref } from "vue";
import { useTooltip } from "~/store/tooltip";

const tooltipStore = useTooltip();
const { tooltip } = storeToRefs(tooltipStore);
const tooltipElement = ref<HTMLDivElement | null>(null);
const onRightSide = ref<boolean>(false);

const styles = reactive<any>({
  top: 0,
  left: 0,
});

onMounted(() => {
  const element = tooltipElement.value?.getBoundingClientRect()!;
  const windowWidth = window.innerWidth;

  const elementHeight = element.height;
  const elementLeftOutWindow = tooltip.value.position.left - element.width + 25;
  const elementLeft = tooltip.value.position.left - 10;
  const elementTop = tooltip.value.position.top - elementHeight;

  if (element.width + elementLeft > windowWidth) {
    onRightSide.value = true;
    styles.top = `${elementTop}px`;
    styles.left = `${elementLeftOutWindow}px`;
    return;
  }

  styles.top = `${elementTop}px`;
  styles.left = `${elementLeft}px`;
});
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

.tooltip.on-right-side::after {
  @apply right-3;
}
</style>
