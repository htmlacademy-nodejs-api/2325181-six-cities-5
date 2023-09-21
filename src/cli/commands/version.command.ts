import { readFileSync } from 'node:fs';
import { Command } from './command.interface.js';
import { resolve } from 'node:path';

type PackageJSONConfig = {
  version: string;
}

function isPackageJSONConfig(value: unknown): value is PackageJSONConfig {
  return (
    typeof value === 'object' &&
    value !== null &&
    !Array.isArray(value) &&
    Object.hasOwn(value, 'version')
  );
}

export class VersionCommand implements Command {
  constructor(
    private readonly filePath: string = './package.json'
  ) {}

  private readVersion(): string {
    const content = JSON.parse(readFileSync(resolve(this.filePath), 'utf-8'));
    if(!isPackageJSONConfig(content)) {
      throw new Error('Failed to parse json file.');
    }
    return content.version;
  }

  public getName(): string {
    return '--version';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    try {
      const version = this.readVersion();
      console.info(version);
    } catch (err: unknown) {
      console.error(`Failed to read command version from ${this.filePath}`);
      if (err instanceof Error) {
        console.error(err.message);
      }
    }

  }

}
