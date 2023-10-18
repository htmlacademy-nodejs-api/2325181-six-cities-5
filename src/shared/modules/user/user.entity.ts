import { Ref, prop, getModelForClass, defaultClasses, modelOptions, Severity } from '@typegoose/typegoose';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserType } from '../../types/user.type.js';
import { createSHA256 } from '../../helpers/hash.js';
import { OfferEntity } from '../offer/offer.entity.js';


// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  },
  options: {
    allowMixed: Severity.ALLOW
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements UserType {
  @prop({
    unique: true,
    required: true,
    default: ''
  }) public email: string;

  @prop({
    required: false,
    default: ''
  }) public avatarURL: string;

  @prop({
    required: true,
    default: ''
  }) public name: string;

  @prop({
    required: true,
    default: ''
  }) private password?: string;

  @prop({
    require: true,
    default: '',
  }) public userType: UserLevelType;

  @prop({
    require: true,
    ref: () => OfferEntity,
    _id: false,
    default: [],
  }) public favoritesList: Ref<OfferEntity>[];

  constructor(userData: UserType) {
    super();

    this.email = userData.email;
    this.avatarURL = userData.avatarURL;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword (password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword () {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
