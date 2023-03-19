const NOT_FOUND_ERROR = "NOT_FOUND_ERROR";

export const isNotFoundError = (error: Error) => error.name === NOT_FOUND_ERROR;

export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = NOT_FOUND_ERROR;
  }
}
