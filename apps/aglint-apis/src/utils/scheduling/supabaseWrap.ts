// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
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
  if (error) throw error;
  if (handle_empty_records && Array.isArray(data)) {
    const recs = data as any;
    if (recs.length === 0) throw new Error('No records found');
  }
  return data;
};
