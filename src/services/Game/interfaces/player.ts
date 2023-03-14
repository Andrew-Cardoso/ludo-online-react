import { ColorEnum } from './colors';

export interface Player {
  socketId: string;
  color: ColorEnum | null;
}
