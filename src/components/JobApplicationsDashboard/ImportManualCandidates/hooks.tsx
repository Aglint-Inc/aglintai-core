import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  deleteCandidateDbAction,
  deleteResumeDbAction,
  insertCandidateDbAction,
  updateCandidateDbAction,
  uploadResumeDbAction,
} from '@/src/context/JobApplicationsContext/utils';
import { JobType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import toast from '@/src/utils/toast';

const useUploadCandidate = () => {
  const { handleJobApplicationCreate, handleJobApplicationError } =
    useJobApplications();

  const handleUploadCandidate = async (
    job: JobType,
    candidate: Partial<Database['public']['Tables']['candidates']['Row']>,
    file: any,
  ) => {
    const { data: d1, error: e1 } = await insertCandidateDbAction({
      first_name: candidate.first_name,
      last_name: candidate.last_name,
      email: candidate.email,
    });
    if (d1) {
      const { data: d2, error: e2 } = await uploadResumeDbAction(
        d1[0].id,
        job.id,
        file,
      );
      if (d2) {
        const { data: d3, error: e3 } = await updateCandidateDbAction({
          id: d1[0].id,
          resume: d2,
        } as any);
        if (d3) {
          const confirmation = await handleJobApplicationCreate({
            candidate_id: d3[0].id,
            job_id: job.id,
          });
          if (confirmation) {
            toast.success(
              'Job application created successfully. Processing will take some time.',
            );
            return true;
          }
        } else {
          await deleteResumeDbAction(d1[0].id, job.id, file);
          await deleteCandidateDbAction(d1[0].id);
          handleJobApplicationError(e3);
        }
      } else {
        await deleteCandidateDbAction(d1[0].id);
        handleJobApplicationError(e2);
      }
    } else {
      handleJobApplicationError(e1);
    }
    return false;
  };

  return { handleUploadCandidate };
};

export default useUploadCandidate;
