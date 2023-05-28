<template>
  <input
    :value="model"
    type="text"
    autocomplete="off"
    autocorrect="off"
    name="input-text"
    :placeholder="placeholder"
    :required="required"
    class="w-fit p-4 rounded-md bg-quiz-blue-200 border-quiz-border inline-block outline-none placeholder:text-quiz-blue-100"
    @input="updateValue"
  ></input>
</template>

<script lang="ts" setup>
interface Props {
  placeholder?: string;
  required?: boolean;
  model: String;
}

withDefaults(defineProps<Props>(), {
  placeholder: "Digite...",
  required: false,
});

const emit = defineEmits(["update:model"]);

function updateValue(e: Event): void {
  emit("update:model", (e.target as HTMLInputElement).value);
}
</script>
