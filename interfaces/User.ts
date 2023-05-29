import { QuizCategoryType } from "~/enums/quizCategoryType";

export interface QuizCategory {
  id: QuizCategoryType;
  count: number;
  name: string;
}

export interface User {
  userName: string;
  avatarUrl: string;
  level: number;
  levelProgress: number;
  currentXp: number;
  trophiesCount: number;
  coinsCount: number;
  isLogged: boolean;
  soundOn: boolean;
  soundVolume: number;
  friendsCount: number;
  hasNotifications: boolean;
  totalGamesPlayed: number;
  categoriesPlayed: QuizCategory[];
  lastGamesPlayed: string[];
}
