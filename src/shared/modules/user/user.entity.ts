import { prop, getModelForClass } from '@typegoose/typegoose';
import { UserLevelType } from '../../types/user-level.type.js';
import { UserType } from '../../types/user.type.js';

export class UserEntity implements UserType {
  @prop({
    type: String,
    unique: true,
    required: true,
  }) public email = '';

  @prop({
    required: false,
    default: ''
  }) public avatarURL = '';

  @prop({
    required: true,
  }) public name = '';

  @prop({
    required: true,
  }) public password = '';

  @prop({
    type: String,
    require: true
  }) public userType: UserLevelType = 'standard';
}

export const UserModel = getModelForClass(UserEntity);
