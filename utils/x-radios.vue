<template>
  <div class="flex">
    <button
      v-for="item in items"
      :key="item.value"
      class="bg-quiz-blue-200 px-8 py-3 button-select relative hover:text-quiz-green-light flex-1 min-w-max text-base"
      :class="{ 'button-select-selected': item.value === selected }"
      @click="() => onChangeSelectedValue(item.value)"
    >
      {{ item.name ? item.name : item.value }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

interface Item {
  name?: string;
  value: any;
}

interface Props {
  items: Item[];
  selectedValue?: any;
}

const props = defineProps<Props>();
const emit = defineEmits(["getSelected"]);

const selected = ref<any>(
  props.selectedValue ? props.selectedValue : props.items[0].value
);

function onChangeSelectedValue(value: any) {
  selected.value = value;
  emit("getSelected", value);
}
</script>

<style scoped>
.button-select-selected {
  box-shadow: 0 0 0 2px #59ff88;
  z-index: 99;
  @apply text-quiz-green-light;
}

.button-select:first-of-type {
  @apply rounded-l-md;
}

.button-select:last-of-type {
  @apply rounded-r-md;
}
</style>
