import { DB } from '@aglint/shared-types';

export type SupabaseQuery<T extends keyof DB['public']['Tables']> =
  readonly (keyof DB['public']['Tables'][T]['Row'])[];

type SupabaseQueryString<T extends readonly any[]> = T extends readonly [
  infer Head extends string,
  ...infer Tail extends string[],
]
  ? `${Head}${Tail['length'] extends 0 ? '' : ', '}${SupabaseQueryString<Tail>}`
  : '';

export const getSupabaseQuery = <T extends readonly string[]>(query: T) => {
  return query.join(', ') as SupabaseQueryString<T>;
};
