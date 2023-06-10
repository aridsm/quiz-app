import getRandomIndex from "../getRandomIndex";

export default function generateOtherAnswers(
  questionIndex: number,
  items: any
) {
  const otherAnswers: any[] = [];
  const usedIndexes: number[] = [];

  const totalMultipleChoiceQuestions = 4;

  while (otherAnswers.length < totalMultipleChoiceQuestions) {
    const randomIndex = getRandomIndex(
      items[questionIndex].otherAnswers.length,
      usedIndexes
    );

    otherAnswers.push(items[questionIndex].otherAnswers[randomIndex]);

    usedIndexes.push(randomIndex);
  }

  const randomIndex = getRandomIndex(otherAnswers.length);

  // add a resposta correta em uma posição aleatória na array de possíveis respostas
  otherAnswers.splice(randomIndex, 0, items[questionIndex].correctAnswer);

  return otherAnswers;
}
