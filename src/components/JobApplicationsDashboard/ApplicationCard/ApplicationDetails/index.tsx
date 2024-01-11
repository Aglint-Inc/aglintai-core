/* eslint-disable no-unused-vars */
/* eslint-disable security/detect-object-injection */
import { Dialog, Stack } from '@mui/material';
import axios from 'axios';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';

import {
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
  ResAbsentError,
  ResumeErrorBlock,
  ResumeErrorBlock2,
  SelectActionsDropdown,
  SidebarScreening,
} from '@/devlink2';
import { ButtonPrimaryOutlinedRegular } from '@/devlink3';
import CustomProgress from '@/src/components/Common/CustomProgress';
import ResumeWait from '@/src/components/Common/Lotties/ResumeWait';
import ScoreWheel, {
  scoreWheelDependencies,
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import { SmallCircularScore2 } from '@/src/components/Common/SmallCircularScore';
// import { PhoneScreeningResponseType } from '@/src/components/KnockOffQns/ScreeningCtxProvider';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import { JobTypeDashboard } from '@/src/context/JobsContext/types';
import { JobType } from '@/src/types/data.types';
import interviewerList from '@/src/utils/interviewer_list';
import { pageRoutes } from '@/src/utils/pageRouting';
import toast from '@/src/utils/toast';

import ConversationCard from './ConversationCard';
import ResumePreviewer from './ResumePreviewer';
import { applicationValidity } from '../utils';
import CandidateAvatar from '../../Common/CandidateAvatar';
import CompanyLogo from '../../Common/CompanyLogo';
import { useKeyPress } from '../../hooks';
// import { emailHandler, MoveCandidateDialog } from '../../MoveCandidateDialog';
import {
  ApiLogState,
  capitalize,
  formatTimeStamp,
  getCandidateName,
  getInterviewScore,
  intactConditionFilter,
} from '../../utils';

const ApplicationDetails = ({
  open,
  onClose,
  applications,
  handleSelectNextApplication,
  handleSelectPrevApplication,
  jobUpdate,
  setJobUpdate,
}: {
  open: boolean;
  onClose: () => void;
  applications: JobApplication;
  handleSelectNextApplication?: () => void;
  handleSelectPrevApplication?: () => void;
  jobUpdate: boolean;
  setJobUpdate: Dispatch<SetStateAction<boolean>>;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(open);
  const [openFeedback, setOpenFeedback] = useState(false);

  const copyAppId = () => {
    navigator.clipboard.writeText(applications.id).then(() => {
      toast.success('Application ID copied');
    });
  };

  const candidateImage = applications ? (
    <Stack onClick={() => copyAppId()} style={{ cursor: 'pointer' }}>
      <CandidateAvatar application={applications} fontSize={12} />
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
    if (applications === undefined) {
      setDrawerOpen(false);
      onClose();
    }
  }, [applications === undefined]);

  const handleClose = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <Stack
      style={{
        display: open && applications ? 'flex' : 'none',
        transition: '0.4s',
        width: drawerOpen ? '420px' : '0px',
        pointerEvents: drawerOpen ? 'auto' : 'none',
        overflow: drawerOpen ? 'visible' : 'auto',
      }}
    >
      {applications ? (
        !openFeedback ? (
          <NewJobApplicationSideDrawer
            open={open}
            applications={applications}
            onClose={() => handleClose()}
            setOpenFeedback={setOpenFeedback}
            candidateImage={candidateImage}
            handleSelectNextApplication={handleSelectNextApplication}
            handleSelectPrevApplication={handleSelectPrevApplication}
            jobUpdate={jobUpdate}
            setJobUpdate={setJobUpdate}
          />
        ) : (
          <NewDetailedFeedback
            applications={applications}
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
  applications,
  candidateImage,
  onClose,
}: {
  applications: JobApplication;
  candidateImage: React.JSX.Element;
  onClose: () => void;
}) => {
  return (
    <InterviewDetailedFeedback
      onClickClose={{
        onClick: () => {
          onClose();
        },
      }}
      slotCandidateImage={candidateImage}
      textName={getCandidateName(
        applications.candidates.first_name,
        applications.candidates.last_name,
      )}
      textMail={
        applications.candidates.email ? applications.candidates.email : '--'
      }
      slotDetailedFeedback={
        <DetailedInterviewFeedbackParams
          feedbackParamsObj={applications.assessment_results.feedback}
        />
      }
      slotTranscript={
        <TranscriptParams
          feedbackParams={applications.assessment_results.conversation}
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
  open,
  applications,
  onClose,
  setOpenFeedback,
  candidateImage,
  handleSelectNextApplication,
  handleSelectPrevApplication,
  jobUpdate,
  setJobUpdate,
}: {
  open: boolean;
  applications: JobApplication;
  onClose: () => void;
  setOpenFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  candidateImage: React.JSX.Element;
  handleSelectNextApplication: () => void;
  handleSelectPrevApplication: () => void;
  jobUpdate: boolean;
  setJobUpdate: Dispatch<SetStateAction<boolean>>;
}) => {
  const { section } = useJobApplications();
  const name = capitalize(
    applications.candidates.first_name +
      ' ' +
      `${applications.candidates.last_name || ''}`,
  );
  const creationDate = formatTimeStamp(applications.applied_at);
  const { pressed: shift } = useKeyPress('Shift');
  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');
  const leftShift = shift && left;
  const rightShift = shift && right;
  const overview =
    (applications?.candidate_files?.resume_json as any)?.overview ?? null;
  const handleProfileRedirect = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.ProfileLink}/${applications.id}`,
      '_blank',
    );
  };
  const handleLinkedInRedirect = () => {
    window.open(applications.candidates.linkedin, '_blank');
  };
  const handleCopy = (str: string, tag: 'Phone number' | 'Email') => {
    navigator.clipboard.writeText(str).then(() => {
      toast.success(`${tag} copied to clipboard`);
    });
  };
  useEffect(() => {
    if (open) {
      if (leftShift) {
        handleSelectPrevApplication();
      } else if (rightShift) {
        handleSelectNextApplication();
      }
    }
  }, [leftShift, rightShift]);

  // console.log(applications.status_emails_sent);

  const { isPhoneScreeningInvited = false } =
    applications.status_emails_sent as any;
  // const {} = applications.
  return (
    <CandidateSideDrawer
      onClickPrev={{ onClick: () => handleSelectPrevApplication() }}
      onClickNext={{ onClick: () => handleSelectNextApplication() }}
      onClickCopyProfile={{
        onClick: () => handleProfileRedirect(),
        style: {
          WebkitUserSelect: 'none',
          MozUserSelect: 'none',
          msUserSelect: 'none',
        },
      }}
      onClickClose={{
        onClick: () => onClose(),
      }}
      slotCandidateImage={candidateImage}
      textName={name}
      textMail={
        applications.candidates.email ? applications.candidates.email : '--'
      }
      textOverviewDesc={overview}
      slotCandidateDetails={
        <>
          <NewCandidateDetails
            applications={applications}
            setOpenFeedback={setOpenFeedback}
          />
        </>
      }
      isOverviewVisible={overview}
      isLinkedInVisible={
        applications.candidates.linkedin !== null &&
        applications.candidates.linkedin !== ''
      }
      onClickLinkedin={{
        onClick: () => handleLinkedInRedirect(),
      }}
      isMailIconVisible={
        applications.candidates.email &&
        applications.candidates.email.trim() !== ''
      }
      isPhoneIconVisible={
        applications.candidates.phone &&
        applications.candidates.phone.trim() !== ''
      }
      onClickCopyMail={{
        onClick: () =>
          handleCopy(applications.candidates.email.trim(), 'Email'),
      }}
      onClickCopyPhone={{
        onClick: () =>
          handleCopy(applications.candidates.phone.trim(), 'Phone number'),
      }}
      // slotMoveTo={
      //   <MoveCandidatePopUp
      //     section={section}
      //     id={applications.application_id}
      //     name={name}
      //     candidate={applications.candidates}
      //     emails={applications.emails}
      //     jobUpdate={jobUpdate}
      //     setJobUpdate={setJobUpdate}
      //   />
      // }
      textAppliedOn={creationDate}
      isAppliedOnVisible={true}
    />
  );
};

const NewCandidateDetails = ({
  applications,
  setOpenFeedback,
}: {
  applications: JobApplication;
  setOpenFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { job } = useJobApplications();
  const resume = applications.candidate_files?.resume_json as any;
  return (
    <CandidateDetails
      slotInterviewScore={
        <>
          <NewResumeSection applications={applications} job={job} />
          <PhoneScreeningSection />
          <>
            {applications.assessment_results?.feedback ? (
              <NewInterviewScoreDetails
                applications={applications}
                setOpenFeedback={setOpenFeedback}
              />
            ) : applications.status === 'assessment' ? (
              <NewInterviewStatus applications={applications} job={job} />
            ) : (
              <></>
            )}
          </>
          {applicationValidity(applications) ? (
            <>
              {resume.positions &&
              resume.positions instanceof Array &&
              resume.positions.length !== 0 ? (
                <NewExperienceDetails
                  positions={resume.positions}
                  relevance={
                    (applications.score_json as ScoreJson)?.relevance?.positions
                  }
                />
              ) : (
                <></>
              )}
              {resume.schools &&
              resume.schools instanceof Array &&
              resume.schools.length !== 0 ? (
                <NewEducationDetails
                  schools={resume.schools}
                  relevance={
                    (applications.score_json as ScoreJson)?.relevance?.schools
                  }
                />
              ) : (
                <></>
              )}
              {resume.skills &&
              resume.skills instanceof Array &&
              resume.skills.length !== 0 ? (
                <NewSkillDetails
                  skills={resume.skills}
                  relevance={
                    (applications.score_json as ScoreJson)?.relevance?.skills
                  }
                />
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      }
    />
  );
};

const NewInterviewStatus = ({
  applications,
  job,
}: {
  applications: JobApplication;
  job: JobType;
}) => {
  const [loading, setLoading] = useState(false);
  const invited =
    applications.status_emails_sent[JobApplicationSections.ASSESSMENT] ?? false;
  const status = {
    bgColor: invited ? '#CEE2F2' : '#FFF7ED',
    text: invited ? 'Invited' : 'Pending Invite',
    color: invited ? '#0F3554' : '#703815',
    description: invited
      ? 'Candidate has been invited to take the interview.'
      : 'Candidate has not been invited to take the interview.',
    btnText: invited ? 'Resend link' : 'Invite now',
  };
  const handleSendLink = async () => {
    setLoading(true);
    const confirmation = true;
    if (confirmation) toast.success('Mail sent successfully');
    else toast.error('Mail not sent');
    setLoading(false);
  };
  return (
    <Stack
      style={{
        opacity: loading ? 0.4 : 1,
        transition: '0.5s',
        pointerEvents: loading ? 'none' : 'auto',
      }}
    >
      <InterviewResultStatus
        bgColorInterviewTag={{ style: { backgroundColor: status.bgColor } }}
        textStatus={status.text}
        colorPropsTextStatus={{ style: { color: status.color } }}
        textDescription={status.description}
        onClickCopyInterviewLink={{
          onClick: () => {
            navigator.clipboard
              .writeText(
                `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.MOCKTEST}?id=${applications.id}`,
              )
              .then(() => {
                toast.success('Interview link copied');
              });
          },
        }}
        slotResendButton={
          <ButtonPrimaryOutlinedRegular
            buttonText={status.btnText}
            buttonProps={{ onClick: async () => await handleSendLink() }}
          />
        }
      />
    </Stack>
  );
};

const NewInterviewScoreDetails = ({ applications, setOpenFeedback }) => {
  const interviewScore = getInterviewScore(applications.feedback);
  const feedbackObj = giveRateInWordToResume(interviewScore);
  return (
    <CandidateInterviewScore
      textScore={`${interviewScore}/100`}
      textInterviewScoreState={
        <Stack style={{ color: feedbackObj.color }}>{feedbackObj.text}</Stack>
      }
      propsBgColorScore={{ style: { backgroundColor: feedbackObj.bgColor } }}
      propsTextColor={{ style: { color: feedbackObj.color } }}
      onClickDetailedFeedback={{
        onClick: () => setOpenFeedback(true),
      }}
      slotInterviewFeedbackScore={
        applications.feedback && (
          <InterviewFeedbackParams feedbackParamsObj={applications.feedback} />
        )
      }
    />
  );
};

const NewResumeSection = ({
  applications,
  job,
}: {
  applications: JobApplication;
  job: JobTypeDashboard;
}) => {
  const [openResume, setOpenResume] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    if (!downloading) {
      setDownloading(true);
      await fetchFile(applications);
      setDownloading(false);
    }
  };
  return (
    <>
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
          <ResumePreviewer url={applications.candidate_files?.file_url} />
        </Stack>
      </Dialog>
      {applications.score_json || applications.candidate_files?.file_url ? (
        intactConditionFilter(applications) !== ApiLogState.PROCESSING ? (
          applications.score_json ? (
            <NewResumeScoreDetails
              applications={applications}
              job={job}
              feedback={false}
              setOpenResume={setOpenResume}
            />
          ) : (
            <UnableFetchResume
              propsLink={{ href: applications.candidate_files.file_url }}
              onClickViewResume={{
                onClick: () => {
                  setOpenResume(true);
                },
              }}
              onClickDownloadResume={{
                onClick: async () => await handleDownload(),
              }}
            />
          )
        ) : (
          <ResumeErrorBlock
            slotLottie={<ResumeWait />}
            onclickView={{ onClick: () => setOpenResume(true) }}
          />
        )
      ) : applications.is_resume_fetching ? (
        <ResumeErrorBlock2 slotLottie={<ResumeWait />} />
      ) : (
        <ResAbsentError />
      )}
    </>
  );
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
  applications,
  job,
  feedback,
  setOpenResume,
}: {
  applications: JobApplication;
  job: JobTypeDashboard;
  feedback: JobApplication['assessment_results']['feedback'];
  setOpenResume?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const jdScoreObj = (applications.score_json as ScoreJson)?.scores;
  const score = applications.overall_score;
  const [downloading, setDownloading] = useState(false);
  const handleDownload = async () => {
    if (!downloading) {
      setDownloading(true);
      await fetchFile(applications);
      setDownloading(false);
    }
  };
  const resumeScoreWheel = (
    <ScoreWheel
      id={`ScoreWheelApplicationCard${Math.random()}`}
      scores={(applications.score_json as ScoreJson)?.scores}
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
        },
      }}
      onClickDownloadResume={{
        onClick: async () => await handleDownload(),
      }}
      propsLink={{ href: applications.candidate_files.file_url }}
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

const PhoneScreeningSection = () => {
  return (
    <SidebarScreening
      isPending={false}
      isSubmitted={false}
      isNotInvited={true}
    />
  );
};

const fetchFile = async (applications: JobApplication) => {
  await axios({
    url: applications?.candidate_files.file_url ?? '#',
    method: 'GET',
    responseType: 'blob',
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    const ext = applications.candidate_files.file_url.slice(
      applications.candidate_files.file_url.lastIndexOf('.'),
    );
    link.setAttribute(
      'download',
      `${applications.candidates.first_name}_${
        applications.candidates.last_name
      }_Resume${ext ?? '.pdf'}`,
    );
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
    link.parentNode.removeChild(link);
  });
};

const NewEducationDetails = ({
  schools,
  relevance,
}: {
  schools;
  relevance: ScoreJson['relevance']['schools'];
}) => {
  const educationList =
    Array.isArray(schools) &&
    schools
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
  return <CandidateEducation slotEducationCard={<>{educationList}</>} />;
};

const NewExperienceDetails = ({
  positions,
  relevance,
}: {
  positions;
  relevance: ScoreJson['relevance']['positions'];
}) => {
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
          isBadgeVisible={relevance && relevance[i] && relevance[i] === 'high'}
        />,
      );
    }
    return acc;
  }, []);
  return workList.length !== 0 ? (
    <CandidateExperience slotCandidateExperienceCard={<>{workList}</>} />
  ) : (
    <></>
  );
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
}: {
  skills;
  relevance: ScoreJson['relevance']['skills'];
}) => {
  if (!relevance) {
    const skillList = skills
      .filter((s) => s !== null && s !== '')
      .map((s, i) => <CandidateSkillPills key={i} textSkill={s} />);
    return (
      <CandidateSkill
        slotOtherSkill={<>{skillList}</>}
        isNumberVisible={false}
      />
    );
  }
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
  const relevanceCount = relevant.length;
  const otherCount = others.length;
  return (
    <CandidateSkill
      slotCandidateSkill={relevanceCount !== 0 ? relevant : null}
      textSkillCount={relevanceCount}
      isNumberVisible={relevanceCount !== 0}
      slotOtherSkill={otherCount !== 0 ? others : null}
    />
  );
};

export function Transcript({
  applications,
  setOpenDetailedFeedback,
  hideFeedback,
}: {
  applications: JobApplication;
  setOpenDetailedFeedback: React.Dispatch<React.SetStateAction<boolean>>;
  hideFeedback: boolean;
}) {
  const feedback = applications.assessment_results.feedback as any[];
  return (
    <DetailedFeedback
      slotTranscript={
        <>
          {applications.assessment_results.conversation?.map((ele: any, i) => {
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
                    roleImage={applications.candidates.avatar}
                    roleName={applications.candidates.first_name}
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
