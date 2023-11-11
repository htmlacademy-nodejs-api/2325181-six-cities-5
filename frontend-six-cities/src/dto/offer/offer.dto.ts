import { CityName, Goods, Location, Type } from '../../types/types';
import { UserDTO } from '../user/user.dto';

export class OfferDTO {

  public id!: string;

  public title!: string;

  public description!: string;

  public offerDate!: Date;

  public city!: CityName;

  public previewImageURL!: string;

  public images!: string[];

  public isPremium!: boolean;

  public isFavorite!: boolean;

  public rating!: number;

  public type!: Type;

  public bedrooms!: number;

  public maxAdults!: number;

  public price!: number;

  public goods!: Goods[];

  public host!: UserDTO;

  public coordinates!: Location;

  public reviews!: number;
}
