import { DatabaseTable } from '@aglint/shared-types';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';

type Event = 'INSERT' | 'UPDATE' | 'DELETE';
type Tables = keyof DatabaseTable;

type Condition = 'eq' | 'gte' | 'gt' | 'lte' | 'lt' | 'in';

type Filter<
  T extends Tables,
  U extends Condition = Condition,
> = keyof DatabaseTable[T] extends infer K
  ? K extends string
    ? U extends 'in'
      ? `${K}.${U}.[${string}]`
      : `${K}.${U}.${string}`
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
