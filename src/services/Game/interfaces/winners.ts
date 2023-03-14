import { ColorEnum } from './colors';

export type Winners = {
  [key in 1 | 2 | 3]: ColorEnum;
};
