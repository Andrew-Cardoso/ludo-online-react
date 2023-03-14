export type DiceResult = 1 | 2 | 3 | 4 | 5 | 6;
export interface Dice {
  result: DiceResult;
  count: 0 | 1 | 2;
  rollAnimation: boolean;
  ableToRoll: boolean;
}
