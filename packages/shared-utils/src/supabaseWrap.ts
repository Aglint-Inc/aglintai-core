import { CApiError } from './customApiError';

export const supabaseWrap = <T extends unknown, U extends unknown>(
  {
    data,
    error,
  }: {
    data: T;
    error: U;
  },
  handle_empty_records = true
) => {
  if (error) {
    let err = new CApiError('CLIENT', (error as any).message, error as any); // for including stack trace
    throw err;
  }
  if (handle_empty_records) {
    if (data === null || (Array.isArray(data) && data.length === 0)) {
      throw new CApiError('SUPABASE_ERROR', 'No records found');
    }
  }

  return data as NonNullable<T>;
};
