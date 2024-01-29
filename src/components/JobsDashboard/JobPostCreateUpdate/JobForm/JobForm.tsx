import { Collapse, Popover, Stack } from '@mui/material';
import { get } from 'lodash';
import { useRouter } from 'next/dist/client/router';
import posthog from 'posthog-js';
import { useEffect, useState } from 'react';

import {
  AssessmentSide,
  CloseDeleteJob,
  CloseJobButton,
  CreateNewJob,
  JobDiscardChanges,
  JobEditWarning,
  JobWarningList,
  NavSublink,
  ScorePercentage,
  ScoreWeightage,
  SublinkSubMenu,
  SubMenu,
} from '@/devlink';
import { DeleteDraft } from '@/devlink/DeleteDraft';
import Loader from '@/src/components/Common/Loader';
import ScoreWheel from '@/src/components/Common/ScoreWheel';
import UITextField from '@/src/components/Common/UITextField';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobs } from '@/src/context/JobsContext';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import CloseJobPopup from './CloseJobPopup';
import JobPublishButton from './PublishButton';
import {
  AssesMenusType,
  JobFormState,
  useJobForm,
} from '../JobPostFormProvider';
import ScreeningSettings from '../JobPostFormSlides/Assessment';
import BasicStepOne from '../JobPostFormSlides/BasicStepOne';
import BasicStepTwo from '../JobPostFormSlides/BasicStepTwo';
import Emails from '../JobPostFormSlides/EmailTemplates';
import ScreeningComp from '../JobPostFormSlides/PhoneScreening/PhoneScreening';
import PublishDesclaimer from '../JobPostFormSlides/PublishDesclaimer';
import ScoreSettings, {
  getBalancedScore,
} from '../JobPostFormSlides/ScoreSettings';
import ScreeningQns from '../JobPostFormSlides/ScreeningQnsWithVids';
import SyncStatus from '../JobPostFormSlides/SyncStatus';
import {
  API_FAIL_MSG,
  isShoWWarn,
  jobSlides,
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
  slideName | AssesMenusType,
  {
    title: string;
    err: string[];
    rightErr: string[];
  }
> | null;

function JobForm() {
  const { recruiter } = useAuthDetails();

  const { handleJobDelete } = useJobs();
  const { jobForm, dispatch, handleUpdateRevertStatus, handleInitializeForm } =
    useJobForm();
  const router = useRouter();
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [showDraftPopup, setShowDraftPopup] = useState(false);
  const [jdWarn, setJdWarn] = useState<'' | 'show' | 'shown'>('');
  const [popupEl, setPopupEl] = useState(null);
  const [discardPop, setDiscardPop] = useState(false);

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
    formSlide = <ScreeningQns />;
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

  let formTitle = `Create Job - ${
    jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
  }`;
  if (jobForm.formType === 'edit') {
    formTitle = `Edit Job - ${
      jobForm.formFields.jobTitle ? jobForm.formFields.jobTitle : 'Untitled'
    }`;
  }
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
      toast.success('Reverted Successfully');
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
    if (slide.path === 'workflow' || slide.path === 'screening') {
      return isAssesEnabled;
    }
    if (slide.path === 'phoneScreening') {
      return isPhoneScreeningEnabled;
    }
    return true;
  });
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <CreateNewJob
        isPreviewVisible={isJobMarketingEnabled}
        isDotButtonVisible={
          jobForm.formType === 'edit' && jobForm.jobPostStatus !== 'closed'
        }
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
          (jobForm.formType === 'new' || router.query.ats === 'true') &&
          currSlide !== 'templates'
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
        isAssessmentPreviewVisible={
          currSlide === 'phoneScreening' ||
          currSlide === 'resumeScore' ||
          (currSlide === 'screening' && jobForm.formFields.assessment)
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
        slotPublishButton={<>{<PublishButton />}</>}
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
  const { jobForm, dispatch, formWarnings } = useJobForm();
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

  const isAssesEnabled = posthog.isFeatureEnabled('isAssesmentEnabled');
  const isPhoneScreeningEnabled = posthog.isFeatureEnabled(
    'isPhoneScreeningEnabled',
  );

  let allSlides = jobSlides.filter((slide) => {
    if (slide.path === 'workflow' || slide.path === 'screening') {
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

        if (sl.path === 'screening') {
          let isWarnShow = isShoWWarn(
            jobForm.formType,
            formWarnings,
            sl.path,
            slidePathToNum[sl.path],
            jobForm.jobPostId,
            true,
          );
          return (
            <SublinkSubMenu
              key={sl.path}
              isWarningVisible={currSlide !== 'screening' && isWarnShow}
              isActive={currSlide === sl.path}
              textLink={allSlides.find((s) => s.path === 'screening').title}
              onClickLink={{
                onClick: () => {
                  changeSlide(sl.path);
                  handleChangeSubMenus('settings');
                  posthog.capture(`${sl.title} Flow Button clicked`);
                },
              }}
              isSubMenuVisible
              isBetaVisible={true}
              slotSubMenu={
                <>
                  {
                    <Collapse
                      in={
                        currSlide === 'screening' &&
                        jobForm.formFields.assessment
                      }
                      translate='yes'
                      unmountOnExit
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
                            isWarningVisible={
                              formWarnings[assM.path].err.length > 0
                            }
                          />
                        );
                      })}
                    </Collapse>
                  }
                </>
              }
            />
          );
        } else
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

const PublishButton = () => {
  const [showBtn, setShowBtn] = useState(false);
  const { jobForm } = useJobForm();

  useEffect(() => {
    if (slidePathToNum[jobForm.currSlide] >= 3 || jobForm.formType === 'edit') {
      setShowBtn(true);
    }
  }, [jobForm.currSlide]);

  return <>{showBtn && <JobPublishButton />}</>;
};

const SideSection = () => {
  const { jobForm, handleUpdateFormFields, formWarnings } = useJobForm();

  const currSlide = jobForm.currSlide;
  const { recruiterUser } = useAuthDetails();
  const router = useRouter();
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
        isDisableAssessmentVisible
        textDisableButton={'Disable Phone Screening'}
        textPreview='Preview how candidates will be taking the screening questions'
        textDescDisable='Disable this process if you don’t want to use Phone Screening for the candidate .'
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
  } else if (currSlide === 'screening') {
    return (
      <AssessmentSide
        onClickDisableAssessment={{
          onClick: async () => {
            const { count } = await supabase
              .from('applications')
              .select('id')
              .eq('job_id', jobForm.jobPostId)
              .eq('status', 'assessment');
            if (jobForm.formType === 'new' || !count) {
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
        textPreviewButton={'Preview'}
        onClickAssessmentPreview={{
          onClick: () => {
            window.open(
              `/assessment?job_id=${router.query.job_id}&mode=preview`,
              'blank',
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
        <div style={{ height: '60px' }}>
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
        </div>
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
                      value={jobForm.formFields.resumeScoreSettings.experience}
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
      </>
    );
  }
};
