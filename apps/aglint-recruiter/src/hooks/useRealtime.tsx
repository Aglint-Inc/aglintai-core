import { DatabaseTable } from '@aglint/shared-types';
import {
  RealtimeChannel,
  RealtimePostgresInsertPayload,
} from '@supabase/supabase-js';

type Event = 'INSERT' | 'UPDATE' | 'DELETE';
type Tables = keyof DatabaseTable;

type Condition = 'eq' | 'gte' | 'gt' | 'lte' | 'lt' | 'in';

type Filter<
  T extends Tables,
  U extends Condition = Condition,
> = keyof DatabaseTable[T] extends infer K
  ? K extends string
    ? U extends 'in'
      ? `${K}=${U}.(${string})`
      : `${K}=${U}.${string}`
    : never
  : never;

export type Entry<T = Tables, U = Event> = T extends Tables
  ? U extends 'DELETE'
    ? {
        table: T;
        event: U;
        callback: (
          // eslint-disable-next-line no-unused-vars
          payload: RealtimePostgresInsertPayload<DatabaseTable[T]>,
        ) => void;
      }
    : {
        table: T;
        event: U;
        filter: Filter<T>;
        callback: (
          // eslint-disable-next-line no-unused-vars
          payload: RealtimePostgresInsertPayload<DatabaseTable[T]>,
        ) => void;
      }
  : never;

export const subscriptions = <T extends Entry>(
  connection: RealtimeChannel,
  subscriptions: T[],
) => {
  subscriptions.forEach(({ callback, ...rest }) =>
    connection.on<Parameters<T['callback']>['0']>(
      //@ts-expect-error
      'postgres_changes',
      { schema: 'public', ...rest },
      callback,
    ),
  );
  return connection;
};
