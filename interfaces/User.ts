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
  categoriesPlayed: {
    geography: number;
    mathematics: number;
    biology: number;
  };
  lastGamesPlayed: string[];
}
