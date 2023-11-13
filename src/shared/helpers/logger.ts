import { TransportOptionsType } from '../types/index.js';

export const getTransportOptions = (level: string, destination?: string): TransportOptionsType => ({
  target: 'pino/file',
  options: destination ? { destination } : {},
  level
});
