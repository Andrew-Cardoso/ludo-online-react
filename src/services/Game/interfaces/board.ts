import { ColorSquare } from './color-square';
import { FinalSquare } from './final-square';
import { InitialSquare } from './initial-square';
import { Karyogamy } from './karyogamy';
import { Mitosis } from './mitosis';
import { MovePawn } from './move-pawn';
import { Pawn } from './pawn';
import { Square } from './square';

export interface Board {
  initialZone: ColorSquare<InitialSquare>;
  finalZone: ColorSquare<FinalSquare>;
  pawns: ColorSquare<Pawn>;
  road: Square[];
  karyogamy: Karyogamy;
  mitosis: Mitosis;
  movePawn?: MovePawn;
}
