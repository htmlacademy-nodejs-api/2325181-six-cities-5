export const Location = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf'
} as const;

export const LodgingKind = {
  Room: 'Room',
  Apartment: 'Apartment',
  House: 'House',
  Hotel: 'Hotel'
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
    Reviews: 0
  },
  Maximal: {
    Price: 1000,
    Rating: 5,
    Weekday: 7,
    Bedrooms: 8,
    Adults: 10,
    Reviews: 20
  }
} as const;

export const ChunkSize = {
  Read: 16384,
  Write: 65536,
} as const;
