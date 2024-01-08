import { Avatar, Dialog, Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  CandidateEducationCard,
  CandidateExperienceCard,
  CandidateSkillPills,
  InterviewAiTranscriptCard,
  InterviewCandidateCard,
  ProfileInterviewScore,
  ProfileShare,
} from '@/devlink';
import Icon from '@/src/components/Common/Icons/Icon';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import ScoreWheel, {
  ScoreWheelParams,
} from '@/src/components/Common/ScoreWheel';
import SidePanelDrawer from '@/src/components/Common/SidePanelDrawer';
import {
  DetailedInterviewFeedbackParams,
  giveColorForInterviewScore,
  giveRateInWordForInterview,
  InterviewFeedbackParams,
  NewResumeScoreDetails,
  Transcript,
} from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import ResumePreviewer from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import CompanyLogo from '@/src/components/JobApplicationsDashboard/Common/CompanyLogo';
import { getInterviewScore } from '@/src/components/JobApplicationsDashboard/utils';
import {
  JobApplication,
  ScoreJson,
} from '@/src/context/JobApplicationsContext/types';
import { palette } from '@/src/context/Theme/Theme';
import { JobTypeDB, RecruiterDB } from '@/src/types/data.types';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

import { selectJobApplicationQuery } from '../api/JobApplicationsApi/utils';

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
      .from('job_applications')
      .select(`${selectJobApplicationQuery}`)
      .eq('application_id', id);

    if (!errorJob) {
      const { data, error } = await supabase
        .from('candidates')
        .select()
        .eq('id', jobApp[0]?.candidate_id);
      if (!error) {
        setApplicationDetails({
          ...jobApp[0],
          candidates: data[0],
        } as JobApplication);
        getJobDetails(jobApp[0]?.job_id);
      }
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
  let interviewScore = 0;

  if (application && job) {
    interviewScore = getInterviewScore(application.assessment_results.feedback);
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
            <Transcript
              applications={application}
              setOpenDetailedFeedback={setOpenTranscript}
              hideFeedback={true}
            />
          </Stack>
        </SidePanelDrawer>

        <ProfileShare
          isOverviewVisible={
            !!(application?.score_json as any)?.overview
          }
          textInterviewScore={interviewScore ? `${interviewScore} / 100` : '--'}
          slotResumeScore={resumeScoreWheel}
          slotInterview={
            application.assessment_results.feedback && (
              <>
                <ProfileInterviewScore
                  textInterviewScore={
                    interviewScore ? `${interviewScore} / 100` : '--'
                  }
                  propsTextColor={{
                    style: {
                      color: giveColorForInterviewScore(interviewScore),
                    },
                  }}
                  propsTextColorInterviewScore={{
                    style: {
                      color: giveColorForInterviewScore(interviewScore),
                    },
                  }}
                  textInterviewScoreState={giveRateInWordForInterview(
                    interviewScore,
                  )}
                  slotFeedbackScore={
                    <InterviewFeedbackParams
                      feedbackParamsObj={application.assessment_results.feedback}
                    />
                  }
                  slotDetailedFeedback={
                    <DetailedInterviewFeedbackParams
                      feedbackParamsObj={application.assessment_results.feedback}
                    />
                  }
                />
              </>
            )
          }
          isInterviewVisible={application.assessment_results.feedback !== null}
          slotInterviewTranscript={application.assessment_results.conversation.map(
            (con: any, i) => {
              return (
                <>
                  <InterviewAiTranscriptCard
                    key={i}
                    textAiScript={con.content}
                    slotAiImage={
                      <Image
                        src={'/images/logo/aglint.svg'}
                        width={20}
                        height={20}
                        alt=''
                      />
                    }
                    textAiName={'Interviewer'}
                  />
                  <InterviewCandidateCard
                    key={i}
                    textCandidateScript={con.userContent}
                    slotCandidateImage={
                      <MuiAvatar
                        level={application.candidates.first_name}
                        src={application?.candidates.avatar}
                        variant={'rounded'}
                        width={'auto'}
                        height={'auto'}
                        fontSize={'28px'}
                      />
                    }
                  />
                </>
              );
            },
          )}
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
          isSkillVisible={
            (application?.score_json as any)?.skills?.length > 0
          }
          slotSkill={(application?.score_json as any)?.skills?.map(
            (s, i) => <CandidateSkillPills key={i} textSkill={s} />,
          )}
          onClickCopyProfile={{
            onClick: () => {
              navigator.clipboard
                .writeText(
                  `${process.env.NEXT_PUBLIC_HOST_NAME}${pageRoutes.ProfileLink}/${application.id}`,
                )
                .then(() => {
                  toast.success('Link Copied');
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
                background: palette.grey[100],
              }}
            >
              <Icon variant='CompanyOutlinedBig' />
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
                  <ResumePreviewer url={application.candidate_files?.file_url} />
                </Stack>
              </Dialog>
              {application?.score_json && (
                <NewResumeScoreDetails
                  applications={application}
                  job={job as any}
                  feedback={true}
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
              variant={'rounded'}
              width={'100%'}
              height={'100%'}
              fontSize={'48px'}
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

InterviewFeedbackPage.getLayout = (page) => {
  return <>{page}</>;
};
