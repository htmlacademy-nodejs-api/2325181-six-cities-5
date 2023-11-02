import { HttpError } from './http-error.js';

export class BaseAuthException extends HttpError {
  constructor(httpStatusCode: number, message: string) {
    super(httpStatusCode, message);
  }
}
