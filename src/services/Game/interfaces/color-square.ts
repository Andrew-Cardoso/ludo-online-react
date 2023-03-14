import { ColorEnum } from './colors';

export type ColorSquare<T> = {
  [key in ColorEnum]: T[];
};
