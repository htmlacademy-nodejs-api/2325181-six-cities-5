import { GoodsType, LocationType, LodgingType} from './index.js';

export type MockServerDataType = {
  titles: string[];
  descriptions: string[];
  cities: LocationType[];
  images: string[];
  previewImageURLs: string[];
  lodgingTypes: LodgingType[];
  goods: GoodsType[];
  hostNames: string[];
  hostEmails: string[];
  hostAvatarURLs: string[];
  latitudes: string[];
  longitudes: string[];
}
