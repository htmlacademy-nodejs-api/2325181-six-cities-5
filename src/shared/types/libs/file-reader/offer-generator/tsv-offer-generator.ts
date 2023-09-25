import { generateRandomValue, getRandomBoolean, getRandomItem, getRandomItems } from '../../../../helpers/common.js';
import { MockServerData } from '../../../mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';
import dayjs from 'dayjs';
import { LocationType } from '../../../location.type.js';
import { LodgingType } from '../../../lodging.type.js';
import { EdgePoints } from '../../../../../const.js';
import { GoodsType } from '../../../goods.type.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const offerDate = dayjs()
      .subtract(generateRandomValue(EdgePoints.Minimal.Weekday, EdgePoints.Maximal.Weekday), 'day')
      .toISOString();
    const city = getRandomItem<LocationType>(this.mockData.cities).toString();
    const previewImageURL = getRandomItem<string>(this.mockData.previewImageURL);
    const images = getRandomItems<string>(this.mockData.images).join(';');
    const isPremium = getRandomBoolean().toString();
    const isFavorite = getRandomBoolean().toString();
    const rating = generateRandomValue(EdgePoints.Minimal.Rating, EdgePoints.Maximal.Rating, 1).toString();
    const type = getRandomItem<LodgingType>(this.mockData.lodgingTypes).toString();
    const bedrooms = generateRandomValue(EdgePoints.Minimal.Bedrooms, EdgePoints.Maximal.Bedrooms).toString();
    const maxAdults = generateRandomValue(EdgePoints.Minimal.Adults, EdgePoints.Maximal.Adults).toString();
    const price = (generateRandomValue(EdgePoints.Minimal.Price, EdgePoints.Maximal.Price) * 100).toString();
    const goods = getRandomItems<GoodsType>(this.mockData.goods).join(';');
    const host = getRandomItem<string>(this.mockData.host);
    const reviews = generateRandomValue(EdgePoints.Minimal.Reviews, EdgePoints.Maximal.Reviews);
    const coordinates = getRandomItem<number[]>(this.mockData.coordinates).join(';');

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
      host,
      reviews,
      coordinates
    ].join('\t');
  }

}
