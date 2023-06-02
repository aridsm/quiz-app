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
            @getSelected="getSelectedQuizMode"
          />
        </li>
        <li v-if="gameSettings.acceptAnswerMode">
          <quiz-x-title>Modo de resposta</quiz-x-title>
          <quiz-x-radios
            :items="fields.answerModeFields"
            :selected-value="gameSettings.answerMode"
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
import { useModals } from "~/store/modals";
import { useGameSettings } from "~/store/gameSettings";
import { AnswerMode } from "~/enums/answerMode";
import getFields from "~/utilities/getFields";
import { QuizType } from "~/enums/quizType";

const storeModals = useModals();
const storeGameSettings = useGameSettings();

const { modals } = storeToRefs(storeModals);
const { gameSettings } = storeToRefs(storeGameSettings);

const showQuizTypes = computed(() => {
  return (
    gameSettings.value.quizId === QuizType.CountryFlag ||
    gameSettings.value.quizId === QuizType.BrazilStatesFlag
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
}

function getSelectedCountdown(value: number) {
  gameSettings.value.countdown = value;
}

function startNewGame() {}
</script>
