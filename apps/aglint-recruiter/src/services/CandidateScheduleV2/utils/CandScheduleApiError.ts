export class CandScheduleApiError extends Error {
  public message: string;
  public status: number;
  constructor(_message: string, _status: number, ...params) {
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CandScheduleApiError);
    }

    this.name = 'CandScheduleApiError';
    this.message = _message;
    this.status = _status;
  }
}
