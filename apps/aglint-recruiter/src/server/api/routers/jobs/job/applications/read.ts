import type {
  DatabaseTable,
  DatabaseView,
  ZodTypeToSchema,
} from '@aglint/shared-types';
import { z } from 'zod';

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

type Application = DatabaseView['application_view'];

type Params = {
  job_id: DatabaseTable['public_jobs']['id'];
  status: Application['status'];
  bookmarked: boolean;
  search: Application['name'];
  badges: (keyof Application['badges'])[];
  application_match: Application['application_match'][];
  city: Application['city'][];
  state: Application['state'][];
  country: Application['country'][];
  session_names: Application['session_names'];
  type:
    | keyof Pick<Application, 'applied_at' | 'name' | 'latest_activity'>
    | 'location'
    | 'application_match';
  order: 'asc' | 'desc';
};

export const schema = z.object({
  job_id: z.string().uuid(),
  status: z.enum(['new', 'interview', 'qualified', 'disqualified']),
  bookmarked: z.boolean(),
  search: z.string().optional(),
  badges: z.array(
    z.enum([
      'skills',
      'schools',
      'positions',
      'leadership',
      'jobStability',
      'careerGrowth',
      'jobHopping',
    ]),
  ),
  application_match: z.array(
    z.enum([
      'top_match',
      'good_match',
      'average_match',
      'poor_match',
      'not_a_match',
      'unknown_match',
    ]),
  ),
  city: z.array(z.string()),
  state: z.array(z.string()),
  country: z.array(z.string()),
  session_names: z.array(z.string()),
  type: z.enum([
    'application_match',
    'name',
    'applied_at',
    'latest_activity',
    'location',
  ]),
  order: z.enum(['asc', 'desc']),
  limit: z.number().min(1).nullish(),
  cursor: z.number().nullish(),
}) satisfies ZodTypeToSchema<Params>;

const pageSize = 29;

const query = async ({ input }: PrivateProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const cursor = input?.cursor ?? 0;
  const query = db
    .from('application_view')
    .select('*', { count: 'exact' })
    .range(cursor, cursor + pageSize)
    .eq('job_id', input.job_id)
    .eq('status', input.status);

  if (input.bookmarked) {
    query.eq('bookmarked', true);
  }

  if (input.search.length) {
    query.ilike('name', `%${input.search}%`);
  }

  if (input.application_match.length) {
    query.or(
      `application_match.in.(${input.application_match.map((match) => match).join(',')})`,
    );
  }

  if (input.badges.length) {
    query.or(
      input.badges
        .map((badge) => `badges->${badge}.gt.${BADGE_CONSTANTS[badge]}`)
        .join(','),
    );
  }

  if (
    [...(input.country ?? []), ...(input.state ?? []), ...(input.city ?? [])]
      .length
  )
    query.or(
      [
        input.country.length
          ? `country.in.(${input.country.map((country) => country).join(',')})`
          : null,
        input.state.length
          ? `state.in.(${(input.state ?? []).map((state) => state).join(',')})`
          : null,
        (input.city ?? []).length
          ? `city.in.(${(input.city ?? []).map((city) => city).join(',')})`
          : null,
      ]
        .filter(Boolean)
        .join(','),
    );

  if ((input.session_names ?? []).length)
    query.or(
      input.session_names
        .map((session_name) => `session_names.cs.{"${session_name}"}`)
        .join(', '),
    );

  if (input.type || input.order) {
    if (input.type === 'location')
      ['city', 'state', 'country'].forEach((type) =>
        query.order(type, { ascending: input.order === 'asc' }),
      );
    else
      query.order(input.type, {
        ascending:
          input.type === 'application_match'
            ? input.order === 'desc'
            : input.order === 'asc',
        nullsFirst: false,
      });
  }

  query.order('id');

  const { data, count } = await query.throwOnError();

  const safeData = data.map((data, i) => ({
    ...data,
    cursor: cursor + i,
  }));

  const nextCursor =
    cursor < count && safeData[safeData.length - 1]
      ? safeData[safeData.length - 1].cursor + 1
      : null;

  return {
    items: safeData,
    nextCursor,
  };
};

export const read = privateProcedure.input(schema).query(query);

const BADGE_CONSTANTS: {
  // eslint-disable-next-line no-unused-vars
  [_id in Params['badges'][number]]: number;
} = {
  careerGrowth: 89,
  jobStability: 89,
  leadership: 69,
  jobHopping: 0,
  positions: 0,
  schools: 0,
  skills: 0,
};
