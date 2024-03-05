import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useState } from 'react';

import AUIButton from '@/src/components/Common/AUIButton';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { PublicJobsType } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { useJobForm } from '../JobPostFormProvider';
import {
  API_FAIL_MSG,
  getjobformToDbcolumns,
  isWarningsCleared,
  supabaseWrap
} from '../utils';

const JobPublishButton = () => {
  const { jobForm, dispatch, formWarnings } = useJobForm();
  const { handleUIJobUpdate, jobsData } = useJobs();
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const jobFormData = getjobformToDbcolumns(jobForm);

      const [job] = supabaseWrap(
        await supabase
          .from('public_jobs')
          .update({
            ...jobFormData,
            status: 'published',
            draft: null
          })
          .eq('id', jobFormData.id)
          .select()
      ) as PublicJobsType[];

      if (!job.slug) {
        supabaseWrap(
          await supabase
            .from('public_jobs')
            .update({
              slug: getjobPostSlug(
                job.id,
                job.job_title,
                job.company,
                job.location
              )
            })
            .eq('id', jobFormData.id)
        );
      }

      dispatch({
        type: 'updateJobPublishstatus',
        payload: {
          status: 'published'
        }
      });
      if (jobForm.formType === 'new') {
        router.replace(`/jobs/${jobForm.jobPostId}`);
      }
      await handleUIJobUpdate({
        ...(job as any),
        count: {
          ...jobsData.jobs.find((j) => j.id === job.id)?.count
        }
      });
      await supabase.rpc('update_resume_score', { job_id: jobForm.jobPostId });
      axios.post('/api/editjob/publishjob', { job: job });
      toast.success('Job published successfully');
      posthog.capture('Publish Job Button Clicked');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsPublishing(false);
    }
  };

  const isJobPublished =
    jobForm.formFields.isDraftCleared && jobForm.jobPostStatus === 'published';

  return (
    <>
      <AUIButton
        onClick={() => {
          handlePublish();
        }}
        disabled={isJobPublished || !isWarningsCleared(formWarnings)}
        startIcon={
          isPublishing && (
            <CircularProgress
              color='inherit'
              size={'15px'}
              sx={{ color: palette.grey[400] }}
            />
          )
        }
      >
        {isJobPublished ? 'Published' : 'Publish'}
      </AUIButton>
    </>
  );
};

export default JobPublishButton;

const getjobPostSlug = (
  jobId: string,
  jobTitle: string,
  company: string,
  location: string
) => {
  if (!jobId || !jobTitle || !company || !location) return '';

  const convertedJobTitle = jobTitle
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '')
    .replace(/\//g, '-')
    .replace(/[()]/g, '');
  const convertedCompany = company
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '');
  const convertedJobLocation = location
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/,/g, '');
  let slug = `${convertedJobTitle}-at-${convertedCompany}-${convertedJobLocation}-${jobId}`;
  return slug;
};
