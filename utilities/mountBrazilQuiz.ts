import getRandomIndex from "./getRandomIndex";
import { QuizType } from "~/enums/quizType";
import { GeoQuizType } from "~/enums/geoQuizType";

function generateQuestion(
  geoQuizType: GeoQuizType,
  items: any[],
  index: number,
  quizId: QuizType
) {
  let type = "";
  if (quizId === QuizType.BrazilStatesCapital) {
    type = "a capital";
  } else if (quizId === QuizType.BrazilStatesFlag) {
    type = "a bandeira";
  }

  if (geoQuizType === GeoQuizType.ToFlagCapital) {
    return {
      question: `Qual ${type} da unidade federativa abaixo?`,
      item: items[index].state,
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
    };
  }
}

function mountBrazilQuiz({ totalQuestions, geoQuizType, quizId }: any) {
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
      quizId
    );

    questions.push(question);
    usedIndexes.push(randomIndex);
  }

  return questions;
}

export default mountBrazilQuiz;
