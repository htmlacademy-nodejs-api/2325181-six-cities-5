import { inject, injectable } from 'inversify';
import { UserService } from './user-service.interface.js';
import { DocumentType } from '@typegoose/typegoose';
import { UserEntity, UserModel } from './user.entity.js';
import { CreateUserDTO } from './index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultUserService implements UserService {

  constructor (@inject(Component.Logger) private readonly logger: Logger) {}

  public async create (dto: CreateUserDTO, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);
    const result = await UserModel.create(user);
    this.logger.info(`New user created: ${user.email}`);
    return result;
  }

  // public findByEmail(email: string): Promise<DocumentType<UserEntity>> | null {

  // }

  // public findOrCreate(email: string, dto: createUserDTO): Promise<DocumentType<UserEntity>> {

  // }


}
