import { UserEntity } from '../modules/user/user.entity.js';

export type TokenPayload = Pick<UserEntity, 'email' | 'name' | 'id'>
