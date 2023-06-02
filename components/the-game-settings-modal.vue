<template>
  <quiz-modal-overlay :model.sync="modals.modalGameSettingsIsOpen">
    <div style="width: 32rem">
      <h3>
        <span class="text-quiz-white">Nova partida</span>
        <span class="text-quiz-blue-100">({{ gameSettings.quizName }})</span>
      </h3>
      <ol class="my-6 flex flex-col gap-8">
        <li v-if="gameSettings.quizType">
          <quiz-x-title>Adivinhar</quiz-x-title>
          <quiz-x-radios
            :items="fields.geoQuizTypes"
            @getSelected="getSelectedGeoQuizType"
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
import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useModals } from "~/store/modals";
import { useGameSettings } from "~/store/gameSettings";
import { AnswerMode } from "~/enums/answerMode";
import { GeographyQuizType } from "~/enums/geographyQuizType";
import { GeographyAnswerType } from "~/enums/geographyAnswerType";

const storeModals = useModals();
const storeGameSettings = useGameSettings();

const { modals } = storeToRefs(storeModals);
const { gameSettings } = storeToRefs(storeGameSettings);

function getSelectedAnswerMode(value: AnswerMode) {
  gameSettings.value.answerMode = value;
}

function getSelectedNumberOfQuestions(value: number) {
  gameSettings.value.numberOfQuestions = value;
}

function getSelectedGeoQuizType(value: number) {
  gameSettings.value.geoQuizType = value;
}

function getSelectedCountdown(value: number) {
  gameSettings.value.countdown = value;
}

function startNewGame() {}

const fields = computed(() => {
  const answerModeFields = [
    {
      value: AnswerMode.WriteAnswer,
      name: "Digitar resposta",
    },
    {
      value: AnswerMode.MultipleChoice,
      name: "Múltipla escolha",
    },
  ];

  const numberOfQuestion = [
    {
      value: 5,
    },
    {
      value: 10,
    },
    {
      value: 15,
    },
    {
      value: 20,
    },
  ];

  const countdownValues = [
    {
      value: 10,
    },
    {
      value: 20,
    },
    {
      value: 60,
    },
    {
      value: false,
      name: "Sem cronômetro",
    },
  ];

  let geoQuizTypes;
  const name = gameSettings.value.isCountry ? "País" : "Estado";

  if (gameSettings.value.quizType === GeographyQuizType.Flag) {
    geoQuizTypes = [
      {
        value: GeographyAnswerType.FromFlag,
        name: `${name} a partir da Bandeira`,
      },
      {
        value: GeographyAnswerType.ToFlag,
        name: `Bandeira a partir do ${name}`,
      },
    ];
  } else if (gameSettings.value.quizType === GeographyQuizType.Capital) {
    geoQuizTypes = [
      {
        value: GeographyAnswerType.FromCapital,
        name: `${name} a partir da capital`,
      },
      {
        value: GeographyAnswerType.ToCapital,
        name: `Capital a partir do ${name}`,
      },
    ];
  }

  return { answerModeFields, numberOfQuestion, countdownValues, geoQuizTypes };
});
</script>
