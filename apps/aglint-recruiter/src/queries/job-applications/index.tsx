/* eslint-disable security/detect-object-injection */
import {
  DatabaseTable,
  DatabaseTableUpdate,
  DatabaseView,
} from '@aglint/shared-types';
import {
  infiniteQueryOptions,
  keepPreviousData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { ApplicationsStore } from '@/src/context/ApplicationsContext/store';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { jobQueryKeys } from '../job/keys';

const ROWS = 30;

export const applicationsQueries = {
  all: ({ job_id }: ApplicationsAllQueryPrerequistes) => ({
    queryKey: [...jobQueryKeys.job({ id: job_id }).queryKey, 'applications'],
  }),
  applications: ({ job_id, count, ...filters }: Params) =>
    infiniteQueryOptions({
      queryKey: [...applicationsQueries.all({ job_id }).queryKey, filters],
      initialPageParam: { index: 0, job_id, ...filters },
      enabled: !!job_id && !!count,
      refetchOnWindowFocus: false,
      maxPages: Math.trunc(count / ROWS) + (count % ROWS ? 1 : 0) + 1,
      placeholderData: keepPreviousData,
      getPreviousPageParam: (firstPage) =>
        firstPage?.[0]
          ? {
              index: firstPage[0].index,
              job_id,
              ...filters,
            }
          : undefined,
      getNextPageParam: (lastPage) => {
        const len = lastPage?.length ?? 0;
        if (!len) return undefined;
        const index = lastPage[len - 1].index + 1;
        if (!count || index >= count) return undefined;
        return {
          index,
          job_id,
          ...filters,
        };
      },
      queryFn: getApplications,
    }),
};

type ApplicationsAllQueryPrerequistes = {
  job_id: DatabaseTable['public_jobs']['id'];
  count?: number;
};

type Params = ApplicationsAllQueryPrerequistes & {
  filters: ApplicationsStore['filters'];
  sort: ApplicationsStore['sort'];
  status: DatabaseView['application_view']['status'];
};

const getApplications = async ({
  pageParam: { job_id, index, status, filters, sort },
}: {
  pageParam: Params & { index: number };
}) => {
  const query = supabase
    .from('application_view')
    .select()
    .range(index, index + ROWS - 1)
    .eq('job_id', job_id)
    .eq('status', status);

  if (filters?.search?.length) {
    query.ilike('name', `%${filters.search}%`);
  }

  if (filters?.resume_score?.length) {
    query.or(
      filters.resume_score
        .map((score) => {
          const { max, min } = resumeScoreRange(score);
          return `and(resume_score.gte.${min},resume_score.lte.${max})`;
        })
        .join(','),
    );
  }

  if (filters?.badges?.length) {
    query.or(
      filters.badges
        .map((badge) => `badges->${badge}.gt.${BADGE_CONSTANTS[badge]}`)
        .join(','),
    );
  }

  if (sort) {
    query.order(sort.type, { ascending: sort.order === 'asc' });
  }

  const applications = (await query.throwOnError()).data.map(
    (application, i) => ({ ...application, index: index + i }),
  );
  return applications;
};

const resumeScoreRange = (
  match: ApplicationsStore['filters']['resume_score'][number],
) => {
  switch (match) {
    case 'Top match':
      return { max: 100, min: 80 };
    case 'Good match':
      return { max: 79, min: 60 };
    case 'Average match':
      return { max: 59, min: 40 };
    case 'Poor match':
      return { max: 39, min: 20 };
    case 'Not a match':
      return { max: 19, min: 0 };
  }
};

export const BADGE_CONSTANTS: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsStore['filters']['badges'][number]]: number;
} = {
  careerGrowth: 89,
  jobStability: 89,
  leadership: 69,
  jobHopping: 0,
  positions: 0,
  schools: 0,
  skills: 0,
};

export const useUpdateApplication = (params: Params) => {
  const queryClient = useQueryClient();
  const queryKey = applicationsQueries.applications(params).queryKey;
  return useMutation({
    mutationFn: updateApplication,
    onMutate: (variables) => {
      const oldApplications = queryClient.getQueryData(queryKey);
      const diffedApplication = diffApplication(variables.application);
      if (Object.keys(diffedApplication).length)
        queryClient.setQueryData(queryKey, {
          ...oldApplications,
          pages: oldApplications.pages.reduce(
            (acc, curr) => {
              acc.push(
                curr.reduce(
                  (acc, curr) => {
                    if (curr.id === variables.application_id)
                      acc.push({ ...curr, ...diffedApplication });
                    else acc.push(curr);
                    return acc;
                  },
                  [] as (typeof oldApplications)['pages'][number],
                ),
              );
              return acc;
            },
            [] as (typeof oldApplications)['pages'],
          ),
        });
      return { oldApplications, diffedApplication };
    },
    onError: (_, __, { oldApplications }) => {
      toast.error('Unable to update application');
      queryClient.setQueryData(queryKey, oldApplications);
    },
  });
};

type UpdateParams = {
  application: DatabaseTableUpdate['applications'];
  application_id: string;
};
export const updateApplication = async ({
  application_id,
  application,
}: UpdateParams) =>
  await supabase
    .from('applications')
    .update(application)
    .eq('id', application_id)
    .single()
    .throwOnError();

const sampleApplicationView: {
  // eslint-disable-next-line no-unused-vars
  [key in keyof Partial<
    DatabaseTable['applications']
  >]: keyof DatabaseView['application_view'];
} = {
  applied_at: 'applied_at',
  bookmarked: 'bookmarked',
  candidate_file_id: 'candidate_file_id',
  candidate_id: 'candidate_id',
  created_at: 'created_at',
  id: 'id',
  overall_interview_score: 'interview_score',
  overall_score: 'resume_score',
  status: 'status',
  processing_status: 'processing_status',
  is_new: 'is_new',
} as const;

export const diffApplication = (
  application: UpdateParams['application'],
): Partial<DatabaseView['application_view']> => {
  return Object.entries(application).reduce(
    (acc, [key, value]) => {
      const mappedColumn =
        sampleApplicationView[key as keyof typeof application];
      if (mappedColumn) acc[mappedColumn] = value as never;
      return acc;
    },
    {} as Partial<DatabaseView['application_view']>,
  );
};
