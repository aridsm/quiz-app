import { ChipColors } from "~/enums/chipColors";
import { QuizCategoryType } from "~/enums/quizCategoryType";

interface QuizStyles {
  [key: number]: {
    name: string;
    color: number;
  };
}

export default function getCategoryData(id: number) {
  const quizzesStyles: QuizStyles = {
    [QuizCategoryType.Biology]: {
      color: ChipColors.Pink,
      name: "Biologia",
    },
    [QuizCategoryType.Geography]: {
      color: ChipColors.Green,
      name: "Geografia",
    },
    [QuizCategoryType.Mathematics]: {
      color: ChipColors.White,
      name: "Matemática",
    },
  };

  const name = quizzesStyles[id].name;
  const color = quizzesStyles[id].color;

  return { name, color, quizzesStyles };
}
