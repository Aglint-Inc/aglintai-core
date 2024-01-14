import { Popover, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { get } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import posthog from 'posthog-js';
import { useState } from 'react';

import { CloseDeleteJob, CloseJobButton, CreateNewJob } from '@/devlink';
import { DeleteDraft } from '@/devlink/DeleteDraft';
import Loader from '@/src/components/Common/Loader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import CloseJobPopup from './CloseJobPopup';
import JobPublishButton from './PublishButton';
import SectionWarning from './SectionWarnings';
import { JobFormState, useJobForm } from '../JobPostFormProvider';
import WorkFlow from '../JobPostFormSlides/Assessment';
import BasicStepOne from '../JobPostFormSlides/BasicStepOne';
import BasicStepTwo from '../JobPostFormSlides/BasicStepTwo';
import Emails from '../JobPostFormSlides/EmailTemplates';
import PhoneScreening from '../JobPostFormSlides/PhoneScreening/PhoneScreening';
import PublishDesclaimer from '../JobPostFormSlides/PublishDesclaimer';
import ScoreSettings from '../JobPostFormSlides/ScoreSettings';
import Assessment from '../JobPostFormSlides/ScreeningQnsWithVids';
import SyncStatus from '../JobPostFormSlides/SyncStatus';
import { API_FAIL_MSG, supabaseWrap } from '../utils';
import MuiPopup from '../../../Common/MuiPopup';

export type JobFormErrorParams = {
  jobTitle: string;
  company: string;
  location: string;
  department: string;
  aiQnGen: number;
};

export type FormErrorParams = Record<
  JobFormState['currSlide'],
  {
    title: string;
    err: string[];
  }
> | null;

function JobForm() {
  const { recruiter } = useAuthDetails();

  const { handleJobDelete } = useJobs();
  const {
    jobForm,
    dispatch,
    formWarnings,
    handleUpdateRevertStatus,
    handleInitializeForm,
  } = useJobForm();
  const router = useRouter();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);

  const [showDraftPopup, setShowDraftPopup] = useState(false);

  const [jdWarn, setJdWarn] = useState<'' | 'show' | 'shown'>('');

  const [popupEl, setPopupEl] = useState(null);

  let formSlide = <></>;
  const { currSlide } = jobForm;
  if (jobForm.isJobPostReverting) {
    formSlide = (
      <Stack alignItems={'center'} justifyItems={'center'} height={'300px'}>
        <Loader />
      </Stack>
    );
  } else if (currSlide === 'details') {
    formSlide = (
      <>
        <BasicStepOne />
        <BasicStepTwo
          showWarnOnEdit={() => {
            if (jdWarn !== 'shown') setJdWarn('show');
          }}
        />
      </>
    );
  } else if (currSlide === 'resumeScore') {
    formSlide = <ScoreSettings />;
  } else if (currSlide === 'templates') {
    formSlide = <Emails />;
  } else if (currSlide == 'screening') {
    formSlide = <Assessment />;
  } else if (currSlide == 'workflow') {
    formSlide = <WorkFlow />;
  } else if (currSlide === 'phoneScreening') {
    formSlide = <PhoneScreening />;
  }

  const changeSlide = (nextSlide: JobFormState['currSlide']) => {
    dispatch({
      type: 'moveToSlide',
      payload: {
        nextSlide: nextSlide,
      },
    });
    handleUpdateMaxVisitedSlideNo(slidePathToNum[String(nextSlide)]);
  };

  let formTitle = `Create Job - ${
    jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
  }`;
  if (jobForm.formType === 'edit') {
    formTitle = `Edit Job - ${
      jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
    }`;
  }
  const warning = formWarnings;

  const handleUpdateMaxVisitedSlideNo = (slideNo: number) => {
    if (jobForm.formType === 'edit') return;
    const currMax = Number(
      localStorage.getItem(`MaxVisitedSlideNo-${jobForm.jobPostId}`) || -1,
    );
    if (slideNo > currMax) {
      localStorage.setItem(
        `MaxVisitedSlideNo-${jobForm.jobPostId}`,
        String(slideNo),
      );
    }
  };

  const handleDeleteJob = async () => {
    try {
      const isDeleted = await handleJobDelete(jobForm.jobPostId);
      if (!isDeleted) throw new Error('Job delete fail');
      router.replace('/jobs');
      toast.error('Deleted Draft job SuccessFully');
      posthog.capture('Deleted Draft job');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    }
  };

  const isShowChangesWarn =
    jobForm.formType === 'edit' &&
    !jobForm.formFields.isDraftCleared &&
    jobForm.jobPostStatus === 'published';

  let showCloseJob = jobForm.jobPostStatus === 'published';
  if (jobForm.formType === 'edit' && jobForm.jobPostStatus === 'draft') {
    showCloseJob = false;
  }

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
      <CreateNewJob
        slotCreateJob={<>{formSlide}</>}
        isDetailsActive={currSlide === 'details'}
        isEmailTemplateActive={currSlide === 'templates'}
        isScreeningQuestionsActive={currSlide === 'screening'}
        isScoreSettingActive={currSlide === 'resumeScore'}
        isWorkflowsActive={currSlide === 'workflow'}
        textJobName={formTitle}
        isScreeningActive={currSlide === 'phoneScreening'}
        onClickScreening={{
          onClick: () => {
            changeSlide('phoneScreening');
          },
        }}
        slotSavedChanges={
          <>
            <SyncStatus status={jobForm.syncStatus} />
          </>
        }
        onClickPreview={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${get(
                jobForm,
                'jobPostId',
                '',
              )}?preview=true`,
              '_blank',
            );
            posthog.capture('Preview Job Post clicked');
          },
        }}
        slotDisclaimerDetails={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'details'}
              currSlideNo={1}
            />
          </>
        }
        slotDisclaimerApplyForm={
          <>
            {/* <SectionWarning warnings={warning} slidePath={'details'} /> */}
          </>
        }
        slotDisclaimerScoreSetting={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'resumeScore'}
              currSlideNo={3}
            />
          </>
        }
        slotDisclaimerScreening={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'screening'}
              currSlideNo={4}
            />
          </>
        }
        slotDisclaimerWorkflow={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'workflow'}
              currSlideNo={5}
            />
          </>
        }
        slotEmailDisclaimer={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={'templates'}
              currSlideNo={6}
            />
          </>
        }
        isUnpublishWarningVisible={isShowChangesWarn}
        onClickDiscardChanges={{
          onClick: handleRevertChanges,
        }}
        slotUnpublishDisclaimer={
          <>{isShowChangesWarn && <PublishDesclaimer />}</>
        }
        onClickEmailTemplates={{
          onClick: () => {
            changeSlide('templates');
            posthog.capture('Email Template Flow Button clicked');
          },
        }}
        onClickDetails={{
          onClick: () => {
            changeSlide('details');
            posthog.capture('Details Flow Button clicked');
          },
        }}
        onClickScoreSetting={{
          onClick: () => {
            changeSlide('resumeScore');
            posthog.capture('Profile Score Flow Button clicked');
          },
        }}
        onClickScreeningQuestions={{
          onClick: () => {
            changeSlide('screening');
            posthog.capture('Screening Questions Flow Button clicked');
          },
        }}
        onClickWorkflows={{
          onClick: () => {
            changeSlide('workflow');
            posthog.capture('Workflow Flow Button clicked');
          },
        }}
        onClickBack={{
          onClick: () => {
            router.back();
          },
        }}
        onClickPreviewChanges={{
          onClick: () => {
            window.open(
              `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${get(
                jobForm,
                'jobPostId',
                '',
              )}?preview=true`,
              '_blank',
            );
          },
        }}
        slotPublishButton={
          <>{jobForm.formType === 'edit' && <JobPublishButton />}</>
        }
        isProductionVisible={
          !process.env.NEXT_PUBLIC_HOST_NAME.includes('app.aglinthq.com')
        }
        slotCloseJobButton={
          <>
            <CloseJobButton
              onClickClose={{
                onClick: (e) => {
                  setPopupEl(e.currentTarget);
                },
              }}
            />
          </>
        }
      />
      <MuiPopup
        props={{
          onClose: () => {
            setIsDeletePopupOpen(false);
          },
          open: isDeletePopupOpen,
        }}
      >
        <Paper>
          <CloseJobPopup
            onClose={() => {
              setIsDeletePopupOpen(false);
            }}
          />
        </Paper>
      </MuiPopup>
      <MuiPopup
        props={{
          onClose: () => {
            setShowDraftPopup(false);
          },
          open: showDraftPopup,
        }}
      >
        <Paper>
          <DeleteDraft
            onClickCancel={{
              onClick: () => {
                setShowDraftPopup(false);
              },
            }}
            onClickClear={{
              onClick: () => {
                handleDeleteJob();
              },
            }}
          />
        </Paper>
      </MuiPopup>
      <Popover
        open={Boolean(popupEl)}
        anchorEl={popupEl}
        onClose={() => {
          setPopupEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        sx={{
          mt: 2,
        }}
      >
        <CloseDeleteJob
          isCloseJobVisible={showCloseJob}
          isDeleteJobVisible={!showCloseJob}
          onClickClose={{
            onClick: () => {
              setPopupEl(null);
              showCloseJob
                ? setIsDeletePopupOpen(true)
                : setShowDraftPopup(true);
            },
          }}
        />
      </Popover>
    </>
  );
}

export default JobForm;

const slidePathToNum: Record<JobFormState['currSlide'], number> = {
  details: 1,
  resumeScore: 2,
  phoneScreening: 3,
  screening: 4,
  workflow: 5,
  templates: 6,
};
