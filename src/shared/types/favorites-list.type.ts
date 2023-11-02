import { Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../modules/offer/index.js';

export type FavoritesListType = Ref<OfferEntity>[];
