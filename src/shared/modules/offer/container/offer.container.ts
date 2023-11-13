import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { Component, Controller, OfferController, DefaultOfferService, OfferEntity, OfferModel, OfferService } from '../../../index.js';

export function createOfferContainer () {
  const offerServiceContainer = new Container();
  offerServiceContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerServiceContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerServiceContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  return offerServiceContainer;
}
