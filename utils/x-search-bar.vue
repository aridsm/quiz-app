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
      <ul v-if="results.length">
        <li v-for="quiz in results" :key="quiz.id">
          <nuxt-link to="/" class="hover:text-quiz-green-light">{{
            quiz.name
          }}</nuxt-link>
        </li>
      </ul>
      <p v-else class="text-quiz-blue-100">Não foram encontrados resultados!</p>
    </quiz-x-card>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { Quiz } from "~/interfaces/Quiz";
import { useQuizzes } from "~/store/quizzes";
import useOutsideClick from "~/utilities/useOutsideClick";

const inputValue = ref<string>("");
const searchBar = ref<HTMLDivElement | null>(null);
const results = ref<Quiz[]>([]);

const { toggleIsOpen } = useOutsideClick(searchBar);
const quizStore = useQuizzes();

const { quizzes } = storeToRefs(quizStore);

function onChangeInputValue(value: string) {
  results.value = quizStore.searchQuizzesByName(value);
  if (value.length) {
    toggleIsOpen.value = true;
  } else {
    toggleIsOpen.value = false;
  }
}
</script>

<style scoped>
.search-list {
  top: calc(100% + 0.5rem);
}
</style>
