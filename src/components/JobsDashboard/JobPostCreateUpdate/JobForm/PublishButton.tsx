import { CircularProgress } from '@mui/material';
import axios from 'axios';
import { htmlToText } from 'html-to-text';
import { useRouter } from 'next/router';
import { useState } from 'react';

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
      const embedding = await generateEmbedding(
        jobForm.formFields.jobDescription,
      );

      const [job] = supabaseWrap(
        await supabase
          .from('public_jobs')
          .update({
            ...jobFormData,
            status: 'published',
            draft: null,
            embedding: embedding,
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
      await handleUIJobUpdate(job.id, job);
      toast.success('Job Published SuccessFully');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsPublishing(false);
    }
  };

  const generateEmbedding = async (des) => {
    const jd_text = htmlToText(des);

    const { data: emb } = await axios.post('/api/ai/create-embeddings', {
      text: jd_text,
    });

    const embedding = emb.data[0].embedding;
    return embedding;
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
