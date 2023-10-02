import convict from 'convict';

export type RestSchemaType = {
  PORT: number;
}

export const configRestSchema = convict<RestSchemaType>({
  PORT: {
    env: 'PORT',
    default: 4000,
    format: 'port',
    doc: 'Port for incoming connections'
  }
});
