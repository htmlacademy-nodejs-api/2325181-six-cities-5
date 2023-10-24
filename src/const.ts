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

export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10,',
    maxLength: 'Maximum title length must be 100,'
  },
  description: {
    minLength: 'Minimum description length must be 20,',
    maxLength: 'Maximum description length must be 1024,'
  },
  offerDate: {
    invalidFormat: 'postDate must be a valid ISO date',
  },
  city: {
    invalidValue: 'Value must be one of 6 cities: Amsterdam, Dusseldorf, Paris, Hamburg, Brussels, Cologne'
  },
  previewImageURL: {

  },
  images: {
    invalidCount: 'Quantity of image photo should exaclty 6 items',
  },
  rating: {
    invalidValue: 'Rating value must be in range from 1 to 5'
  },
  type: {
    invalidValue: 'Value must be one of 4 type: "apartment", "house", "room", "hotel"'
  },
  bedrooms: {
    invalidValue: 'Bedrooms quantity value must be in range from 1 to 8'
  },
  maxAdults: {
    invalidValue: 'Maximum adults quantity value must be in range from 1 to 10'
  },
  price: {
    invalidValue: 'Price value must be in range from 100 to 100000'
  },
  goods: {
    invalidValue: 'The goods value must be a list of one or more of the following options: "Breakfast", "Air conditioning", "Laptop friendly workspace", "Baby seat", "Washer", "Towels", "Fridge"'
  },
  hostId: {
    invalidValue: 'The hostId value must be a valid id'
  },
  coordinates: {
    invalidValue: 'The coordinate must be a list of 2 numbered values, representing latitude and longitude'
  },
} as const;

export const CreateUserValidationMessage = {
  email: {
    invalidFormat: 'Email must be a valid format: mail@example.com'
  },
  avatarURL: {
    invalidFormat: 'Avatar URL must be a string format',
    invalidExtension: 'File extension must be .png or .jpg'
  },
  name: {
    invalidFormat:'The field must be a string format',
    invalidLength: 'The field length must be from 1 to 15 symbols',
  },
  password: {
    invalidFormat: 'The field must be a string format',
    invalidLength: 'The field length must be from 1 to 15 symbols',

  },
  userType: {
    invalideValue: 'The value must be one of the following type: pro or standard'
  },
  favoritesList: {
    invalidValue: 'The value must be a list of zero or more offer IDs'
  }
} as const;
