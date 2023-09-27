import { UserLevel } from '../../const.js';

export type UserLevelType = typeof UserLevel[keyof typeof UserLevel]
