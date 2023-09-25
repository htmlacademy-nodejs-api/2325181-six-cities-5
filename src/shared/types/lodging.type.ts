import { LodgingKind } from '../../const.js';

export type LodgingType = typeof LodgingKind[keyof typeof LodgingKind];
