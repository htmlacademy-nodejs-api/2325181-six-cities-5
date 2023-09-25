import { Command } from './command.interface.js';

export class GenerateCommand implements Command {

  getName(): string {
    return '--generate';
  }

  execute(...parameters: string[]): void {
    const [count, filePath, URL] = parameters;
    const offersCount = Number.parseInt(count, 10);

    
  }
}
