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

  const isQuizWithCapital =
    gameSettings.quizId === QuizType.CountryCapital ||
    gameSettings.quizId === QuizType.BrazilStatesCapital;

  const isQuizWithCountry =
    gameSettings.quizId === QuizType.CountryCapital ||
    gameSettings.quizId === QuizType.CountryFlag;

  let local: string = "";
  let type: string = "";

  if (isQuizWithCountry) {
    local = "País";
  } else {
    local = "Estado";
  }

  if (isQuizWithCapital) {
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
      value: GeoQuizType.FromStateCountry,
      name: `${type} a partir do ${local}`,
    },
  ];

  return { answerModeFields, numberOfQuestion, quizModes };
}

export default getFields;
