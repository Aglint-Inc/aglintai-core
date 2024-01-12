import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useState } from 'react';
import posthog from 'posthog-js'

import AUIButton from '@/src/components/Common/AUIButton';
import { useJobs } from '@/src/context/JobsContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { useJobForm } from '../JobPostFormProvider';
import {
  API_FAIL_MSG,
  getjobformToDbcolumns,
  isWarningsCleared,
  supabaseWrap,
} from '../utils';

const JobPublishButton = () => {
  const { jobForm, dispatch, formWarnings } = useJobForm();
  const { handleUIJobUpdate } = useJobs();
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const jobFormData = getjobformToDbcolumns(jobForm);

      saveJson(jobFormData);
      const [job] = supabaseWrap(
        await supabase
          .from('public_jobs')
          .update({
            ...jobFormData,
            status: 'published',
            draft: null,
          })
          .eq('id', jobForm.jobPostId)
          .select(),
      );
      dispatch({
        type: 'updateJobPublishstatus',
        payload: {
          status: 'published',
        },
      });
      if (jobForm.formType === 'new') {
        router.replace(`/jobs/${jobForm.jobPostId}`);
      }
      await supabase.rpc('update_resume_score', { job_id: jobForm.jobPostId });
      await handleUIJobUpdate({ ...job });
      toast.success('Job Published SuccessFully');
      posthog.capture("Publish Job Button Clicked")
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsPublishing(false);
    }
  };

  const saveJson = (jobFormData) => {
    axios.post('/api/publishJob', {
      data: {
        job_title: jobFormData.job_title,
        job_description: jobFormData.description,
        skills: jobFormData.skills || [],
        job_id: jobFormData.id,
      },
    });
  };

  const isJobPublished = jobForm.formFields.isDraftCleared;

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
