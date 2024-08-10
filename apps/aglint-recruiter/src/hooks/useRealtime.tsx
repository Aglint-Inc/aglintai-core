import { DatabaseTable } from '@aglint/shared-types';
import { RealtimePostgresInsertPayload } from '@supabase/supabase-js';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

import { supabase } from '../utils/supabase/client';

const CHANNEL = 'db-changes';

export const useRealtimes = (subscriptions: Entry[]) => {
  useEffect(() => {
    const connection = supabase.channel(CHANNEL);
    subscriptions.forEach((subscription) =>
      subscription.event === 'DELETE'
        ? connection.on(
            //@ts-expect-error
            'postgres_changes',
            {
              schema: 'public',
              event: subscription.event,
              table: subscription.table,
            },
            subscription.callback,
          )
        : connection.on(
            //@ts-expect-error
            'postgres_changes',
            {
              schema: 'public',
              event: subscription.event,
              table: subscription.table,
              filter: subscription.filter,
            },
            (pauload) => console.log(pauload, '🔥👍'),
          ),
    );
    console.log('sub🔥', subscriptions);
    connection.subscribe();
    return () => {
      console.log('unsub🔥');
      connection.unsubscribe();
    };
  }, [subscriptions, supabase]);
};

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

type Entry<T = Tables, U = Event> = T extends Tables
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

export const useRealtime = <T extends Entry = Entry>(subscriptions: T[]) => {
  const queryKey = ['app', 'real-time', { subscriptions }];
  const queryClient = useQueryClient();
  const connection = supabase.channel(CHANNEL);
  useEffect(() => {
    subscriptions.forEach(({ callback, ...subscription }) =>
      connection.on(
        //@ts-expect-error
        'postgres_changes',
        {
          schema: 'public',
          ...subscription,
        },
        (payload) => {
          console.log(payload, '🔥👍');
          queryClient.setQueryData<
            RealtimePostgresInsertPayload<DatabaseTable[T['table']]>
          >(queryKey, payload);
          callback(payload);
        },
      ),
    );
    console.log('SUB,🔥');
    connection.subscribe();
    return () => {
      console.log('UNSUB,🔥');
      connection.unsubscribe();
    };
  }, []);
  const query = useQuery({
    gcTime: 0,
    staleTime: Infinity,
    refetchOnWindowFocus: true,
    queryKey,
    queryFn: () => {
      connection.unsubscribe();
      connection.subscribe();
      return queryClient.getQueryData<
        RealtimePostgresInsertPayload<DatabaseTable[T['table']]>
      >(queryKey);
    },
  });
  return query;
};
