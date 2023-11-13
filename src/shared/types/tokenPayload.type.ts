import { UserEntity } from '../index.js';

export type TokenPayloadType = Pick<UserEntity, 'email' | 'name' | 'id'>
