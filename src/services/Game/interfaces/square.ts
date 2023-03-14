import { ColorEnum } from './colors';
export interface Square {
  id: `road-${number}`;
  color: ColorEnum;
  entrance?: boolean;
  exit?: boolean;
  safeZone?: boolean;
}
