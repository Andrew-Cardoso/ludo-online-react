import { AnimationTypeEnum } from './animation-type';
import { Pawn } from './pawn';
import { PawnSquarePositionEnum } from './pawn-square-position';

export interface MitosisIdentifier extends Pick<Pawn, 'index' | 'color'> {
  position: PawnSquarePositionEnum;
  type: AnimationTypeEnum;
}
