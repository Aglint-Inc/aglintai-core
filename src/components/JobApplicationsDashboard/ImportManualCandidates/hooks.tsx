import { filteredInsertCandidateDbAction } from '@/src/context/CandidatesContext/utils';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  deleteCandidateDbAction,
  deleteResumeDbAction,
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
    const {
      data: d1,
      error: e1,
      isNew,
    } = await filteredInsertCandidateDbAction({
      first_name: candidate.first_name,
      last_name: candidate.last_name,
      email: candidate.email,
      phone: candidate.phone,
      linkedin: candidate.linkedin,
    });
    if (d1 && !e1) {
      const { data: d2, error: e2 } = await uploadResumeDbAction(
        d1[0].id,
        job.id,
        file,
      );
      if (d2 && !e2) {
        const confirmation = await handleJobApplicationCreate({
          candidate_id: d1[0].id,
          job_id: job.id,
          resume: d2,
        });
        if (confirmation) {
          toast.success(
            'Job application created successfully. Processing will take some time.',
          );
          return true;
        }
      } else {
        await deleteResumeDbAction(d1[0].id, job.id, file);
        if (isNew) await deleteCandidateDbAction(d1[0].id);
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
