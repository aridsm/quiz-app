<template>
  <div class="relative">
    <button
      ref="toggleActivator"
      aria-label="Abrir opções"
      type="button"
      class="cursor-pointer flex items-center toggle-btn"
      :class="{
        active: toggleIsOpen,
      }"
      @click="openToggleHandler"
      @mouseenter="onHoverElement"
      @mouseleave="onLeaveElement"
    >
      <div>
        <slot name="activator" />
      </div>
      <icon-quiz-arrow
        v-if="arrowIndicator"
        class="w-3 h-3 icon-arrow -mt-2 text-inherit"
        :class="{
          'ml-2 side-right': arrowSide === 'right',
          'mr-2 -order-1 side-left': arrowSide === 'left',
        }"
      />
    </button>
    <quiz-x-card
      ref="toggleContent"
      class="absolute left-0 toggle-content min-w-[200px]"
      :class="{ active: toggleIsOpen, 'on-right-side': contentIsOutScreen }"
    >
      <slot name="content" />
    </quiz-x-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import QuizCard from "./x-card.vue";
import useOutsideClick from "~/utilities/useOutsideClick";

interface Props {
  arrowIndicator?: boolean;
  hoverClass?: string;
  arrowSide?: "left" | "right";
}

const props = withDefaults(defineProps<Props>(), {
  arrowIndicator: false,
  arrowSide: "right",
  hoverClass: "",
});

const toggleActivator = ref<HTMLButtonElement | null>(null);
const toggleContent = ref<InstanceType<typeof QuizCard> | null>(null);
const contentIsOutScreen = ref<boolean>(false);

const { toggleIsOpen } = useOutsideClick(toggleActivator);

const fixedHoverClasses = computed<string[]>(() => {
  const splitedString = props.hoverClass.split(/(\s+)/);
  const filteredClasses = splitedString.filter(
    (string: string) => string.trim().length
  );

  return filteredClasses;
});

function onHoverElement() {
  fixedHoverClasses.value.forEach((val: string) => {
    toggleActivator.value?.classList.add(val);
  });
}

function onLeaveElement() {
  fixedHoverClasses.value.forEach((val: string) => {
    toggleActivator.value?.classList.remove(val);
  });
}

function openToggleHandler() {
  toggleIsOpen.value = !toggleIsOpen.value;
  const positions = toggleContent.value?.$el.getBoundingClientRect()!;
  const width = positions.width;
  const left = positions.left;
  const windowWidth = window.innerWidth;

  if (width + left > windowWidth) {
    contentIsOutScreen.value = true;
  }
}
</script>

<style scoped>
.toggle-btn .icon-arrow {
  transition: all 0.1s ease-in;
  @apply inline-block;
}

.toggle-btn.active {
  @apply text-quiz-blue;
}

.toggle-btn.active .icon-arrow {
  @apply text-quiz-blue -mt-1;
}

.toggle-btn.active .icon-arrow.side-right {
  @apply rotate-90;
}

.toggle-btn.active .icon-arrow.side-left {
  @apply -rotate-90;
}

.toggle-content {
  top: calc(100% + 2rem);
  transition: all 0.1s ease-in;
  pointer-events: none;
  box-shadow: 4px 4px 10px 0 rgba(13, 10, 31, 0.2);
  @apply opacity-0;
}

.toggle-content.on-right-side {
  @apply left-auto -right-1;
}

.toggle-content.active {
  top: calc(100% + 1rem);
  transition: all 0.1s ease-in;
  pointer-events: all;
  @apply opacity-100;
}

.toggle-content::after {
  content: "";
  @apply block w-3 h-3 absolute -top-[6px] left-3 bg-quiz-grey-300 border-l-2 border-t-2 border-quiz-border rotate-45;
}

.toggle-content.on-right-side::after {
  @apply left-auto right-3;
}
</style>
