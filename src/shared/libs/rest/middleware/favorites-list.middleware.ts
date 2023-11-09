import { Request, Response, NextFunction } from 'express';
import { Middleware } from './middleware.interface.js';
import { FavoritesList } from './favorites-list.middleware.interface.js';

export class FavoritesListMiddleware implements Middleware {
  constructor (
    private readonly service: FavoritesList
  ) {}

  public async execute(req: Request,_res: Response, next: NextFunction): Promise<void> {
    const userId = req.tokenPayload?.id;
    req.favoritesList = (await this.service.findById(userId!))?.favoritesList || [];
    next();
  }
}
