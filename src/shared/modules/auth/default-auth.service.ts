import { inject, injectable } from 'inversify';
import * as crypto from 'node:crypto';
import { SignJWT } from 'jose';
import { AuthService } from './auth-service.interface.js';
import { Component } from '../../types/component.enum.js';
import { UserService, UserEntity, LoginUserDTO } from '../user/index.js';
import { Logger } from '../../libs/logger/index.js';
import { RestSchemaType, Config } from '../../libs/config/index.js';
import { TokenPayload } from '../../types/tokenPayload.type.js';
import { JWT_ALGORITHM, JWT_EXPIRED } from '../../../const.js';
import { UserNotFoundException, UserPasswordIncorrectException } from '../../libs/rest/errors/index.js';

@injectable()
export class DefaultAuthService implements AuthService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.UserService) private readonly userService: UserService,
    @inject(Component.Config) private readonly config: Config<RestSchemaType>,
  ) {}

  public async authenticate(user: UserEntity): Promise<string> {
    const jwtSecret = this.config.get('JWT_SECRET');
    const secretKey = crypto.createSecretKey(jwtSecret, 'utf-8');
    const tokenPayload: TokenPayload = {
      email: user.email,
      name: user.name,
      id: user.id
    };

    this.logger.info(`Create token for ${user.email}`);
    return new SignJWT(tokenPayload)
      .setProtectedHeader({alg: JWT_ALGORITHM})
      .setIssuedAt()
      .setExpirationTime(JWT_EXPIRED)
      .sign(secretKey);
  }

  public async verify(dto: LoginUserDTO): Promise<UserEntity> {
    const user = await this.userService.findByEmail(dto.email);
    if (!user) {
      this.logger.warn(`User with email ${dto.email} not found`);
      throw new UserNotFoundException();
    }

    if(!user.verifyPassword(dto.password, this.config.get('SALT'))) {
      this.logger.warn(`Incorrect password for ${dto.email}`);
      throw new UserPasswordIncorrectException();
    }

    return user;
  }

}
