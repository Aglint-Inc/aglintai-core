import { dayjsLocal } from '@aglint/shared-utils';
import {
  type responseCreatedCompletedType,
  type SectionRequests,
} from '@requests/types';

import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const query = async ({ ctx }: PrivateProcedure) => {
  const assigner_id =  ctx.user_id;
  const db = ctx.db;
  const [createdCompletedRequestCount, allRequestCount] =
    await Promise.allSettled([
      db.rpc('get_request_stats', {
        assigner_id: assigner_id,
        curr_date: dayjsLocal().format('YYYY-MM-DD'),
      }),
      db
        .from('request')
        .select('type,status,priority')
        .or(`assigner_id.eq.${assigner_id},assignee_id.eq.${assigner_id}`),
    ]);

  const createdRequest = (
    createdCompletedRequestCount as responseCreatedCompletedType
  ).value.data.map((ele) => {
    return {
      name: dayjsLocal(ele.date).format('MMM DD'),
      count: ele.created,
    };
  });

  const completedRequest = (
    createdCompletedRequestCount as responseCreatedCompletedType
  ).value.data.map((ele) => {
    return {
      name: dayjsLocal(ele.date).format('MMM DD'),
      count: ele.completed,
    };
  });
  const onGoingRequest = (
    createdCompletedRequestCount as responseCreatedCompletedType
  ).value.data.map((ele) => {
    return {
      name: dayjsLocal(ele.date).format('MMM DD'),
      count: ele.on_going,
    };
  });
  const cardData =
    allRequestCount.status === 'fulfilled' ? allRequestCount?.value?.data : [];
  const card = (cardData ?? []).reduce(
    (acc, curr) => {
      if (curr.status === 'completed') acc.completed_request += 1;
      else if (curr.priority === 'urgent') acc.urgent_request += 1;
      else {
        acc[curr.type] += 1;
        acc.standard_request += 1;
      }
      return acc;
    },
    {
      cancel_schedule_request: 0,
      completed_request: 0,
      decline_request: 0,
      reschedule_request: 0,
      schedule_request: 0,
      urgent_request: 0,
      standard_request: 0,
    } as SectionRequests,
  );

  const all_open_request =
    (card?.urgent_request ?? 0) + (card?.standard_request ?? 0);

  return {
    chat: {
      createdRequest,
      completedRequest,
      onGoingRequest,
    },
    card,
    all_open_request,
  };
};

export const requestCount = privateProcedure.query(query);

export type RequestCount = ProcedureDefinition<typeof requestCount>;
