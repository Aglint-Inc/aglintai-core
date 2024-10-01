export class CApiError extends Error {
  public type: 'SERVER_ERROR' | 'SUPABASE_ERROR' | 'CLIENT' | 'WORKFLOW_ACTION';
  public message: string;
  public status: number;
  public structuredErrorData: Record<string, string> | null;
  constructor(
    type: CApiError['type'],
    message: string,
    _structured_err?: Record<string, string>,
    status = 500
  ) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.message = message;
    this.structuredErrorData = _structured_err ?? null;
    this.status = status;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CApiError);
    }
  }
}
