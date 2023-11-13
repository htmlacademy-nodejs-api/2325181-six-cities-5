import { inject, injectable } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component, Logger, CreateUserDTO, UpdateUserDTO, UserEntity, UserService } from '../../../index.js';


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

  public async findByEmail(email: string | null): Promise<types.DocumentType<UserEntity> | null> {
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

}
