import { ColorEnum } from './colors';
import { SquareId } from './pawn';
import { PawnIdentifier } from './pawn-identifier';

export type MovePawn = {
  index: number;
  color: ColorEnum;
  squaresIds: SquareId[];
  startingSquareId: SquareId;
  smash?: PawnIdentifier;
};
