import generateOtherAnswers from "./generateOtherAnswers";
import { AnswerMode } from "~/enums/answerMode";

export default function generateQuestion(
  { answerMode }: any,
  index: number,
  items: any
) {
  let otherAnswers: string[] = [];

  if (answerMode === AnswerMode.MultipleChoice) {
    otherAnswers = generateOtherAnswers(index, items);
  }

  return {
    question: items[index].question,
    item: null,
    otherAnswers,
    correctAnswer: items[index].correctAnswer,
  };
}
