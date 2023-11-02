import { Types } from 'mongoose';
import { FavoritesListType } from '../types/favorites-list.type.js';


export function modifyFavoriteList(favoritesList: FavoritesListType, offerId: string): FavoritesListType {
  const isOfferInFavorites = Boolean(favoritesList!.filter((favorites) => favorites._id.toString() === offerId).length);
  if (isOfferInFavorites) {
    favoritesList = favoritesList!.filter((favorites) => favorites._id.toString() !== offerId);
  } else {
    favoritesList.push(new Types.ObjectId(offerId));
  }
  return favoritesList;
}
