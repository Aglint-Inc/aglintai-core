import axios from 'axios';

import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  InputData,
  JobApplication,
} from '@/src/context/JobApplicationsContext/types';
import { JobType } from '@/src/types/data.types';
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
    jobApplication: Pick<
      JobApplication,
      'first_name' | 'last_name' | 'email' | 'status'
    > &
      InputData,
    file: any,
  ) => {
    const { data: duplicate, error: e1 } =
      await checkDuplicateJobApplicationDbAction(jobApplication.email, job.id);
    if (!e1) {
      if (!duplicate) {
        const { data, error } = await uploadResumeDbAction(job.id, file);
        if (data) {
          const applicantData = await handleJobApplicationCreate({
            ...jobApplication,
            resume: data,
          });
          if (applicantData) {
            await axios.post(
              'https://us-central1-aglint-cloud-381414.cloudfunctions.net/resume-score-gen',
              {
                pdfUrl: applicantData.resume,
                application_id: applicantData.application_id,
                description: job.description || job.responsibilities.join(','),
                job_title: job.job_title,
                skills: job.skills || [],
                company_name: job?.company,
              },
            );


          
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
