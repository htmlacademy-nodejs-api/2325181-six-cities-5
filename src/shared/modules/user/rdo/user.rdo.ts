import { Expose } from 'class-transformer';
import { UserLevelType } from '../../../index.js';

export class UserRdo {

  @Expose()
  public email: string;

  @Expose()
  public avatarURL: string;

  @Expose()
  public name: string;

  @Expose()
  public userType: UserLevelType;
}
