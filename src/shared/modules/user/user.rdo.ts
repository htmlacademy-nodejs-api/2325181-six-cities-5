import { Expose } from 'class-transformer';
import { UserLevelType } from '../../types/user-level.type.js';

export class UserRdo {

  @Expose()
  public id: string;

  @Expose()
  public email: string;

  @Expose()
  public avatarURL: string;

  @Expose()
  public name: string;

  @Expose()
  public userType: UserLevelType;
}
