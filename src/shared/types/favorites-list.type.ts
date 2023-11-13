import { Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../index.js';

export type FavoritesListType = Ref<OfferEntity>[];
