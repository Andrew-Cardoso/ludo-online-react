import { AnimationTypeEnum } from './animation-type';
import { ColorEnum } from './colors';

export interface KaryogamyMutation {
  id: number;
  color: ColorEnum;
  type: AnimationTypeEnum;
  isMain: boolean;
}
