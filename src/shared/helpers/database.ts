export function getMongoURI (
  username: string,
  password: string,
  host: string,
  port: string,
  dbName: string
): string {
  return `mongodb://${username}:${password}@${host}:${port}/${dbName}?authSource=admin`;
}
