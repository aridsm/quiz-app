<template>
  <div class="flex">
    <button
      v-for="item in items"
      :key="item.value"
      class="bg-quiz-blue-200 px-8 py-3 button-select relative hover:text-quiz-green-light flex-1"
      :disabled="disabled?.condition && item.value === disabled.fieldValue"
      :class="{
        'button-select-selected': item.value === selectedValue,
      }"
      @click="() => onChangeSelectedValue(item.value)"
    >
      {{ item.name ? item.name : item.value }}
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Item {
  name?: string;
  value: any;
}

interface Props {
  items: Item[];
  selectedValue: any;
  disabled?: {
    fieldValue: any;
    condition: boolean;
  };
}

const props = defineProps<Props>();
const emit = defineEmits(["getSelected"]);

function onChangeSelectedValue(value: any) {
  if (props.disabled?.fieldValue === value && props.disabled?.condition) {
    return false;
  }
  emit("getSelected", value);
}
</script>

<style scoped>
.button-select:first-of-type {
  @apply rounded-l-md;
}

.button-select:last-of-type {
  @apply rounded-r-md;
}

.button-select:disabled {
  @apply text-quiz-blue-100 hover:text-quiz-blue-100 cursor-not-allowed;
}

.button-select-selected {
  box-shadow: 0 0 0 2px #59ff88;
  z-index: 99;
  @apply text-quiz-green-light;
}
</style>
