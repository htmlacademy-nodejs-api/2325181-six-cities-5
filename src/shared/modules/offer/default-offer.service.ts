import { types } from '@typegoose/typegoose';
import { inject, injectable } from 'inversify';
import { CreateOfferDTO, FavoritesOfferDTO, OfferEntity, OfferService } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { UpdateOfferDTO } from './update-offer.dto.js';
import { OFFER_COUNT, PREMIUM_OFFER_COUNT, SortOrder } from '../../../const.js';

@injectable()
export class DefaultOfferService implements OfferService {


  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDTO): Promise<types.DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return result;
  }

  public async findById(offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['hostId']).exec();
  }

  public async find(count: number = OFFER_COUNT):Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.find().limit(Math.min(count, OFFER_COUNT)).sort({createdAt: SortOrder.Desc}).populate('hostId').exec();
  }

  public async deleteById (offerId: string): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async updateById (offerId: string, dto: UpdateOfferDTO): Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true})
      .populate('hostId')
      .exec();
  }

  public async findFavorites ():Promise<types.DocumentType<OfferEntity>[]> {
    return await this.offerModel.find({isFavorite: true}).populate('hostId').exec();
  }

  public async findPremium ():Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isPremium: true}).limit(PREMIUM_OFFER_COUNT).sort({createdAt: SortOrder.Desc}).populate('hostId').exec();
  }


  public async addRemoveFavorites (offerId: string, dto: FavoritesOfferDTO):Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, {'$set': {isFavorite: !dto.isFavorite}}, {new: true})
      .populate('hostId')
      .exec();
  }

}
