import { ref } from "vue";
import { storeToRefs } from "pinia";
import getRandomIndex from "../getRandomIndex";
import generateQuestion from "./generateGeoQuestions";
import { Question } from "~/interfaces/Question";
import { useCurrentGame } from "~/store/currentGame";

function useMountQuiz() {
  const questions = ref<any[]>([]);

  const currentGameStore = useCurrentGame();
  const { currentGame, isBrazilStates, isCountry } =
    storeToRefs(currentGameStore);

  function mountCountryQuiz() {
    let items;
    if (isBrazilStates.value) {
      items = require("../../quizzes/geography/brazil.json");
    } else if (isCountry.value) {
      items = require("../../quizzes/geography/countries.json");
    }

    const itemsCloned = JSON.parse(JSON.stringify(items));

    const questions = [] as Question[];
    const usedIndexes = [];

    while (questions.length < currentGame.value.totalQuestions) {
      const randomIndex = getRandomIndex(itemsCloned.length, usedIndexes);

      const question = generateQuestion(
        currentGame.value,
        randomIndex,
        itemsCloned,
        items
      );

      questions.push(question);
      usedIndexes.push(randomIndex);
    }

    return questions;
  }

  questions.value = mountCountryQuiz();

  return mountCountryQuiz();
}

export default useMountQuiz;
