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

  let quizModes;
  const name = gameSettings.isCountry ? "País" : "Estado";

  const modeFlag = [
    {
      value: GeoQuizType.FromFlag,
      name: `${name} a partir da Bandeira`,
    },
    {
      value: GeoQuizType.ToFlag,
      name: `Bandeira a partir do ${name}`,
    },
  ];

  const modeCapital = [
    {
      value: GeoQuizType.FromCapital,
      name: `${name} a partir da capital`,
    },
    {
      value: GeoQuizType.ToCapital,
      name: `Capital a partir do ${name}`,
    },
  ];

  switch (gameSettings.quizId) {
    case QuizType.BrazilStatesFlag:
      quizModes = modeFlag;
      break;
    case QuizType.CountryFlag:
      quizModes = modeFlag;
      break;
    case QuizType.CountryCapital:
      quizModes = modeCapital;
      break;
    case QuizType.BrazilStatesCapital:
      quizModes = modeCapital;
      break;
    default:
      quizModes = undefined;
  }

  return { answerModeFields, numberOfQuestion, countdownValues, quizModes };
}

export default getFields;
