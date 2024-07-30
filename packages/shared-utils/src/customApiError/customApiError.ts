export class ApiError extends Error {
  public type: string;
  public message: string;
  public status: 500 | 400;
  constructor(type: string, message: string) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.message = message;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
