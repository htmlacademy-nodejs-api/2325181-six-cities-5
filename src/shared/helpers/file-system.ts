import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export function getCurrentModuleDirectoryPath() {
  return dirname(fileURLToPath(import.meta.url));
}
