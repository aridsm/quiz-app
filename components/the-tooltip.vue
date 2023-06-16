<template>
  <div
    ref="tooltipElement"
    class="z-[999] tooltip opacity-0 pointer-events-none transition absolute w-max bg-quiz-blue text-quiz-blue-dark py-2 px-4 rounded-md text-sm"
    :class="{ 'opacity-100': tooltip.isShown, 'on-right-side': onRightSide }"
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
import { onMounted, reactive, ref, watch } from "vue";
import { useTooltip } from "~/store/tooltip";

const tooltipStore = useTooltip();
const { tooltip } = storeToRefs(tooltipStore);
const tooltipElement = ref<HTMLDivElement | null>(null);
const onRightSide = ref<boolean>(false);
const onBottom = ref<boolean>(false);
const showTooltip = ref<boolean>(false);

const styles = reactive<any>({
  top: 0,
  left: 0,
});

onMounted(() => {
  console.log(tooltip.value.position);
  const element = tooltipElement.value?.getBoundingClientRect()!;
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  console.log(element.width + element.left > windowWidth);

  if (element.width + element.left > windowWidth) {
    onRightSide.value = true;
    styles.top = `${tooltip.value.position.top - 20}px`;
    styles.left = `${tooltip.value.position.left - element.width + 20}px`;
    return;
  }

  styles.top = `${tooltip.value.position.top - 20}px`;
  styles.left = `${tooltip.value.position.left - 10}px`;

  if (tooltip.value.isShown) {
    showTooltip.value = true;
  }
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
</style>
