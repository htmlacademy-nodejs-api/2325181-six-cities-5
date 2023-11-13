import { Request, Response, NextFunction } from 'express';
import { jwtVerify} from 'jose';
import { StatusCodes } from 'http-status-codes';
import { createSecretKey } from 'node:crypto';
import { TokenPayloadType, HttpError, Middleware } from '../../../index.js';

function isTokenPayload (payload: unknown): payload is TokenPayloadType {
  return (
    (typeof payload === 'object' && payload !== null) &&
    ('email' in payload && typeof payload.email === 'string') &&
    ('name' in payload && typeof payload.name === 'string') &&
    ('id' in payload && typeof payload.id === 'string')
  );
}

export class ParseTokenMiddleware implements Middleware {
  constructor (private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if(!authorizationHeader) {
      return next();
    }

    const [,token] = authorizationHeader;
    try {
      const {payload} = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));
      if (isTokenPayload(payload)) {
        req.tokenPayload = {...payload};
        return next();
      }
    } catch {
      return next(new HttpError(
        StatusCodes.UNAUTHORIZED,
        'Invalid token',
        'AuthenticateMiddleware')
      );
    }
  }
}
