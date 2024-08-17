/* eslint-disable security/detect-object-injection */
import type {
  DatabaseEnums,
  DatabaseFunctions,
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from '@aglint/shared-types';
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';

import { UploadApiFormData } from '@/src/apiUtils/job/candidateUpload/types';
import { handleJobApi } from '@/src/apiUtils/job/utils';
import type { ApplicationsParams } from '@/src/context/ApplicationsContext/hooks';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { Application } from '@/src/types/applications.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { GC_TIME } from '..';
import { jobQueries, useInvalidateJobQueries } from '../job';
import { requestQueries } from '../requests';
import { applicationMutationKeys } from './keys';

const ROWS = 30;

export const applicationsQueries = {
  all: ({ job_id }: ApplicationsAllQueryPrerequistes) => ({
    queryKey: [...jobQueries.job({ id: job_id }).queryKey, 'applications'],
  }),
  locationFilters: ({
    job_id,
    polling = false,
  }: ApplicationsAllQueryPrerequistes) =>
    queryOptions({
      enabled: !!job_id,
      gcTime: job_id ? GC_TIME : 0,
      refetchOnMount: polling,
      queryKey: [
        ...applicationsQueries.all({ job_id }).queryKey,
        'location_filters',
      ],
      queryFn: async () =>
        (await supabase.rpc('get_applicant_locations', { job_id }).single())
          .data.locations,
    }),
  badgesCount: ({
    job_id,
    polling = false,
  }: ApplicationsAllQueryPrerequistes) =>
    queryOptions({
      enabled: !!job_id,
      gcTime: job_id ? GC_TIME : 0,
      refetchOnMount: polling,
      queryKey: [
        ...applicationsQueries.all({ job_id }).queryKey,
        'badges_count',
      ],
      queryFn: async () =>
        (await supabase.rpc('get_applicant_badges', { job_id })).data,
    }),
  applications: ({
    job_id,
    count,
    polling = false,
    status,
    ...filters
  }: Params) =>
    infiniteQueryOptions({
      queryKey: [
        ...applicationsQueries.all({ job_id }).queryKey,
        { status },
        filters,
      ],
      initialPageParam: { index: 0, job_id, status, ...filters },
      enabled: !!job_id,
      refetchOnMount: polling,
      refetchOnWindowFocus: false,
      maxPages: Math.trunc(count / ROWS) + (count % ROWS ? 1 : 0) + 1,
      placeholderData: keepPreviousData,
      getPreviousPageParam: (firstPage) =>
        firstPage?.[0]
          ? {
              index: firstPage[0].index,
              job_id,
              status,
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
          status,
          ...filters,
        };
      },
      queryFn: getApplications,
    }),
};

type ApplicationsAllQueryPrerequistes = {
  job_id: DatabaseTable['public_jobs']['id'];
  count?: number;
  polling?: boolean;
};

type Params = ApplicationsAllQueryPrerequistes &
  Omit<ApplicationsParams['filters'], 'section'> & {
    status: Application['status'];
  };

const getApplications = async ({
  pageParam: {
    job_id,
    index,
    status,
    badges,
    bookmarked,
    locations,
    order,
    resume_match,
    search,
    type,
    schedule_status,
  },
}: {
  pageParam: Params & { index: number };
}) => {
  const query = supabase
    .from('application_view')
    .select()
    .range(index, index + ROWS - 1)
    .eq('job_id', job_id)
    .eq('status', status);

  if (bookmarked) {
    query.eq('bookmarked', true);
  }

  if (search?.length) {
    query.ilike('name', `%${search}%`);
  }

  if (resume_match?.length) {
    query.or(
      `application_match.in.(${resume_match.map((match) => match).join(',')})`,
    );
  }

  if (schedule_status?.length) {
    query.or(
      [
        ...schedule_status.map(
          (status) => `meeting_details.cs.[{"status":"${status}"}]`,
        ),
        schedule_status.includes('not_scheduled') && 'meeting_details.eq.[]',
      ]
        .filter(Boolean)
        .join(','),
    );
  }

  if (badges?.length) {
    query.or(
      badges
        .map((badge) => `badges->${badge}.gt.${BADGE_CONSTANTS[badge]}`)
        .join(','),
    );
  }

  const { country, state, city } = (locations ?? []).reduce(
    (acc, curr, i) => {
      let type: keyof typeof acc = null;
      switch (i) {
        case 0:
          type = 'country';
          break;
        case 1:
          type = 'state';
          break;
        case 2:
          type = 'city';
          break;
      }
      acc[type].push(
        curr
          .filter(({ status }) => status === 'active')
          .map(({ label }) => label),
      );
      return acc;
    },
    { country: [], state: [], city: [] },
  );

  if ([...country, ...state, ...city].length)
    query.or(
      [
        country.length
          ? `country.in.(${country.map((country) => country).join(',')})`
          : null,
        state.length
          ? `state.in.(${(state ?? []).map((state) => state).join(',')})`
          : null,
        (city ?? []).length
          ? `city.in.(${(city ?? []).map((city) => city).join(',')})`
          : null,
      ]
        .filter(Boolean)
        .join(','),
    );

  if (type || order) {
    if (type === 'location')
      ['city', 'state', 'country'].forEach((type) =>
        query.order(type, { ascending: order === 'asc' }),
      );
    else
      query.order(type, {
        ascending: order === 'asc',
        nullsFirst: false,
      });
  }
  query.order('id');

  const applications = (await query.throwOnError()).data.map(
    (application, i) => ({ ...application, index: index + i }),
  );
  return applications;
};

export const BADGE_CONSTANTS: {
  // eslint-disable-next-line no-unused-vars
  [id in ApplicationsParams['filters']['badges'][number]]: number;
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
  [key in keyof Partial<DatabaseTable['applications']>]: keyof Application;
} = {
  applied_at: 'applied_at',
  bookmarked: 'bookmarked',
  candidate_file_id: 'candidate_file_id',
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
): Partial<Application> => {
  return Object.entries(application).reduce((acc, [key, value]) => {
    const mappedColumn = sampleApplicationView[key as keyof typeof application];
    if (mappedColumn) acc[mappedColumn] = value as never;
    return acc;
  }, {} as Partial<Application>);
};

export const useUploadApplication = ({ job_id }: Pick<Params, 'job_id'>) => {
  const { recruiter_id } = useAuthDetails();
  const { revalidateJobQueries } = useInvalidateJobQueries();
  return useMutation({
    mutationFn: async (
      payload: Omit<HandleUploadApplication, 'job_id' | 'recruiter_id'>,
    ) => {
      toast.message('Uploading application');
      await handleUploadApplication({
        job_id,
        recruiter_id,
        ...payload,
      });
      await revalidateJobQueries(job_id);
    },
    onError: (error) => toast.error(`Upload failed. (${error.message})`),
    onSuccess: () => toast.success('Uploaded successfully'),
  });
};
type HandleUploadApplication = ApplicationsAllQueryPrerequistes & {
  recruiter_id: string;
  candidate: Omit<DatabaseTableInsert['candidates'], 'recruiter_id'>;
  file: File;
};
const handleUploadApplication = async (payload: HandleUploadApplication) => {
  const formData = new FormData();
  formData.append(UploadApiFormData.FILES, payload.file);
  const request = {
    params: {
      email: payload.candidate.email,
      first_name: payload.candidate.first_name,
      job_id: payload.job_id,
      last_name: payload.candidate.last_name,
      phone: payload.candidate.phone || null,
      linkedin: payload.candidate.linkedin || null,
      recruiter_id: payload.recruiter_id,
    },
    files: formData,
  };
  const response = await handleJobApi('candidateUpload/manualUpload', request);
  if (!response.confirmation) throw new Error(response.error);
};

export const useUploadResume = (params: Pick<Params, 'job_id'>) => {
  const { recruiter_id } = useAuthDetails();
  const { revalidateJobQueries } = useInvalidateJobQueries();
  return useMutation({
    mutationFn: async (
      payload: Omit<HandleUploadResume, 'job_id' | 'recruiter_id'>,
    ) => {
      toast.message('Uploading applications');
      await handleBulkResumeUpload({
        job_id: params.job_id,
        recruiter_id,
        ...payload,
      });
      await revalidateJobQueries(params.job_id);
    },
    onError: (error) => toast.error(`Upload failed. (${error.message})`),
    onSuccess: () => toast.success('Uploaded successfully'),
  });
};
type HandleUploadResume = ApplicationsAllQueryPrerequistes & {
  recruiter_id: string;
  files: File[];
};
const handleResumeUpload = async (payload: HandleUploadResume) => {
  const formData = new FormData();
  payload.files.forEach((file) =>
    formData.append(UploadApiFormData.FILES, file),
  );
  const request = {
    params: {
      job_id: payload.job_id,
      recruiter_id: payload.recruiter_id,
    },
    files: formData,
  };
  const response = await handleJobApi('candidateUpload/resumeUpload', request);
  if (response.filter(({ confirmation }) => !confirmation).length !== 0)
    throw new Error('Failed to upload resume');
  return response;
};
const handleBulkResumeUpload = async (payload: HandleUploadResume) => {
  const promises = payload.files.map((file) =>
    handleResumeUpload({
      job_id: payload.job_id,
      recruiter_id: payload.recruiter_id,
      files: [file],
    }),
  );
  const responses = await Promise.allSettled(promises);
  const failedResponses = responses.filter(
    ({ status }) => status === 'rejected',
  ) as PromiseRejectedResult[];
  if (failedResponses.length !== 0)
    throw new Error(`Failed to upload ${failedResponses.length} resumes.`);
};

export const useUploadCsv = (params: Pick<Params, 'job_id'>) => {
  const { recruiter_id } = useAuthDetails();
  const { revalidateJobQueries } = useInvalidateJobQueries();
  return useMutation({
    mutationFn: async (
      payload: Omit<HandleUploadCsv, 'job_id' | 'recruiter_id'>,
    ) => {
      toast.message('Uploading applications');
      await handleBulkCsvUpload({
        job_id: params.job_id,
        recruiter_id,
        ...payload,
      });
      await revalidateJobQueries(params.job_id);
    },
    onError: (error) => toast.error(`Upload failed. (${error.message})`),
    onSuccess: () => toast.success('Uploaded successfully'),
  });
};
type HandleUploadCsv = ApplicationsAllQueryPrerequistes & {
  candidates: Parameters<
    typeof handleJobApi<'candidateUpload/csvUpload'>
  >['1']['candidates'];
  recruiter_id: string;
};
const handleBulkCsvUpload = async (payload: HandleUploadCsv) => {
  const formData = {
    job_id: payload.job_id,
    recruiter_id: payload.recruiter_id,
    candidates: payload.candidates,
  };
  const response = await handleJobApi('candidateUpload/csvUpload', formData);
  if (!response.confirmation) throw new Error(response.error);
};

type MoveApplicationArgs = Omit<
  Parameters<typeof moveApplications>[0],
  'job_id'
>;
export const useMoveApplications = (
  payload: ApplicationsAllQueryPrerequistes,
) => {
  const { revalidateJobQueries } = useInvalidateJobQueries();
  const { mutationKey } = applicationMutationKeys.move();
  const mutationQueue = useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as MoveApplicationArgs,
  });
  return {
    ...useMutation({
      mutationKey,
      mutationFn: async (args: MoveApplicationArgs) => {
        await moveApplications({
          job_id: payload.job_id,
          ...args,
        });
        await revalidateJobQueries(payload.job_id);
      },
      onSuccess: () => toast.success('Moved successfully'),
      onError: () => toast.error('Unable to move applications'),
    }),
    mutationQueue,
  };
};

export const useMoveApplicationsToInterview = (
  payload: ApplicationsAllQueryPrerequistes,
) => {
  const queryClient = useQueryClient();
  const { revalidateJobQueries } = useInvalidateJobQueries();
  const { refetchQueries, removeQueries } =
    requestQueries.requests_invalidate();
  const { mutationKey } = applicationMutationKeys.move();
  return {
    ...useMutation({
      mutationKey,
      mutationFn: async (
        args: DatabaseFunctions['move_to_interview']['Args'],
      ) => {
        // TODO: fix this if u can
        await axios.post('/api/application/move-to-interview', {
          ...args,
        });
        await Promise.allSettled([
          revalidateJobQueries(payload.job_id),
          queryClient.refetchQueries(refetchQueries()),
          queryClient.removeQueries(removeQueries()),
        ]);
      },
      onSuccess: () => toast.success('Moved successfully'),
      onError: () =>
        toast.error(
          'Unable to move applications. Please verify for a valid interview plan.',
        ),
    }),
  };
};
type MoveApplications = ApplicationsAllQueryPrerequistes & {
  applications: DatabaseTable['applications']['id'][];
  status: keyof SectionToEmailGuard;
  email: SectionToEmailGuard[keyof SectionToEmailGuard];
  callBacks?: Promise<any>[];
};
type SectionToEmail = {
  interview: null;
  assessment: null;
  qualified: null;
  new: null;
  disqualified: Extract<
    DatabaseEnums['email_slack_types'],
    'applicantReject_email_applicant'
  > | null;
  screening: Extract<
    DatabaseEnums['email_slack_types'],
    'phoneScreen_email_candidate' | 'phoneScreenRemind_email_applicant'
  > | null;
};
type SectionToEmailGuard = {
  [id in DatabaseEnums['application_status']]: SectionToEmail[id];
};
const moveApplications = async ({
  job_id,
  applications,
  status,
  email,
  callBacks = [],
}: MoveApplications) => {
  const safeApplications = applications.map((id) => ({ id, status, job_id }));
  await Promise.allSettled([
    ...callBacks,
    supabase.from('applications').upsert(safeApplications).throwOnError(),
    (async () => {
      if (email) {
        const safeStatus = applications.map((application_id) => ({
          application_id,
          email,
        }));
        await supabase
          .from('application_email_status')
          .insert(safeStatus)
          .throwOnError();
      }
    })(),
  ]);
};

type ReuploadResumeArgs = Pick<
  HandleReUploadResume,
  'application_id' | 'candidate_id' | 'files'
>;
export const useReuploadResume = (params: Pick<Params, 'job_id'>) => {
  const { revalidateJobQueries } = useInvalidateJobQueries();
  const { mutationKey } = applicationMutationKeys.reupload();
  const mutationQueue = useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as ReuploadResumeArgs,
  });
  return {
    ...useMutation({
      mutationKey,
      mutationFn: async (payload: ReuploadResumeArgs) => {
        toast.message('Re-Uploading resume');
        await handleResumeReUpload({
          ...payload,
          job_id: params.job_id,
        });
        await revalidateJobQueries(params.job_id);
      },
      onError: (error) => toast.error(`Re-Upload failed. (${error.message})`),
      onSuccess: () => toast.success('Re-Uploaded successfully'),
    }),
    mutationQueue,
  };
};
type HandleReUploadResume = ApplicationsAllQueryPrerequistes & {
  application_id: string;
  candidate_id: string;
  files: File[];
};
const handleResumeReUpload = async (payload: HandleReUploadResume) => {
  const formData = new FormData();
  payload.files.forEach((file) =>
    formData.append(UploadApiFormData.FILES, file),
  );
  const request = {
    params: {
      application_id: payload.application_id,
      candidate_id: payload.candidate_id,
    },
    files: formData,
  };
  const response = await handleJobApi(
    'candidateUpload/resumeReupload',
    request,
  );
  if (!response.confirmation) throw new Error('Failed to upload resume');
  return response;
};

type DeleteApplicationArgs = { application_id: string };
export const useDeleteApplication = (
  params: ApplicationsAllQueryPrerequistes,
) => {
  const { mutationKey } = applicationMutationKeys.delete();
  const mutationQueue = useMutationState({
    filters: { mutationKey, status: 'pending' },
    select: (mutation) => mutation.state.variables as DeleteApplicationArgs,
  });
  const { revalidateJobQueries } = useInvalidateJobQueries();
  return {
    ...useMutation({
      mutationKey,
      mutationFn: async (args: DeleteApplicationArgs) => {
        toast.message('Deleting applications');
        await supabase
          .from('applications')
          .delete()
          .eq('id', args.application_id);
        await revalidateJobQueries(params.job_id);
      },
      onError: (error) =>
        toast.error(`Failed to delte application. (${error.message})`),
      onSuccess: () => toast.success('Deleted successfully'),
    }),
    mutationQueue,
  };
};
