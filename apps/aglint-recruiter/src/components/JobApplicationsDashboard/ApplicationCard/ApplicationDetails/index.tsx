/* eslint-disable no-unused-vars */
/* eslint-disable security/detect-object-injection */
import { Collapse, Dialog, Drawer, Stack, Typography } from '@mui/material';
import axios from 'axios';
// import dayjs from 'dayjs';
import posthog from 'posthog-js';
import { useFeatureFlagEnabled } from 'posthog-js/react';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FileUploader } from 'react-drag-drop-files';

import { AssessmentInvite } from '@/devlink/AssessmentInvite';
import { BookMark } from '@/devlink/BookMark';
import { ButtonOutlined } from '@/devlink/ButtonOutlined';
import { ButtonSolid } from '@/devlink/ButtonSolid';
import { CandidateDetails } from '@/devlink/CandidateDetails';
import { CandidateEducation } from '@/devlink/CandidateEducation';
import { CandidateEducationCard } from '@/devlink/CandidateEducationCard';
import { CandidateExperience } from '@/devlink/CandidateExperience';
import { CandidateExperienceCard } from '@/devlink/CandidateExperienceCard';
import { CandidateResumeScore } from '@/devlink/CandidateResumeScore';
import { CandidateSkill } from '@/devlink/CandidateSkill';
import { CandidateSkillPills } from '@/devlink/CandidateSkillPills';
import { DetailedFeedbackCardSmall } from '@/devlink/DetailedFeedbackCardSmall';
import { FeedbackScore } from '@/devlink/FeedbackScore';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ResumeFeedbackScore } from '@/devlink/ResumeFeedbackScore';
import { UnableFetchResume } from '@/devlink/UnableFetchResume';
import { AnalysisBlock } from '@/devlink2/AnalysisBlock';
import { BookmarkDark } from '@/devlink2/BookmarkDark';
import { ButtonWide } from '@/devlink2/ButtonWide';
import { ResAbsentError } from '@/devlink2/ResAbsentError';
import { ResumeErrorBlock } from '@/devlink2/ResumeErrorBlock';
import { ScreeningLandingPop } from '@/devlink2/ScreeningLandingPop';
import { ScrQuestionListItem } from '@/devlink2/ScrQuestionListItem';
import { SidebarAnalysisBlock } from '@/devlink2/SidebarAnalysisBlock';
import { SidebarScreening } from '@/devlink2/SidebarScreening';
import { SummaryBlock } from '@/devlink2/SummaryBlock';
import { UploadCandidateResume } from '@/devlink2/UploadCandidateResume';
import { ButtonPrimaryOutlinedRegular } from '@/devlink3/ButtonPrimaryOutlinedRegular';
import { DangerMessage } from '@/devlink3/DangerMessage';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { ResumeWrap } from '@/devlink3/ResumeWrap';
import ResumeWait from '@/public/lottie/ResumeWait';
import Loader from '@/src/components/Common/Loader';
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
import { Job } from '@/src/queries/jobs/types';
import { getFullName } from '@/src/utils/jsonResume';
// import interviewerList from '@/src/utils/interviewer_list';
import toast from '@/src/utils/toast';

// import CandidateAvatar from '../../Common/CandidateAvatar';
import CompanyLogo from '../../Common/CompanyLogo';
import { getInterviewScores } from '../../Common/InterviewScore';
// import InterviewScore, {
//   getInterviewScores,
// } from '../../Common/InterviewScore';
import ResumeScore from '../../Common/ResumeScore';
import { useKeyPress } from '../../hooks';
// import RedirectWrapper from '../../Common/Wrappers/redirectWrapper';
import { CheckIcon, FileIcon, UploadIcon } from '../../ImportManualCandidates';
import useUploadCandidate from '../../ImportManualCandidates/hooks';
import {
  capitalize,
  formatTimeStamp,
  getApplicationProcessState,
  getCandidateDetails,
  getScreeningStatus,
  handleOngoingWarning,
  mapScoreToAnalysis,
} from '../../utils';
// import ConversationCard from './ConversationCard';
import { AnalysisPillComponent, Insights, ScreeningStatusComponent } from '..';
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
  const { handleJobApplicationUpdate } = useJobApplications();
  const [drawerOpen, setDrawerOpen] = useState(open);

  const candidateImage = application ? (
    // <RedirectWrapper
    //   toast='Open application in Supabase'
    //   primaryUrl={`https://supabase.com/dashboard/project/plionpfmgvenmdwwjzac/editor/232210?filter=id:eq:${application.id}`}
    // >
    //   <CandidateAvatar application={application} fontSize={12} />
    // </RedirectWrapper>
    <Stack onClick={() => navigator.clipboard.writeText(application.id)}>
      <UserImage />
    </Stack>
  ) : (
    <></>
  );

  useEffect(() => {
    if (open) {
      setDrawerOpen(true);
      if (application.is_new)
        handleJobApplicationUpdate({ is_new: false }, application.id, true);
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
    <Drawer open={drawerOpen} anchor='right' onClose={() => handleClose()}>
      <Stack
        style={{
          width: '700px',
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
    </Drawer>
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
  const { job } = useJobDetails();
  const { views } = useJobApplications();
  const name = capitalize(
    application.candidates.first_name +
      ' ' +
      `${application.candidates.last_name || ''}`,
  );
  const creationDate = formatTimeStamp(application.applied_at);

  const jobTitle = getCandidateDetails(application, 'job_title');
  const linkedin = getCandidateDetails(application, 'linkedin');
  const location = getCandidateDetails(application, 'location');
  const firstName = getCandidateDetails(application, 'name');
  const phone = getCandidateDetails(application, 'phone');
  const email = getCandidateDetails(application, 'email');

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
  // const isPhoneScreeningPhoneCallEnabled = useFeatureFlagEnabled(
  //   'isPhoneScreeningPhoneCallEnabled',
  // );
  // const isPhoneScreeningEnabled = job.activeSections.includes(
  //   JobApplicationSections.SCREENING,
  // );

  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');

  const [tab, setTab] = useState<TabType>('Details');
  const interviewEnabled = application?.emailValidity?.isValidEmail ?? false;
  const memoDependency = JSON.stringify(views);
  const tabsList = useMemo(
    () =>
      (
        [
          'Details',
          'Screening',
          'Assessment',
          'Interview',
          'Tasks',
          'Activity',
        ] as (typeof tab)[]
      ).filter((tab) => {
        switch (tab) {
          case 'Details':
            return true;
          case 'Screening':
            return views.screening;
          case 'Assessment':
            return views.assessment;
          case 'Interview':
            return views.interview && interviewEnabled;
          case 'Tasks':
            return views.interview && interviewEnabled;
          case 'Activity':
            return false;
        }
      }),
    [tab, memoDependency, interviewEnabled],
  );

  const tabs = useMemo(
    () =>
      tabsList.map((t) => (
        <NewTabPill
          key={t}
          onClickPill={{ onClick: () => setTab(t) }}
          textLabel={t}
          isPillActive={tab === t}
        />
      )),
    [tabsList],
  );

  useEffect(() => {
    if (left) {
      setTab((prev) => {
        const position = tabsList.indexOf(prev);
        return tabsList[position === 0 ? tabsList.length - 1 : position - 1];
      });
    } else if (right) {
      setTab((prev) => {
        return tabsList[(tabsList.indexOf(prev) + 1) % tabsList.length];
      });
    }
  }, [left, right]);
  return (
    <>
      {/* <CandidateSideDrawer
        isLinkedInVisible={linkedin.valid}
        onClickLinkedin={{
          style: { cursor: 'pointer' },
          onClick: () => {
            navigator.clipboard.writeText(linkedin.value);
            toast.success('LinkedIn URL copied');
          },
        }}
        isPhoneScreeningVisible={
          isPhoneScreeningEnabled && isPhoneScreeningPhoneCallEnabled
        }
        onClickPhoneScreening={{
          onClick: () => {
            setPhonePopUp(true);
          },
        }}
        textMail={email.value}
        textPhone={phone.value}
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
        // isOverviewVisible={overview.valid}
        // isLocationRoleVisible={jobTitle.valid || location.valid}
        // isRoleVisible={jobTitle.valid}
        textRole={jobTitle.value}
        // isLocationVisible={location.valid}
        textLocation={location.value}
        isResumeVisible={
          processState !== 'unavailable' && processState !== 'fetching'
        }
        onClickResume={{ onClick: () => setOpenResume((prev) => !prev) }}
        slotBookmark={<Bookmark application={application} />}
        slotOverview={<></>}
        slotCandidateDetails={
          <Sections
            application={application}
            openResume={openResume}
            setOpenResume={setOpenResume}
            tab={tab}
            handleSelectNextApplication={handleSelectNextApplication}
            handleSelectPrevApplication={handleSelectPrevApplication}
          />
        }
        isAppliedOnVisible={true}
        textAppliedOn={creationDate}
        slotNewTabPill={tabs}
      /> */}
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

const Bookmark = ({
  application,
  dark = false,
}: {
  application: JobApplication;
  dark?: boolean;
}) => {
  const {
    setCardStates,
    cardStates: {
      checkList: { disabled, list },
      disabledList,
    },
    handleJobApplicationUpdate,
  } = useJobApplications();
  const disable =
    disabledList.has(application.id) || (disabled && list.has(application.id));
  const handleBookmark = async () => {
    if (!disable) {
      setCardStates((prev) => ({
        ...prev,
        disabledList: new Set([...prev.disabledList, application.id]),
      }));
      await handleJobApplicationUpdate(
        {
          bookmarked: !application.bookmarked,
        },
        application.id,
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
      {dark ? (
        <BookmarkDark
          isBookmarked={!!application?.bookmarked}
          onClickBookmark={{
            onClick: () => handleBookmark(),
            style: { cursor: 'pointer' },
          }}
        />
      ) : (
        <BookMark
          isBookMarked={!!application?.bookmarked}
          onClickBookmark={{
            onClick: () => handleBookmark(),
            style: { cursor: 'pointer' },
          }}
        />
      )}
    </Stack>
  );
};

// const SocialsBlock: React.FC<{ application: JobApplication }> = ({
//   application,
// }) => {
//   const linkedin = getCandidateDetails(application, 'linkedin');
//   const phone = getCandidateDetails(application, 'phone');
//   return (
//     <>
//       {linkedin.valid && (
//         <CopyWrapper content={linkedin.value}>
//           <LinkedInIcon />
//         </CopyWrapper>
//       )}
//       {phone.valid && (
//         <CopyWrapper content={phone.value}>
//           <PhoneIcon />
//         </CopyWrapper>
//       )}
//       {((application.emailValidity.isValidEmail &&
//         application?.candidates?.email) ??
//         null) && (
//         <CopyWrapper content={application.candidates.email}>
//           <EmailIcon />
//         </CopyWrapper>
//       )}
//     </>
//   );
// };

type TabType =
  | 'Details'
  | 'Screening'
  | 'Assessment'
  | 'Interview'
  | 'Tasks'
  | 'Activity';

// const Sections: React.FC<{
//   application: JobApplication;
//   openResume: boolean;
//   setOpenResume: Dispatch<SetStateAction<boolean>>;
//   handleSelectNextApplication?: () => void;
//   handleSelectPrevApplication?: () => void;
//   tab: TabType;
// }> = ({
//   application,
//   openResume,
//   setOpenResume,
//   tab,
//   handleSelectNextApplication,
//   handleSelectPrevApplication,
// }) => {
//   switch (tab) {
//     case 'Details':
//       return (
//         <NewCandidateDetails
//           application={application}
//           openResume={openResume}
//           setOpenResume={setOpenResume}
//           handleSelectNextApplication={handleSelectNextApplication}
//           handleSelectPrevApplication={handleSelectPrevApplication}
//         />
//       );
//     case 'Screening':
//       return <PhoneScreening application={application} />;
//     case 'Assessment':
//       return <AssessmentSection application={application} />;
//     case 'Interview':
//       return <IntreviewSection application={application} />;
//     case 'Tasks':
//       return <Tasks application={application} />;
//     case 'Activity':
//       return <></>;
//   }
// };

export const NewCandidateDetails: React.FC<{
  application: JobApplication;
  openResume: boolean;
  setOpenResume: Dispatch<SetStateAction<boolean>>;
  handleSelectNextApplication?: () => void;
  handleSelectPrevApplication?: () => void;
}> = ({
  application,
  openResume,
  setOpenResume,
  handleSelectNextApplication,
  handleSelectPrevApplication,
}) => {
  const overview = getCandidateDetails(application, 'overview');
  const resume = application.candidate_files?.resume_json as any;
  const validity = getApplicationProcessState(application);
  const validApplication = validity === 'processed';
  return (
    <CandidateDetails
      slotInterviewScore={
        <>
          <InsightsBlock application={application} />
          {overview.valid && (
            <OverviewBlock title={'Overview'} description={overview.value} />
          )}
          <></>
          <NewResumeSection
            application={application}
            openResume={openResume}
            setOpenResume={setOpenResume}
            handleSelectNextApplication={handleSelectNextApplication}
            handleSelectPrevApplication={handleSelectPrevApplication}
          />
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

const InsightsBlock = ({ application }: { application: JobApplication }) => {
  return (
    <Stack direction={'row'} gap={1}>
      <Insights application={application} />
    </Stack>
  );
};

// const Tasks = ({ application }: { application: JobApplication }) => {
//   const { push } = useRouter();
//   const taskCards = (application?.tasks ?? []).map((task, i) => (
//     <TaskDetailBlock
//       key={task?.id ?? i}
//       slotIcon={<TaskIcon task={task} />}
//       slotStatus={<StatusChip status={task?.status} />}
//       textDesc={task?.name}
//       textName={<TaskName task={task} />}
//     />
//   ));
//   if (taskCards.length === 0) return <EmptyState type='Tasks' />;
//   return (
//     <JobDetailInterview
//       slotNewInterviewPlanCard={taskCards}
//       textButton={'View in tasks'}
//       onClickViewScheduler={{
//         onClick: () => push(`/tasks?application_id=${application?.id ?? null}`),
//       }}
//     />
//   );
// };

// const EmptyState = ({ type }: { type: TabType }) => {
//   return (
//     <Stack width={'100%'} alignItems={'center'} justifyContent={'center'}>
//       <Stack width={'100px'}>
//         <NoApplicants />
//       </Stack>
//       <Stack>No {type} data found</Stack>
//     </Stack>
//   );
// };

// const TaskName = ({ task }: { task: JobApplication['tasks'][number] }) => {
//   const member = useTaskMember(task?.created_by);
//   const name = getFullName(member?.first_name, member?.last_name) ?? '---';
//   if (task.created_by === EmailAgentId) return <>Email Agent</>;
//   if (task.created_by === PhoneAgentId) return <>Phone Agent</>;
//   return <>{name}</>;
// };

// const TaskIcon = ({ task }: { task: JobApplication['tasks'][number] }) => {
//   if (task.created_by === EmailAgentId)
//     return (
//       <Stack
//         border={'1px solid'}
//         borderColor={'var(--neutral-6)'}
//         borderRadius={'100%'}
//         direction={'row'}
//         alignItems={'center'}
//         justifyContent={'center'}
//         width={'24px'}
//         height={'24px'}
//       >
//         <EmailAgentIcon />
//       </Stack>
//     );
//   if (task.created_by === PhoneAgentId)
//     return (
//       <Stack
//         border={'1px solid'}
//         borderColor={'var(--neutral-6)'}
//         borderRadius={'100%'}
//         direction={'row'}
//         alignItems={'center'}
//         justifyContent={'center'}
//         width={'24px'}
//         height={'24px'}
//       >
//         <PhoneAgentIcon />
//       </Stack>
//     );
//   return <TaskMemeber task={task} />;
// };

// const useTaskMember = (id: string) => {
//   const { members } = useAuthDetails();
//   const member = members.find(({ user_id }) => user_id === id);
//   return member ?? null;
// };

// const TaskMemeber = ({ task }: { task: JobApplication['tasks'][number] }) => {
//   const member = useTaskMember(task?.created_by);
//   const name = getFullName(member?.first_name, member?.last_name) ?? '---';

//   return (
//     <MuiAvatar
//       level={name}
//       src={member?.profile_image ?? null}
//       variant='rounded-small'
//     />
//   );
// };

// const IntreviewSection: React.FC<{
//   application: JobApplication;
// }> = ({ application }) => {
//   const { push } = useRouter();
//   const sessions: Parameters<typeof InterviewSessionCard>[0]['session'][] = (
//     application?.interview_session_meetings ?? []
//   ).map(
//     ({
//       interview_meeting,
//       interview_session: {
//         session_duration,
//         name,
//         schedule_type,
//         session_type,
//         location,
//       },
//     }) => {
//       const response: (typeof sessions)[number] = {
//         duration: session_duration,
//         name,
//         location,
//         scheduleType: schedule_type,
//         sessionType: session_type,
//         status: 'not_scheduled',
//         date: null,
//       };
//       if (interview_meeting) {
//         response.status = interview_meeting.status;
//         response.date = {
//           startTime: interview_meeting.start_time,
//           endTime: interview_meeting.end_time,
//         };
//       }
//       return response;
//     },
//   );

//   if (sessions.length === 0) return <EmptyState type='Interview' />;

//   const sessionCards = sessions.map((session, i) => (
//     <InterviewSessionCard key={i} session={session} />
//   ));
//   return (
//     <JobDetailInterview
//       slotNewInterviewPlanCard={sessionCards}
//       onClickViewScheduler={{
//         onClick: () =>
//           push(`/scheduling/application/${application?.id ?? null}`),
//       }}
//     />
//   );
// };

// const InterviewSessionCard = ({
//   session: { date = null, ...props },
// }: {
//   session: Omit<ScheduleProgressPillProps, 'position'> & { location: string };
// }) => {
//   const isScheduleDate =
//     (props.status === 'completed' || props.status === 'confirmed') && !!date;
//   const scheduleDate = getScheduleDate(date);
//   const backgroundColor = getScheduleBgcolor(props.status);
//   const scheduleType = getScheduleType(props.scheduleType);
//   const duration = getBreakLabel(props.duration);
//   return (
//     <NewInterviewPlanCard
//       slotPlatformIcon={<IconScheduleType type={props.scheduleType} />}
//       isTimeVisible={isScheduleDate}
//       textMeetingPlatform={scheduleType}
//       textLocation={props.location ?? '---'}
//       textMeetingTitle={props.name}
//       textTime={duration}
//       textDate={scheduleDate}
//       propsBgColorStatus={{
//         style: {
//           backgroundColor,
//         },
//       }}
//       slotStatus={
//         <StatusBadge
//           isCancelledVisible={props.status === 'cancelled'}
//           isConfirmedVisible={props.status === 'confirmed'}
//           isWaitingVisible={props.status === 'waiting'}
//           isCompletedVisible={props.status === 'completed'}
//           isNotScheduledVisible={props.status === 'not_scheduled' || false}
//         />
//       }
//       isPanelIconVisible={props.sessionType === 'panel'}
//       isOnetoOneIconVisible={props.sessionType === 'individual'}
//       isDebriefIconVisible={props.sessionType === 'debrief'}
//       isLocationVisible={props.scheduleType === 'in_person_meeting'}
//       isDurationVisible={!!duration}
//       textDuration={duration}
//       isNotScheduledIconVisible={false}
//       isDateVisible={false}
//       isScheduleNowButtonVisible={false}
//       isCheckboxVisible={false}
//       isSelected={false}
//       isThreeDotVisible={false}
//       onClickCard={null}
//       onClickDots={null}
//       textDay={null}
//       textMonth={null}
//       slotCheckbox={<></>}
//       slotEditOptionModule={<></>}
//       slotScheduleNowButton={<></>}
//     />
//   );
// };

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
      // slotPill={<ResumeScore application={application} />}
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

// const AssessmentSection: React.FC<{
//   application: JobApplication;
// }> = ({ application }) => {
//   const { isNotInvited, isPending, isSubmitted } = getAssessmentStatus(
//     application.status_emails_sent,
//     getSafeAssessmentResult(application?.assessment_results),
//   );
//   if (isNotInvited)
//     return <NewInterviewStatus application={application} pending={false} />;
//   if (isPending)
//     return <NewInterviewStatus application={application} pending={true} />;
//   if (isSubmitted) return <InterviewScoreDetails application={application} />;
// };

// const NewInterviewStatus = ({
//   application,
//   pending,
// }: {
//   application: JobApplication;
//   pending: boolean;
// }) => {
//   const {
//     section,
//     handleJobApplicationSectionUpdate,
//     setCardStates,
//     cardStates: {
//       checkList: { disabled, list },
//       disabledList,
//     },
//   } = useJobApplications();
//   const [collapse, setCollapse] = useState(false);
//   const status = {
//     text: pending ? 'Invited' : 'Pending Invite',
//     description: pending
//       ? 'The candidate has received an assessment invitation but has not yet taken the assessment.'
//       : 'The candidate has not been invited for assesment yet. ',
//     btnText: pending ? 'Resend link' : 'Invite now',
//   };
//   const disable =
//     disabledList.has(application.id) || (disabled && list.has(application.id));
//   const handleInvite = async () => {
//     if (!disable) {
//       const purpose = pending ? 'interview_resend' : 'interview';
//       setCardStates((prev) => ({
//         ...prev,
//         disabledList: new Set([...prev.disabledList, application.id]),
//       }));
//       await handleJobApplicationSectionUpdate(
//         {
//           source: section,
//           destination: null,
//         },
//         null,
//         [purpose],
//         new Set([application.id]),
//       );
//       setCardStates((prev) => {
//         return {
//           ...prev,
//           disabledList: new Set(
//             [...prev.disabledList].filter((e) => e === application.id),
//           ),
//         };
//       });
//     } else {
//       handleOngoingWarning();
//     }
//   };
//   return (
//     <Stack
//       key={application.id}
//       style={{
//         opacity: disable ? 0.4 : 1,
//         transition: '0.5s',
//         pointerEvents: disable ? 'none' : 'auto',
//       }}
//     >
//       <InterviewResultStatus
//         slotAssessmentScore={
//           <InterviewScore key={application.id} application={application} />
//         }
//         slotAssessmentInvite={
//           <Collapse in={collapse}>
//             <Stack marginTop={'10px'}>
//               <AssessmentInvite
//                 textDescription={status.description}
//                 onClickCopyInterviewLink={{
//                   onClick: () => {
//                     navigator.clipboard
//                       .writeText(
//                         `${process.env.NEXT_PUBLIC_HOST_NAME}${ROUTES['/candidate-assessment/']()}/${application.id}`,
//                       )
//                       .then(() => {
//                         toast.success('Interview link copied.');
//                       });
//                   },
//                 }}
//                 slotResendButton={
//                   <ButtonPrimaryOutlinedRegular
//                     buttonText={status.btnText}
//                     buttonProps={{ onClick: async () => await handleInvite() }}
//                   />
//                 }
//               />
//             </Stack>
//           </Collapse>
//         }
//         onClickIcons={{
//           onClick: () => setCollapse((prev) => !prev),
//           style: {
//             cursor: 'pointer',
//             transform: `rotate(${collapse ? '0deg' : '180deg'})`,
//           },
//         }}
//       />
//     </Stack>
//   );
// };

// const InterviewScoreDetails: React.FC<{ application: JobApplication }> = ({
//   application,
// }) => {
//   const {
//     assessments: {
//       data: { jobAssessments },
//     },
//   } = useJobDetails();
//   const result = getInterviewScores(application, jobAssessments);
//   const [collapse, setCollapse] = useState(false);
//   const interviewScore = <InterviewScore application={application} />;
//   return (
//     <CandidateInterviewScore
//       slotAssessmentScore={interviewScore}
//       onClickIcons={{
//         onClick: () => setCollapse((prev) => !prev),
//         style: {
//           cursor: 'pointer',
//           transform: `rotate(${collapse ? '0deg' : '180deg'})`,
//         },
//       }}
//       slotInterviewFeedbackScore={
//         result && (
//           <Collapse in={collapse}>
//             <Stack gap={'12px'} marginTop={'12px'}>
//               <InterviewResultParams resultParamsObj={result} />
//             </Stack>
//           </Collapse>
//         )
//       }
//     />
//   );
// };

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
  handleSelectNextApplication?: () => void;
  handleSelectPrevApplication?: () => void;
}> = ({
  application,
  openResume,
  setOpenResume,
  handleSelectNextApplication,
  handleSelectPrevApplication,
}) => {
  const { job } = useJobApplications();
  const [upload, setUpload] = useState(false);
  return (
    <>
      <ResumeViewer
        application={application}
        openResume={openResume}
        setOpenResume={setOpenResume}
        handleSelectNextApplication={handleSelectNextApplication}
        handleSelectPrevApplication={handleSelectPrevApplication}
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
            <ButtonSolid
              textButton='Upload'
              size={2}
              onClickButton={{
                onClick: async () => await handleSubmit(),
              }}
            />
          </Stack>
        }
        slotDrag={
          <FileUploader handleChange={(e) => setResume(e)} types={fileTypes}>
            <Stack
              sx={{
                border: '1px dashed',
                borderColor: 'var(--accent-6)',
                borderRadius: 1,
                py: 'var(--space-6)',
                px: 'var(--space-5)',
                cursor: 'pointer',
                background: 'var(--neutral-2)',
              }}
              direction='row'
              spacing={'var(--space-2)'}
              alignItems={'center'}
              justifyContent={'center'}
            >
              {resume ? <FileIcon /> : <UploadIcon />}
              <Typography
                variant='body1'
                sx={{ textAlgin: 'center' }}
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
  handleSelectNextApplication?: () => void;
  handleSelectPrevApplication?: () => void;
}> = ({
  application,
  openResume,
  setOpenResume,
  handleSelectNextApplication,
  handleSelectPrevApplication,
}) => {
  const name = getCandidateDetails(application, 'name');
  return (
    <Dialog
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: '0px !important',
          border: 'none !important',
          backgroundColor: '#343639',
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
      <ResumeWrap
        key={application?.id}
        textName={name.value}
        onClickDown={{ onClick: () => handleSelectNextApplication() }}
        slotBookmark={<Bookmark application={application} dark={true} />}
        onClickUp={{ onClick: () => handleSelectPrevApplication() }}
        onClickClose={{ onClick: () => setOpenResume(false) }}
        slotResume={
          <Stack
            direction={'row'}
            justifyContent={'center'}
            height={'85vh'}
            position={'relative'}
          >
            <Stack
              width={'100%'}
              height={'100%'}
              position={'absolute'}
              zIndex={1}
            >
              <ResumePreviewer url={application.candidate_files?.file_url} />
            </Stack>
            <Stack
              position={'absolute'}
              width={'100%'}
              height={'100%'}
              display={'flex'}
              alignItems={'center'}
              justifyContent={'center'}
              zIndex={0}
            >
              <Loader />
            </Stack>
          </Stack>
        }
      />
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
    cardStates: {
      disabledList,
      checkList: { list, disabled },
    },
  } = useJobApplications();

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
            <ButtonOutlined
              color={'neutral'}
              size={2}
              textButton={status.btnText}
              onClickButton={{ onClick: async () => await handleInvite() }}
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

const UserImage = () => {
  return (
    <GlobalIcon iconName='account_circle' />
    // <svg
    //   width='20'
    //   height='20'
    //   viewBox='0 0 24 24'
    //   fill='none'
    //   xmlns='http://www.w3.org/2000/svg'
    // >
    //   <rect
    //     x='0.25'
    //     y='0.25'
    //     width='23.5'
    //     height='23.5'
    //     rx='11.75'
    //     fill='#F8F9F9'
    //   ></rect>
    //   <rect
    //     x='0.25'
    //     y='0.25'
    //     width='23.5'
    //     height='23.5'
    //     rx='11.75'
    //     stroke='#D8DCDE'
    //     stroke-width='0.5'
    //   ></rect>
    //   <path
    //     d='M12 12C11.4531 12 10.9531 11.8672 10.5 11.6016C10.0469 11.3359 9.67969 10.9688 9.39844 10.5C9.13281 10.0312 9 9.53125 9 9C9 8.46875 9.13281 7.96875 9.39844 7.5C9.67969 7.03125 10.0469 6.66406 10.5 6.39844C10.9531 6.13281 11.4531 6 12 6C12.5469 6 13.0469 6.13281 13.5 6.39844C13.9531 6.66406 14.3203 7.03125 14.6016 7.5C14.8672 7.96875 15 8.46875 15 9C15 9.53125 14.8672 10.0312 14.6016 10.5C14.3203 10.9688 13.9531 11.3359 13.5 11.6016C13.0469 11.8672 12.5469 12 12 12ZM10.9219 13.125H13.0781C14.25 13.1562 15.2344 13.5625 16.0312 14.3438C16.8125 15.1406 17.2188 16.125 17.25 17.2969C17.25 17.5 17.1797 17.6641 17.0391 17.7891C16.9141 17.9297 16.75 18 16.5469 18H7.45312C7.25 18 7.08594 17.9297 6.96094 17.7891C6.82031 17.6641 6.75 17.5 6.75 17.2969C6.78125 16.125 7.1875 15.1406 7.96875 14.3438C8.76562 13.5625 9.75 13.1562 10.9219 13.125Z'
    //     fill='#68737D'
    //   ></path>
    // </svg>
  );
};
