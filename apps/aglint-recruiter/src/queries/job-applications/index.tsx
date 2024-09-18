import type {
  DatabaseEnums,
  DatabaseFunctions,
  DatabaseTable,
  DatabaseTableInsert,
  DatabaseTableUpdate,
} from '@aglint/shared-types';
import {
  useMutation,
  useMutationState,
  useQueryClient,
} from '@tanstack/react-query';

import { UploadApiFormData } from '@/apiUtils/job/candidateUpload/types';
import { handleJobApi } from '@/apiUtils/job/utils';
import { useAuthDetails } from '@/context/AuthContext/AuthContext';
import { type Application } from '@/types/applications.types';
import { supabase } from '@/utils/supabase/client';
import toast from '@/utils/toast';

import { useInvalidateJobQueries } from '../job';
import { requestQueries } from '../requests';
import { applicationMutationKeys } from './keys';

type ApplicationsAllQueryPrerequistes = {
  recruiter_id: DatabaseTable['recruiter']['id'];
  job_id: DatabaseTable['public_jobs']['id'];
  count?: number;
  polling?: boolean;
};

// type Params = ApplicationsAllQueryPrerequistes &
//   Omit<JobParams['filters'], 'section'> & {
//     status: Application['status'];
//   };

// export const useUpdateApplication = (params: Params) => {
//   const queryClient = useQueryClient();
//   const queryKey = applicationsQueries.applications(params).queryKey;
//   return useMutation({
//     mutationFn: updateApplication,
//     onMutate: (variables) => {
//       const oldApplications = queryClient.getQueryData(queryKey);
//       const diffedApplication = diffApplication(variables.application);
//       if (Object.keys(diffedApplication).length)
//         queryClient.setQueryData(queryKey, {
//           ...oldApplications,
//           pages: oldApplications.pages.reduce(
//             (acc, curr) => {
//               acc.push(
//                 curr.reduce(
//                   (acc, curr) => {
//                     if (curr.id === variables.application_id)
//                       acc.push({ ...curr, ...diffedApplication });
//                     else acc.push(curr);
//                     return acc;
//                   },
//                   [] as (typeof oldApplications)['pages'][number],
//                 ),
//               );
//               return acc;
//             },
//             [] as (typeof oldApplications)['pages'],
//           ),
//         });
//       return { oldApplications, diffedApplication };
//     },
//     onError: (_, __, { oldApplications }) => {
//       toast.error('Unable to update application');
//       queryClient.setQueryData(queryKey, oldApplications);
//     },
//   });
// };

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
  [_key in keyof Partial<DatabaseTable['applications']>]: keyof Application;
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

export const useUploadApplication = ({ job_id }: { job_id: string }) => {
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

export const useUploadResume = (params: { job_id: string }) => {
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

export const useUploadCsv = (params: { job_id: string }) => {
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
          recruiter_id: payload.recruiter_id,
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
        await supabase.rpc('move_to_interview', args).throwOnError();
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
  qualified: null;
  new: null;
  disqualified: Extract<
    DatabaseEnums['email_slack_types'],
    'applicantReject_email_applicant'
  > | null;
};
type SectionToEmailGuard = {
  [id in DatabaseTable['applications']['status']]: SectionToEmail[id];
};
const moveApplications = async ({
  job_id,
  recruiter_id,
  applications,
  status,
  email,
  callBacks = [],
}: MoveApplications) => {
  const safeApplications = applications.map((id) => ({
    id,
    status,
    job_id,
    recruiter_id,
  }));
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
export const useReuploadResume = (params: {
  job_id: string;
  recruiter_id: string;
}) => {
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
          recruiter_id: params.recruiter_id,
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
