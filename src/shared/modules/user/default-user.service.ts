import { Types } from 'mongoose';
import { inject, injectable } from 'inversify';
import { UserService } from './user-service.interface.js';
import { types } from '@typegoose/typegoose';
import { UserEntity } from './user.entity.js';
import { CreateUserDTO, UpdateUserDTO, } from './index.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { Component } from '../../types/component.enum.js';

@injectable()
export class DefaultUserService implements UserService {

  constructor (
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
  ) {}

  public async create (dto: CreateUserDTO, salt: string): Promise<types.DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);
    const result = await this.userModel.create(user);
    this.logger.info(`New user created: ${user.email}`);
    return result;
  }

  public async findById(userId: string): Promise<types.DocumentType<UserEntity> | null> {
    return this.userModel.findById(userId).exec();
  }

  public async findByEmail(email: string): Promise<types.DocumentType<UserEntity> | null> {
    return this.userModel.findOne({email});
  }

  public async findOrCreate(dto: CreateUserDTO, salt: string): Promise<types.DocumentType<UserEntity>> {
    const resultUser = await this.findByEmail(dto.email);
    if (resultUser) {
      return resultUser;
    }
    return this.create(dto, salt);
  }

  public async updateById (userId: string, dto: UpdateUserDTO): Promise<types.DocumentType<UserEntity> | null> {
    return this.userModel.findByIdAndUpdate(userId, dto, {new: true}).exec();
  }

  public async addRemoveFavorites (userId: string, offerId: string, isSetFavorite: boolean): Promise<void> {
    const currentUser = await this.userModel.findById(userId).exec();
    const objectOfferid = new Types.ObjectId(offerId);
    if (currentUser) {
      const isOfferInFavorites = Boolean(currentUser.favoritesList.filter((favorites) => favorites._id.toString() === offerId).length);
      if (isSetFavorite && !isOfferInFavorites) {
        currentUser.favoritesList.push(objectOfferid);
      } else if (isOfferInFavorites) {
        currentUser.favoritesList = currentUser.favoritesList.filter((favorites) => favorites._id.toString() !== offerId);
      }
    }
  }
}
