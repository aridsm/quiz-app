import getRandomIndex from "./getRandomIndex";
import { QuizType } from "~/enums/quizType";
import { GeoQuizType } from "~/enums/geoQuizType";
import { AnswerMode } from "~/enums/answerMode";

function generateOtherAnswers(
  geoQuizType: GeoQuizType,
  quizId: QuizType,
  correctAnswerIndex: number
) {
  const otherAnswers: any[] = [];
  const usedIndexes: number[] = [correctAnswerIndex];
  const totalMultipleChoiceQuestions = 4;

  const data = require("../quizzes/capitals/brazil.json");
  const itemsCloned = JSON.parse(JSON.stringify(data));

  while (otherAnswers.length < totalMultipleChoiceQuestions) {
    const randomIndex = getRandomIndex(itemsCloned.length, usedIndexes);

    const guessFromFlagOrCapital = geoQuizType === GeoQuizType.FromFlagCapital;

    const guessStateFromFlag =
      quizId === QuizType.BrazilStatesFlag &&
      geoQuizType === GeoQuizType.FromStateCountry;

    const guessStateFromCapital =
      quizId === QuizType.BrazilStatesCapital &&
      geoQuizType === GeoQuizType.FromStateCountry;

    if (guessFromFlagOrCapital) {
      otherAnswers.push(itemsCloned[randomIndex].state);
    }

    if (guessStateFromFlag) {
      otherAnswers.push(itemsCloned[randomIndex].flagPath);
    }

    if (guessStateFromCapital) {
      otherAnswers.push(itemsCloned[randomIndex].capital);
    }

    usedIndexes.push(randomIndex);
  }

  return otherAnswers;
}

function generateQuestion(
  geoQuizType: GeoQuizType,
  items: any[],
  index: number,
  quizId: QuizType,
  answerMode: AnswerMode
) {
  let type = "";
  if (quizId === QuizType.BrazilStatesCapital) {
    type = "a capital";
  } else if (quizId === QuizType.BrazilStatesFlag) {
    type = "a bandeira";
  }

  let otherAnswers: string[] = [];

  if (answerMode === AnswerMode.MultipleChoice) {
    otherAnswers = generateOtherAnswers(geoQuizType, quizId, index);
  }

  if (geoQuizType === GeoQuizType.FromStateCountry) {
    return {
      question: `Qual ${type} da unidade federativa abaixo?`,
      item: items[index].state,
      otherAnswers,
      correctAnswer:
        quizId === QuizType.BrazilStatesCapital
          ? items[index].capital
          : items[index].flagPath,
    };
  } else if (geoQuizType === GeoQuizType.FromFlagCapital) {
    return {
      question: `Qual a unidade federativa d${type} abaixo?`,
      item:
        quizId === QuizType.BrazilStatesCapital
          ? items[index].capital
          : items[index].flagPath,
      correctAnswer: items[index].state,
      otherAnswers,
    };
  }
}

function mountBrazilQuiz({
  totalQuestions,
  geoQuizType,
  quizId,
  answerMode,
}: any) {
  const items = require("../quizzes/capitals/brazil.json");
  const itemsCloned = JSON.parse(JSON.stringify(items));

  const questions = [];
  const usedIndexes = [];

  while (questions.length < totalQuestions) {
    const randomIndex = getRandomIndex(itemsCloned.length, usedIndexes);

    const question = generateQuestion(
      geoQuizType,
      itemsCloned,
      randomIndex,
      quizId,
      answerMode
    );

    questions.push(question);
    usedIndexes.push(randomIndex);
  }

  return questions;
}

export default mountBrazilQuiz;
