import { inject, injectable } from 'inversify';
import { Component } from '../../../types/component.enum.js';
import { Logger } from '../../logger/index.js';
import { Config, RestSchemaType } from '../../config/index.js';
import { DEFAULT_STATIC_IMAGES, STATIC_FILES_ROUTE, STATIC_RESOURCE_FIELDS, STATIC_UPLOAD_ROUTE } from '../../../../const.js';
import { getFullServerPath } from '../../../helpers/index.js';
import { StaticDataType } from '../../../types/static-data.type.js';

function isObjectValue(value: unknown): value is StaticDataType {
  return typeof value === 'object' && value !== null;
}


@injectable()
export class PathTransformer {
  constructor (
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.Config) private readonly config: Config<RestSchemaType>
  ) {
    this.logger.info('PathTransformer created!');
  }

  private hasDefaultImage(value: string) {
    return DEFAULT_STATIC_IMAGES.includes(value);
  }

  private isStaticProperty(property: string) {
    return STATIC_RESOURCE_FIELDS.includes(property);
  }

  public execute(data: StaticDataType): StaticDataType {
    const stack = [data];
    while (stack.length > 0) {
      const current = stack.pop();

      for (const key in current) {
        if (Object.hasOwn(current, key)) {
          const value = current[key];
          if (isObjectValue(value)) {
            stack.push(value);
            continue;
          }

          if (this.isStaticProperty(key) && typeof value === 'string') {
            const staticPath = STATIC_FILES_ROUTE;
            const uploadPath = STATIC_UPLOAD_ROUTE;
            const serverHost = this.config.get('HOST');
            const serverPort = this.config.get('PORT');

            const rootPath = this.hasDefaultImage(value) ? staticPath : uploadPath;
            current[key] = `${getFullServerPath(serverHost, serverPort)}${rootPath}/${value}`;
          }
        }
      }
    }
    return data;
  }

}
