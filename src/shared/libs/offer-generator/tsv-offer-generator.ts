import { MockServerDataType, OfferGenerator, generateTSVOffer } from '../../index.js';

export class TSVOfferGenerator implements OfferGenerator {
  constructor(private readonly mockData: MockServerDataType) {}

  public generate(): string {
    return generateTSVOffer(this.mockData);
  }

}
