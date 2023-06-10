import { storeToRefs } from "pinia";
import getRandomIndex from "../getRandomIndex";
import { GeoQuizType } from "~/enums/geoQuizType";
import { useCurrentGame } from "~/store/currentGame";

export default function generateOtherAnswers(
  geoQuizType: GeoQuizType,
  correctAnswerIndex: number,
  itensJson: any
) {
  const otherAnswers: any[] = [];

  const usedIndexes: number[] = [correctAnswerIndex];
  const totalMultipleChoiceQuestions = 4;

  const itemsCloned = JSON.parse(JSON.stringify(itensJson));

  const currentGameStore = useCurrentGame();
  const { isFlag, isCapital } = storeToRefs(currentGameStore);

  const guessFromFlagOrCapital = geoQuizType === GeoQuizType.FromFlagCapital;

  const guessFlagFromPlace =
    isFlag.value && geoQuizType === GeoQuizType.FromStateCountry;

  const guessCapitalFromPlace =
    isCapital.value && geoQuizType === GeoQuizType.FromStateCountry;

  while (otherAnswers.length < totalMultipleChoiceQuestions) {
    const randomIndex = getRandomIndex(itemsCloned.length, usedIndexes);

    if (guessFromFlagOrCapital) {
      otherAnswers.push(itemsCloned[randomIndex].place);
    }

    if (guessFlagFromPlace) {
      otherAnswers.push(itemsCloned[randomIndex].flagPath);
    }

    if (guessCapitalFromPlace) {
      otherAnswers.push(itemsCloned[randomIndex].capital);
    }

    usedIndexes.push(randomIndex);
  }

  const randomIndex = getRandomIndex(otherAnswers.length);

  // add a resposta correta em uma posição aleatória na array de possíveis respostas
  if (guessFromFlagOrCapital) {
    otherAnswers.splice(randomIndex, 0, itemsCloned[correctAnswerIndex].place);
  }

  if (guessFlagFromPlace) {
    otherAnswers.splice(
      randomIndex,
      0,
      itemsCloned[correctAnswerIndex].flagPath
    );
  }

  if (guessCapitalFromPlace) {
    otherAnswers.splice(
      randomIndex,
      0,
      itemsCloned[correctAnswerIndex].capital
    );
  }

  return otherAnswers;
}
