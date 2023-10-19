export const Location = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const LodgingKind = {
  Room: 'room',
  Apartment: 'apartment',
  House: 'house',
  Hotel: 'hotel'
} as const;

export const Goods = {
  breakfast: 'Breakfast',
  aircon: 'Air conditioning',
  laptopWorkspace: 'Laptop friendly workspace',
  babySeat: 'Baby seat',
  washer: 'Washer',
  towels: 'Towels',
  fridge: 'Fridge'
} as const;

export const EdgePoints = {
  Minimal: {
    Price: 1,
    Rating: 1,
    Weekday: 1,
    Bedrooms: 1,
    Adults: 1,
  },
  Maximal: {
    Price: 1000,
    Rating: 5,
    Weekday: 7,
    Bedrooms: 8,
    Adults: 10,
  }
} as const;

export const ChunkSize = {
  Read: 16384,
  Write: 65536,
} as const;

export const UserLevel = {
  Pro: 'pro',
  Standard: 'standard'
} as const;

export const LOG_FILE_PATH = '../../../logs/rest.log';

export const LogTransportLevels = {
  Info: 'info',
  Debug: 'debug'
} as const;

export const ApplicationMessages = {
  Info: 'Application has been initialized',
} as const;

export const RETRY_COUNT = 5;

export const RETRY_TIMEOUT = 1000;

export const PREMIUM_OFFER_COUNT = 3;

export const OFFER_COUNT = 60;

export const SortOrder = {
  Asc: 1,
  Desc: -1
} as const;

export const HttpMethod = {
  Get: 'get',
  Post: 'post',
  Delete: 'delete',
  Patch: 'patch',
  Put: 'put',
} as const;

export const DEFAULT_CONTENT_TYPE = 'application/json';

