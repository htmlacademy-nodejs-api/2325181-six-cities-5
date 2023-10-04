
import { MockServerData } from '../../types/mock-server-data.type.js';
import { OfferGenerator } from './offer-generator.interface.js';


import { generateTSVOffer } from '../../helpers/generator.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerData) {}

  public generate(): string {
    return generateTSVOffer(this.mockData);
  }

}
