import { JobTypeDB, RecruiterDB } from '@aglint/shared-types';
import { Avatar, Dialog, Stack } from '@mui/material';
// import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { CandidateEducationCard } from '@/devlink/CandidateEducationCard';
import { CandidateExperienceCard } from '@/devlink/CandidateExperienceCard';
import { CandidateSkillPills } from '@/devlink/CandidateSkillPills';
// import { // InterviewAiTranscriptCard } from '@/devlink/// InterviewAiTranscriptCard';
// import { // InterviewCandidateCard } from '@/devlink/// InterviewCandidateCard';
// import { // ProfileInterviewScore } from '@/devlink/// ProfileInterviewScore';
import { ProfileShare } from '@/devlink/ProfileShare';
import Icon from '@/src/components/Common/Icons/Icon';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import ScoreWheel, {
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import SidePanelDrawer from '@/src/components/Common/SidePanelDrawer';
import {
  // DetailedInterviewResultParams,
  giveColorForInterviewScore,
  // giveRateInWordForInterview,
  // InterviewResultParams,
  NewResumeScoreDetails,
  // Transcript,
} from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import ResumePreviewer from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import CompanyLogo from '@/src/components/JobApplicationsDashboard/Common/CompanyLogo';
import {
  JobApplication,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import { selectJobApplicationQuery } from '../../apiUtils/job/jobApplications/read/utils';

function InterviewFeedbackPage() {
  const router = useRouter();
  const [application, setApplicationDetails] =
    useState<JobApplication>(undefined);
  const [job, setJob] = useState<JobTypeDB>();
  const [recruiter, setRecruiter] = useState<RecruiterDB>();
  const [openTranscript, setOpenTranscript] = useState(false);
  const [loader, setLoader] = useState(true);
  const [openResume, setOpenResume] = useState(false);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      getApplicationDetails(id);
    }
  }, [router]);

  async function getApplicationDetails(id) {
    const { data: jobApp, error: errorJob } = await supabase
      .from('applications')
      .select(`${selectJobApplicationQuery}`)
      .eq('id', id);
    if (!errorJob) {
      setApplicationDetails(jobApp[0] as any as JobApplication);
      getJobDetails(jobApp[0]?.job_id);
    }
  }

  async function getJobDetails(job_id) {
    const { data, error } = await supabase
      .from('public_jobs')
      .select()
      .eq('id', job_id);
    if (!error) {
      const { data: recruiter, error: errorRecruiter } = await supabase
        .from('recruiter')
        .select()
        .eq('id', data[0].recruiter_id);
      if (!errorRecruiter) {
        setRecruiter(recruiter[0]);
      }
      setJob(data[0]);
      setLoader(false);
    }
  }

  let resumeScoreWheel = <></>;
  const interviewScore = application?.overall_interview_score ?? null;

  if (application && job) {
    if (application.score_json) {
      resumeScoreWheel = (
        <ScoreWheel
          id={`ScoreWheelApplicationCard${Math.random()}`}
          scores={(application.score_json as ScoreJson)?.scores}
          parameter_weights={job.parameter_weights as ScoreWheelParams}
          fontSize={10}
        />
      );
    }
  }

  if (loader) {
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Loader />
      </Stack>
    );
  } else
    return (
      <Stack height={'100vh'} overflow={'scroll'}>
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
          <Stack>
            <Stack direction={'row'} justifyContent={'center'} height={'90vh'}>
              <ResumePreviewer url={application?.candidate_files?.file_url} />
            </Stack>
          </Stack>
        </Dialog>
        <SidePanelDrawer
          openSidePanelDrawer={openTranscript}
          setOpenPanelDrawer={setOpenTranscript}
        >
          <Stack width={500}>
            {/* <Transcript
              application={application}
              setOpenDetailedResult={setOpenTranscript}
              hideResult={true}
            /> */}
          </Stack>
        </SidePanelDrawer>

        <ProfileShare
          isOverviewVisible={!!(application?.score_json as any)?.overview}
          textInterviewScore={interviewScore ? `${interviewScore} / 100` : '--'}
          slotResumeScore={resumeScoreWheel}
          slotInterview={
            <></>
            // application.assessment_results.result && (
            //   <>
            //     <ProfileInterviewScore
            //       textInterviewScore={
            //         interviewScore ? `${interviewScore} / 100` : '--'
            //       }
            //       propsTextColor={{
            //         style: {
            //           color: giveColorForInterviewScore(interviewScore),
            //         },
            //       }}
            //       propsTextColorInterviewScore={{
            //         style: {
            //           color: giveColorForInterviewScore(interviewScore),
            //         },
            //       }}
            //       textInterviewScoreState={giveRateInWordForInterview(
            //         interviewScore,
            //       )}
            //       slotFeedbackScore={
            //         <InterviewResultParams
            //           resultParamsObj={application.assessment_results.result}
            //         />
            //       }
            //       slotDetailedFeedback={
            //         <DetailedInterviewResultParams
            //           resultParamsObj={application.assessment_results.result}
            //         />
            //       }
            //     />
            //   </>
            // )
          }
          isInterviewVisible={false} //application.assessment_results.result !== null}
          slotInterviewTranscript={
            <></>
            // application.assessment_results.responses && (
            //   // eslint-disable-next-line no-unused-vars
            //   //(con: any, i) => {
            //   //return
            //   <>
            //     <>RESPONSES HERE</>
            //     {/* <InterviewAiTranscriptCard
            //         key={i}
            //         textAiScript={con.content}
            //         slotAiImage={
            //           <Image
            //             src={'/images/logo/aglint.svg'}
            //             width={20}
            //             height={20}
            //             alt=''
            //           />
            //         }
            //         textAiName={'Interviewer'}
            //       />
            //       <InterviewCandidateCard
            //         key={i}
            //         textCandidateScript={con.userContent}
            //         slotCandidateImage={
            //           <MuiAvatar
            //             level={application.candidates.first_name}
            //             src={application?.candidates.avatar}
            //             variant={'rounded'}
            //             width={'auto'}
            //             height={'auto'}
            //             fontSize={'28px'}
            //           />
            //         }
            //       /> */}
            //   </>
            //   // },
            // )
          }
          isEducationVisible={
            (application?.score_json as any)?.schools.length > 0
          }
          slotCandidateEducationCard={(
            application?.score_json as any
          )?.schools?.map((e, i) => (
            <CandidateEducationCard
              key={i}
              textUniversityName={e.institution}
              textDate={`${e?.start?.year || '--'} - ${e?.start?.end || '--'}`}
            />
          ))}
          isExperienceVisible={
            (application?.score_json as any)?.positions?.length > 0
          }
          slotCandidateExperienceCard={(
            application?.score_json as any
          )?.positions?.map((w, i) => (
            <CandidateExperienceCard
              key={i}
              slotLogo={
                <CompanyLogo
                  companyName={w.name ? w.name.trim().toLowerCase() : null}
                />
              }
              textRole={w.title}
              textCompany={w.org}
              textDate={`${w?.end?.year || '--'} - ${w?.end?.year || '--'}`}
            />
          ))}
          isSkillVisible={(application?.score_json as any)?.skills?.length > 0}
          slotSkill={(application?.score_json as any)?.skills?.map((s, i) => (
            <CandidateSkillPills key={i} textSkill={s} />
          ))}
          onClickCopyProfile={{
            onClick: () => {
              navigator.clipboard
                .writeText(
                  process.env.NEXT_PUBLIC_HOST_NAME +
                    ROUTES['/profile-link/[id]']({ id: application.id }),
                )
                .then(() => {
                  toast.success('Link copied.');
                });
            },
          }}
          propsTextColor={{
            style: { color: giveColorForInterviewScore(interviewScore) },
          }}
          slotCompanyLogo={
            <Avatar
              variant='rounded'
              src={recruiter.logo}
              sx={{
                color: 'common.black',
                '& .MuiAvatar-img ': {
                  objectFit: 'contain',
                },
                height: '40px',
                width: '40px',
                background: 'var(--neutral-3)',
              }}
            >
              <Icon variant='CompanyOutlinedBig' height='100%' width='100%' />
            </Avatar>
          }
          slotResume={
            <Stack maxWidth={'400px'} pt={'80px'}>
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
                <Stack
                  direction={'row'}
                  justifyContent={'center'}
                  height={'90vh'}
                >
                  <ResumePreviewer
                    url={application.candidate_files?.file_url}
                  />
                </Stack>
              </Dialog>
              {application?.score_json && (
                <NewResumeScoreDetails
                  application={application}
                  job={job as any}
                  result={true}
                  setOpenResume={setOpenResume}
                />
              )}
            </Stack>
          }
          textMail={application?.candidates?.email}
          textPhone={application?.candidates?.phone || ''}
          textName={
            application?.candidates?.first_name +
              ' ' +
              application?.candidates?.last_name || ''
          }
          isActivityVisible={false}
          slotProfileImage={
            <MuiAvatar
              level={application.candidates.first_name}
              src={application?.candidates.avatar}
              variant={'rounded-large'}
            />
          }
          companyName={job?.company}
          textOverview={(application?.score_json as any)?.overview}
          location={job?.location}
        />
      </Stack>
    );
}

export default InterviewFeedbackPage;

InterviewFeedbackPage.publicProvider = (page) => {
  return <>{page}</>;
};
