export abstract class DomainError extends Error {
  abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends DomainError {
  readonly statusCode = 404;
}

export class ValidationError extends DomainError {
  readonly statusCode = 400;
}

export class UnauthorizedError extends DomainError {
  readonly statusCode = 401;
}

export class ForbiddenError extends DomainError {
  readonly statusCode = 403;
}

export class ConflictError extends DomainError {
  readonly statusCode = 409;
}
