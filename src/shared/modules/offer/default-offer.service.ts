import { Types } from 'mongoose';
import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateOfferDTO, OfferEntity, OfferService } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { UpdateOfferDTO } from './update-offer.dto.js';
import { OFFER_COUNT, PREMIUM_OFFER_COUNT, SortOrder } from '../../../const.js';

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

  public async findById(token: string, offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    const aggregatedOffer = await this.offerModel.aggregate([
      {$match: {_id: new Types.ObjectId(offerId)}},
      {$lookup: {from: 'comments', localField: '_id', foreignField:'offerId', as: 'comments'}},
      {$addFields: {id: {$toString:'$_id'}}},
      {$set: {reviews: {$size: '$comments'}}},
      {$unset: 'comments'},
      {$lookup: {from: 'users', localField: 'hostId', foreignField: '_id', as: 'hostId'}},
      {$unwind: '$hostId'},
      {$lookup: {from: 'users', pipeline: [{$match: {email: token}}], as: 'currentUser'}},
      {$addFields: {favorites: '$currentUser.favoritesList'}},
      {$unwind: '$favorites'},
      {$set: {isFavorite: {$in: ['$_id','$favorites']}}},
      {$unset: ['currentUser', 'id', 'favorites']},
      {$sort: {createdAt: SortOrder.Desc}},
    ]).exec();
    return aggregatedOffer[0];
  }

  public async find(token: string, count: number = OFFER_COUNT):Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.aggregate([
      {$lookup: {from: 'comments', localField: '_id', foreignField:'offerId', as: 'comments'}},
      {$addFields: {id: {$toString:'$_id'}}},
      {$set: {reviews: {$size: '$comments'}}},
      {$unset: 'comments'},
      {$lookup: {from: 'users', pipeline: [{$match: {email: token}}], as: 'currentUser'}},
      {$addFields: {favorites: '$currentUser.favoritesList'}},
      {$unwind: '$favorites'},
      {$set: {isFavorite: {$in: ['$_id','$favorites']}}},
      {$unset: ['currentUser', 'id', 'favorites', 'description', 'images', 'bedrooms', 'maxAdults', 'goods', 'hostId', 'coordinates']},
      {$limit: count },
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

  public async findPremium (city: string):Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({city, isPremium: true})
      .limit(PREMIUM_OFFER_COUNT)
      .sort({createdAt: SortOrder.Desc})
      .populate('hostId')
      .exec();
  }

}
