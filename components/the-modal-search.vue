<template>
  <quiz-modal-overlay :model.sync="storeModals.modals.modalSearchIsOpen">
    <div class="flex flex-col">
      <p class="mb-4 text-quiz-white">Pesquise pelo nome de um quiz</p>
      <quiz-input-text
        :model.sync="searchValue"
        class="py-3 text-base sm:min-w-[20rem] w-full"
        @input="searchQuiz"
      />
      <ul
        v-if="quizzesFiltered.length && searchValue"
        class="flex flex-col gap-2 mt-4"
      >
        <li
          v-for="quiz in quizzesFiltered"
          :key="quiz.id"
          class="text-base hover:text-quiz-blue"
        >
          <button
            class="flex justify-between w-full py-1 sm:py-0"
            @click="() => openModalGameSettings(quiz)"
          >
            <p class="text-left">{{ quiz.name }}</p>
            <p class="text-quiz-grey-100">
              {{ getCategoryData(quiz.category).name }}
            </p>
          </button>
        </li>
      </ul>
    </div>
  </quiz-modal-overlay>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Quiz } from "~/interfaces/Quiz";
import { useGameSettings } from "~/store/gameSettings";
import { useModals } from "~/store/modals";
import { useQuizzes } from "~/store/quizzes";
import getCategoryData from "~/utilities/getCategoryData";

const storeModals = useModals();
const storeQuizzes = useQuizzes();
const storeGameSettings = useGameSettings();

const searchValue = ref<string>("");
const quizzesFiltered = ref<Quiz[]>([]);

function searchQuiz() {
  quizzesFiltered.value = storeQuizzes.filterBy({ name: searchValue.value });
}

function openModalGameSettings(quiz: Quiz) {
  storeModals.modals.modalSearchIsOpen = false;
  searchValue.value = "";
  storeGameSettings.openModalGameSettings(quiz);
}
</script>
