export class CApiError extends Error {
  public type: 'SERVER_ERROR' | 'SUPABASE_ERROR' | 'CLIENT' | 'WORKFLOW_ACTION';
  public message: string;
  public status: number;
  constructor(type: CApiError['type'], message: string, status = 500) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.message = message;
    this.status = status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CApiError);
    }
  }
}
