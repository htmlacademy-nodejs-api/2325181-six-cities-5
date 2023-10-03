import convict from 'convict';
import validators from 'convict-format-with-validator';

convict.addFormats(validators);

export type RestSchemaType = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
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

});
