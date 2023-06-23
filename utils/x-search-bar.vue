<template>
  <div class="relative">
    <div ref="searchBar" class="flex items-center relative">
      <quiz-input-text
        :model.sync="inputValue"
        class="w-full bg-quiz-grey-300"
        placeholder="Procurar quiz..."
        @input="onChangeInputValue"
      />
      <icon-quiz-search class="w-4 absolute right-4 text-quiz-grey-100" />
    </div>
    <quiz-x-card
      v-if="showResultsList"
      class="opacity-0 absolute w-full search-list"
      :class="{ 'opacity-100': toggleIsOpen }"
    >
      <ul v-if="results.length">
        <li v-for="quiz in results" :key="quiz.id">
          <nuxt-link to="/" class="hover:text-quiz-blue">{{
            quiz.name
          }}</nuxt-link>
        </li>
      </ul>
      <p v-else class="text-quiz-grey-100">Não foram encontrados resultados!</p>
    </quiz-x-card>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { Quiz } from "~/interfaces/Quiz";
import { useQuizzes } from "~/store/quizzes";
import useOutsideClick from "~/utilities/useOutsideClick";

interface Props {
  showResultsList?: boolean;
  category?: QuizCategoryType;
}

const props = withDefaults(defineProps<Props>(), {
  showResultsList: true,
  category: undefined,
});

const inputValue = ref<string>("");
const searchBar = ref<HTMLDivElement | null>(null);
const results = ref<Quiz[]>([]);

const { toggleIsOpen } = useOutsideClick(searchBar);
const quizStore = useQuizzes();

const emit = defineEmits(["onUpdate"]);

watch(
  () => props.category,
  () => {
    onChangeInputValue();
  }
);

function onChangeInputValue() {
  results.value = quizStore.filterBy({
    name: inputValue.value,
    category: props.category,
  });
  emit("onUpdate", inputValue.value, results.value);
  if (inputValue.value.length) {
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
