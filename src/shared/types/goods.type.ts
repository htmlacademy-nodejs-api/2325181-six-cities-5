import { Goods } from '../../const.js';

export type GoodsType = typeof Goods[keyof typeof Goods][]
