import { FavoritesListType } from './src/shared/types/favorites-list.type.ts';
import {TokenPayloadType} from './src/shared/types/tokenPayload.type.ts';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload?: TokenPayloadType
    favoritesList?: FavoritesListType
  }
}
