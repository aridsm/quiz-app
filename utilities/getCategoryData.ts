import { ChipColors } from "~/enums/chipColors";
import { QuizCategoryType } from "~/enums/quizCategoryType";

interface QuizStyles {
  [key: number]: {
    name: string;
    color: number;
  };
}

export default function getCategoryData(id: number) {
  const quizzesNames: QuizStyles = {
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

  const name = quizzesNames[id].name;
  const color = quizzesNames[id].color;

  return { name, color };
}
