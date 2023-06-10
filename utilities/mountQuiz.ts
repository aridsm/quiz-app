import { ref } from "vue";
import { storeToRefs } from "pinia";
import getRandomIndex from "./getRandomIndex";
import generateQuestion from "./mountBioOrMathQuiz/generateQuestion";
import generateGeoQuestion from "./mountGeoQuiz/generateGeoQuestions";
import { Question } from "~/interfaces/Question";
import { useCurrentGame } from "~/store/currentGame";
import { useQuizzes } from "~/store/quizzes";
import { Quiz } from "~/interfaces/Quiz";
import { QuizCategoryType } from "~/enums/quizCategoryType";

function useMountQuiz() {
  const questions = ref<any[]>([]);

  const currentGameStore = useCurrentGame();
  const { currentGame } = storeToRefs(currentGameStore);
  const { quizzes } = useQuizzes();

  const quizData = quizzes.find(
    (quiz: Quiz) => quiz.id === currentGame.value.quizId
  ) as Quiz;

  function mountQuiz() {
    const items = require("../" + quizData.source);

    const questions = [] as Question[];
    const usedIndexes: number[] = [];

    while (questions.length < currentGame.value.totalQuestions!) {
      const randomIndex = getRandomIndex(items.length, usedIndexes);

      let question: Question;

      if (quizData.category === QuizCategoryType.Geography) {
        question = generateGeoQuestion(currentGame.value, randomIndex, items);
      } else {
        question = generateQuestion(currentGame.value, randomIndex, items);
      }

      questions.push(question);
      usedIndexes.push(randomIndex);
    }

    return questions;
  }

  questions.value = mountQuiz();

  return mountQuiz();
}

export default useMountQuiz;
