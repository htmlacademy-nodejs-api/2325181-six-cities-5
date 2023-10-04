import { TransportOptionsType } from '../types/transport-options.type.js';

export const getTransportOptions = (level: string, destination?: string): TransportOptionsType => ({
  target: 'pino/file',
  options: destination ? { destination } : {},
  level
});
