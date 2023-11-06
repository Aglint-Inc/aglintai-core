import { CircularProgress, Paper, Popover } from '@mui/material';
import { get } from 'lodash';
import { useState } from 'react';

import { JobPublishPop, RevertChangesModal } from '@/devlink';
import AUIButton from '@/src/components/Common/AUIButton';
import MuiPopup from '@/src/components/Common/MuiPopup';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { palette } from '@/src/context/Theme/Theme';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { useJobForm } from '../JobPostFormProvider';
import { API_FAIL_MSG, getjobformToDbcolumns, supabaseWrap } from '../utils';

const JobPublishButton = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { jobForm, handleInitializeForm, handleUpdateRevertStatus, dispatch } =
    useJobForm();
  const [isPublishing, setIsPublishing] = useState(false);
  const [revertPopUpPopup, setRevertPopUpPopup] = useState(false);
  const jobPostLnk = `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${get(
    jobForm,
    'jobPostId',
    '',
  )}`;
  const { recruiter } = useAuthDetails();

  const handlePublish = async () => {
    try {
      setAnchorEl(null);
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
        type: 'updatePublishStatus',
        payload: {
          status: true,
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
      setRevertPopUpPopup(false);
      handleUpdateRevertStatus(true);
      const [publishedJobPost] = supabaseWrap(
        await supabase.from('public_jobs').select().eq('id', jobForm.jobPostId),
      );
      const [jobPost] = supabaseWrap(
        await supabase
          .from('public_jobs')
          .update({
            draft: {
              ...publishedJobPost,
            },
          })
          .eq('id', jobForm.jobPostId)
          .select(),
      );
      handleInitializeForm({
        type: 'edit',
        currSlide: jobForm.currSlide,
        job: jobPost,
        recruiter,
      });
      setRevertPopUpPopup(false);
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
      <AUIButton
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
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
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        sx={{
          '& .MuiPopover-paper': {
            border: 0,
          },
        }}
      >
        <div style={{ marginTop: '5px' }}>
          <JobPublishPop
            onClickCopy={{
              onClick: () => {
                navigator.clipboard.writeText(jobPostLnk);
              },
            }}
            onClickPublish={{
              onClick: handlePublish,
            }}
            onClickRevertChanges={{
              onClick: () => {
                setAnchorEl(false);
                setRevertPopUpPopup(true);
              },
            }}
            textLink={jobPostLnk}
          />
        </div>
      </Popover>
      <MuiPopup
        props={{
          open: revertPopUpPopup,
          onClose: () => {
            setRevertPopUpPopup(false);
          },
        }}
      >
        <Paper>
          <RevertChangesModal
            onClickCancel={{
              onClick: () => {
                setRevertPopUpPopup(false);
              },
            }}
            onClickRevertChanges={{
              onClick: handleRevertChanges,
            }}
          />
        </Paper>
      </MuiPopup>
    </>
  );
};

export default JobPublishButton;
