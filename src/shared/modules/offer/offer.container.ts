import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { DefaultOfferService, OfferEntity, OfferModel, OfferService } from './index.js';
import { Component } from '../../types/component.enum.js';

export function createOfferContainer () {
  const offerServiceContainer = new Container();
  offerServiceContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerServiceContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  return offerServiceContainer;
}
