<template>
  <input
    :value="model"
    type="text"
    autocomplete="off"
    autocorrect="off"
    name="input-text"
    :placeholder="placeholder"
    :required="required"
    class="w-fit p-3 lg:p-4 rounded-md input bg-quiz-grey-200 border-2 border-quiz-border inline-block outline-none placeholder:text-quiz-grey-100"
    @input="updateValue"
    @change="$emit('change', model)"
    @keypress.enter="$emit('pressenter', model)"
  />
</template>

<script lang="ts" setup>
interface Props {
  placeholder?: string;
  required?: boolean;
  model: string;
}

withDefaults(defineProps<Props>(), {
  placeholder: "Digite...",
  required: false,
  model: "",
});

const emit = defineEmits(["update:model", "input"]);

function updateValue(e: Event): void {
  emit("update:model", (e.target as HTMLInputElement).value);
  emit("input", (e.target as HTMLInputElement).value);
}
</script>

<style scoped>
.input:focus {
  box-shadow: 0 0 0 2px #4ed7f5, 4px 4px 10px 0 rgba(13, 10, 31, 0.2);
}
</style>
