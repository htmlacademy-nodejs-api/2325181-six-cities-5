import EventEmitter from 'node:events';
import { FileReader } from './index.js';
import { createReadStream } from 'node:fs';
import { ChunkSize } from '../../../const.js';

export class TSVFileReader extends EventEmitter implements FileReader {

  constructor (
    private readonly filename: string
  ) {
    super();
  }

  public async read(): Promise<void> {
    const readStream = createReadStream(this.filename, {encoding: 'utf-8', highWaterMark: ChunkSize.Read});
    let remainingData = '';
    let nextLinePosition = -1;
    let importedRowCount = 0;

    for await (const chunk of readStream) {
      remainingData += chunk.toString();

      while ((nextLinePosition = remainingData.indexOf('\n')) >= 0) {
        const completeRow = remainingData.slice(0, nextLinePosition + 1);
        remainingData = remainingData.slice(++nextLinePosition);
        importedRowCount++;
        await new Promise ((resolve) => {
          this.emit('line', completeRow, resolve);
        });
      }
    }

    this.emit('end', importedRowCount);

  }
}
