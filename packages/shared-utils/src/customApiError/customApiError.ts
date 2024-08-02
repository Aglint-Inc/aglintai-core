export class ApiError extends Error {
  public type: string;
  public message: string;
  public status: number;
  constructor(type: string, message: string, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.message = message;
    this.status = status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }
}
