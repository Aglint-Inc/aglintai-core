import { Dialog, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
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
  // InterviewResult,
  // InterviewResultStatus,
  // JobDetailsSideDrawer,
  ResumeFeedbackScore,
  UnableFetchResume,
  // ResumeResult,
} from '@/devlink';
import { ButtonPrimaryOutlinedRegular } from '@/devlink3';
// import AUIButton from '@/src/components/Common/AUIButton';
import CustomProgress from '@/src/components/Common/CustomProgress';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import ScoreWheel, {
  getOverallScore,
  scoreWheelDependencies,
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import { SmallCircularScore2 } from '@/src/components/Common/SmallCircularScore';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
import {
  JobApplication,
  JobApplicationSections,
} from '@/src/context/JobApplicationsContext/types';
import { JobType } from '@/src/types/data.types';
// import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import interviewerList from '@/src/utils/interviewer_list';
import { pageRoutes } from '@/src/utils/pageRouting';
import { calculateOverallScore } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

import ConversationCard from './ConversationCard';
import ResumePreviewer from './ResumePreviewer';
import { getGravatar } from '..';
import { emailHandler } from '../..';
import CompanyLogo from '../../Common/CompanyLogo';
import { useKeyPress } from '../../hooks';
// import { sendEmails } from '../..';
// import InterviewScoreCard from '../../Common/InreviewScoreCard';
import { capitalize, getInterviewScore } from '../../utils';

const ApplicationDetails = ({
  open,
  onClose,
  applicationDetails,
  handleSelectNextApplication,
  handleSelectPrevApplication,
}: {
  open: boolean;
  onClose: () => void;
  applicationDetails: JobApplication;
  handleSelectNextApplication?: () => void;
  handleSelectPrevApplication?: () => void;
}) => {
  const [drawerOpen, setDrawerOpen] = useState(open);
  const [openFeedback, setOpenFeedback] = useState(false);

  const candidateImage = applicationDetails ? (
    <MuiAvatar
      level={applicationDetails.first_name}
      src={
        !applicationDetails.profile_image
          ? getGravatar(
              applicationDetails.email,
              applicationDetails?.first_name,
            )
          : applicationDetails.profile_image
      }
      variant={'rounded'}
      width={'100%'}
      height={'100%'}
      fontSize={'28px'}
    />
  ) : (
    <></>
  );

  useEffect(() => {
    if (open) {
      setDrawerOpen(true);
    }
  }, [open]);

  useEffect(() => {
    if (applicationDetails === undefined) {
      setDrawerOpen(false);
      onClose();
    }
  }, [applicationDetails === undefined]);

  const handleClose = () => {
    setDrawerOpen(false);
    setTimeout(() => {
      onClose();
    }, 400);
  };

  return (
    <Stack
      style={{
        display: applicationDetails ? 'flex' : 'none',
        transition: '0.4s',
        width: drawerOpen ? '420px' : '0px',
        pointerEvents: drawerOpen ? 'auto' : 'none',
      }}
    >
      {applicationDetails ? (
        !openFeedback ? (
          <NewJobApplicationSideDrawer
            open={open}
            applicationDetails={applicationDetails}
            onClose={() => handleClose()}
            setOpenFeedback={setOpenFeedback}
            candidateImage={candidateImage}
            handleSelectNextApplication={handleSelectNextApplication}
            handleSelectPrevApplication={handleSelectPrevApplication}
          />
        ) : (
          <NewDetailedFeedback
            applicationDetails={applicationDetails}
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
  applicationDetails,
  candidateImage,
  onClose,
}) => {
  return (
    <InterviewDetailedFeedback
      onClickClose={{
        onClick: () => {
          onClose();
        },
      }}
      slotCandidateImage={candidateImage}
      textName={capitalize(
        applicationDetails?.first_name + ' ' + applicationDetails?.last_name,
      )}
      textMail={applicationDetails.email ? applicationDetails.email : '--'}
      slotDetailedFeedback={
        <DetailedInterviewFeedbackParams
          feedbackParamsObj={applicationDetails.feedback}
        />
      }
      slotTranscript={
        <TranscriptParams
          feedbackParams={applicationDetails.conversation}
          candidateImage={candidateImage}
        />
      }
    />
  );
};

const TranscriptParams = ({ feedbackParams, candidateImage }) => {
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

export const DetailedInterviewFeedbackParams = ({ feedbackParamsObj }) => {
  return feedbackParamsObj.map((f, i) => {
    const color =
      f.rating > 33 ? (f.rating > 66 ? '#228F67' : '#F79A3E') : '#D93F4C';
    const circularScore = (
      <Stack style={{ transform: 'scale(0.3)' }}>
        <SmallCircularScore2 finalScore={f.rating} triggerAnimation={false} />
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
  applicationDetails,
  onClose,
  setOpenFeedback,
  candidateImage,
  handleSelectNextApplication,
  handleSelectPrevApplication,
}) => {
  const [copy, setCopy] = useState(false);
  const { pressed: shift } = useKeyPress('Shift');
  const { pressed: right } = useKeyPress('ArrowRight');
  const { pressed: left } = useKeyPress('ArrowLeft');
  const leftShift = shift && left;
  const rightShift = shift && right;
  useEffect(() => {
    if (open) {
      if (leftShift) {
        handleSelectPrevApplication();
      } else if (rightShift) {
        handleSelectNextApplication();
      }
    }
  }, [leftShift, rightShift]);
  return (
    <CandidateSideDrawer
      onClickPrev={{ onClick: () => handleSelectPrevApplication() }}
      onClickNext={{ onClick: () => handleSelectNextApplication() }}
      onClickCopyProfile={{
        onClick: () => {
          navigator.clipboard
            .writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.ProfileLink}/${applicationDetails.application_id}`,
            )
            .then(() => {
              setCopy(true);
              setTimeout(() => {
                setCopy(false);
              }, 1000);
            });
        },
      }}
      onClickClose={{
        onClick: () => onClose(),
      }}
      slotCandidateImage={candidateImage}
      textName={capitalize(
        applicationDetails?.first_name + ' ' + applicationDetails?.last_name,
      )}
      textMail={applicationDetails?.email ? applicationDetails.email : '--'}
      textOverviewDesc={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
      slotCandidateDetails={
        <NewCandidateDetails
          applicationDetails={applicationDetails}
          setOpenFeedback={setOpenFeedback}
        />
      }
      isOverviewVisible={false}
      isLinkedInVisible={applicationDetails.linkedin !== null}
      isCopiedMessageVisible={copy}
    />
  );
};

const NewCandidateDetails = ({ applicationDetails, setOpenFeedback }) => {
  const { job } = useJobApplications();
  return (
    <CandidateDetails
      slotInterviewScore={
        <>
          <>
            {applicationDetails.feedback ? (
              <NewInterviewScoreDetails
                applicationDetails={applicationDetails}
                setOpenFeedback={setOpenFeedback}
              />
            ) : applicationDetails.status ===
              JobApplicationSections.INTERVIEWING ? (
              <NewInterviewStatus
                applicationDetails={applicationDetails}
                job={job}
              />
            ) : (
              <></>
            )}
            <NewResumeSection
              applicationDetails={applicationDetails}
              job={job}
            />
          </>
          {applicationDetails.json_resume ? (
            <>
              {applicationDetails.json_resume.education &&
              applicationDetails.json_resume.education.length !== 0 ? (
                <NewEducationDetails
                  education={applicationDetails.json_resume.education}
                />
              ) : (
                <></>
              )}
              {applicationDetails.json_resume.work &&
              applicationDetails.json_resume.work.length !== 0 ? (
                <NewExperienceDetails
                  work={applicationDetails.json_resume.work}
                />
              ) : (
                <></>
              )}

              {applicationDetails.json_resume.skills &&
              applicationDetails.json_resume.skills.length !== 0 ? (
                <NewSkillDetails
                  skills={applicationDetails.json_resume.skills}
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
  applicationDetails,
  job,
}: {
  applicationDetails: JobApplication;
  job: JobType;
}) => {
  const { handleJobApplicationUpdate } = useJobApplications();
  const [loading, setLoading] = useState(false);
  const invited = applicationDetails.emails['interviewing'] ?? false;
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
    const confirmation = await emailHandler(
      {
        email: applicationDetails.email,
        first_name: applicationDetails.first_name,
        last_name: applicationDetails.last_name,
        job_title: job.job_title,
        company: job.company,
        application_id: applicationDetails.application_id,
        emails: applicationDetails.emails,
      },
      job,
      handleJobApplicationUpdate,
      JobApplicationSections.INTERVIEWING,
    );
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
                `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.INTERVIEW}?id=${applicationDetails.application_id}`,
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

const NewInterviewScoreDetails = ({ applicationDetails, setOpenFeedback }) => {
  const interviewScore = getInterviewScore(applicationDetails.feedback);
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
        applicationDetails.feedback && (
          <InterviewFeedbackParams
            feedbackParamsObj={applicationDetails.feedback}
          />
        )
      }
    />
  );
  // return circularScore;
};

const NewResumeSection = ({ applicationDetails, job }) => {
  const [openResume, setOpenResume] = useState(false);
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
        <Stack direction={'row'} justifyContent={'center'}>
          <ResumePreviewer url={applicationDetails?.resume} />
        </Stack>
      </Dialog>
      {applicationDetails.json_resume ? (
        <NewResumeScoreDetails
          applicationDetails={applicationDetails}
          job={job}
          feedback={false}
          setOpenResume={setOpenResume}
        />
      ) : (
        <UnableFetchResume
          propsLink={{ href: applicationDetails.resume }}
          onClickViewResume={{
            onClick: () => {
              setOpenResume(true);
            },
          }}
        />
      )}
    </>
  );
};

export const InterviewFeedbackParams = ({ feedbackParamsObj }) => {
  return feedbackParamsObj.map((f, i) => {
    const circularScore = (
      <Stack style={{ transform: 'scale(0.4) translate(-10px,-25px)' }}>
        <SmallCircularScore2 finalScore={f.rating} triggerAnimation={false} />
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
  applicationDetails,
  job,
  feedback,
  setOpenResume,
}: {
  applicationDetails: JobApplication;
  job: JobType;
  feedback: JobApplication['feedback'];
  setOpenResume?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const jdScoreObj = applicationDetails.jd_score as any;

  const jdScore = calculateOverallScore({
    qualification: jdScoreObj.qualification,
    skills: jdScoreObj.skills_score,
  });

  const resumeScoreWheel = (
    <ScoreWheel
      id={`ScoreWheelApplicationCard${Math.random()}`}
      weights={job.parameter_weights as ScoreWheelParams}
      score={jdScore}
      fontSize={7}
    />
  );
  const feedbackObj = giveRateInWordToResume(
    getOverallScore(job.parameter_weights as ScoreWheelParams, jdScore),
  );
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
      propsLink={{ href: applicationDetails.resume }}
      slotFeedbackScore={
        <>
          <ResumeFeedbackScore
            textFeedback={'Skills'}
            textScoreState={jdScoreObj.skills_score.score ?? '--'}
          />
          <ResumeFeedbackParams feedbackParamsObj={jdScoreObj.qualification} />
        </>
      }
    />
  );
};

export const ResumeFeedbackParams = ({ feedbackParamsObj }) => {
  const feedbackParams = scoreWheelDependencies.parameterOrder.filter(
    (p) => p !== 'skills',
  );
  const getCustomText = (e) => {
    switch (e) {
      case 'more':
        return 'High';
      case 'ok':
        return 'Medium';
      case 'less':
        return 'Low';
    }
    return '--';
  };
  return (
    <>
      {feedbackParams.map((key, i) => {
        return (
          <ResumeFeedbackScore
            key={i}
            textFeedback={capitalize(key)}
            textScoreState={
              // eslint-disable-next-line security/detect-object-injection
              getCustomText(feedbackParamsObj[key].relevance) ?? '--'
            }
          />
        );
      })}
    </>
  );
};

const NewEducationDetails = ({ education }) => {
  const educationList = education.map((e, i) => (
    <CandidateEducationCard
      key={i}
      textUniversityName={e.institution}
      textDate={`${e.startDate} ${
        e.endDate && `${e.startDate && '-'} ${e.endDate}`
      }`}
    />
  ));
  return <CandidateEducation slotEducationCard={<>{educationList}</>} />;
};

const NewExperienceDetails = ({ work }) => {
  const workList = work.reduce((acc, w, i) => {
    if (w.name && w.position) {
      acc.push(
        <CandidateExperienceCard
          key={i}
          slotLogo={
            <CompanyLogo
              companyName={w.name ? w.name.trim().toLowerCase() : null}
            />
          }
          textRole={w.position}
          textCompany={w.name}
          textDate={`${w.startDate} - ${w.endDate}`}
        />,
      );
    }
    return acc;
  }, []);
  return <CandidateExperience slotCandidateExperienceCard={<>{workList}</>} />;
};

const NewSkillDetails = ({ skills }) => {
  const skillList = skills.map((s, i) => (
    <CandidateSkillPills key={i} textSkill={s.name} />
  ));
  return <CandidateSkill slotCandidateSkill={<>{skillList}</>} />;
};

export function Transcript({
  applicationDetails,
  setOpenDetailedFeedback,
  hideFeedback,
}) {
  return (
    <DetailedFeedback
      slotTranscript={
        <>
          {applicationDetails.conversation?.map((ele, i) => {
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
                    roleImage={getGravatar(
                      applicationDetails.email,
                      applicationDetails.first_name,
                    )}
                    roleName={applicationDetails.first_name}
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
            applicationDetails?.feedback?.map((ele, i) => {
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
