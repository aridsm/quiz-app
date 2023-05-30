<template>
  <div class="relative">
    <div ref="searchBar" class="flex items-center relative">
      <quiz-input-text
        :model="inputValue"
        class="bg-quiz-blue-300 w-full"
        placeholder="Procurar quiz..."
        @input="onChangeInputValue"
      />
      <icon-quiz-search class="w-4 absolute right-4 text-quiz-blue-100" />
    </div>

    <quiz-x-card
      class="opacity-0 absolute w-full search-list"
      :class="{ 'opacity-100': toggleIsOpen }"
    >
      <ul>
        <li>resultado</li>
      </ul>
    </quiz-x-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useOutsideClick from "~/utilities/useOutsideClick";

const inputValue = ref<string>("");
const searchBar = ref<HTMLDivElement | null>(null);

const { toggleIsOpen } = useOutsideClick(searchBar);

function onChangeInputValue(value: string) {
  if (value.length) {
    toggleIsOpen.value = true;
  }
}
</script>

<style scoped>
.search-list {
  top: calc(100% + 0.5rem);
}
</style>
