import { GoodsType } from './goods.type.js';
import { LocationType } from './location.type.js';
import { LodgingType } from './lodging.type.js';

export type MockServerData = {
  titles: string[];
  descriptions: string[];
  cities: LocationType[];
  images: string[];
  previewImageURL: string[];
  lodgingTypes: LodgingType[];
  goods: GoodsType[];
  hostNames: string[];
  hostEmails: string[];
  hostAvatarURLs: string[];
  hostPasswords: string[];
  coordinates: number[][];
}
