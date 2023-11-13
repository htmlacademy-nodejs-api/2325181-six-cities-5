import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from './index.js';
import { LocationType, LodgingType, GoodsType, MockServerDataType, UserLevelType } from '../types/index.js';
import { EdgePoints, UserLevel } from '../../const.js';


export function generateTSVOffer(mockData: MockServerDataType):string {
  const title = getRandomItem<string>(mockData.titles);
  const description = getRandomItem<string>(mockData.descriptions);
  const city = getRandomItem<LocationType>(mockData.cities).toString();
  const previewImageURL = getRandomItem<string>(mockData.previewImageURLs);
  const images = getRandomItems<string>(mockData.images).join(';');
  const isPremium = getRandomBoolean().toString();
  const type = getRandomItem<LodgingType>(mockData.lodgingTypes).toString();
  const bedrooms = generateRandomValue(EdgePoints.Minimal.Bedrooms, EdgePoints.Maximal.Bedrooms).toString();
  const maxAdults = generateRandomValue(EdgePoints.Minimal.Adults, EdgePoints.Maximal.Adults).toString();
  const price = (generateRandomValue(EdgePoints.Minimal.Price, EdgePoints.Maximal.Price) * 100).toString();
  const goods = getRandomItems<GoodsType>(mockData.goods).join(';');
  const hostName = getRandomItem<string>(mockData.hostNames);
  const hostEmail = getRandomItem<string>(mockData.hostEmails);
  const hostAvatarURL = getRandomItem<string>(mockData.hostAvatarURLs);
  const hostType = getRandomItem<UserLevelType>(Object.values(UserLevel));
  const latitude = getRandomItem<string>(mockData.latitudes);
  const longitude = getRandomItem<string>(mockData.longitudes);

  return [
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
    hostAvatarURL,
    hostType,
    latitude,
    longitude
  ].join('\t');
}
