import { CityName, Type, Goods, Location } from '../../types/types.js';

export class CreateOfferRequestDTO {
  public title!: string;

  public description!: string;

  public city!: CityName;

  public previewImageURL!: string;

  public images!: string[];

  public isPremium!: boolean;

  public type!: Type;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: Goods[];

  public coordinates!: Location;
}
