/* eslint-disable security/detect-object-injection */
import { Collapse, Dialog, Stack, Typography } from '@mui/material';
import axios from 'axios';
// import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { FileUploader } from 'react-drag-drop-files';

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
  DetailedFeedbackCardSmall,
  FeedbackScore,
  InterviewResultStatus,
  ResumeFeedbackScore,
  UnableFetchResume,
} from '@/devlink';
import {
  AnalysisBlock,
  ButtonWide,
  JobCardSchedule,
  ResAbsentError,
  ResumeErrorBlock,
  ScreeningLandingPop,
  ScrQuestionListItem,
  SidebarAnalysisBlock,
  SidebarBlockNotScheduled,
  SidebarScreening,
  StatusBadge,
  SummaryBlock,
  UploadCandidateResume,
} from '@/devlink2';
import { ButtonPrimaryOutlinedRegular, DangerMessage } from '@/devlink3';
import { getSafeAssessmentResult } from '@/src/apiUtils/job/jobApplications/candidateEmail/utils';
import AUIButton from '@/src/components/Common/AUIButton';
import ResumeWait from '@/src/components/Common/Lotties/ResumeWait';
import MuiPopup from '@/src/components/Common/MuiPopup';
import ScoreWheel, {
  scoreWheelDependencies,
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import { SmallCircularScore2 } from '@/src/components/Common/SmallCircularScore';
import UITextField from '@/src/components/Common/UITextField';
import { PhoneScreeningResponseType } from '@/src/components/KnockOffQns/ScreeningCtxProvider';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import { useJobDetails } from '@/src/context/JobDashboard';
import { palette } from '@/src/context/Theme/Theme';
import { Job } from '@/src/queries/job/types';
// import interviewerList from '@/src/utils/interviewer_list';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import CandidateAvatar from '../../Common/CandidateAvatar';
import CompanyLogo from '../../Common/CompanyLogo';
import EmailIcon from '../../Common/Icons/emailIcon';
import LinkedInIcon from '../../Common/Icons/linkedinIcon';
import PhoneIcon from '../../Common/Icons/phoneIcon';
import InterviewScore, {
  getInterviewScores,
} from '../../Common/InterviewScore';
// import InterviewScore, {
//   getInterviewScores,
// } from '../../Common/InterviewScore';
import ResumeScore from '../../Common/ResumeScore';
import CopyWrapper from '../../Common/Wrappers/copyWrapper';
// import RedirectWrapper from '../../Common/Wrappers/redirectWrapper';
import { CheckIcon, FileIcon, UploadIcon } from '../../ImportManualCandidates';
import useUploadCandidate from '../../ImportManualCandidates/hooks';
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
// import ConversationCard from './ConversationCard';
import { AnalysisPillComponent, ScreeningStatusComponent } from '..';
import ResumePreviewer from './ResumePreviewer';

const ApplicationDetails = ({
  open,
  onClose,
  application,
  handleSelectNextApplication,
  handleSelectPrevApplication,
  hideNextPrev,
}: {
  open: boolean;
  onClose: () => void;
  application: JobApplication;
  handleSelectNextApplication?: () => void;
  handleSelectPrevApplication?: () => void;
  hideNextPrev: boolean;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(open);

  const candidateImage = application ? (
    // <RedirectWrapper
    //   toast='Open application in Supabase'
    //   primaryUrl={`https://supabase.com/dashboard/project/plionpfmgvenmdwwjzac/editor/232210?filter=id:eq:${application.id}`}
    // >
    //   <CandidateAvatar application={application} fontSize={12} />
    // </RedirectWrapper>
    <Stack onClick={() => navigator.clipboard.writeText(application.id)}>
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
        <NewJobApplicationSideDrawer
          application={application}
          onClose={() => handleClose()}
          candidateImage={candidateImage}
          handleSelectNextApplication={handleSelectNextApplication}
          handleSelectPrevApplication={handleSelectPrevApplication}
          hideNextPrev={hideNextPrev}
        />
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default ApplicationDetails;

export const DetailedInterviewResultParams = ({
  resultParamsObj,
}: {
  resultParamsObj: any;
}) => {
  return resultParamsObj.map((f, i) => {
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
        textDescription={f.result}
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
  candidateImage,
  handleSelectNextApplication,
  handleSelectPrevApplication,
  hideNextPrev,
}: {
  application: JobApplication;
  onClose: () => void;
  candidateImage: React.JSX.Element;
  handleSelectNextApplication: () => void;
  handleSelectPrevApplication: () => void;
  hideNextPrev: boolean;
}) => {
  const { job, interviewPlanEnabled } = useJobDetails();
  const name = capitalize(
    application.candidates.first_name +
      ' ' +
      `${application.candidates.last_name || ''}`,
  );
  const creationDate = formatTimeStamp(application.applied_at);

  const jobTitle = getCandidateDetails(application, 'job_title');
  const location = getCandidateDetails(application, 'location');
  const overview = getCandidateDetails(application, 'overview');
  const firstName = getCandidateDetails(application, 'name');

  const [openResume, setOpenResume] = useState(false);
  const [isPhonePopUp, setPhonePopUp] = useState(false);
  const [phoneInput, setPhoneInput] = useState('');
  const [parametersInput, setParameter] = useState(undefined);
  const { recruiterUser } = useAuthDetails();

  const processState = getApplicationProcessState(application);
  const makePhoneCll = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_AGENT_API}/api/create-screening-phone-call`,
      {
        from: '+12512066348',
        to: phoneInput,
        agent: 'd874c616f28ef76fe4eefe45af69cda7',
        candidate_id: application.candidate_id,
        begin_message: `Hi ${firstName.value}, this is ${recruiterUser.first_name} calling from Aglint, California. We have your resume and we wanted few details from you to proceed to next step. If u are free could you share few details with us??`,
        questions: parametersInput,
      },
    );
    toast.success('Call initiated successfully.');
  };
  const isPhoneScreeningPhoneCallEnabled = useFeatureFlagEnabled(
    'isPhoneScreeningPhoneCallEnabled',
  );
  const isPhoneScreeningEnabled = job.activeSections.includes(
    JobApplicationSections.SCREENING,
  );
  return (
    <>
      <CandidateSideDrawer
        isPhoneScreeningVisible={
          isPhoneScreeningEnabled && isPhoneScreeningPhoneCallEnabled
        }
        onClickPhoneScreening={{
          onClick: () => {
            setPhonePopUp(true);
          },
        }}
        slotCandidateImage={candidateImage}
        textName={name}
        onClickPrev={{
          onClick: () => handleSelectPrevApplication(),
          style: {
            display: hideNextPrev ? 'none' : 'block',
          },
        }}
        onClickNext={{
          onClick: () => handleSelectNextApplication(),
          style: {
            display: hideNextPrev ? 'none' : 'block',
          },
        }}
        onClickClose={{
          onClick: () => onClose(),
        }}
        slotSocialLink={<SocialsBlock application={application} />}
        isOverviewVisible={overview.valid}
        isLocationRoleVisible={jobTitle.valid || location.valid}
        isRoleVisible={jobTitle.valid}
        textRole={jobTitle.value}
        isLocationVisible={location.valid}
        textLocation={location.value}
        isResumeVisible={
          processState !== 'unavailable' && processState !== 'fetching'
        }
        onClickResume={{ onClick: () => setOpenResume((prev) => !prev) }}
        slotMoveTo={<></>}
        slotOverview={
          <>
            {(interviewPlanEnabled?.data ?? false) &&
              (application?.emailValidity?.isValidEmail ?? false) && (
                <InterviewStatusBlock application={application} />
              )}
            {overview.valid && (
              <OverviewBlock title={'Overview'} description={overview.value} />
            )}
          </>
        }
        slotCandidateDetails={
          <>
            <NewCandidateDetails
              application={application}
              openResume={openResume}
              setOpenResume={setOpenResume}
            />
          </>
        }
        isAppliedOnVisible={true}
        textAppliedOn={creationDate}
      />
      <MuiPopup
        props={{
          open: isPhonePopUp,
          onClose: () => {
            ('');
          },
        }}
      >
        <ScreeningLandingPop
          isDropdownVisible={true}
          textHeading={'Make Phone Call'}
          textLabel={''}
          slotDropdown={
            <UITextField
              placeholder='Enter Call Fields'
              value={parametersInput}
              onChange={(e) => setParameter(e.target.value)}
            />
          }
          slotScreeningNameInput={
            <UITextField
              placeholder='Enter Phone Number'
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
            />
          }
          slotButtonPrimaryRegular={
            <ButtonWide
              isEnabled={phoneInput !== ''}
              textButton={'Submit'}
              onClickButton={{
                onClick: () => {
                  makePhoneCll();
                  setPhonePopUp(false);
                },
              }}
            />
          }
          onClickClose={{
            onClick: () => {
              setPhonePopUp(false);
              setParameter('');
            },
          }}
        />
      </MuiPopup>
    </>
  );
};

const SocialsBlock: React.FC<{ application: JobApplication }> = ({
  application,
}) => {
  const linkedin = getCandidateDetails(application, 'linkedin');
  const phone = getCandidateDetails(application, 'phone');
  return (
    <>
      {linkedin.valid && (
        <CopyWrapper content={linkedin.value}>
          <LinkedInIcon />
        </CopyWrapper>
      )}
      {phone.valid && (
        <CopyWrapper content={phone.value}>
          <PhoneIcon />
        </CopyWrapper>
      )}
      {((application.emailValidity.isValidEmail &&
        application?.candidates?.email) ??
        null) && (
        <CopyWrapper content={application.candidates.email}>
          <EmailIcon />
        </CopyWrapper>
      )}
    </>
  );
};

export const NewCandidateDetails: React.FC<{
  application: JobApplication;
  openResume: boolean;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
}> = ({ application, openResume, setOpenResume }) => {
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
          <AssessmentSection application={application} />
          <PhoneScreening application={application} />
          {validApplication && (
            <>
              <NewExperienceDetails
                positions={resume.positions}
                relevance={
                  (application.score_json as ScoreJson)?.relevance?.positions
                }
              />
              <NewEducationDetails
                schools={resume.schools}
                relevance={
                  (application.score_json as ScoreJson)?.relevance?.schools
                }
              />
              <NewSkillDetails
                skills={resume.skills}
                relevance={
                  (application.score_json as ScoreJson)?.relevance?.skills
                }
              />
            </>
          )}
        </>
      }
    />
  );
};

export const AnalysisBlockSection: React.FC<{
  application: JobApplication;
  noCollapse?: boolean;
}> = ({ application, noCollapse = false }) => {
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
      propsStyle={{
        style: {
          border: noCollapse ? 'none' : '1px solid #E9EBED',
          padding: noCollapse ? '0px' : '16px',
        },
      }}
      slotPill={<ResumeScore application={application} />}
      onclickArrow={{
        onClick: () => setCollapse((prev) => !prev),
        style: {
          cursor: 'pointer',
          transform: `rotate(${collapse ? '180deg' : '0deg'})`,
          display: noCollapse ? 'none' : 'flex',
        },
      }}
      slotBody={
        noCollapse ? (
          <Stack gap={'20px'} marginTop={'20px'}>
            {analyses}
          </Stack>
        ) : (
          <Collapse in={collapse}>
            <Stack gap={'20px'} marginTop={'20px'}>
              {analyses}
            </Stack>
          </Collapse>
        )
      }
    />
  );
};

const AssessmentSection: React.FC<{
  application: JobApplication;
}> = ({ application }) => {
  const { section } = useJobApplications();
  const { isNotInvited, isPending, isSubmitted } = getAssessmentStatus(
    application.status_emails_sent,
    getSafeAssessmentResult(application?.assessment_results),
  );
  if (isNotInvited && section === JobApplicationSections.ASSESSMENT)
    return <NewInterviewStatus application={application} pending={false} />;
  if (isPending && section === JobApplicationSections.ASSESSMENT)
    return <NewInterviewStatus application={application} pending={true} />;
  if (isSubmitted) return <InterviewScoreDetails application={application} />;
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
        null,
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
                        `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.CANDIDATE_ASSESSMENT}/${application.id}`,
                      )
                      .then(() => {
                        toast.success('Interview link copied.');
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

const InterviewScoreDetails: React.FC<{ application: JobApplication }> = ({
  application,
}) => {
  const {
    assessments: {
      data: { jobAssessments },
    },
  } = useJobDetails();
  const result = getInterviewScores(application, jobAssessments);
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
        result && (
          <Collapse in={collapse}>
            <Stack gap={'12px'} marginTop={'12px'}>
              <InterviewResultParams resultParamsObj={result} />
            </Stack>
          </Collapse>
        )
      }
    />
  );
};

const InterviewStatusBlock: FC<{ application: JobApplication }> = ({
  application,
}) => {
  const router = useRouter();
  const { section } = useJobApplications();
  if (section !== JobApplicationSections.INTERVIEW) return <></>;
  if (!application.schedule)
    return (
      <Stack
        style={{
          backgroundColor: '#f7f9fb',
          padding: '16px',
          borderRadius: '8px',
        }}
      >
        <SidebarBlockNotScheduled
          onClickSchedule={{
            onClick: () => {
              router.push(
                `${pageRoutes.SCHEDULING}/application/${application.id}`,
                undefined,
                {
                  shallow: true,
                },
              );
            },
          }}
        />
      </Stack>
    );
  return <InterviewScheduled application={application} />;
};

const InterviewScheduled: FC<{ application: JobApplication }> = ({
  application,
}) => {
  const { push } = useRouter();
  const schedule = application.schedule;
  return (
    <JobCardSchedule
      onClickViewScheduler={{
        onClick: () => {
          push(
            `${pageRoutes.SCHEDULING}/application/${application.id}`,
            undefined,
            {
              shallow: true,
            },
          );
        },
      }}
      slotStatusBadge={
        <StatusBadge
          isCancelledVisible={false}
          isCompletedVisible={schedule?.is_completed}
          isWaitingVisible={false}
          isNotScheduledVisible={!schedule}
          isInProgressVisible={!schedule?.is_completed}
          isConfirmedVisible={false}
        />
      }
      textHeader={schedule.schedule_name}
    />
  );
};

export const OverviewBlock = ({
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
  const [upload, setUpload] = useState(false);
  return (
    <>
      <ResumeViewer
        application={application}
        openResume={openResume}
        setOpenResume={setOpenResume}
      />
      <ResumeBlock
        application={application}
        job={job}
        handleUpload={() => setUpload((prev) => !prev)}
      />
      <ResumeUpload
        application={application}
        upload={upload}
        setUpload={setUpload}
      />
    </>
  );
};

const ResumeUpload: React.FC<{
  application: JobApplication;
  upload: boolean;
  setUpload: Dispatch<SetStateAction<boolean>>;
}> = ({ application, setUpload, upload }) => {
  const fileTypes = ['PDF', 'DOCX', 'TXT'];
  const { handleJobApplicationRefresh } = useJobApplications();
  const { handleResumeReupload } = useUploadCandidate();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleClose = () => {
    setUpload(false);
    setTimeout(() => setResume(null), 400);
  };
  const handleSubmit = async () => {
    if (resume) {
      if (!loading) {
        setLoading(true);
        const { confirmation } = await handleResumeReupload(resume, {
          candidate_id: application.candidate_id,
          id: application.id,
        });
        if (confirmation) {
          handleClose();
          await handleJobApplicationRefresh();
        }
        setLoading(false);
      } else {
        toast.warning('Uploading candidate resume. Please wait.');
      }
    } else {
      toast.error('Upload a valid file.');
    }
  };
  return (
    <Dialog open={upload} onClose={() => setUpload(false)}>
      <UploadCandidateResume
        slotUploadButton={
          <Stack>
            <AUIButton onClick={async () => await handleSubmit()}>
              Upload
            </AUIButton>
          </Stack>
        }
        slotDrag={
          <FileUploader handleChange={(e) => setResume(e)} types={fileTypes}>
            <Stack
              sx={{
                border: '1px dashed',
                borderColor: palette.blue[300],
                borderRadius: 1,
                py: '34px',
                px: '20px',
                cursor: 'pointer',
                background: 'hsla(206.66666666666666, 100.00%, 96.47%, 0.50);',
              }}
              direction='row'
              spacing={'8px'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {resume ? <FileIcon /> : <UploadIcon />}
              <Typography
                variant='body2'
                sx={{ textAlgin: 'center', fontSize: '14px' }}
                style={{
                  fontWeight: resume ? 600 : 400,
                }}
              >
                {resume ? resume.name : 'Upload candidate resume [PDF/DOCX]'}
              </Typography>
              {resume && <CheckIcon />}
            </Stack>
          </FileUploader>
        }
        onClickClose={{ onClick: () => handleClose() }}
      />
    </Dialog>
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
  job: Job;
  handleUpload: () => void;
}> = ({ application, job, handleUpload }) => {
  if (job.status === 'draft') return <DangerMessage />;
  switch (getApplicationProcessState(application)) {
    case 'unavailable':
      return (
        <ResAbsentError
          onClickUploadResume={{ onClick: () => handleUpload() }}
        />
      );
    case 'fetching':
      return <ResumeErrorBlock slotLottie={<ResumeWait />} />;
    case 'processing':
      return <ResumeErrorBlock slotLottie={<ResumeWait />} />;
    case 'unparsable':
      return (
        <UnableFetchResume
          onClickReuploadResume={{ onClick: () => handleUpload() }}
        />
      );
    case 'processed':
      return <AnalysisBlockSection application={application} />;
  }
};

export const InterviewResultParams = ({
  resultParamsObj,
}: {
  resultParamsObj: ReturnType<typeof getInterviewScores>;
}) => {
  return (
    <>
      {resultParamsObj.map((f, i) => {
        const score = f.score.percentage;
        if (score === null) {
          return (
            <FeedbackScore
              key={i}
              textFeedback={capitalize(f.name)}
              textScorePercentage={`Yet to take`}
            />
          );
        }
        const circularScore = (
          <Stack style={{ transform: 'scale(0.4) translate(-10px,-25px)' }}>
            <SmallCircularScore2 score={score} />
          </Stack>
        );
        const color =
          score > 33 ? (score > 66 ? '#228F67' : '#F79A3E') : '#D93F4C';
        return (
          <FeedbackScore
            key={i}
            textFeedback={capitalize(f.name)}
            textScorePercentage={`${score}%`}
            slotFeedbackScoreGraphs={circularScore}
            propsTextScore={{ style: { color: color } }}
          />
        );
      })}
    </>
  );
};

export const NewResumeScoreDetails = ({
  application,
  job,
  result,
  setOpenResume,
}: {
  application: JobApplication;
  job: Job;
  result: boolean;
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
  const resultObj = giveRateInWordToResume(score);
  return (
    <CandidateResumeScore
      textStyleProps={{
        style: {
          fontSize: result ? '18px' : '14px',
        },
      }}
      slotScoreGraph={resumeScoreWheel}
      textScoreState={resultObj.text}
      propsTextColor={{ style: { color: resultObj.color } }}
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
      slotFeedbackScore={<ResumeResultParams resultParamsObj={jdScoreObj} />}
    />
  );
};

export const ResumeResultParams = ({
  resultParamsObj,
}: {
  resultParamsObj: ScoreWheelParams;
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
              getCustomText(resultParamsObj[key]) ?? '--'
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
        null,
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
    toast.success('Interview link copied.');
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

export const NewEducationDetails = ({
  schools,
  relevance,
  noCollapse = false,
}: {
  schools;
  relevance: ScoreJson['relevance']['schools'];
  noCollapse?: boolean;
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
        onClickCard={{
          style: {
            border: noCollapse ? 'none' : '1px solid #E9EBED',
            padding: noCollapse ? '0px' : '16px',
          },
        }}
        onClickIcons={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
            display: noCollapse ? 'none' : 'flex',
          },
        }}
        slotEducationCard={
          noCollapse ? (
            <Stack gap={'20px'} marginTop={'20px'}>
              {educationList}
            </Stack>
          ) : (
            <Collapse in={collapse}>
              <Stack gap={'20px'} marginTop={'20px'}>
                {educationList}
              </Stack>
            </Collapse>
          )
        }
      />
    );
  }
  return <></>;
};

export const NewExperienceDetails = ({
  positions,
  relevance,
  noCollapse = false,
}: {
  positions;
  relevance: ScoreJson['relevance']['positions'];
  noCollapse?: boolean;
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
        onClickCards={{
          style: {
            border: noCollapse ? 'none' : '1px solid #E9EBED',
            padding: noCollapse ? '0px' : '16px',
          },
        }}
        onClickIcons={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
            display: noCollapse ? 'none' : 'flex',
          },
        }}
        slotCandidateExperienceCard={
          noCollapse ? (
            <Stack gap={'20px'} marginTop={'20px'}>
              {workList}
            </Stack>
          ) : (
            <Collapse in={collapse} style={{ gap: '2px' }}>
              <Stack gap={'20px'} marginTop={'20px'}>
                {workList}
              </Stack>
            </Collapse>
          )
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

export const NewSkillDetails = ({
  skills,
  relevance,
  noCollapse = false,
}: {
  skills;
  relevance: ScoreJson['relevance']['skills'];
  noCollapse?: boolean;
}) => {
  const [collapse, setCollapse] = useState(false);
  if (skills && skills instanceof Array && skills.length !== 0) {
    if (relevance) {
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
          propsStyle={{
            style: {
              border: noCollapse ? 'none' : '1px solid #E9EBED',
              padding: noCollapse ? '0px' : '16px',
            },
          }}
          onClickIcons={{
            onClick: () => setCollapse((prev) => !prev),
            style: {
              cursor: 'pointer',
              transform: `rotate(${collapse ? '0deg' : '180deg'})`,
              display: noCollapse ? 'none' : 'flex',
            },
          }}
          slotCandidateSkill={
            noCollapse ? (
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
            ) : (
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
            )
          }
        />
      );
    }
    const others = skills.map((skill, i) => (
      <CandidateSkillPills
        key={i}
        textSkill={skill}
        propsBgColor={{
          style: { backgroundColor: 'rgba(248, 249, 249, 1)' },
        }}
      />
    ));
    return (
      <CandidateSkill
        propsStyle={{
          style: {
            border: noCollapse ? 'none' : '1px solid #E9EBED',
            padding: noCollapse ? '0px' : '16px',
            display: noCollapse ? 'none' : 'flex',
          },
        }}
        onClickIcons={{
          onClick: () => setCollapse((prev) => !prev),
          style: {
            cursor: 'pointer',
            transform: `rotate(${collapse ? '0deg' : '180deg'})`,
          },
        }}
        slotCandidateSkill={
          noCollapse ? (
            <Stack
              display={'flex'}
              flexDirection={'row'}
              flexWrap={'wrap'}
              gap={'6px'}
              marginTop={'20px'}
            >
              {others}
            </Stack>
          ) : (
            <Collapse in={collapse}>
              <Stack
                display={'flex'}
                flexDirection={'row'}
                flexWrap={'wrap'}
                gap={'6px'}
                marginTop={'20px'}
              >
                {others}
              </Stack>
            </Collapse>
          )
        }
      />
    );
  }
  return <></>;
};

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
