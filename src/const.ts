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
  Breakfast: 'Breakfast',
  Aircon: 'Air conditioning',
  LaptopWorkspace: 'Laptop friendly workspace',
  BabySeat: 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge'
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
  Regular: 'regular'
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

export const COMMENT_COUNT = 50;

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
  Title: {
    InvalidLength: 'The field length must be at least 10 up to 100 signs'
  },
  Description: {
    MinLength: 'Minimum description length must be 20,',
    MaxLength: 'Maximum description length must be 1024,'
  },
  OfferDate: {
    InvalidFormat: 'postDate must be a valid ISO date',
  },
  City: {
    InvalidValue: 'Value must be one of 6 cities: Amsterdam, Dusseldorf, Paris, Hamburg, Brussels, Cologne'
  },
  PreviewImageURL: {
    InvalidFormat: 'The value must be a valid .png, .jpg type file'
  },
  Images: {
    InvalidCount: 'Quantity of image photo should exactly 6 items',
    InvalidFormat: 'The values must be a valid .png, .jpg type file'
  },
  IsPremium: {
    InvalidFormat: 'The field value must be true or false'
  },
  Rating: {
    InvalidValue: 'Rating value must be in range from 1 to 5',
    InvalidFormat: 'Rating must be a number'
  },
  Type: {
    InvalidValue: 'Value must be one of 4 type: "apartment", "house", "room", "hotel"'
  },
  Bedrooms: {
    InvalidValue: 'Bedrooms quantity value must be in range from 1 to 8',
    InvalidFormat: 'The value must be a valid number',
  },
  MaxAdults: {
    InvalidValue: 'Maximum adults quantity value must be in range from 1 to 10',
    InvalidFormat: 'The value must be a valid number',
  },
  Price: {
    InvalidFormat: 'The value must be a valid number',
    InvalidValue: 'Price value must be in range from 100 to 100000'
  },
  Goods: {
    InvalidValue: 'The goods value must be a list of one or more of the following options: "Breakfast", "Air conditioning", "Laptop friendly workspace", "Baby seat", "Washer", "Towels", "Fridge"',
    EmptyArray: 'The list must contain at least one value',
    UniqueValues: 'The values in list may not repeat',
  },
  HostId: {
    InvalidValue: 'The hostId value must be a valid id'
  },
  Coordinates: {
    InvalidValue: 'The coordinate must be an object with 2 keys, representing latitude and longitude'
  },
  Latitude: {
    InvalidFormat: 'The latitude must be a number representing offer latitude'
  },
  Longitude: {
    InvalidFormat: 'The longitude must be a number representing offer longitude'
  },
} as const;

export const UserValidationMessage = {
  Email: {
    InvalidFormat: 'Email must be a valid format: mail@example.com'
  },
  AvatarURL: {
    InvalidFormat: 'Avatar URL must be a string format',
    InvalidExtension: 'File extension must be .png or .jpg'
  },
  Name: {
    InvalidFormat:'The field must be a string format',
    InvalidLength: 'The field length must be from 1 to 15 symbols',
  },
  Password: {
    InvalidFormat: 'The field must be a string format',
    InvalidLength: 'The field length must be from 6 to 12 symbols',

  },
  UserType: {
    InvalidValue: 'The value must be one of the following type: pro or standard'
  },
  FavoritesList: {
    InvalidValue: 'The value must be a list of zero or more offer IDs'
  }
} as const;

export const CommentValidationMessage = {
  Text: {
    InvalidFormat: 'The field value must be the string format',
    InvalidLength: 'The field length must be at least 5 up to 1024 symbols'
  },
  Rating: {
    InvalidFormat: 'The field value must be the integer number format',
    InvalidValue: 'The field value must be in range from 1 up to 5',
  },
  AuthorId: {
    InvalidValue: 'The hostId value must be a valid id'
  },
  OfferId: {
    InvalidValue: 'The hostId value must be a valid id'
  }
} as const;

export const JWT_ALGORITHM = 'HS256';

export const JWT_EXPIRED = '2d';

export const ApplicationError = {
  ValidationError: 'VALIDATION_ERROR',
  HttpError: 'HTTP_ERROR',
  ServiceError: 'SERVICE_ERROR',
} as const;

export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.png';

export const STATIC_UPLOAD_ROUTE = '/upload';

export const STATIC_FILES_ROUTE = '/static';

export const DEFAULT_STATIC_IMAGES = ['default-avatar.png'];

export const STATIC_RESOURCE_FIELDS = [
  'avatarURL',
  'image'
];

