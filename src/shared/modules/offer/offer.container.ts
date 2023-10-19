import { types } from '@typegoose/typegoose';
import { Container } from 'inversify';
import { DefaultOfferService, OfferEntity, OfferModel, OfferService } from './index.js';
import { Component } from '../../types/component.enum.js';
import { Controller } from '../../libs/rest/index.js';
import { OfferController } from './offer.controller.js';

export function createOfferContainer () {
  const offerServiceContainer = new Container();
  offerServiceContainer.bind<OfferService>(Component.OfferService).to(DefaultOfferService);
  offerServiceContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerServiceContainer.bind<Controller>(Component.OfferController).to(OfferController).inSingletonScope();
  return offerServiceContainer;
}
