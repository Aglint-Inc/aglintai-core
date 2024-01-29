/* eslint-disable security/detect-object-injection */
import { Collapse, Dialog, Stack } from '@mui/material';
import axios from 'axios';
import posthog from 'posthog-js';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';

import {
  AssessmentInvite,
  CandidateDetails,
  CandidateEducation,
  CandidateEducationCard,
  CandidateExperience,
  CandidateExperienceCard,
  CandidateInterviewScore,
  CandidateResumeScore,
  CandidateSideDrawer,
  CandidateSkill,
  CandidateSkillPills,
  DetailedFeedback,
  DetailedFeedbackButton,
  DetailedFeedbackCard,
  DetailedFeedbackCardSmall,
  FeedbackScore,
  InterviewAiTranscriptCard,
  InterviewCandidateCard,
  InterviewDetailedFeedback,
  InterviewResultStatus,
  ResumeFeedbackScore,
  UnableFetchResume,
} from '@/devlink';
import {
  AnalysisBlock,
  ResAbsentError,
  ResumeErrorBlock,
  ResumeErrorBlock2,
  ScrQuestionListItem,
  SidebarAnalysisBlock,
  SidebarScreening,
  SummaryBlock,
} from '@/devlink2';
import { ButtonPrimaryOutlinedRegular } from '@/devlink3';
import CustomProgress from '@/src/components/Common/CustomProgress';
import ResumeWait from '@/src/components/Common/Lotties/ResumeWait';
import ScoreWheel, {
  scoreWheelDependencies,
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import { SmallCircularScore2 } from '@/src/components/Common/SmallCircularScore';
import { PhoneScreeningResponseType } from '@/src/components/KnockOffQns/ScreeningCtxProvider';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import interviewerList from '@/src/utils/interviewer_list';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import ConversationCard from './ConversationCard';
import ResumePreviewer from './ResumePreviewer';
import { AnalysisPillComponent, ScreeningStatusComponent } from '..';
import CandidateAvatar from '../../Common/CandidateAvatar';
import CompanyLogo from '../../Common/CompanyLogo';
import InterviewScore from '../../Common/InterviewScore';
import ResumeScore from '../../Common/ResumeScore';
import {
  capitalize,
  formatTimeStamp,
  getApplicationProcessState,
  getAssessmentStatus,
  getCandidateDetails,
  getScreeningStatus,
  handleOngoingWarning,
  mapScoreToAnalysis,
} from '../../utils';

const ApplicationDetails = ({
  open,
  onClose,
  application,
  handleSelectNextApplication,
  handleSelectPrevApplication,
}: {
  open: boolean;
  onClose: () => void;
  application: JobApplication;
  handleSelectNextApplication?: () => void;
  handleSelectPrevApplication?: () => void;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(open);
  const [openFeedback, setOpenFeedback] = useState(false);

  const copyAppId = async () => {
    navigator.clipboard.writeText(application.id).then(() => {
      toast.success('Application ID copied');
    });
  };

  const candidateImage = application ? (
    <Stack
      onClick={() => {
        copyAppId();
        posthog.capture('Application ID copied');
      }}
      style={{ cursor: 'pointer' }}
    >
      <CandidateAvatar application={application} fontSize={12} />
    </Stack>
  ) : (
    <></>
  );

  useEffect(() => {
    if (open) {
      setDrawerOpen(true);
    }
  }, [open]);

  useEffect(() => {
    if (application === undefined) {
      setDrawerOpen(false);
      onClose();
    }
  }, [application === undefined]);

  const handleClose = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <Stack
      style={{
        display: open && application ? 'flex' : 'none',
        transition: '0.4s',
        width: drawerOpen ? '420px' : '0px',
        height: '100%',
        pointerEvents: drawerOpen ? 'auto' : 'none',
        overflow: drawerOpen ? 'visible' : 'auto',
      }}
    >
      {application ? (
        !openFeedback ? (
          <NewJobApplicationSideDrawer
            application={application}
            onClose={() => handleClose()}
            setOpenFeedback={setOpenFeedback}
            candidateImage={candidateImage}
            handleSelectNextApplication={handleSelectNextApplication}
            handleSelectPrevApplication={handleSelectPrevApplication}
          />
        ) : (
          <NewDetailedFeedback
            application={application}
            candidateImage={candidateImage}
            onClose={() => {
              setOpenFeedback(false);
            }}
          />
        )
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default ApplicationDetails;

const NewDetailedFeedback = ({
  application,
  candidateImage,
  onClose,
}: {
  application: JobApplication;
  candidateImage: React.JSX.Element;
  onClose: () => void;
}) => {
  const name = getCandidateDetails(application, 'name');
  return (
    <InterviewDetailedFeedback
      onClickClose={{
        onClick: () => {
          onClose();
        },
      }}
      slotCandidateImage={candidateImage}
      textName={name.value}
      slotDetailedFeedback={
        <DetailedInterviewFeedbackParams
          feedbackParamsObj={application.assessment_results.feedback}
        />
      }
      slotTranscript={
        <TranscriptParams
          feedbackParams={application.assessment_results.conversation}
          candidateImage={candidateImage}
        />
      }
    />
  );
};

const TranscriptParams = ({
  feedbackParams,
  candidateImage,
}: {
  feedbackParams: any;
  candidateImage: React.JSX.Element;
}) => {
  return feedbackParams.map((con, i) => {
    return (
      <>
        <InterviewAiTranscriptCard
          key={i}
          textAiScript={con.content}
          slotAiImage={
            <svg
              width='24'
              height='24'
              viewBox='0 0 36 36'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M27.4875 16.8075C24.255 15.9975 22.635 15.6 21.5175 14.4825C20.4 13.3575 20.0025 11.745 19.1925 8.5125L18 3.75L16.8075 8.5125C15.9975 11.745 15.6 13.365 14.4825 14.4825C13.3575 15.6 11.745 15.9975 8.5125 16.8075L3.75 18L8.5125 19.1925C11.745 20.0025 13.365 20.4 14.4825 21.5175C15.6 22.6425 15.9975 24.255 16.8075 27.4875L18 32.25L19.1925 27.4875C20.0025 24.255 20.4 22.635 21.5175 21.5175C22.6425 20.4 24.255 20.0025 27.4875 19.1925L32.25 18L27.4875 16.8075Z'
                fill='#FF6224'
              ></path>
            </svg>
          }
          textAiName={'Interviewer'}
        />
        <InterviewCandidateCard
          key={i}
          textCandidateScript={con.userContent}
          slotCandidateImage={candidateImage}
        />
      </>
    );
  });
};

export const DetailedInterviewFeedbackParams = ({
  feedbackParamsObj,
}: {
  feedbackParamsObj: any;
}) => {
  return feedbackParamsObj.map((f, i) => {
    const color =
      f.rating > 33 ? (f.rating > 66 ? '#228F67' : '#F79A3E') : '#D93F4C';
    const circularScore = (
      <Stack style={{ transform: 'scale(0.3)' }}>
        <SmallCircularScore2 score={f.rating} />
      </Stack>
    );
    return (
      <DetailedFeedbackCardSmall
        key={i}
        textHeader={capitalize(f.topic)}
        textDescription={f.feedback}
        textColorScore={{ style: { color: color } }}
        slotScore={circularScore}
        textScorePercentage={`${f.rating}%`}
      />
    );
  });
};

const NewJobApplicationSideDrawer = ({
  application,
  onClose,
  setOpenFeedback,
  candidateImage,
  handleSelectNextApplication,
  handleSelectPrevApplication,
}: {
  application: JobApplication;
  onClose: () => void;
  setOpenFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  candidateImage: React.JSX.Element;
  handleSelectNextApplication: () => void;
  handleSelectPrevApplication: () => void;
}) => {
  const name = capitalize(
    application.candidates.first_name +
      ' ' +
      `${application.candidates.last_name || ''}`,
  );
  const creationDate = formatTimeStamp(application.applied_at);

  const jobTitle = getCandidateDetails(application, 'job_title');
  const location = getCandidateDetails(application, 'location');
  const linkedin = getCandidateDetails(application, 'linkedin');
  const phone = getCandidateDetails(application, 'phone');
  const overview = getCandidateDetails(application, 'overview');

  const [openResume, setOpenResume] = useState(false);

  const handleLinkedInRedirect = () => {
    window.open(application.candidates.linkedin, '_blank');
  };
  const handleCopy = (str: string, tag: 'Phone number' | 'Email') => {
    navigator.clipboard.writeText(str).then(() => {
      toast.success(`${tag} copied to clipboard`);
    });
  };

  const processState = getApplicationProcessState(application);

  return (
    <CandidateSideDrawer
      slotCandidateImage={candidateImage}
      textName={name}
      onClickPrev={{ onClick: () => handleSelectPrevApplication() }}
      onClickNext={{ onClick: () => handleSelectNextApplication() }}
      onClickClose={{
        onClick: () => onClose(),
      }}
      isRoleVisible={jobTitle.valid}
      textRole={jobTitle.value}
      isLocationVisible={location.valid}
      textLocation={location.value}
      isMailIconVisible={application.emailValidity.isValidEmail}
      onClickCopyMail={{
        onClick: () => handleCopy(application.candidates.email.trim(), 'Email'),
      }}
      isPhoneIconVisible={phone.valid}
      onClickCopyPhone={{
        onClick: () =>
          handleCopy(application.candidates.phone.trim(), 'Phone number'),
      }}
      isLinkedInVisible={linkedin.valid}
      onClickLinkedin={{
        onClick: () => handleLinkedInRedirect(),
      }}
      isResumeVisible={
        processState !== 'unavailable' && processState !== 'fetching'
      }
      onClickResume={{ onClick: () => setOpenResume((prev) => !prev) }}
      slotMoveTo={<></>}
      slotOverview={
        overview.valid && (
          <OverviewBlock title={'Overview'} description={overview.value} />
        )
      }
      slotCandidateDetails={
        <>
          <NewCandidateDetails
            application={application}
            setOpenFeedback={setOpenFeedback}
            openResume={openResume}
            setOpenResume={setOpenResume}
          />
        </>
      }
      isAppliedOnVisible={true}
      textAppliedOn={creationDate}
    />
  );
};

const NewCandidateDetails: React.FC<{
  application: JobApplication;
  setOpenFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  openResume: boolean;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
}> = ({ application, setOpenFeedback, openResume, setOpenResume }) => {
  const resume = application.candidate_files?.resume_json as any;
  const validity = getApplicationProcessState(application);
  const validApplication = validity === 'processed';
  return (
    <CandidateDetails
      slotInterviewScore={
        <>
          <NewResumeSection
            application={application}
            openResume={openResume}
            setOpenResume={setOpenResume}
          />
          <AssessmentSection
            application={application}
            setOpenFeedback={setOpenFeedback}
          />
          <PhoneScreening application={application} />
          {validApplication && (
            <>
              <NewExperienceDetails
                positions={resume.positions}
                relevance={
                  (application.score_json as ScoreJson)?.relevance?.positions
                }
                score={
                  (application.score_json as ScoreJson)?.scores?.experience
                }
              />
              <NewEducationDetails
                schools={resume.schools}
                relevance={
                  (application.score_json as ScoreJson)?.relevance?.schools
                }
                score={(application.score_json as ScoreJson)?.scores?.education}
              />
              <NewSkillDetails
                skills={resume.skills}
                relevance={
                  (application.score_json as ScoreJson)?.relevance?.skills
                }
                score={(application.score_json as ScoreJson)?.scores?.skills}
              />
            </>
          )}
        </>
      }
    />
  );
};

const AnalysisBlockSection: React.FC<{ application: JobApplication }> = ({
  application,
}) => {
  const score_json = application.score_json as ScoreJson;
  const [collapse, setCollapse] = useState(true);
  const reasoning = score_json?.reasoning ?? null;
  const scores = score_json?.scores ?? null;
  if (!reasoning || !scores) return <></>;
  const analyses = Object.entries(score_json.scores).map(([key, value], i) => {
    const reasoningKey = mapScoreToAnalysis(key as keyof ScoreJson['scores']);
    if (
      key &&
      typeof value === 'number' &&
      (score_json?.reasoning[reasoningKey] ?? null)
    ) {
      return (
        <>
          <AnalysisBlock
            slotAnalysisPill={<AnalysisPillComponent score={value} />}
            key={i}
            description={reasoning[reasoningKey]}
            title={capitalize(key)}
          />
        </>
      );
    }
  });
  return (
    <SidebarAnalysisBlock
      slotPill={<ResumeScore application={application} />}
      onclickArrow={{
        onClick: () => setCollapse((prev) => !prev),
        style: {
          cursor: 'pointer',
          transform: `rotate(${collapse ? '180deg' : '0deg'})`,
        },
      }}
      slotBody={
        <Collapse in={collapse}>
          <Stack gap={'20px'} marginTop={'20px'}>
            {analyses}
          </Stack>
        </Collapse>
      }
    />
  );
};

const AssessmentSection: React.FC<{
  application: JobApplication;
  setOpenFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ application, setOpenFeedback }) => {
  const { section } = useJobApplications();
  const { isNotInvited, isPending, isSubmitted } = getAssessmentStatus(
    application.status_emails_sent,
    {
      feedback: application.assessment_results?.feedback ?? null,
      created_at: application.assessment_results?.created_at ?? null,
    },
  );
  if (isNotInvited && section === JobApplicationSections.ASSESSMENT)
    return <NewInterviewStatus application={application} pending={false} />;
  if (isPending && section === JobApplicationSections.ASSESSMENT)
    return <NewInterviewStatus application={application} pending={true} />;
  if (isSubmitted)
    return (
      <NewInterviewScoreDetails
        application={application}
        setOpenFeedback={setOpenFeedback}
      />
    );
};

const NewInterviewStatus = ({
  application,
  pending,
}: {
  application: JobApplication;
  pending: boolean;
}) => {
  const {
    section,
    handleJobApplicationSectionUpdate,
    setCardStates,
    cardStates: {
      checkList: { disabled, list },
      disabledList,
    },
  } = useJobApplications();
  const [collapse, setCollapse] = useState(false);
  const status = {
    text: pending ? 'Invited' : 'Pending Invite',
    description: pending
      ? 'The candidate has received an assessment invitation but has not yet taken the assessment.'
      : 'The candidate has not been invited for assesment yet. ',
    btnText: pending ? 'Resend link' : 'Invite now',
  };
  const disable =
    disabledList.has(application.id) || (disabled && list.has(application.id));
  const handleInvite = async () => {
    if (!disable) {
      const purpose = pending ? 'interview_resend' : 'interview';
      setCardStates((prev) => ({
        ...prev,
        disabledList: new Set([...prev.disabledList, application.id]),
      }));
      await handleJobApplicationSectionUpdate(
        {
          source: section,
          destination: null,
        },
        [purpose],
        new Set([application.id]),
      );
      setCardStates((prev) => {
        return {
          ...prev,
          disabledList: new Set(
            [...prev.disabledList].filter((e) => e === application.id),
          ),
        };
      });
    } else {
      handleOngoingWarning();
    }
  };
  return (
    <Stack
      key={application.id}
      style={{
        opacity: disable ? 0.4 : 1,
        transition: '0.5s',
        pointerEvents: disable ? 'none' : 'auto',
      }}
    >
      <InterviewResultStatus
        slotAssessmentScore={
          <InterviewScore key={application.id} application={application} />
        }
        slotAssessmentInvite={
          <Collapse in={collapse}>
            <Stack marginTop={'10px'}>
              <AssessmentInvite
                textDescription={status.description}
                onClickCopyInterviewLink={{
                  onClick: () => {
                    navigator.clipboard
                      .writeText(
                        `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.MOCKTEST}?id=${application.id}`,
                      )
                      .then(() => {
                        toast.success('Interview link copied');
                      });
                  },
                }}
                slotResendButton={
                  <ButtonPrimaryOutlinedRegular
                    buttonText={status.btnText}
                    buttonProps={{ onClick: async () => await handleInvite() }}
                  />
                }
              />
            </Stack>
          </Collapse>
        }
        onClickIcons={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
          },
        }}
      />
    </Stack>
  );
};

const NewInterviewScoreDetails: React.FC<{
  application: JobApplication;
  setOpenFeedback: Dispatch<SetStateAction<boolean>>;
}> = ({ application, setOpenFeedback }) => {
  const [collapse, setCollapse] = useState(false);
  const interviewScore = <InterviewScore application={application} />;
  return (
    <CandidateInterviewScore
      slotAssessmentScore={interviewScore}
      onClickIcons={{
        onClick: () => setCollapse((prev) => !prev),
        style: {
          cursor: 'pointer',
          transform: `rotate(${collapse ? '0deg' : '180deg'})`,
        },
      }}
      slotInterviewFeedbackScore={
        application.assessment_results.feedback && (
          <Collapse in={collapse}>
            <Stack gap={'12px'} marginTop={'12px'}>
              <InterviewFeedbackParams
                feedbackParamsObj={application.assessment_results.feedback}
              />
              <DetailedFeedbackButton
                onClickDetailedFeedback={{
                  onClick: () => setOpenFeedback(true),
                  style: { paddingTop: '16px' },
                }}
              />
            </Stack>
          </Collapse>
        )
      }
    />
  );
};

const OverviewBlock = ({
  title,
  description,
  bgColor = '#f5fcfc',
}: {
  title: string;
  description: string;
  bgColor?: string;
}) => {
  const [collapse, setCollapse] = useState(true);
  const displayText = (
    <Stack
      className={`job_application_overview_${collapse ? 'un' : ''}clamped`}
    >
      {description}
    </Stack>
  );
  return (
    <SummaryBlock
      arrowProps={{
        onClick: () => setCollapse((prev) => !prev),
        style: {
          cursor: 'pointer',
          transform: `rotate(${collapse ? '0deg' : '180deg'})`,
        },
      }}
      title={title}
      description={displayText}
      descriptionTextProps={{
        onClick: () => setCollapse((prev) => !prev),
        style: { cursor: 'pointer' },
      }}
      wrapperProps={{ style: { backgroundColor: bgColor } }}
    />
  );
};

const NewResumeSection: React.FC<{
  application: JobApplication;
  openResume: boolean;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
}> = ({ application, openResume, setOpenResume }) => {
  const { job } = useJobApplications();
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    if (!downloading) {
      setDownloading(true);
      await fetchFile(application);
      setDownloading(false);
    }
  };
  return (
    <>
      <ResumeViewer
        application={application}
        openResume={openResume}
        setOpenResume={setOpenResume}
      />
      <ResumeBlock
        application={application}
        setOpenResume={setOpenResume}
        handleDownload={handleDownload}
        job={job}
      />
    </>
  );
};

const ResumeViewer: React.FC<{
  application: JobApplication;
  openResume: boolean;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
}> = ({ application, openResume, setOpenResume }) => {
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '0px !important',
          border: 'none !important',
        },
        '.MuiDialog-container': {
          height: 'auto',
        },
      }}
      fullWidth
      maxWidth={'lg'}
      open={openResume}
      onClose={() => setOpenResume(false)}
    >
      <Stack direction={'row'} justifyContent={'center'} height={'90vh'}>
        <ResumePreviewer url={application.candidate_files?.file_url} />
      </Stack>
    </Dialog>
  );
};

const ResumeBlock: React.FC<{
  application: JobApplication;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
  handleDownload: () => Promise<void>;
  job: JobTypeDashboard;
}> = ({ application, setOpenResume, handleDownload }) => {
  switch (getApplicationProcessState(application)) {
    case 'unavailable':
      return <ResAbsentError />;
    case 'fetching':
      return <ResumeErrorBlock2 slotLottie={<ResumeWait />} />;
    case 'processing':
      return (
        <ResumeErrorBlock
          slotLottie={<ResumeWait />}
          onclickView={{ onClick: () => setOpenResume(true) }}
        />
      );
    case 'unparsable':
      return (
        <UnableFetchResume
          propsLink={{ href: application.candidate_files.file_url }}
          onClickViewResume={{
            onClick: () => {
              setOpenResume(true);
            },
          }}
          onClickDownloadResume={{
            onClick: async () => await handleDownload(),
          }}
        />
      );
    case 'processed':
      return <AnalysisBlockSection application={application} />;
  }
};

export const InterviewFeedbackParams = ({ feedbackParamsObj }) => {
  return feedbackParamsObj.map((f, i) => {
    const circularScore = (
      <Stack style={{ transform: 'scale(0.4) translate(-10px,-25px)' }}>
        <SmallCircularScore2 score={f.rating} />
      </Stack>
    );
    const color =
      f.rating > 33 ? (f.rating > 66 ? '#228F67' : '#F79A3E') : '#D93F4C';
    return (
      <FeedbackScore
        key={i}
        textFeedback={capitalize(f.topic)}
        textScorePercentage={`${f.rating}%`}
        slotFeedbackScoreGraphs={circularScore}
        propsTextScore={{ style: { color: color } }}
      />
    );
  });
};

export const NewResumeScoreDetails = ({
  application,
  job,
  feedback,
  setOpenResume,
}: {
  application: JobApplication;
  job: JobTypeDashboard;
  feedback: JobApplication['assessment_results']['feedback'];
  setOpenResume?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const jdScoreObj = (application.score_json as ScoreJson)?.scores;
  const score = application.overall_score;
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    if (!downloading) {
      setDownloading(true);
      await fetchFile(application);
      setDownloading(false);
    }
  };
  const resumeScoreWheel = (
    <ScoreWheel
      id={`ScoreWheelApplicationCard${Math.random()}`}
      scores={(application.score_json as ScoreJson)?.scores}
      parameter_weights={job.parameter_weights as ScoreWheelParams}
      fontSize={7}
    />
  );
  const feedbackObj = giveRateInWordToResume(score);
  return (
    <CandidateResumeScore
      textStyleProps={{
        style: {
          fontSize: feedback ? '18px' : '14px',
        },
      }}
      slotScoreGraph={resumeScoreWheel}
      textScoreState={feedbackObj.text}
      propsTextColor={{ style: { color: feedbackObj.color } }}
      onClickViewResume={{
        onClick: () => {
          setOpenResume(true);
          posthog.capture('View Resume Clicked');
        },
      }}
      onClickDownloadResume={{
        onClick: async () => await handleDownload(),
      }}
      propsLink={{ href: application.candidate_files.file_url }}
      slotFeedbackScore={
        <ResumeFeedbackParams feedbackParamsObj={jdScoreObj} />
      }
    />
  );
};

export const ResumeFeedbackParams = ({
  feedbackParamsObj,
}: {
  feedbackParamsObj: ScoreWheelParams;
}) => {
  const getCustomText = (e: number) => {
    return e === 100
      ? 'Perfect'
      : e >= 75
        ? 'High'
        : e >= 50
          ? 'Average'
          : e >= 25
            ? 'Low'
            : 'Poor';
  };
  return (
    <>
      {scoreWheelDependencies.parameterOrder.map((key, i) => {
        return (
          <ResumeFeedbackScore
            key={i}
            textFeedback={capitalize(key)}
            textScoreState={
              // eslint-disable-next-line security/detect-object-injection
              getCustomText(feedbackParamsObj[key]) ?? '--'
            }
          />
        );
      })}
    </>
  );
};

const PhoneScreening: React.FC<{ application: JobApplication }> = ({
  application,
}) => {
  const {
    section,
    cardStates: {
      disabledList,
      checkList: { list, disabled },
    },
  } = useJobApplications();

  const { isSubmitted } = getScreeningStatus(
    application.status_emails_sent,
    application.phone_screening,
  );

  const showComponent =
    section === JobApplicationSections.SCREENING || isSubmitted;
  if (!showComponent) return <></>;
  const disable =
    disabledList.has(application.id) || (disabled && list.has(application.id));
  const styles = disable
    ? { opacity: 0.5, pointerEvent: 'none', transition: '0.5s' }
    : { opacity: 1, pointerEvent: 'auto', transition: '0.5s' };
  return (
    <Stack style={styles}>
      <PhoneScreeningSection application={application} disable={disable} />
    </Stack>
  );
};

const PhoneScreeningSection = ({
  application,
  disable,
}: {
  application: JobApplication;
  disable: boolean;
}) => {
  const { section, handleJobApplicationSectionUpdate, setCardStates } =
    useJobApplications();

  const handleInvite = async (resend: boolean = false) => {
    if (!disable) {
      const purpose = resend ? 'phone_screening_resend' : 'phone_screening';
      setCardStates((prev) => ({
        ...prev,
        disabledList: new Set([...prev.disabledList, application.id]),
      }));
      await handleJobApplicationSectionUpdate(
        {
          source: section,
          destination: null,
        },
        [purpose],
        new Set([application.id]),
      );
      setCardStates((prev) => {
        return {
          ...prev,
          disabledList: new Set(
            [...prev.disabledList].filter((e) => e === application.id),
          ),
        };
      });
    } else {
      handleOngoingWarning();
    }
  };

  const { isNotInvited, isPending, phoneScreening } = getScreeningStatus(
    application.status_emails_sent,
    application.phone_screening,
  );

  const status = {
    description: isPending
      ? 'The candidate has received a screening invitation but has not yet taken the screening.'
      : 'The candidate has not been invited for screening yet. ',
    btnText: isPending ? 'Resend Invite' : 'Invite now',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/candidate-phone-screening?job_post_id=${application.job_id}&application_id=${application.id}`,
    );
    toast.success('Interview link copied!');
  };

  const [collapse, setCollapse] = useState(false);

  const slotBody = (
    <Collapse in={collapse}>
      <Stack marginTop={'10px'}>
        <AssessmentInvite
          textDescription={status.description}
          onClickCopyInterviewLink={{
            onClick: () => handleCopy(),
          }}
          slotResendButton={
            <ButtonPrimaryOutlinedRegular
              buttonText={status.btnText}
              buttonProps={{ onClick: async () => await handleInvite() }}
            />
          }
        />
      </Stack>
    </Collapse>
  );

  if (isNotInvited)
    return (
      <SidebarScreening
        slotStatus={<ScreeningStatusComponent application={application} />}
        slotBody={slotBody}
        onclickArrow={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '180deg' : '0deg'})`,
          },
        }}
      />
    );

  if (isPending)
    return (
      <SidebarScreening
        slotStatus={<ScreeningStatusComponent application={application} />}
        slotBody={slotBody}
        onclickArrow={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '180deg' : '0deg'})`,
          },
        }}
      />
    );
  return (
    <SidebarScreening
      slotBody={
        <Collapse in={collapse}>
          <Stack gap={'20px'} marginTop={'20px'}>
            <ScreeningQuestions phoneScreening={phoneScreening} />
          </Stack>
        </Collapse>
      }
      slotStatus={<ScreeningStatusComponent application={application} />}
      onclickArrow={{
        onClick: () => setCollapse((prev) => !prev),
        style: {
          cursor: 'pointer',
          transform: `rotate(${collapse ? '180deg' : '0deg'})`,
        },
      }}
    />
  );
};

const ScreeningQuestions = ({
  phoneScreening,
}: {
  phoneScreening: PhoneScreeningResponseType[];
}) => {
  return (
    <>
      {phoneScreening.map((e, i) => (
        <ScrQuestionListItem
          key={i}
          isMultiselect={e.type === 'multiSelect'}
          isShortAnswer={e.type === 'shortAnswer'}
          isSingleSelect={e.type === 'singleSelect'}
          questionText={e.questionLabel}
          answerText={getScreeningAnswer(e)}
        />
      ))}
    </>
  );
};

const getScreeningAnswer = (question: PhoneScreeningResponseType) => {
  switch (question.type) {
    case 'multiSelect':
      return question.options
        .reduce((acc, curr) => {
          if (curr.isChecked) acc.push(curr.option);
          return acc;
        }, [])
        .join(', ');
    case 'singleSelect':
      return question.options.find((option) => option.isChecked).option;
    case 'shortAnswer':
      return question.candAnswer;
  }
};

const fetchFile = async (application: JobApplication) => {
  await axios({
    url: application?.candidate_files.file_url ?? '#',
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const ext = application.candidate_files.file_url.slice(
      application.candidate_files.file_url.lastIndexOf('.'),
    );
    link.setAttribute(
      'download',
      `${application.candidates.first_name}_${
        application.candidates.last_name
      }_Resume${ext ?? '.pdf'}`,
    );
    posthog.capture('Download Resume Clicked');
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);
  });
};

const NewEducationDetails = ({
  schools,
  relevance,
  score,
}: {
  schools;
  relevance: ScoreJson['relevance']['schools'];
  score: number;
}) => {
  const [collapse, setCollapse] = useState(false);
  if (schools && schools instanceof Array && schools.length !== 0) {
    const educationList = schools
      .filter((e) => e.institution !== null && e.institution !== '')
      .map((e, i) => {
        const startDate = timeFormat(e.start);
        const endDate = timeFormat(e.end);
        return (
          <CandidateEducationCard
            key={i}
            textUniversityName={e.institution}
            textDate={timeRange(startDate, endDate)}
            isBadgeVisible={
              relevance && relevance[i] && relevance[i] === 'high'
            }
            textDegree={
              e.degree && typeof e.degree === 'string' && e.degree.trim() !== ''
                ? e.degree
                : null
            }
            textGpa={
              e.gpa && typeof e.gpa === 'number' && e.gpa > 0
                ? `${e.gpa} GPA`
                : null
            }
          />
        );
      });
    return (
      <CandidateEducation
        slotEducationScore={<AnalysisPillComponent score={score} />}
        onClickIcons={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
          },
        }}
        slotEducationCard={
          <Collapse in={collapse}>
            <Stack gap={'20px'} marginTop={'20px'}>
              {educationList}
            </Stack>
          </Collapse>
        }
      />
    );
  }
  return <></>;
};

const NewExperienceDetails = ({
  positions,
  relevance,
  score,
}: {
  positions;
  relevance: ScoreJson['relevance']['positions'];
  score: number;
}) => {
  const [collapse, setCollapse] = useState(false);
  if (positions && positions instanceof Array && positions.length !== 0) {
    const workList = positions.reduce((acc, w, i) => {
      const startDate = timeFormat(w.start);
      const endDate = timeFormat(w.end);
      if (w.title) {
        acc.push(
          <CandidateExperienceCard
            key={i}
            slotLogo={
              <CompanyLogo
                companyName={w.org ? w.org.trim().toLowerCase() : null}
              />
            }
            textRole={w.title}
            textCompany={w.org}
            textDate={timeRange(startDate, endDate)}
            isBadgeVisible={
              relevance && relevance[i] && relevance[i] === 'high'
            }
          />,
        );
      }
      return acc;
    }, []);
    return (
      <CandidateExperience
        onClickIcons={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
          },
        }}
        slotExperienceScore={<AnalysisPillComponent score={score} />}
        slotCandidateExperienceCard={
          <Collapse in={collapse} style={{ gap: '2px' }}>
            <Stack gap={'20px'} marginTop={'20px'}>
              {workList}
            </Stack>
          </Collapse>
        }
      />
    );
  }
  return <></>;
};

const timeFormat = (
  obj: { year: number; month: number },
  isEndDate: boolean = false,
) => {
  if (obj) {
    if (obj.month) {
      const date = new Date();
      date.setMonth(obj.month - 1);
      return `${date.toLocaleString('en-US', { month: 'long' })}${
        obj.year ? ` ${obj.year}` : null
      }`;
    } else if (obj.year) return `${obj.year}`;
    else return null;
  } else if (isEndDate) return 'Present';
  else return null;
};

const timeRange = (startDate: string, endDate: string) => {
  return `${startDate ?? ''} ${startDate && endDate ? '-' : ''} ${
    endDate ?? ''
  }`;
};

const NewSkillDetails = ({
  skills,
  relevance,
  score,
}: {
  skills;
  relevance: ScoreJson['relevance']['skills'];
  score: number;
}) => {
  const [collapse, setCollapse] = useState(false);
  if (skills && skills instanceof Array && skills.length !== 0) {
    const { relevant, others } = Object.entries(relevance).reduce(
      (acc, [key, value], i) => {
        if (value === 'high')
          return {
            ...acc,
            relevant: [
              ...acc.relevant,
              <CandidateSkillPills key={i} textSkill={key} />,
            ],
          };
        return {
          ...acc,
          others: [
            ...acc.others,
            <CandidateSkillPills
              key={i}
              textSkill={key}
              propsBgColor={{
                style: { backgroundColor: 'rgba(248, 249, 249, 1)' },
              }}
            />,
          ],
        };
      },
      { relevant: [], others: [] },
    );
    return (
      <CandidateSkill
        slotSkillsScore={<AnalysisPillComponent score={score} />}
        onClickIcons={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
          },
        }}
        slotCandidateSkill={
          <Collapse in={collapse}>
            <Stack
              display={'flex'}
              flexDirection={'row'}
              flexWrap={'wrap'}
              gap={'6px'}
              marginTop={'20px'}
            >
              {relevant}
              {others}
            </Stack>
          </Collapse>
        }
      />
    );
  }
  return <></>;
};

export function Transcript({
  application,
  setOpenDetailedFeedback,
  hideFeedback,
}: {
  application: JobApplication;
  setOpenDetailedFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  hideFeedback: boolean;
}) {
  const feedback = application.assessment_results.feedback as any[];
  return (
    <DetailedFeedback
      slotTranscript={
        <>
          {application.assessment_results.conversation?.map((ele: any, i) => {
            return (
              <>
                <ConversationCard
                  roleImage={interviewerList[Number(0)].image}
                  roleName={interviewerList[Number(0)].name}
                  textForSpeech={ele.content}
                  src={ele.aiVoice}
                  index={i}
                  cardFor='ai'
                />
                {ele.userContent && (
                  <ConversationCard
                    cardFor={undefined}
                    roleImage={application.candidates.avatar}
                    roleName={application.candidates.first_name}
                    textForSpeech={ele.userContent}
                    src={ele.userVoice}
                    index={i}
                  />
                )}
              </>
            );
          })}
        </>
      }
      slotDetailedFeedback={
        <>
          {!hideFeedback &&
            feedback.map((ele, i) => {
              let rating = Number(
                String(ele.rating).includes('/')
                  ? ele.rating.split('/')[0]
                  : ele.rating,
              );
              return (
                <DetailedFeedbackCard
                  textColorScore={{
                    style: {
                      color:
                        rating >= 90
                          ? '#228F67'
                          : rating >= 70
                            ? '#f79a3e'
                            : rating >= 50
                              ? '#de701d'
                              : '#d93f4c',
                    },
                  }}
                  textHeader={capitalize(ele.topic.replaceAll('_', ' '))}
                  textDescription={ele.feedback}
                  textScorePercentage={rating + '%'}
                  slotScore={
                    <CustomProgress
                      rotation={270}
                      fillColor={
                        rating >= 90
                          ? '#228F67'
                          : rating >= 70
                            ? '#f79a3e'
                            : rating >= 50
                              ? '#de701d'
                              : '#d93f4c'
                      }
                      bgFill={
                        rating >= 90
                          ? '#edf8f4'
                          : rating >= 70
                            ? '#fff7ed'
                            : rating >= 50
                              ? '#ffeedb'
                              : '#fff0f1'
                      }
                      size={5}
                      progress={rating}
                    />
                  }
                  key={i}
                />
              );
            })}
        </>
      }
      onClickBack={{
        onClick: () => {
          setOpenDetailedFeedback(false);
        },
      }}
    />
  );
}

export function giveRateInWordToResume(score: number) {
  if (score <= 25) {
    return { color: '#d3212c', bgColor: '#fbe9ea', text: 'Poor' };
  } else if (score <= 50) {
    return { color: '#ff681e', bgColor: '#fff0e9', text: 'Fair' };
  } else if (score <= 75) {
    return { color: '#ff980e', bgColor: '#fff5e7', text: 'Good' };
  } else {
    return { color: '#069c56', bgColor: '#e6f5ee', text: 'Excellent' };
  }
}

export function giveRateInWordForInterview(overAllScore: number) {
  return overAllScore > 90
    ? `Absolutely incredible! 🌟😍`
    : overAllScore > 70
      ? `Truly outstanding! 🤩`
      : overAllScore > 50
        ? `Excellent job! 👏`
        : `Not up to mark! 😑`;
}

export function giveColorForInterviewScore(rating) {
  return rating >= 90
    ? '#228F67'
    : rating >= 70
      ? '#f79a3e'
      : rating >= 50
        ? '#de701d'
        : '#d93f4c';
}
