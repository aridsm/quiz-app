<template>
  <quiz-modal-overlay :model.sync="modals.modalGameSettingsIsOpen">
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
      <li>
        <quiz-x-title>Modo de resposta</quiz-x-title>
        <quiz-x-radios
          :items="fields.answerModeFields"
          :selected-value="gameSettings.answerMode"
          @getSelected="getSelectedAnswerMode"
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
    <quiz-btn class="w-full">Começar</quiz-btn>
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
  console.log(value);
}

function getSelectedNumberOfQuestions(value: number) {
  console.log(value);
}

function getSelectedGeoQuizType(value: number) {
  console.log(value);
}

console.log(gameSettings.value);

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

  return { answerModeFields, numberOfQuestion, geoQuizTypes };
});
</script>
