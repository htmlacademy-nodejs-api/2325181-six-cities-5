import convict from 'convict';
import validators from 'convict-format-with-validator';

convict.addFormats(validators);

export type RestSchemaType = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
  HOST: string;
  STATIC_DIRECTORY_PATH: string;
}

export const configRestSchema = convict<RestSchemaType>({
  PORT: {
    env: 'PORT',
    default: 4000,
    format: 'port',
    doc: 'Port for incoming connections'
  },
  SALT: {
    env: 'SALT',
    default: null,
    format: String,
    doc: 'Random symbol to hash password'
  },
  DB_HOST: {
    env: 'DB_HOST',
    default: '127.0.0.1',
    format: 'ipaddress',
    doc: 'Database (Mongo DB) server IP address'
  },
  DB_USER: {
    env: 'DB_USER',
    default: null,
    format: String,
    doc: 'Username to connect database'
  },
  DB_PASSWORD: {
    env: 'DB_PASSWORD',
    default: null,
    format: String,
    doc: 'User password to connect database'
  },
  DB_NAME: {
    env: 'DB_NAME',
    default: 'six-cities',
    format: String,
    doc: 'Database name (MongoDB)'
  },
  DB_PORT: {
    env: 'DB_PORT',
    default: '27017',
    format: 'port',
    doc: 'Port to connect the database'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
  HOST: {
    doc: 'Host where service started',
    format: String,
    env: 'HOST',
    default: 'localhost'
  },
  STATIC_DIRECTORY_PATH: {
    doc: 'Path to directory with static resources',
    format: String,
    env: 'STATIC_DIRECTORY_PATH',
    default: 'static'
  }
});
