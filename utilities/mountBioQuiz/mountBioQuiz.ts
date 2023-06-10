import { ref } from "vue";
import { storeToRefs } from "pinia";
import getRandomIndex from "../getRandomIndex";
import generateQuestion from "./generateQuestion";
import { Question } from "~/interfaces/Question";
import { useCurrentGame } from "~/store/currentGame";
import { useQuizzes } from "~/store/quizzes";
import { Quiz } from "~/interfaces/Quiz";

function useMountQuiz() {
  const questions = ref<any[]>([]);

  const currentGameStore = useCurrentGame();
  const { currentGame } = storeToRefs(currentGameStore);
  const { quizzes } = useQuizzes();

  const quizData = quizzes.find(
    (quiz: Quiz) => quiz.id === currentGame.value.quizId
  ) as Quiz;

  function mountQuiz() {
    const items = require("../../" + quizData.source);

    const itemsCloned = JSON.parse(JSON.stringify(items));

    const questions = [] as Question[];
    const usedIndexes: number[] = [];

    while (questions.length < currentGame.value.totalQuestions!) {
      const randomIndex = getRandomIndex(itemsCloned.length, usedIndexes);

      console.log(itemsCloned);

      const question = generateQuestion(
        currentGame.value,
        randomIndex,
        itemsCloned
      );

      questions.push(question);
      usedIndexes.push(randomIndex);
    }

    return questions;
  }

  questions.value = mountQuiz();

  return mountQuiz();
}

export default useMountQuiz;
