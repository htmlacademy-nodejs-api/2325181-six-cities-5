import { readFileSync } from 'node:fs';
import { Offer } from '../../offer.type.js';
import { FileReader } from './file-reader.interface.js';
import { LocationType } from '../../location.type.js';
import { GoodsType } from '../../goods.type.js';
import { LodgingType } from '../../lodging.type.js';

export class TSVFileReader implements FileReader {
  private rawData = '';

  constructor (
    private readonly filename: string
  ) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8'});
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      throw new Error('File has not been read');
    }

    const lineSplitData = this.rawData.split('\n');
    const trimmedData = lineSplitData.filter((row) => row.trim().length > 0);
    const tabSplitData = trimmedData.map((line) => line.split('\t'));
    const desctructuredData = tabSplitData.map(([
      title,
      description,
      offerDate,
      city,
      previewImageURL,
      images,
      isPremium,
      isFavorite,
      rating,
      type,
      bedrooms,
      maxAdults,
      price,
      goods,
      host,
      reviews,
      coordinates
    ]) => ({
      title,
      description,
      offerDate: new Date(offerDate),
      city: city as LocationType,
      previewImageURL,
      images: images.split(';'),
      isPremium: Boolean(isPremium),
      isFavorite: Boolean(isFavorite),
      rating: Number(rating),
      type: type as LodgingType,
      bedrooms: Number(bedrooms),
      maxAdults: Number(maxAdults),
      price: Number(price),
      goods: goods.split(';') as GoodsType,
      host,
      reviews: Number(reviews),
      coordinates: coordinates.split(';')
        .map((coordinate) => Number(coordinate))
    }));

    return desctructuredData;
  }
}
