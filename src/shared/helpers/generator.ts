import dayjs from 'dayjs';
import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../helpers/common.js';
import { LocationType } from '../types/location.type.js';
import { LodgingType } from '../types/lodging.type.js';
import { EdgePoints, UserLevel } from '../../const.js';
import { GoodsType } from '../types/goods.type.js';
import { MockServerData } from '../types/mock-server-data.type.js';
import { UserLevelType } from '../types/user-level.type.js';

export function generateTSVOffer(mockData: MockServerData):string {
  const title = getRandomItem<string>(mockData.titles);
  const description = getRandomItem<string>(mockData.descriptions);
  const offerDate = dayjs()
    .subtract(generateRandomValue(EdgePoints.Minimal.Weekday, EdgePoints.Maximal.Weekday), 'day')
    .toISOString();
  const city = getRandomItem<LocationType>(mockData.cities).toString();
  const previewImageURL = getRandomItem<string>(mockData.previewImageURL);
  const images = getRandomItems<string>(mockData.images).join(';');
  const isPremium = getRandomBoolean().toString();
  const isFavorite = getRandomBoolean().toString();
  const rating = generateRandomValue(EdgePoints.Minimal.Rating, EdgePoints.Maximal.Rating, 1).toString();
  const type = getRandomItem<LodgingType>(mockData.lodgingTypes).toString();
  const bedrooms = generateRandomValue(EdgePoints.Minimal.Bedrooms, EdgePoints.Maximal.Bedrooms).toString();
  const maxAdults = generateRandomValue(EdgePoints.Minimal.Adults, EdgePoints.Maximal.Adults).toString();
  const price = (generateRandomValue(EdgePoints.Minimal.Price, EdgePoints.Maximal.Price) * 100).toString();
  const goods = getRandomItems<GoodsType>(mockData.goods).join(';');
  const hostName = getRandomItem<string>(mockData.hostNames);
  const hostEmail = getRandomItem<string>(mockData.hostEmails);
  const hostAvatarURL = getRandomItem<string>(mockData.hostAvatarURLs);
  const hostPasssword = getRandomItem<string>(mockData.hostPasswords);
  const hostType = getRandomItem<UserLevelType>(Object.values(UserLevel));
  const reviews = generateRandomValue(EdgePoints.Minimal.Reviews, EdgePoints.Maximal.Reviews);
  const coordinates = getRandomItem<number[]>(mockData.coordinates).join(';');

  return [
    title,
    description,
    offerDate,
    city,
    previewImageURL,
    images,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    hostName,
    hostEmail,
    hostAvatarURL,
    hostPasssword,
    hostType,
    reviews,
    coordinates
  ].join('\t');
}
