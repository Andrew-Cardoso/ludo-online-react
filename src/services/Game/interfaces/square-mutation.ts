import { SquareId } from './pawn';

export type SquareMutation<T> = {
  [key in SquareId]: T;
};
