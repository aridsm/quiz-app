export interface Tooltip {
  isShown: boolean;
  text: string;
  position: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
}
