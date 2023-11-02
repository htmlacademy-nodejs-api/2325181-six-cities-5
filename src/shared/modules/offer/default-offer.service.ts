import { Types } from 'mongoose';
import { types} from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateOfferDTO, OfferEntity, OfferService } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { UpdateOfferDTO } from './update-offer.dto.js';
import { OFFER_COUNT, PREMIUM_OFFER_COUNT, SortOrder } from '../../../const.js';
import { FavoritesListType } from '../../types/favorites-list.type.js';

@injectable()
export class DefaultOfferService implements OfferService {


  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDTO): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(favoritesList: FavoritesListType, offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    const aggregatedOffers = await this.offerModel.aggregate([
      {$match: {_id: new Types.ObjectId(offerId)}},
      {$lookup: {from: 'comments', localField: '_id', foreignField:'offerId', as: 'comments'}},
      {$set: {reviews: {$size: '$comments'}}},
      {$unset: 'comments'},
      {$set: {isFavorite: {$in: ['$_id',favoritesList]}}},
      {$sort: {createdAt: SortOrder.Desc}},
    ]).exec();
    return aggregatedOffers[0];
  }

  public async find(favoritesList: FavoritesListType, count: number = OFFER_COUNT):Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {$lookup: {from: 'comments', localField: '_id', foreignField:'offerId', as: 'comments'}},
      {$set: {reviews: {$size: '$comments'}}},
      {$unset: 'comments'},
      {$set: {isFavorite: {$in: ['$_id',favoritesList]}}},
      {$unset: ['description', 'images', 'bedrooms', 'maxAdults', 'goods', 'hostId', 'coordinates']},
      {$limit: count },
      {$sort: {createdAt: SortOrder.Desc}},
    ]).exec();
  }

  public async findFavorites(favoritesList: FavoritesListType):Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {$lookup: {from: 'comments', localField: '_id', foreignField:'offerId', as: 'comments'}},
      {$set: {reviews: {$size: '$comments'}}},
      {$unset: 'comments'},
      {$set: {isFavorite: {$in: ['$_id',favoritesList]}}},
      {$match: {isFavorite: true}},
      {$unset: ['description', 'images', 'bedrooms', 'maxAdults', 'goods', 'hostId', 'coordinates']},
      {$sort: {createdAt: SortOrder.Desc}},
    ]).exec();
  }

  public async deleteById (offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById (offerId: string, dto: UpdateOfferDTO): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true})
      .populate('hostId')
      .exec();
  }

  public async findPremium (favoritesList: FavoritesListType, city: string):Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {$lookup: {from: 'comments', localField: '_id', foreignField:'offerId', as: 'comments'}},
      {$set: {reviews: {$size: '$comments'}}},
      {$unset: 'comments'},
      {$set: {isFavorite: {$in: ['$_id',favoritesList]}}},
      {$match: {city, isPremium: true}},
      {$unset: ['description', 'images', 'bedrooms', 'maxAdults', 'goods', 'hostId', 'coordinates']},
      {$limit: PREMIUM_OFFER_COUNT},
      {$sort: {createdAt: SortOrder.Desc}},
    ]).exec();
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel.exists({_id: offerId})) !== null;
  }

}
