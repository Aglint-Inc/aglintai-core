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
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  if (error) {
    let err = new Error(); // for including stack trace
    err.message = (error as any).message;
    throw err;
  }
  if (handle_empty_records && Array.isArray(data)) {
    const recs = data as any;
    if (recs.length === 0) throw new Error('No records found');
  }
  return data;
};
