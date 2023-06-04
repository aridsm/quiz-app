import { storeToRefs } from "pinia";
import getRandomIndex from "../getRandomIndex";
import { GeoQuizType } from "~/enums/geoQuizType";
import { useCurrentGame } from "~/store/currentGame";

export default function generateOtherAnswers(
  geoQuizType: GeoQuizType,
  correctAnswerIndex: number,
  itensJson: string
) {
  const otherAnswers: any[] = [];
  const usedIndexes: number[] = [correctAnswerIndex];
  const totalMultipleChoiceQuestions = 4;

  const itemsCloned = JSON.parse(JSON.stringify(itensJson));

  while (otherAnswers.length < totalMultipleChoiceQuestions) {
    const randomIndex = getRandomIndex(itemsCloned.length, usedIndexes);

    const currentGameStore = useCurrentGame();
    const { isFlag, isCapital } = storeToRefs(currentGameStore);

    const guessFromFlagOrCapital = geoQuizType === GeoQuizType.FromFlagCapital;

    const guessFlagFromPlace =
      isFlag && geoQuizType === GeoQuizType.FromStateCountry;

    const guessCapitalFromPlace =
      isCapital && geoQuizType === GeoQuizType.FromStateCountry;

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

  return otherAnswers;
}
