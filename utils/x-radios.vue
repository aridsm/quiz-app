<template>
  <div class="flex">
    <button
      v-for="item in items"
      :key="item.value"
      class="bg-quiz-grey-400 px-4 md:px-8 py-2 md:py-3 button-select relative hover:text-quiz-blue flex-1"
      :disabled="isFieldDisabled(item.value)"
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
  disabled?:
    | boolean
    | {
        fieldValue: any;
        condition: boolean;
      };
}

const props = defineProps<Props>();
const emit = defineEmits(["getSelected"]);

function isFieldDisabled(fieldValue: any) {
  let disabled = false;
  if (typeof props.disabled === "object") {
    disabled =
      props.disabled?.condition && fieldValue === props.disabled.fieldValue;
  } else if (props.disabled) {
    disabled = props.disabled;
  }
  return disabled;
}

function onChangeSelectedValue(value: any) {
  if (typeof props.disabled === "object") {
    if (props.disabled?.fieldValue === value && props.disabled?.condition) {
      return false;
    }
  } else if (props.disabled === true) {
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
  @apply text-quiz-grey-100 hover:text-quiz-grey-100 cursor-not-allowed;
}

.button-select-selected {
  box-shadow: 0 0 0 2px #4ed7f5;
  z-index: 99;
  @apply text-quiz-blue bg-quiz-grey-300;
}
</style>
