import { supabaseWrap } from '@aglint/shared-utils';
import { Popover, Stack } from '@mui/material';
import { get } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

import { AssessmentSide } from '@/devlink/AssessmentSide';
import { CloseDeleteJob } from '@/devlink/CloseDeleteJob';
import { CloseJobButton } from '@/devlink/CloseJobButton';
import { CreateNewJob } from '@/devlink/CreateNewJob';
import { DeleteDraft } from '@/devlink/DeleteDraft';
import { JobDiscardChanges } from '@/devlink/JobDiscardChanges';
import { JobEditWarning } from '@/devlink/JobEditWarning';
import { JobWarningList } from '@/devlink/JobWarningList';
import { NavSublink } from '@/devlink/NavSublink';
import { ScorePercentage } from '@/devlink/ScorePercentage';
import { ScoreWeightage } from '@/devlink/ScoreWeightage';
import Loader from '@/src/components/Common/Loader';
import ScoreWheel from '@/src/components/Common/ScoreWheel';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import MuiPopup from '../../../../Common/MuiPopup';
import { copyJobForm } from '../copies/copyJobForm';
import { JobFormState, useJobForm } from '../JobPostFormProvider';
import ScreeningSettings from '../JobPostFormSlides/Assessment';
import BasicStepOne from '../JobPostFormSlides/BasicStepOne';
import BasicStepTwo from '../JobPostFormSlides/BasicStepTwo';
import Emails from '../JobPostFormSlides/EmailTemplates';
import ScreeningComp from '../JobPostFormSlides/PhoneScreening/PhoneScreening';
import PublishDesclaimer from '../JobPostFormSlides/PublishDesclaimer';
import ScoreSettings, {
  getBalancedScore,
} from '../JobPostFormSlides/ScoreSettings';
import SyncStatus from '../JobPostFormSlides/SyncStatus';
import { API_FAIL_MSG, isShoWWarn, jobSlides, slidePathToNum } from '../utils';
import CloseJobPopup from './CloseJobPopup';
import JobPublishButton from './PublishButton';

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
    rightErr: string[];
  }
> | null;

function JobForm() {
  const { recruiter, recruiterUser } = useAuthDetails();

  const { handleJobDelete } = useJobs();
  const { jobForm, dispatch, handleUpdateRevertStatus, handleInitializeForm } =
    useJobForm();
  const router = useRouter();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [showDraftPopup, setShowDraftPopup] = useState(false);
  const [jdWarn, setJdWarn] = useState<'' | 'show' | 'shown'>('');
  const [popupEl, setPopupEl] = useState(null);
  const [discardPop, setDiscardPop] = useState(false);
  const [isJobHasAppls, setIsJobHasAppls] = useState(true);

  useEffect(() => {
    if (jobForm.formType === 'edit') {
      (async () => {
        try {
          const applications = supabaseWrap(
            await supabase
              .from('applications')
              .select()
              .eq('job_id', jobForm.jobPostId),
          );
          if (applications.length === 0) {
            setIsJobHasAppls(false);
          }
        } catch (error) {
          toast.error(API_FAIL_MSG);
        }
      })();
    }
  }, []);

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
  } else if (currSlide == 'workflow') {
    formSlide = <ScreeningSettings />;
  } else if (currSlide === 'phoneScreening') {
    formSlide = <ScreeningComp />;
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

  const handleDeleteDraft = async () => {
    try {
      await handleJobDelete(jobForm.jobPostId);
      router.replace('/jobs?status=draft');
      toast.error('Deleted draft job ');
      posthog.capture('Deleted Draft job');
    } catch (err) {
      toast.error(API_FAIL_MSG);
    }
  };

  const handleDeleteJob = async () => {
    try {
      await handleJobDelete(jobForm.jobPostId);
      router.replace('/jobs');
      toast.error('Deleted job');
      posthog.capture('Deleted job');
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
        recruiterUser,
      });
      toast.success('Reverted successfully');
    } catch (err) {
      // console.log(err);
      toast.error(API_FAIL_MSG);
    } finally {
      // handleUpdateRevertStatus(false);
      //
    }
  };

  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const isJobMarketingEnabled = posthog.isFeatureEnabled(
    'isJobMarketingEnabled',
  );

  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );

  let allSlides = jobSlides.filter((slide) => {
    if (slide.path === 'workflow') {
      return isAssesEnabled;
    }
    if (slide.path === 'phoneScreening') {
      return isPhoneScreeningEnabled;
    }
    return true;
  });

  let formTitle = `Create Job - ${
    jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
  }`;
  if (jobForm.formType === 'edit') {
    formTitle = `Edit Job - ${
      jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
    }`;
  }

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <CreateNewJob
        isPreviewVisible={isJobMarketingEnabled}
        isDotButtonVisible={
          jobForm.jobPostStatus === 'published' ||
          jobForm.jobPostStatus === 'draft' ||
          (jobForm.jobPostStatus === 'closed' && !isJobHasAppls)
        }
        slotCreateJob={<>{formSlide}</>}
        isDetailsActive={currSlide === 'details'}
        isEmailTemplateActive={currSlide === 'templates'}
        isScreeningQuestionsActive={false}
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
          (jobForm.formType === 'new' || router.query.ats === 'true') &&
          currSlide !== 'templates'
        }
        isProceedDisable={false}
        textProceed={`Proceed to ${
          allSlides[slidePathToNum[String(currSlide)]]?.title
        }`}
        onClickProceed={{
          onClick: () => {
            const nextSlide =
              allSlides[slidePathToNum[String(currSlide)]]?.path;
            if (nextSlide) changeSlide(nextSlide);
          },
        }}
        isAssessmentPreviewVisible={
          currSlide === 'resumeScore' ||
          (currSlide === 'phoneScreening' &&
            jobForm.formFields.isPhoneScreenEnabled)
        }
        slotSideSection={
          <>
            <SideSection />
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
        isUnpublishWarningVisible={isShowChangesWarn}
        onClickDiscardChanges={{
          onClick: () => {
            setDiscardPop(true);
          },
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
        slotPublishButton={<>{<PublishButton />}</>}
        isProductionVisible={
          !process.env.NEXT_PUBLIC_HOST_NAME.includes('app.aglinthq.com')
        }
        slotCloseJobButton={
          <>
            <CloseJobButton
              onClickClose={{
                onClick: (e) => {
                  if (jobForm.jobPostStatus === 'closed') {
                    setShowDraftPopup(true);
                  } else {
                    setPopupEl(e.currentTarget);
                  }
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
        <CloseJobPopup
          onClose={() => {
            setIsDeletePopupOpen(false);
          }}
        />
      </MuiPopup>
      <MuiPopup
        props={{
          onClose: () => {
            setShowDraftPopup(false);
          },
          open: showDraftPopup,
        }}
      >
        <DeleteDraft
          textHeader={
            jobForm.jobPostStatus === 'closed'
              ? copyJobForm.Muipopup.deleteJob.title
              : copyJobForm.Muipopup.deleteDraft.title
          }
          textDeleteDraft={
            jobForm.jobPostStatus === 'closed'
              ? copyJobForm.Muipopup.deleteJob.description
              : copyJobForm.Muipopup.deleteDraft.description
          }
          onClickCancel={{
            onClick: () => {
              setShowDraftPopup(false);
            },
          }}
          onClickClear={{
            onClick: () => {
              if (jobForm.jobPostStatus === 'closed') {
                handleDeleteJob();
              } else {
                handleDeleteDraft();
              }
            },
          }}
        />
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
          '& .MuiPaper-root': {
            border: 'none !important',
            overflow: 'visible !important',
          },
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
      <MuiPopup
        props={{
          onClose: () => {
            setDiscardPop(false);
          },
          open: discardPop,
        }}
      >
        <JobDiscardChanges
          onClickCancel={{
            onClick: () => {
              setDiscardPop(false);
            },
          }}
          onClickDiscardChanges={{
            onClick: () => {
              handleRevertChanges();
              setDiscardPop(false);
            },
          }}
        />
      </MuiPopup>
    </div>
  );
}

export default JobForm;

const SideNavs = ({ changeSlide }) => {
  const { jobForm, formWarnings } = useJobForm();
  const currSlide = jobForm.currSlide;

  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );

  let allSlides = jobSlides.filter((slide) => {
    if (slide.path === 'workflow') {
      return isAssesEnabled;
    }
    if (slide.path === 'phoneScreening') {
      return isPhoneScreeningEnabled;
    }
    return true;
  });

  return (
    <>
      {allSlides.map((sl) => {
        let isWarn = isShoWWarn(
          jobForm.formType,
          formWarnings,
          sl.path,
          slidePathToNum[sl.path],
          jobForm.jobPostId,
        );

        if (sl.path === 'resumeScore') {
          isWarn =
            isShoWWarn(
              jobForm.formType,
              formWarnings,
              'details',
              slidePathToNum[sl.path],
              jobForm.jobPostId,
            ) ||
            isShoWWarn(
              jobForm.formType,
              formWarnings,
              'resumeScore',
              slidePathToNum[sl.path],
              jobForm.jobPostId,
            );
        } else {
          isWarn = isShoWWarn(
            jobForm.formType,
            formWarnings,
            sl.path,
            slidePathToNum[sl.path],
            jobForm.jobPostId,
          );
        }

        return (
          <NavSublink
            key={sl.path}
            // isWarningVisible={isWarn}
            isWarningVisible={isWarn}
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

const PublishButton = () => {
  const [showBtn, setShowBtn] = useState(false);
  const { jobForm } = useJobForm();

  useEffect(() => {
    if (
      slidePathToNum[jobForm.currSlide] >= 3 ||
      jobForm.formType === 'edit' ||
      jobForm.jobPostStatus === 'closed'
    ) {
      setShowBtn(true);
    }
  }, [jobForm.currSlide]);

  return <>{showBtn && <JobPublishButton />}</>;
};

const SideSection = () => {
  const { jobForm, handleUpdateFormFields, formWarnings } = useJobForm();

  const currSlide = jobForm.currSlide;
  const { recruiterUser } = useAuthDetails();
  const onChangeScore = (e, paramKey: string) => {
    if (Number(e.target.value) < 0 || Number(e.target.value) > 100) return;
    handleUpdateFormFields({
      path: `resumeScoreSettings.${paramKey}`,
      value: Number(e.target.value),
    });
  };

  if (
    currSlide === 'phoneScreening' &&
    jobForm.formFields.isPhoneScreenEnabled
  ) {
    return (
      <AssessmentSide
        isPhoneScreeningImageVisible={true}
        isAssessmentImageVisible={false}
        isDisableAssessmentVisible={true}
        isPreviewFormVisible={
          jobForm.formFields.phoneScreeningTemplateId !== ''
        }
        textDisableButton={'Disable'}
        textPreviewButton={'Preview'}
        textPreview='See How Candidates Will Experience the Screening Questions'
        textDescDisable='Disable Phone Screening for this job.'
        onClickDisableAssessment={{
          onClick: () => {
            handleUpdateFormFields({
              path: 'isPhoneScreenEnabled',
              value: false,
            });
          },
        }}
        onClickAssessmentPreview={{
          onClick: () => {
            window.open(
              `${
                process.env.NEXT_PUBLIC_HOST_NAME
              }/candidate-phone-screening?job_post_id=${get(
                jobForm,
                'jobPostId',
                '',
              )}&recruiter_email=${recruiterUser.email}&recruiter_name=${[
                recruiterUser.first_name,
                recruiterUser.last_name,
              ].join(' ')}`,
              '_blank',
            );
          },
        }}
      />
    );
  } else if (currSlide === 'resumeScore') {
    const disableExp =
      jobForm.formFields.jdJson.rolesResponsibilities.length === 0;
    const disableEdu = jobForm.formFields.jdJson.educations.length === 0;
    const disableSkills = jobForm.formFields.jdJson.skills.length === 0;
    return (
      <>
        <Stack spacing={2}>
          {formWarnings.resumeScore.rightErr.length > 0 && (
            <JobEditWarning
              slotWarningList={
                <>
                  {formWarnings.resumeScore.rightErr.map((er, index) => (
                    <JobWarningList key={index} textWarning={er} />
                  ))}
                </>
              }
            />
          )}
          <ScoreWeightage
            slotScoreWheel={
              <>
                <Stack
                  direction={'row'}
                  width={'60%'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  gap={'40px'}
                >
                  <ScoreWheel
                    id={'ScoreWheelSetting'}
                    parameter_weights={jobForm.formFields.resumeScoreSettings}
                  />
                </Stack>
              </>
            }
            slotScorePercent={
              <>
                <ScorePercentage
                  colorPropsBg={{
                    style: {
                      backgroundColor: '#30AABC',
                    },
                  }}
                  textTitle={'Experience'}
                  slotInputPercent={
                    <>
                      <UITextField
                        type='number'
                        width='50px'
                        value={
                          jobForm.formFields.resumeScoreSettings.experience
                        }
                        onChange={(e) => {
                          onChangeScore(e, 'experience');
                        }}
                        disabled={disableExp}
                      />
                    </>
                  }
                />
                <ScorePercentage
                  colorPropsBg={{
                    style: {
                      backgroundColor: '#886BD8',
                    },
                  }}
                  textTitle={'Skill'}
                  slotInputPercent={
                    <>
                      <UITextField
                        type='number'
                        width='50px'
                        value={jobForm.formFields.resumeScoreSettings.skills}
                        onChange={(e) => {
                          onChangeScore(e, 'skills');
                        }}
                        disabled={disableSkills}
                      />
                    </>
                  }
                />
                <ScorePercentage
                  colorPropsBg={{
                    style: {
                      backgroundColor: '#5D7DF5',
                    },
                  }}
                  textTitle={'Education'}
                  slotInputPercent={
                    <>
                      <UITextField
                        type='number'
                        width='50px'
                        value={jobForm.formFields.resumeScoreSettings.education}
                        onChange={(e) => {
                          onChangeScore(e, 'education');
                        }}
                        disabled={disableEdu}
                      />
                    </>
                  }
                />
              </>
            }
            onClickEqualize={{
              onClick: () => {
                const jdJson = jobForm.formFields.jdJson;
                handleUpdateFormFields({
                  path: `resumeScoreSettings`,
                  value: getBalancedScore(
                    jdJson.rolesResponsibilities.length === 0,
                    jdJson.educations.length === 0,
                    jdJson.skills.length === 0,
                  ),
                });
              },
            }}
          />
        </Stack>
      </>
    );
  }
};
