import { CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import AUIButton from '@/src/components/Common/AUIButton';
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
  const [isPublishing, setIsPublishing] = useState(false);
  const router = useRouter();

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const jobFormData = getjobformToDbcolumns(jobForm);
      supabaseWrap(
        await supabase
          .from('public_jobs')
          .update({
            ...jobFormData,
            status: 'published',
            draft: null,
          })
          .eq('id', jobForm.jobPostId),
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
      toast.success('Job Published SuccessFully');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsPublishing(false);
    }
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
