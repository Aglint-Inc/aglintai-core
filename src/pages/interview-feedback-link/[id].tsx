import { Dialog, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import {
  CandidateEducationCard,
  CandidateExperienceCard,
  CandidateResumeScore,
  CandidateSkillPills,
  DetailedFeedbackCard,
  InterviewAiTranscriptCard,
  InterviewCandidateCard,
  ProfileInterviewScore,
  ProfileShare,
  ResumeFeedbackScore,
} from '@/devlink';
import Loader from '@/src/components/Common/Loader';
import ScoreWheel, {
  ScoreWheelParams,
  getOverallScore,
} from '@/src/components/Common/ScoreWheel';
import SidePanelDrawer from '@/src/components/Common/SidePanelDrawer';
import { getGravatar } from '@/src/components/JobApplicationsDashboard/ApplicationCard';
import {
  InterviewFeedbackParams,
  NewResumeScoreDetails,
  ResumeFeedbackParams,
  Transcript,
  giveRateInWordToResume,
  handleDownload,
} from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import ResumePreviewer from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import JdFetching from '@/src/components/JobApplicationsDashboard/ApplicationCard/JdFetching';
import { JobApplcationDB, JobTypeDB } from '@/src/types/data.types';
import { supabase } from '@/src/utils/supabaseClient';
import CompanyLogo from '@/src/components/JobApplicationsDashboard/Common/CompanyLogo';
import SmallCircularScore from '@/src/components/Common/SmallCircularScore';
import { calculateOverallScore } from '@/src/utils/support/supportUtils';
import { getInterviewScore } from '@/src/components/JobApplicationsDashboard/utils';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import React from 'react';
import Image from 'next/image';

function InterviewFeedbackPage() {
  const router = useRouter();
  const [applicationDetails, setApplicationDetails] =
    useState<JobApplcationDB>();
  const [job, setJob] = useState<JobTypeDB>();
  const [recruiter, setRecruiter] = useState();
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
    const { data, error } = await supabase
      .from('job_applications')
      .select()
      .eq('application_id', id);
    if (!error) {
      setApplicationDetails(data[0]);
      getJobDetails(data[0]?.job_id);
    }
  }

  async function getJobDetails(job_id) {
    const { data, error } = await supabase
      .from('public_jobs')
      .select()
      .eq('id', job_id);
    if (!error) {
      const { data: recruiter, error: errorRecruiter } = await supabase
        .from('recuiter')
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

  if (applicationDetails && job) {
    interviewScore = getInterviewScore(applicationDetails.feedback);
    const jobDetails = applicationDetails as unknown as {
      jd_score: { summary: { feedback: undefined } };
    };
    const jdScoreObj = applicationDetails.jd_score as any;

    const jdScore = calculateOverallScore({
      qualification: jdScoreObj.qualification,
      skills: jdScoreObj.skills_score,
    });

    resumeScoreWheel =
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
  }

  if (loader) {
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Loader />
      </Stack>
    );
  } else
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
          <Stack>
            <Stack direction={'row'} justifyContent={'center'}>
              <ResumePreviewer url={applicationDetails?.resume} />
            </Stack>
          </Stack>
        </Dialog>
        <SidePanelDrawer
          openSidePanelDrawer={openTranscript}
          setOpenPanelDrawer={setOpenTranscript}
        >
          <Stack width={500}>
            <Transcript
              applicationDetails={applicationDetails}
              setOpenDetailedFeedback={setOpenTranscript}
              hideFeedback={true}
            />
          </Stack>
        </SidePanelDrawer>

        <ProfileShare
          isOverviewVisible={false}
          textInterviewScore={`${interviewScore} / 100`}
          slotResumeScore={resumeScoreWheel}
          slotInterview={
            <ProfileInterviewScore
              slotFeedbackScore={
                <InterviewFeedbackParams
                  feedbackParamsObj={applicationDetails.feedback}
                />
              }
              slotDetailedFeedback={applicationDetails.feedback.map(
                (ele, i) => {
                  const circularScore = (
                    <SmallCircularScore
                      finalScore={ele.rating}
                      triggerAnimation={true}
                    />
                  );
                  return (
                    <DetailedFeedbackCard key={i} slotScore={circularScore} />
                  );
                },
              )}
            />
          }
          isInterviewVisible={applicationDetails.conversation !== null}
          slotInterviewTranscript={applicationDetails.conversation.map(
            (con, i) => {
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
                        level={applicationDetails.first_name}
                        src={
                          applicationDetails?.email &&
                          !applicationDetails?.profile_image
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
                    }
                  />
                </>
              );
            },
          )}
          isEducationVisible={
            applicationDetails?.json_resume?.education.length > 0
          }
          slotCandidateEducationCard={applicationDetails?.json_resume?.education.map(
            (e, i) => (
              <CandidateEducationCard
                key={i}
                textUniversityName={e.institution}
                textDate={`${e.startDate} ${
                  e.endDate && `${e.startDate && '-'} ${e.endDate}`
                }`}
              />
            ),
          )}
          isExperienceVisible={applicationDetails?.json_resume?.work.length > 0}
          slotCandidateExperienceCard={applicationDetails?.json_resume?.work.map(
            (w, i) => (
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
              />
            ),
          )}
          isSkillVisible={applicationDetails?.json_resume?.skills.length > 0}
          slotSkill={applicationDetails?.json_resume?.skills.map((s, i) => (
            <CandidateSkillPills key={i} textSkill={s.name} />
          ))}
          slotResume={
            <Stack maxWidth={'400px'}>
              <NewResumeScoreDetails
                applicationDetails={applicationDetails}
                job={job}
              />
            </Stack>
          }
          textMail={applicationDetails?.email}
          textPhone={applicationDetails?.phone || ''}
          textName={
            applicationDetails?.first_name + ' ' + applicationDetails?.last_name
          }
          isActivityVisible={false}
          slotProfileImage={
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
          }
        />
        {/* <InterviewScreenFeedback
          isInterviewResultVisible={applicationDetails.feedback !== null}
          isResumeResultVisible={jdScore}
          slotResumeResult={
            <>
              <ResumeResult
                textCertificationScore={capitalize(
                  applicationDetails?.jd_score?.qualification?.certifications
                    .relevance
                    ? applicationDetails?.jd_score?.qualification
                        ?.certifications.relevance
                    : '--',
                )}
                textProjectScore={capitalize(
                  applicationDetails?.jd_score?.qualification?.project
                    ?.relevance
                    ? applicationDetails?.jd_score?.qualification?.project
                        ?.relevance
                    : '',
                )}
                textEducationScore={capitalize(
                  applicationDetails?.jd_score?.qualification?.education
                    ?.relevance
                    ? applicationDetails?.jd_score?.qualification?.education
                        ?.relevance
                    : '',
                )}
                textExperienceScore={capitalize(
                  applicationDetails?.jd_score?.qualification?.experience
                    ?.relevance
                    ? applicationDetails?.jd_score?.qualification?.experience
                        ?.relevance
                    : '',
                )}
                textSkillsScore={
                  applicationDetails?.jd_score?.skills_score?.score
                    ? applicationDetails?.jd_score?.skills_score?.score
                    : '--'
                }
                textSummaryScore={capitalize(
                  applicationDetails?.jd_score?.summary?.feedback
                    ? applicationDetails?.jd_score?.summary?.feedback
                    : '--',
                )}
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
                slotResumeScore={
                  <CustomProgress
                    progress={jdScore}
                    rotation={270}
                    fillColor={
                      jdScore >= 90
                        ? '#228F67'
                        : jdScore >= 70
                        ? '#f79a3e'
                        : jdScore >= 50
                        ? '#de701d'
                        : '#d93f4c'
                    }
                    bgFill={
                      jdScore >= 90
                        ? '#edf8f4'
                        : jdScore >= 70
                        ? '#fff7ed'
                        : jdScore >= 50
                        ? '#ffeedb'
                        : '#fff0f1'
                    }
                    size={35}
                    strokeWidth={3}
                    label={jdScore}
                    fontSize={20}
                  />
                }
                textFeedback={giveRateInWordToResume(jdScore).text}
              />
            </>
          }
          onClickCopyProfile={{
            onClick: () => {
              navigator.clipboard
                .writeText(
                  `https://recruiter.aglinthq.com/${pageRoutes.InterviewFeedbackLink}/${applicationDetails?.application_id}`,
                )
                .then(() => {
                  toast.success('Link Copied');
                });
            },
          }}
          slotProfileImage={
            <MuiAvatar
              width={'100px'}
              height={'100px'}
              variant={'rounded'}
              level={applicationDetails?.first_name}
              fontSize={'40px'}
              src={
                applicationDetails?.email && !applicationDetails?.profile_image
                  ? getGravatar(
                      applicationDetails?.email,
                      applicationDetails?.first_name,
                    )
                  : applicationDetails?.profile_image
              }
            />
          }
          textName={capitalize(
            applicationDetails?.first_name +
              ' ' +
              applicationDetails?.last_name,
          )}
          textRole={capitalize(applicationDetails?.job_title)}
          textMail={applicationDetails?.email}
          textPhone={applicationDetails?.phone}
          textDate={
            applicationDetails.interviewing_date &&
            `${new Date(
              applicationDetails.interviewing_date,
            ).getDate()} ${new Intl.DateTimeFormat('en-US', {
              timeZone: 'UTC',
              month: 'long',
            }).format(
              new Date(applicationDetails.interviewing_date),
            )} ${new Date(applicationDetails.interviewing_date).getFullYear()}`
          }
          textDuration={
            applicationDetails?.interview_duration &&
            `  ${
              applicationDetails?.interview_duration.split(':')[0]
            } Minutes ${
              applicationDetails?.interview_duration.split(':')[1]
            } seconds`
          }
          textTime={
            applicationDetails.interviewing_date &&
            `
        ${new Date(applicationDetails.interviewing_date).toLocaleTimeString(
          'en-US',
          { timeZone: 'UTC', hour: 'numeric', minute: '2-digit', hour12: true },
        )}
        `
          }
          textNumberQuestion={
            applicationDetails?.conversation &&
            applicationDetails?.conversation.length
          }
          slotCompanyLogo={
            <Stack direction={'row'} alignItems={'center'} spacing={'20px'}>
              <MuiAvatar
                width={'44px'}
                height={'44px'}
                variant={'rounded'}
                level={job?.company}
                src={job?.logo}
                fontSize={'40px'}
              />
              <Typography>{job?.company}</Typography>
            </Stack>
          }
          slotScore={
            <CustomProgress
              rotation={270}
              size={20}
              fontSize={20}
              label={90}
              progress={90}
            />
          }
          onClickShowTranscript={{
            onClick: () => {
              setOpenTranscript(true);
            },
          }}
          slotInterviewResult={
            <InterviewResult
              textScore={
                overAllScore > 90
                  ? `Absolutely incredible! 🌟😍`
                  : overAllScore > 70
                  ? `Truly outstanding! 🤩`
                  : overAllScore > 50
                  ? `Excellent job! 👏`
                  : `Not up to mark! 😑`
              }
              slotScore={<InterviewScoreCard overAllScore={overAllScore} />}
              slotInterviewFeedback={
                <>
                  {applicationDetails?.feedback &&
                    applicationDetails?.feedback.map((feedback, i) => {
                      let rating = Number(
                        String(feedback.rating).includes('/')
                          ? feedback.rating.split('/')[0]
                          : feedback.rating,
                      );
                      return (
                        <DetailedFeedbackCard
                          textScorePercentage={rating + '%'}
                          textHeader={capitalize(
                            feedback.topic.replaceAll('_', ' '),
                          )}
                          textDescription={''}
                          key={i}
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
                        />
                      );
                    })}
                </>
              }
              onClickShowTranscript={{
                onClick: () => {
                  setOpenTranscript(true);
                },
              }}
            />
          }
          slotDetailedFeedback={
            <>
              {applicationDetails?.feedback?.map((ele, i) => {
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
        /> */}
      </>
    );
}

export default InterviewFeedbackPage;

InterviewFeedbackPage.getLayout = (page) => {
  return <>{page}</>;
};
