import { UserEntity } from '../modules/user/user.entity.js';

export type TokenPayloadType = Pick<UserEntity, 'email' | 'name' | 'id'>
