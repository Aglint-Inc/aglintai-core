import { Dialog, Stack } from '@mui/material';
// import { useRouter } from 'next/router';
import { useRef, useState } from 'react';

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
  // InterviewResult,
  // InterviewResultStatus,
  // JobDetailsSideDrawer,
  ResumeFeedbackScore,
  // ResumeResult,
} from '@/devlink';
// import AUIButton from '@/src/components/Common/AUIButton';
import CustomProgress from '@/src/components/Common/CustomProgress';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import ScoreWheel, {
  getOverallScore,
  scoreWheelDependencies,
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import SidePanelDrawer from '@/src/components/Common/SidePanelDrawer';
import SmallCircularScore from '@/src/components/Common/SmallCircularScore';
import { useJobApplications } from '@/src/context/JobApplicationsContext';
// import { JobApplicationSections } from '@/src/context/JobApplicationsContext/types';
import interviewerList from '@/src/utils/interviewer_list';
import { pageRoutes } from '@/src/utils/pageRouting';
import { calculateOverallScore } from '@/src/utils/support/supportUtils';
import toast from '@/src/utils/toast';

import ConversationCard from './ConversationCard';
import ResumePreviewer from './ResumePreviewer';
import { getGravatar } from '..';
import JdFetching from '../JdFetching';
import CompanyLogo from '../../Common/CompanyLogo';
// import { sendEmails } from '../..';
// import InterviewScoreCard from '../../Common/InreviewScoreCard';
import { capitalize, getInterviewScore } from '../../utils';

function ApplicationDetails({
  openSidePanel,
  setOpenSidePanel,
  applicationDetails,
}) {
  const [openDetailedFeedback, setOpenDetailedFeedback] = useState(false);
  // const {
  //   applicationsData,
  //   handleUpdateJobStatus,
  //   handleJobApplicationUpdate,
  //   job,
  // } = useJobApplications();
  // const router = useRouter();
  // const overAllScore = applicationDetails?.feedback?.length
  //   ? Math.floor(
  //       applicationDetails.feedback.reduce(
  //         (sum, entry) =>
  //           sum +
  //           Number(
  //             String(entry.rating).includes('/')
  //               ? entry.rating.split('/')[0]
  //               : entry.rating,
  //           ),
  //         0,
  //       ) / applicationDetails.feedback.length,
  //     )
  //   : 0;

  // const jdScoreObj = applicationDetails.jd_score as any;
  // const jdScore = Number(Math.floor(jdScoreObj?.over_all?.score)) ?? 0;

  // const JobApplicationSideDrawer = () => {
  //   return (
  //     <Stack direction={'row'}>
  //       <Stack width={'35vw'}>
  //         <JobDetailsSideDrawer
  //           onClickCopyProfile={{
  //             onClick: () => {
  //               navigator.clipboard
  //                 .writeText(
  //                   `https://recruiter.aglinthq.com/${pageRoutes.InterviewFeedbackLink}/${applicationDetails.application_id}`,
  //                 )
  //                 .then(() => {
  //                   toast.success('Link Copied');
  //                 });
  //             },
  //           }}
  //           onClickClose={{
  //             onClick: () => {
  //               setOpenSidePanel(false);
  //             },
  //           }}
  //           slotProfileImage={
  //             <MuiAvatar
  //               level={applicationDetails.first_name}
  //               src={
  //                 applicationDetails?.email &&
  //                 !applicationDetails?.profile_image
  //                   ? getGravatar(
  //                       applicationDetails?.email,
  //                       applicationDetails?.first_name,
  //                     )
  //                   : applicationDetails?.profile_image
  //               }
  //               variant={'rounded'}
  //               width={'78px'}
  //               height={'78px'}
  //               fontSize={'28px'}
  //             />
  //           }
  //           isCloseButtonVisible={!openDetailedFeedback}
  //           isInterviewInfoVisible={
  //             !router.pathname.includes(pageRoutes.CANDIDATES) &&
  //             ((overAllScore <= 0 &&
  //               applicationDetails.status ===
  //                 JobApplicationSections.INTERVIEWING) ||
  //               applicationDetails.status === JobApplicationSections.NEW)
  //           }
  //           slotInterviewInfo={
  //             <>
  //               {applicationDetails.status ===
  //                 JobApplicationSections.INTERVIEWING &&
  //                 applicationDetails?.feedback?.length === 0 && (
  //                   <InterviewResultStatus
  //                     bgColorInterviewTag={{
  //                       style: { background: '#FFF0F1', color: '#8C232C' },
  //                     }}
  //                     textStatus={'Incomplete Interview'}
  //                     textDescription={
  //                       'Candidate not completed interview. Click bellow to resend invite'
  //                     }
  //                     slotResendButton={
  //                       <AUIButton variant='outlined'>Resend Link</AUIButton>
  //                     }
  //                     onClickCopyInterviewLink={{
  //                       onClick: () => {
  //                         navigator.clipboard
  //                           .writeText(
  //                             `https://dev.aglinthq.com/${pageRoutes.INTERVIEWLANDINGPAGE}?id=${applicationDetails.application_id}`,
  //                           )
  //                           .then(() => {
  //                             toast.success('Link Copied');
  //                           });
  //                       },
  //                     }}
  //                   />
  //                 )}
  //               {applicationDetails.status ===
  //                 JobApplicationSections.INTERVIEWING &&
  //                 applicationDetails.feedback === null && (
  //                   <InterviewResultStatus
  //                     bgColorInterviewTag={{
  //                       style: { background: '#CEE2F2', color: '#0F3554' },
  //                     }}
  //                     textStatus={'Invited'}
  //                     textDescription={
  //                       'Candidate is invited for the interview and received an email with a link to take interview.'
  //                     }
  //                     slotResendButton={
  //                       <AUIButton variant='outlined'>Resend Link</AUIButton>
  //                     }
  //                     onClickCopyInterviewLink={{
  //                       onClick: () => {
  //                         navigator.clipboard
  //                           .writeText(
  //                             `https://dev.aglinthq.com/${pageRoutes.INTERVIEWLANDINGPAGE}?id=${applicationDetails.application_id}`,
  //                           )
  //                           .then(() => {
  //                             toast.success('Link Copied');
  //                           });
  //                       },
  //                     }}
  //                   />
  //                 )}
  //               {applicationDetails.status === JobApplicationSections.NEW && (
  //                 <InterviewResultStatus
  //                   bgColorInterviewTag={{
  //                     style: { background: '#FFF7ED', color: '#703815' },
  //                   }}
  //                   textStatus={'Pending Invite'}
  //                   textDescription={
  //                     'Candidate not invited to take interview. Invite candidate to take interview.'
  //                   }
  //                   slotResendButton={
  //                     <AUIButton
  //                       onClick={async () => {
  //                         await handleUpdateJobStatus(
  //                           new Set([applicationDetails?.application_id]),
  //                           {
  //                             source: JobApplicationSections.NEW,
  //                             destination: JobApplicationSections.INTERVIEWING,
  //                           },
  //                         );
  //                         sendEmails(
  //                           JobApplicationSections.INTERVIEWING,
  //                           new Set(Array(applicationDetails?.application_id)),
  //                           applicationsData,
  //                           job,
  //                           handleJobApplicationUpdate,
  //                         );
  //                       }}
  //                       variant='outlined'
  //                     >
  //                       Send Link
  //                     </AUIButton>
  //                   }
  //                   onClickCopyInterviewLink={{
  //                     onClick: () => {
  //                       navigator.clipboard
  //                         .writeText(
  //                           `https://dev.aglinthq.com/${pageRoutes.INTERVIEWLANDINGPAGE}?id=${applicationDetails.application_id}`,
  //                         )
  //                         .then(() => {
  //                           toast.success('Link Copied');
  //                         });
  //                     },
  //                   }}
  //                 />
  //               )}
  //             </>
  //           }
  //           slotInterviewResult={
  //             <InterviewResult
  //               textScore={giveRateInWordForInterview(overAllScore)}
  //               slotScore={<InterviewScoreCard overAllScore={overAllScore} />}
  //               slotInterviewFeedback={
  //                 <>
  //                   {applicationDetails?.feedback &&
  //                     applicationDetails?.feedback.map((feedback, i) => {
  //                       let rating = Number(
  //                         String(feedback.rating).includes('/')
  //                           ? feedback.rating.split('/')[0]
  //                           : feedback.rating,
  //                       );
  //                       return (
  //                         <DetailedFeedbackCard
  //                           textScorePercentage={rating + '%'}
  //                           textHeader={capitalize(
  //                             feedback.topic.replaceAll('_', ' '),
  //                           )}
  //                           textDescription={''}
  //                           key={i}
  //                           textColorScore={{
  //                             style: {
  //                               color:
  //                                 rating >= 90
  //                                   ? '#228F67'
  //                                   : rating >= 70
  //                                   ? '#f79a3e'
  //                                   : rating >= 50
  //                                   ? '#de701d'
  //                                   : '#d93f4c',
  //                             },
  //                           }}
  //                           slotScore={
  //                             <CustomProgress
  //                               rotation={270}
  //                               fillColor={
  //                                 rating >= 90
  //                                   ? '#228F67'
  //                                   : rating >= 70
  //                                   ? '#f79a3e'
  //                                   : rating >= 50
  //                                   ? '#de701d'
  //                                   : '#d93f4c'
  //                               }
  //                               bgFill={
  //                                 rating >= 90
  //                                   ? '#edf8f4'
  //                                   : rating >= 70
  //                                   ? '#fff7ed'
  //                                   : rating >= 50
  //                                   ? '#ffeedb'
  //                                   : '#fff0f1'
  //                               }
  //                               size={5}
  //                               progress={rating}
  //                             />
  //                           }
  //                         />
  //                       );
  //                     })}
  //                 </>
  //               }
  //               onClickShowTranscript={{
  //                 onClick: () => {
  //                   setOpenDetailedFeedback(true);
  //                 },
  //               }}
  //             />
  //           }
  //           textName={capitalize(
  //             applicationDetails?.first_name +
  //               ' ' +
  //               applicationDetails?.last_name,
  //           )}
  //           isInterviewVisible={overAllScore > 0}
  //           isKeySkillsVisible={false}
  //           slotResumeScore={
  //             <ResumeResult
  //               textCertificationScore={capitalize(
  //                 applicationDetails?.jd_score?.qualification?.certifications
  //                   .relevance
  //                   ? applicationDetails?.jd_score?.qualification
  //                       ?.certifications.relevance
  //                   : '--',
  //               )}
  //               textProjectScore={capitalize(
  //                 applicationDetails?.jd_score?.qualification?.project
  //                   ?.relevance
  //                   ? applicationDetails?.jd_score?.qualification?.project
  //                       ?.relevance
  //                   : '',
  //               )}
  //               textEducationScore={capitalize(
  //                 applicationDetails?.jd_score?.qualification?.education
  //                   ?.relevance
  //                   ? applicationDetails?.jd_score?.qualification?.education
  //                       ?.relevance
  //                   : '',
  //               )}
  //               textExperienceScore={capitalize(
  //                 applicationDetails?.jd_score?.qualification?.experience
  //                   ?.relevance
  //                   ? applicationDetails?.jd_score?.qualification?.experience
  //                       ?.relevance
  //                   : '',
  //               )}
  //               textSkillsScore={
  //                 applicationDetails?.jd_score?.skills_score?.score
  //                   ? applicationDetails?.jd_score?.skills_score?.score
  //                   : '--'
  //               }
  //               textSummaryScore={capitalize(
  //                 applicationDetails?.jd_score?.summary?.feedback
  //                   ? applicationDetails?.jd_score?.summary?.feedback
  //                   : '--',
  //               )}
  //               onClickDownloadResume={{
  //                 onClick: () => {
  //                   handleDownload(applicationDetails?.resume);
  //                 },
  //               }}
  //               onClickViewResume={{
  //                 onClick: () => {
  //                   setOpenResume(true);
  //                 },
  //               }}
  //               slotResumeScore={
  //                 <CustomProgress
  //                   progress={jdScore}
  //                   rotation={270}
  //                   fillColor={
  //                     jdScore >= 90
  //                       ? '#228F67'
  //                       : jdScore >= 70
  //                       ? '#f79a3e'
  //                       : jdScore >= 50
  //                       ? '#de701d'
  //                       : '#d93f4c'
  //                   }
  //                   bgFill={
  //                     jdScore >= 90
  //                       ? '#edf8f4'
  //                       : jdScore >= 70
  //                       ? '#fff7ed'
  //                       : jdScore >= 50
  //                       ? '#ffeedb'
  //                       : '#fff0f1'
  //                   }
  //                   size={35}
  //                   strokeWidth={3}
  //                   label={jdScore}
  //                   fontSize={20}
  //                 />
  //               }
  //               textFeedback={giveRateInWordToResume(jdScore)}
  //             />
  //           }
  //           isResumeVisible={applicationDetails.resume}
  //           // isResumeVisible={false}
  //           textPhone={
  //             applicationDetails.phone ? applicationDetails.phone : '--'
  //           }
  //           textMail={
  //             applicationDetails.email ? applicationDetails.email : '--'
  //           }
  //           textSites={applicationDetails.company}
  //         />
  //       </Stack>
  //       <Collapse orientation='horizontal' in={openDetailedFeedback}>
  //         <Stack
  //           className='hideScrollbar'
  //           height={'99vh'}
  //           overflow={'auto'}
  //           width={'30vw'}
  //         >
  //           <Transcript
  //             applicationDetails={applicationDetails}
  //             setOpenDetailedFeedback={setOpenDetailedFeedback}
  //             hideFeedback={false}
  //           />
  //         </Stack>
  //       </Collapse>
  //     </Stack>
  //   );
  // };

  const candidateImage = (
    <MuiAvatar
      level={applicationDetails.first_name}
      src={
        applicationDetails?.email && !applicationDetails?.profile_image
          ? getGravatar(
              applicationDetails?.email,
              applicationDetails?.first_name,
            )
          : applicationDetails?.profile_image
      }
      variant={'rounded'}
      width={'auto'}
      height={'auto'}
      fontSize={'28px'}
    />
  );

  return (
    <SidePanelDrawer
      openSidePanelDrawer={openSidePanel}
      setOpenPanelDrawer={setOpenSidePanel}
      onClose={() => {
        setOpenDetailedFeedback(false);
      }}
    >
      {!openDetailedFeedback ? (
        <NewJobApplicationSideDrawer
          applicationDetails={applicationDetails}
          setOpenSidePanel={setOpenSidePanel}
          setOpenDetailedFeedback={setOpenDetailedFeedback}
          candidateImage={candidateImage}
        />
      ) : (
        <NewDetailedFeedback
          applicationDetails={applicationDetails}
          candidateImage={candidateImage}
          onClose={() => {
            setOpenDetailedFeedback(false);
          }}
        />
      )}
    </SidePanelDrawer>
  );
}

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
        <SmallCircularScore finalScore={f.rating} triggerAnimation={false} />
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
  applicationDetails,
  setOpenSidePanel,
  setOpenDetailedFeedback,
  candidateImage,
}) => {
  return (
    <CandidateSideDrawer
      onClickCopyProfile={{
        onClick: () => {
          navigator.clipboard
            .writeText(
              `${process.env.NEXT_PUBLIC_HOST_NAME}/${pageRoutes.ProfileLink}/${applicationDetails.application_id}`,
            )
            .then(() => {
              toast.success('Link Copied');
            });
        },
      }}
      onClickClose={{
        onClick: () => {
          setOpenSidePanel(false);
        },
      }}
      slotCandidateImage={candidateImage}
      textName={capitalize(
        applicationDetails?.first_name + ' ' + applicationDetails?.last_name,
      )}
      textMail={applicationDetails.email ? applicationDetails.email : '--'}
      textOverviewDesc={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
      }
      slotCandidateDetails={
        <NewCandidateDetails
          applicationDetails={applicationDetails}
          setOpenDetailedFeedback={setOpenDetailedFeedback}
        />
      }
    />
  );
};

const NewCandidateDetails = ({
  applicationDetails,
  setOpenDetailedFeedback,
}) => {
  const experienceRef = useRef(null);
  const scoreRef = useRef(null);
  const educationRef = useRef(null);
  const skillsRef = useRef(null);
  const { job } = useJobApplications();

  return (
    <CandidateDetails
      slotInterviewScore={
        <>
          <Stack ref={scoreRef}>
            {applicationDetails.feedback ? (
              <NewInterviewScoreDetails
                applicationDetails={applicationDetails}
                setOpenDetailedFeedback={setOpenDetailedFeedback}
              />
            ) : (
              <></>
            )}
            {applicationDetails.json_resume ? (
              <NewResumeScoreDetails
                applicationDetails={applicationDetails}
                job={job}
                feedback={false}
              />
            ) : (
              <></>
            )}
          </Stack>
          {applicationDetails.json_resume ? (
            <>
              <Stack ref={educationRef}>
                <NewEducationDetails
                  education={applicationDetails.json_resume.education}
                />
              </Stack>
              <Stack ref={experienceRef}>
                <NewExperienceDetails
                  work={applicationDetails.json_resume.work}
                />
              </Stack>
              <Stack ref={skillsRef}>
                <NewSkillDetails
                  skills={applicationDetails.json_resume.skills}
                />
              </Stack>
            </>
          ) : (
            <></>
          )}
        </>
      }
      onClickScore={{
        onClick: () =>
          scoreRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          }),
      }}
      onClickEducation={{
        onClick: () =>
          educationRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          }),
      }}
      onClickExperience={{
        onClick: () =>
          experienceRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          }),
      }}
      onClickSkills={{
        onClick: () =>
          skillsRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'end',
          }),
      }}
    />
  );
};

const NewInterviewScoreDetails = ({
  applicationDetails,
  setOpenDetailedFeedback,
}) => {
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
        onClick: () => {
          setOpenDetailedFeedback(true);
        },
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

export const InterviewFeedbackParams = ({ feedbackParamsObj }) => {
  return feedbackParamsObj.map((f, i) => {
    const circularScore = (
      <Stack style={{ transform: 'scale(0.4) translate(-10px,-25px)' }}>
        <SmallCircularScore finalScore={f.rating} triggerAnimation={false} />
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
}) => {
  const [openResume, setOpenResume] = useState(false);
  const jobDetails = applicationDetails as unknown as {
    jd_score: { summary: { feedback: undefined } };
  };
  const jdScoreObj = applicationDetails.jd_score as any;

  const jdScore = calculateOverallScore({
    qualification: jdScoreObj.qualification,
    skills: jdScoreObj.skills_score,
  });
  const resumeScoreWheel =
    jobDetails?.jd_score?.summary?.feedback !== 'Resume not Parseble' &&
    applicationDetails.resume &&
    applicationDetails.jd_score !== null ? (
      applicationDetails.jd_score === 'loading' ? (
        <Stack justifyContent={'center'} alignItems={'center'}>
          <JdFetching />
          Calculating
        </Stack>
      ) : (
        <ScoreWheel
          id={`ScoreWheelApplicationCard${Math.random()}`}
          weights={job.parameter_weights as ScoreWheelParams}
          score={jdScore}
          fontSize={7}
        />
      )
    ) : (
      <Stack>Not found</Stack>
    );
  const feedbackObj = giveRateInWordToResume(
    getOverallScore(job.parameter_weights as ScoreWheelParams, jdScore),
  );
  return (
    <>
      <Dialog
        sx={{
          '& .MuiDialog-paper': {
            borderRadius: '0px !important',
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

      <CandidateResumeScore
        textStyleProps={{
          style: {
            fontSize: feedback ? '18px' : '14px',
          },
        }}
        slotScoreGraph={resumeScoreWheel}
        textScoreState={feedbackObj.text}
        propsTextColor={{ style: { color: feedbackObj.color } }}
        onClickDownloadResume={{
          onClick: () => {
            handleDownload(applicationDetails?.resume);
          },
        }}
        onClickViewResume={{
          onClick: () => {
            setOpenResume(true);
          },
        }}
        slotFeedbackScore={
          <>
            <ResumeFeedbackScore
              textFeedback={'Skills'}
              textScoreState={jdScoreObj.skills_score.score ?? '--'}
            />
            <ResumeFeedbackParams
              feedbackParamsObj={jdScoreObj.qualification}
            />
          </>
        }
      />
    </>
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
  const workList = work.map((w, i) => (
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
      //TODO: Do something about textLocation
    />
  ));
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

export const handleDownload = async (pdfUrl) => {
  toast.message('Resume downloading...');

  try {
    const response = await fetch(pdfUrl);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'resume.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    toast.error('Error downloading PDF:');
  }
};
