import { storeToRefs } from "pinia";
import generateOtherAnswers from "./generateOtherAnswers";
import { AnswerMode } from "~/enums/answerMode";
import { QuizType } from "~/enums/quizType";
import { GeoQuizType } from "~/enums/geoQuizType";
import { useCurrentGame } from "~/store/currentGame";

export default function generateQuestion(
  { geoQuizType, quizId, answerMode }: any,
  index: number,
  items: any,
  itemsJson: string
) {
  let otherAnswers: string[] = [];

  if (answerMode === AnswerMode.MultipleChoice) {
    otherAnswers = generateOtherAnswers(geoQuizType, index, itemsJson);
  }

  const currentGameStore = useCurrentGame();
  const { isBrazilStates, isCountry, isFlag, isCapital } =
    storeToRefs(currentGameStore);

  let type = "";
  if (isCapital.value) {
    type = "a capital";
  } else if (isFlag.value) {
    type = "a bandeira";
  }

  let place = "";
  if (isCountry.value) {
    place = "o país";
  } else if (isBrazilStates.value) {
    place = "o estado";
  }

  if (geoQuizType === GeoQuizType.FromStateCountry) {
    return {
      question: `Qual ${type} d${place} abaixo?`,
      item: items[index].place,
      otherAnswers,
      correctAnswer:
        quizId === QuizType.CountryCapital
          ? items[index].capital
          : items[index].flagPath,
    };
  } else {
    return {
      question: `Qual ${place} d${type} abaixo?`,
      item:
        quizId === QuizType.CountryCapital
          ? items[index].capital
          : items[index].flagPath,
      correctAnswer: items[index].place,
      otherAnswers,
    };
  }
}
