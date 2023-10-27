import {TokenPayloadType} from './src/shared/types/tokenPayload.type.ts';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TokenPayloadType
  }
}
