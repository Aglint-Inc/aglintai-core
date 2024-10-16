import { dayjsLocal } from '@aglint/shared-utils';
import { z } from 'zod';

import { REQUEST_SELECT } from '@/queries/requests';
import {
  type PrivateProcedure,
  privateProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

const schema = z.object({
  assigneeList: z.array(z.string()).optional().nullable(),
  assignerList: z.array(z.string()).optional().nullable(),
  title: z.string().optional().nullable(),
  jobs: z.array(z.string()).optional().nullable(),
  applications: z.array(z.string()).optional().nullable(),
  type: z.array(z.string()).optional().nullable(),
  date: z.array(z.string()).optional().nullable(),
});

const query = async ({ ctx, input }: PrivateProcedure<typeof schema>) => {
  const { assigneeList, assignerList, title, jobs, applications, type, date } =
    input;
  const { user_id } = ctx;
  const assigner_id = user_id;
  const db = createPublicClient();

  const query = db
    .from('request')
    .select(REQUEST_SELECT)
    .eq('status', 'completed');

  query.or(`assigner_id.eq.${assigner_id},assignee_id.eq.${assigner_id}`);

  if (type?.length) query.or(`type.in.(${type.join(',')})`);
  if (jobs?.length)
    query.or(`job_id.in.(${jobs.join(',')})`, {
      referencedTable: 'applications',
    });
  if (applications?.length)
    query.or(`application_id.in.(${applications.join(',')})`);

  if (assignerList?.length)
    query.or(`assigner_id.in.(${assignerList.join(',')})`);
  if (assigneeList?.length)
    query.or(`assignee_id.in.(${assigneeList.join(',')})`);

  if (title?.length) {
    query.ilike('title', `%${title}%`);
  }

  if (date && date.length > 0) {
    let selectedDate: null | string = null;
    if (date[0] === 'today') {
      selectedDate = dayjsLocal().format('YYYY-MM-DD') ?? null;
      query.gte('completed_at', selectedDate);
      query.lt('completed_at', dayjsLocal().add(1, 'day').format('YYYY-MM-DD'));
    }
    if (date[0] === 'yesterday') {
      selectedDate = dayjsLocal().add(-1, 'day').format('YYYY-MM-DD');
      query.gte('completed_at', selectedDate);
      query.lt('completed_at', dayjsLocal().add(0, 'day').format('YYYY-MM-DD'));
    }
    if (date[0] === 'last_7_days') {
      selectedDate = dayjsLocal().add(-7, 'day').format('YYYY-MM-DD');
      query.gte('completed_at', selectedDate);
      query.lte(
        'completed_at',
        dayjsLocal().add(1, 'day').format('YYYY-MM-DD'),
      );
    }
    if (date[0] === 'last_30_days') {
      selectedDate = dayjsLocal().add(-30, 'day').format('YYYY-MM-DD');
      query.gte('completed_at', selectedDate);
      query.lte(
        'completed_at',
        dayjsLocal().add(1, 'day').format('YYYY-MM-DD'),
      );
    }
  }
  query.order('completed_at', {
    ascending: false,
  });
  return (await query).data ?? [];
};

export const completedRequest = privateProcedure.input(schema).query(query);

export type CompletedRequest = ProcedureDefinition<typeof completedRequest>;
