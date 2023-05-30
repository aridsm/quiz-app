import { ChipColors } from "~/enums/chipColors";
import { GameStatus } from "~/enums/gameStatus";

interface GameStyles {
  [key: number]: {
    name: string;
    color: number;
  };
}

export default function getGameStatusData(id: number) {
  const gameStyles: GameStyles = {
    [GameStatus.Fail]: {
      color: ChipColors.Pink,
      name: "Falhou",
    },
    [GameStatus.Win]: {
      color: ChipColors.Green,
      name: "Finalizado",
    },
  };

  const name = gameStyles[id].name;
  const color = gameStyles[id].color;

  return { name, color };
}
