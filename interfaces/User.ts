import { QuizCategory } from "./QuizCategory";

export interface User {
  userName: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  trophiesCount: number;
  coinsCount: number;
  isLogged: boolean;
  friendsCount: number;
  hasNotifications: boolean;
  categoriesPlayed: QuizCategory[];
}
