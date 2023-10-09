import { types } from '@typegoose/typegoose';
import { inject } from 'inversify';
import { CreateOfferDTO, FavoritesOfferDTO, OfferEntity, OfferService } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Logger } from '../../libs/logger/logger.interface.js';
import { UpdateOfferDTO } from './update-offer.dto.js';

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

  public async find():Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.find().populate('hostId').exec();
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
    return this.offerModel.find({isFavorite: true}).populate('hostId').exec();
  }

  public async findPremium ():Promise<types.DocumentType<OfferEntity>[]> {
    return this.offerModel.find({isPremium: true}).populate('hostId').exec();
  }

  public async addRemoveFavorites (offerId: string, dto: FavoritesOfferDTO):Promise<types.DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, {new: true})
      .populate('hostId')
      .exec();
  }
}
