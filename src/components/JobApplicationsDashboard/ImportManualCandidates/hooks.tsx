import { useJobApplications } from '@/src/context/JobApplicationsContext';
import { JobType } from '@/src/types/data.types';
import { Database } from '@/src/types/schema';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import {
  checkDuplicateJobApplicationDbAction,
  uploadResumeDbAction,
} from './utils';

const useUploadCandidate = () => {
  const { handleJobApplicationCreate, handleJobApplicationError } =
    useJobApplications();

  const handleUploadCandidate = async (
    job: JobType,
    candidate: Partial<Database['public']['Tables']['candidates']['Row']>,
    file: any,
  ) => {
    const { data: duplicate, error: e1 } =
      await checkDuplicateJobApplicationDbAction(candidate.email, job.id);
    if (!e1) {
      if (!duplicate) {
        const { data, error } = await uploadResumeDbAction(job.id, file);
        if (data) {
          // TODO: Error handling required and exisiting candidate handling
          const { data: candidateData } = await supabase
            .from('candidates')
            .insert({
              first_name: candidate.first_name,
              last_name: candidate.last_name,
              email: candidate.email,
              resume: data,
            })
            .select();
          const confirmation = await handleJobApplicationCreate({
            candidate_id: candidateData[0].id,
            job_id: job.id,
          });
          if (confirmation) {
            toast.success(
              'Job application uploaded successfully. Once processed, you will be able to view them in the job applications dashboard.',
            );
            return true;
          }
        } else {
          handleJobApplicationError(error);
          return false;
        }
      } else {
        handleJobApplicationError({
          message: 'Another application with the same details exist',
        });
        return false;
      }
    } else {
      handleJobApplicationError(e1);
      return false;
    }
  };

  return { handleUploadCandidate };
};

export default useUploadCandidate;
