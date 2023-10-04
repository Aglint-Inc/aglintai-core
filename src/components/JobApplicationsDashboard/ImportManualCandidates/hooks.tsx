import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  InputData,
  JobApplication,
} from '@/src/context/JobApplicationsContext/types';
import toast from '@/src/utils/toast';

import {
  checkDuplicateJobApplicationDbAction,
  uploadResumeDbAction,
} from './utils';

const useUploadCandidate = () => {
  const { handleJobApplicationCreate, handleJobApplicationError } =
    useJobApplications();

  const handleUploadCandidate = async (
    jobId: string,
    jobApplication: Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'score' | 'status'
    > &
      InputData,
    file: any,
  ) => {
    const { data: duplicate, error: e1 } =
      await checkDuplicateJobApplicationDbAction(jobApplication.email, jobId);
    if (!e1) {
      if (!duplicate) {
        const { data, error } = await uploadResumeDbAction(jobId, file);
        if (data) {
          const confirmation = await handleJobApplicationCreate({
            ...jobApplication,
            resume: data,
          });
          if (confirmation) {
            toast.success('Job application successfully created!');
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
