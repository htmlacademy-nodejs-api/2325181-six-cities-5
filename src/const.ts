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

export const OfferValidationMessage = {
  title: {
    invalidLength: 'The field length must be at least 10 up to 100 signs'
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
    invalidFormat: 'The value must be a valid .png, .jpg type file'
  },
  images: {
    invalidCount: 'Quantity of image photo should exaclty 6 items',
    invalidFormat: 'The values must be a valid .png, .jpg type file'
  },
  isPremium: {
    invalidFormat: 'The field value must be true or false'
  },
  rating: {
    invalidValue: 'Rating value must be in range from 1 to 5',
    invalidFormat: 'Rating must be a number'
  },
  type: {
    invalidValue: 'Value must be one of 4 type: "apartment", "house", "room", "hotel"'
  },
  bedrooms: {
    invalidValue: 'Bedrooms quantity value must be in range from 1 to 8',
    invalidFormat: 'The value must be a valid number',
  },
  maxAdults: {
    invalidValue: 'Maximum adults quantity value must be in range from 1 to 10',
    invalidFormat: 'The value must be a valid number',
  },
  price: {
    invalidFormat: 'The value must be a valid number',
    invalidValue: 'Price value must be in range from 100 to 100000'
  },
  goods: {
    invalidValue: 'The goods value must be a list of one or more of the following options: "Breakfast", "Air conditioning", "Laptop friendly workspace", "Baby seat", "Washer", "Towels", "Fridge"',
    emptyArray: 'The list must contain at least one value',
    uniqueValues: 'The values in list may not repeat',
  },
  hostId: {
    invalidValue: 'The hostId value must be a valid id'
  },
  coordinates: {
    invalidValue: 'The coordinate must be an object with 2 keys, representing latitude and longitude'
  },
  latitude: {
    invalidFormat: 'The latitude must be a number representing offer latitude'
  },
  longitude: {
    invalidFormat: 'The longitude must be a number representing offer longitude'
  },
} as const;

export const UserValidationMessage = {
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
    invalidLength: 'The field length must be from 6 to 12 symbols',

  },
  userType: {
    invalidValue: 'The value must be one of the following type: pro or standard'
  },
  favoritesList: {
    invalidValue: 'The value must be a list of zero or more offer IDs'
  }
} as const;

export const CommentValidationMessage = {
  text: {
    invalidFormat: 'The field value must be the string format',
    invalidLength: 'The field length must be at least 5 up to 1024 symbols'
  },
  rating: {
    invalidFormat: 'The field value must be the integer number format',
    invalidValue: 'The field value must be in range from 1 up to 5',
  },
  authorId: {
    invalidValue: 'The hostId value must be a valid id'
  },
  offerId: {
    invalidValue: 'The hostId value must be a valid id'
  }
} as const;

export const JWT_ALGORITHM = 'HS256';

export const JWT_EXPIRED = '2d';

export const ApplicationError = {
  ValidationError: 'VALIDATION_ERROR',
  CommonError: 'COMMON_ERROR',
  ServiceError: 'SERVICE_ERROR',
} as const;

export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.jpg';

export const STATIC_UPLOAD_ROUTE = '/upload';

export const STATIC_FILES_ROUTE = '/static';

export const DEFAULT_STATIC_IMAGES = ['default-avatar.jpg'];

export const STATIC_RESOURCE_FIELDS = [
  'avatarURL',
  'image'
];

