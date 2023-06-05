<template>
  <quiz-modal-overlay :model.sync="modals.modalGameSettingsIsOpen">
    <div style="width: 32rem">
      <h3>
        <span class="text-quiz-white">Nova partida</span>
        <span class="text-quiz-blue-100">({{ gameSettings.quizName }})</span>
      </h3>
      <ol class="my-6 flex flex-col gap-8">
        <li v-if="showQuizTypes">
          <quiz-x-title>Adivinhar</quiz-x-title>
          <quiz-x-radios
            :items="fields.quizModes"
            :selected-value="gameSettings.geoQuizType"
            @getSelected="getSelectedQuizMode"
          />
        </li>
        <li v-if="gameSettings.acceptAnswerMode">
          <quiz-x-title> Modo de resposta </quiz-x-title>
          <quiz-x-radios
            :items="fields.answerModeFields"
            :selected-value="gameSettings.answerMode"
            :disabled="disableAnswerModeField"
            @getSelected="getSelectedAnswerMode"
          />
        </li>
        <li>
          <quiz-x-title>Cronômetro (segundos)</quiz-x-title>
          <quiz-x-radios
            :items="fields.countdownValues"
            :selected-value="gameSettings.countdown"
            @getSelected="getSelectedCountdown"
          />
        </li>
        <li>
          <quiz-x-title>Número de perguntas</quiz-x-title>
          <quiz-x-radios
            :items="fields.numberOfQuestion"
            :selected-value="gameSettings.numberOfQuestions"
            @getSelected="getSelectedNumberOfQuestions"
          />
        </li>
      </ol>
      <quiz-btn class="w-full" @click="startNewGame">Começar</quiz-btn>
    </div>
  </quiz-modal-overlay>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useRouter } from "@nuxtjs/composition-api";
import { useModals } from "~/store/modals";
import { useGameSettings } from "~/store/gameSettings";
import { AnswerMode } from "~/enums/answerMode";
import getFields from "~/utilities/getFields";
import { useCurrentGame } from "~/store/currentGame";
import { QuizCategoryType } from "~/enums/quizCategoryType";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizType } from "~/enums/quizType";

const storeModals = useModals();
const storeGameSettings = useGameSettings();
const currentGame = useCurrentGame();

const { modals } = storeToRefs(storeModals);
const { gameSettings } = storeToRefs(storeGameSettings);
const storeModal = useModals();

const router = useRouter();

const showQuizTypes = computed(() => {
  return gameSettings.value.category === QuizCategoryType.Geography;
});

const disableAnswerModeField = computed(() => {
  return (
    (gameSettings.value.quizId === QuizType.BrazilStatesFlag ||
      gameSettings.value.quizId === QuizType.CountryFlag) &&
    gameSettings.value.geoQuizType === GeoQuizType.FromStateCountry
  );
});

const fields = computed(() => {
  return getFields(gameSettings.value);
});

function getSelectedAnswerMode(value: AnswerMode) {
  gameSettings.value.answerMode = value;
}

function getSelectedNumberOfQuestions(value: number) {
  gameSettings.value.numberOfQuestions = value;
}

function getSelectedQuizMode(value: number) {
  gameSettings.value.geoQuizType = value;

  if (disableAnswerModeField.value) {
    gameSettings.value.answerMode = AnswerMode.MultipleChoice;
  }
}

function getSelectedCountdown(value: number) {
  gameSettings.value.countdown = value;
}

function startNewGame() {
  currentGame.createNewGame();
  router.push("/game");
  storeModal.modals.modalGameSettingsIsOpen = false;
}
</script>
