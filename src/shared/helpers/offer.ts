import { OfferType } from '../types/offer.type.js';
import { LocationType } from '../types/location.type.js';
import { LodgingType } from '../types/lodging.type.js';
import { GoodsType } from '../types/goods.type.js';
import { UserType } from '../types/user.type.js';
import { UserLevelType } from '../types/user-level.type.js';
import { CoordinatesType } from '../types/coordinates.type.js';

export function createOffer(offerData: string): OfferType {

  const [
    title,
    description,
    offerDate,
    city,
    previewImageURL,
    images,
    isPremium,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    hostName,
    hostEmail,
    hostAvatar,
    hostType,
    latitude,
    longitude
  ] = offerData.replace('\n', '').split('\t');

  return {
    title,
    description,
    offerDate: new Date(offerDate),
    city: city as LocationType,
    previewImageURL,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
    rating: Number.parseInt(rating, 10),
    type: type as LodgingType,
    bedrooms: Number.parseInt(bedrooms, 10),
    maxAdults: Number(maxAdults),
    price: Number(price),
    goods: goods.split(';') as GoodsType,
    host : {
      name: hostName,
      email: hostEmail,
      avatarURL: hostAvatar,
      userType: hostType as UserLevelType,
    } as UserType,
    coordinates: {
      latitude: Number(latitude),
      longitude: Number(longitude)
    } as CoordinatesType
  };
}
