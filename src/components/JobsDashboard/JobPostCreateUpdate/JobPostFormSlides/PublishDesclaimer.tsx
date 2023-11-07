import { CircularProgress } from '@mui/material';
import { get } from 'lodash';
import { useState } from 'react';

import { JobUnpublishDisclaimer } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
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

function PublishDesclaimer() {
  const { handleUIJobUpdate } = useJobs();
  const {
    jobForm,
    handleInitializeForm,
    handleUpdateRevertStatus,
    dispatch,
    formWarnings,
  } = useJobForm();
  const [isPublishing, setIsPublishing] = useState(false);

  const { recruiter } = useAuthDetails();

  const handlePublish = async () => {
    try {
      setIsPublishing(true);
      const jobFormData = getjobformToDbcolumns(jobForm);
      const [pubJob] = supabaseWrap(
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
      handleUIJobUpdate(pubJob);
      dispatch({
        type: 'updateJobPublishstatus',
        payload: {
          status: 'published',
        },
      });
      toast.success('Job Published SuccessFully');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    } finally {
      setIsPublishing(false);
    }
  };

  const handleRevertChanges = async () => {
    try {
      handleUpdateRevertStatus(true);
      const [publishedJobPost] = supabaseWrap(
        await supabase
          .from('public_jobs')
          .update({
            draft: null,
          })
          .eq('id', jobForm.jobPostId)
          .select(),
      );
      handleInitializeForm({
        type: 'edit',
        currSlide: jobForm.currSlide,
        job: publishedJobPost,
        recruiter,
      });
      toast.success('Reverted SucessFully');
    } catch (err) {
      // console.log(err);
      toast.error(API_FAIL_MSG);
    } finally {
      // handleUpdateRevertStatus(false);
      //
    }
  };
  return (
    <>
      <JobUnpublishDisclaimer
        onClickDiscardChanges={{
          onClick: handleRevertChanges,
        }}
        isDiscardVisible={jobForm.jobPostStatus === 'published'}
        onClickPreview={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${get(
                jobForm,
                'jobPostId',
                '',
              )}&preview=true`,
              '_blank',
            );
          },
        }}
        slotButtonPrimaryRegular={
          <>
            <AUIButton
              onClick={handlePublish}
              disabled={!isWarningsCleared(formWarnings)}
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
              Publish
            </AUIButton>
          </>
        }
      />
    </>
  );
}

export default PublishDesclaimer;
