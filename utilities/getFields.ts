import { AnswerMode } from "~/enums/answerMode";
import { GeoQuizType } from "~/enums/geoQuizType";
import { QuizType } from "~/enums/quizType";
import { GameSetting } from "~/interfaces/GameSetting";

function getFields(gameSettings: GameSetting) {
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

  const local = gameSettings.isCountry ? "País" : "Estado";
  let type: string = "";

  if (
    gameSettings.quizId === QuizType.CountryCapital ||
    gameSettings.quizId === QuizType.BrazilStatesCapital
  ) {
    type = "Capital";
  } else {
    type = "Bandeira";
  }

  const quizModes = [
    {
      value: GeoQuizType.FromFlagCapital,
      name: `${local} a partir da ${type}`,
    },
    {
      value: GeoQuizType.ToFlagCapital,
      name: `${type} a partir do ${local}`,
    },
  ];

  return { answerModeFields, numberOfQuestion, countdownValues, quizModes };
}

export default getFields;
