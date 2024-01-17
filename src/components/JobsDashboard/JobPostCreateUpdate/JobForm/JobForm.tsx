import { Collapse, Popover, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { get } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/dist/client/router';
import posthog from 'posthog-js';
import { useState } from 'react';

import {
  CloseDeleteJob,
  CloseJobButton,
  CreateNewJob,
  NavSublink,
  SublinkSubMenu,
  SubMenu,
} from '@/devlink';
import { DeleteDraft } from '@/devlink/DeleteDraft';
import Loader from '@/src/components/Common/Loader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobApplicationsForJob } from '@/src/context/JobApplicationsContext';
import { useJobs } from '@/src/context/JobsContext';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import CloseJobPopup from './CloseJobPopup';
import JobPublishButton from './PublishButton';
import SectionWarning from './SectionWarnings';
import { FormJobType, JobFormState, useJobForm } from '../JobPostFormProvider';
import ScreeningSettings from '../JobPostFormSlides/Assessment';
import BasicStepOne from '../JobPostFormSlides/BasicStepOne';
import BasicStepTwo from '../JobPostFormSlides/BasicStepTwo';
import Emails from '../JobPostFormSlides/EmailTemplates';
import ScreeningComp from '../JobPostFormSlides/PhoneScreening/PhoneScreening';
import PublishDesclaimer from '../JobPostFormSlides/PublishDesclaimer';
import ScoreSettings from '../JobPostFormSlides/ScoreSettings';
import ScreeningQns from '../JobPostFormSlides/ScreeningQnsWithVids';
import SyncStatus from '../JobPostFormSlides/SyncStatus';
import {
  allSlides,
  API_FAIL_MSG,
  slidePathToNum,
  supabaseWrap,
} from '../utils';
import MuiPopup from '../../../Common/MuiPopup';

export type JobFormErrorParams = {
  jobTitle: string;
  company: string;
  location: string;
  department: string;
  aiQnGen: number;
};

export type slideName =
  | 'details'
  | 'templates'
  | 'screening'
  | 'workflow'
  | 'resumeScore'
  | 'phoneScreening';

export type FormErrorParams = Record<
  slideName,
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
    handleUpdateFormFields,
  } = useJobForm();
  const router = useRouter();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [formError, setFormError] = useState<JobFormErrorParams>({
    jobTitle: '',
    company: '',
    location: '',
    department: '',
    aiQnGen: 0,
  });
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
        <BasicStepOne
        // formError={formError} setFormError={setFormError} // commmented beacuse not in use
        />
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
    formSlide = <ScreeningQns />;
  } else if (currSlide == 'workflow') {
    formSlide = <ScreeningSettings />;
  } else if (currSlide === 'phoneScreening') {
    formSlide = <ScreeningComp />;
  }

  const formValidation = () => {
    let flag = true;
    const { company, jobTitle, jobLocation, department } = jobForm.formFields;
    if (currSlide === 'details') {
      if (isEmpty(jobTitle.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, jobTitle: 'Please Enter Job Title' }));
      }

      if (isEmpty(company?.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, company: 'Please Enter Company Name' }));
      }

      if (isEmpty(jobLocation.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, location: 'Please Enter Location' }));
      }

      if (isEmpty(get(jobForm, 'formFields.jobDescription', ''))) {
        return false;
      }

      if (isEmpty(get(jobForm, 'formFields.skills', []))) {
        return false;
      }
      if (isEmpty(department.trim())) {
        flag = false;
        setFormError((p) => ({ ...p, department: 'Please Enter Department' }));
      }
    }

    if (currSlide === 'screening') {
      const interviewConfig = get(
        jobForm,
        'formFields.interviewConfig',
        {},
      ) as FormJobType['interviewConfig'];

      if (formError.aiQnGen > 0) {
        toast.error('Please wait till qusetions get generated');
        return false;
      }

      let totalQns = 0;

      if (get(interviewConfig, 'skill.value', false)) {
        let count = get(interviewConfig, 'skill.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'behavior.value', false)) {
        let count = get(interviewConfig, 'behavior.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'communication.value', false)) {
        let count = get(interviewConfig, 'communication.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'performance.value', false)) {
        let count = get(interviewConfig, 'performance.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'education.value', false)) {
        let count = get(interviewConfig, 'education.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (get(interviewConfig, 'general.value', false)) {
        let count = get(interviewConfig, 'general.questions', []).length;
        if (count === 0) {
          return false;
        }
        totalQns += count;
      }
      if (totalQns < 10 || totalQns > 25) {
        flag = false;
      }
    }
    return flag;
  };

  const changeSlide = (nextSlide: JobFormState['currSlide']) => {
    formValidation();
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
      toast.error('Deleted Draft job ');
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
  const { job } = useJobApplicationsForJob(jobForm.jobPostId);

  return (
    <>
      <CreateNewJob
        isPreviewVisible
        isDotButtonVisible={jobForm.formType === 'edit'}
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
        isProceedVisible={
          jobForm.formType === 'new' && currSlide !== 'templates'
        }
        isProceedDisable={false}
        textProceed={`Proceed to ${allSlides[slidePathToNum[String(currSlide)]]
          ?.title}`}
        onClickProceed={{
          onClick: () => {
            const nextSlide =
              allSlides[slidePathToNum[String(currSlide)]]?.path;
            if (nextSlide) changeSlide(nextSlide);
          },
        }}
        slotWarning={
          <>
            <SectionWarning
              warnings={warning}
              slidePath={currSlide}
              currSlideNo={slidePathToNum[String(currSlide)]}
            />
          </>
        }
        isAssessmentPreviewVisible={
          currSlide === 'screening' && jobForm.formFields.assessment
        }
        onClickDisableAssessment={{
          onClick: () => {
            const count = job.count.assessment;
            if (!count) {
              handleUpdateFormFields({
                path: 'assessment',
                value: false,
              });
            } else {
              toast.warning(
                `cadidate${
                  count === 1 ? '' : 's'
                } under assessment. Disabling forbidden!`,
              );
            }
          },
        }}
        onClickAssessmentPreview={{
          onClick: () => {
            window.open(
              `/assessment?job_id=${router.query.job_id}&mode=preview`,
              'blank',
            );
          },
        }}
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
        slotNavSublink={
          <>
            <SideNavs changeSlide={changeSlide} />
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

const SideNavs = ({ changeSlide }) => {
  const { jobForm, dispatch } = useJobForm();
  const currSlide = jobForm.currSlide;

  const handleChangeSubMenus = (s: JobFormState['currentAssmSlides']) => {
    dispatch({
      type: 'updateAssmTab',
      payload: {
        tab: s,
      },
    });
  };
  const currentAssTab = jobForm.currentAssmSlides;
  return (
    <>
      {allSlides.map((sl) => {
        if (sl.path === 'screening') {
          return (
            <SublinkSubMenu
              key={sl.path}
              isActive={currSlide === sl.path}
              textLink={allSlides.find((s) => s.path === 'screening').title}
              onClickLink={{
                onClick: () => {
                  changeSlide(sl.path);
                  handleChangeSubMenus('settings');
                  posthog.capture(`${sl.title} Flow Button clicked`);
                },
              }}
              isBetaVisible={true}
              isSubMenuVisible={sl.path === 'screening'}
              slotSubMenu={
                <>
                  <Collapse in={currSlide === 'screening'} translate='yes'>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 10,
                      }}
                    >
                      {assmSubmenus.map((assM) => {
                        return (
                          <SubMenu
                            key={assM.path}
                            textSubMenu={assM.label}
                            onClickMenu={{
                              onClick: () => {
                                handleChangeSubMenus(assM.path);
                              },
                            }}
                            isActive={currentAssTab === assM.path}
                          />
                        );
                      })}
                    </div>
                  </Collapse>
                </>
              }
            />
          );
        } else
          return (
            <NavSublink
              key={sl.path}
              isActive={currSlide === sl.path}
              onClickNav={{
                onClick: () => {
                  // if (isMute) return;
                  // isTabMuted(jobForm.formType, warning, sl.path);
                  changeSlide(sl.path);
                  posthog.capture(`${sl.title} Flow Button clicked`);
                },
              }}
              textLink={sl.title}
              isMute={false}
            />
          );
      })}
    </>
  );
};

const assmSubmenus: {
  label: string;
  path: JobFormState['currentAssmSlides'];
}[] = [
  {
    label: 'Settings',
    path: 'settings',
  },
  {
    label: 'Instructions',
    path: 'instructions',
  },
  {
    label: 'Welcome',
    path: 'welcome',
  },
  {
    label: 'Assessment Questions',
    path: 'assesqns',
  },
  {
    label: 'Epilogue',
    path: 'epilogue',
  },
];
