import { Type, Location, Goods, CityName } from '../../types/types.js';


export class UpdateOfferDTO {

  public title?: string;

  public description?: string;

  public city?: CityName;

  public previewImageURL?: string;

  public images?: string[];

  public isPremium?: boolean;

  public type?: Type;

  public bedrooms?: number;

  public maxAdults?: number;

  public price?: number;

  public goods?: Goods[];

  public hostId?: string;

  public coordinates?: Location;
}
