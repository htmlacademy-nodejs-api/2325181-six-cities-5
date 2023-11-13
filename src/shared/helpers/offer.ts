import { OfferType, LocationType, LodgingType, GoodsType, UserType, UserLevelType, CoordinatesType } from '../types/index.js';

export function createOffer(offerData: string): OfferType {

  const [
    title,
    description,
    city,
    previewImageURL,
    images,
    isPremium,
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
    city: city as LocationType,
    previewImageURL,
    images: images.split(';'),
    isPremium: Boolean(isPremium),
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
