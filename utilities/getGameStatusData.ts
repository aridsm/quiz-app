import { ChipColors } from "~/enums/chipColors";
import { CurrentGameStatus } from "~/enums/currentGameStatus";

interface GameStyles {
  [key: number]: {
    name: string;
    color: number;
  };
}

export default function getGameStatusData(id: number) {
  const gameStyles: GameStyles = {
    [CurrentGameStatus.Failed]: {
      color: ChipColors.Pink,
      name: "Falhou",
    },
    [CurrentGameStatus.Done]: {
      color: ChipColors.Green,
      name: "Finalizado",
    },
  };

  const name = gameStyles[id].name;
  const color = gameStyles[id].color;

  return { name, color };
}
