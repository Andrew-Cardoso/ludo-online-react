import { Player } from './player';
import { Board } from './board';
import { Dice } from './dice';
import { Winners } from './winners';

export interface Game {
  id: string;
  players: Player[];
  board: Board;
  current: string;
  dice: Dice;
  winners: Winners;
}
