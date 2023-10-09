import { Dialog, Stack, Typography } from '@mui/material';
import { capitalize } from '@mui/material/utils';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import {
  DetailedFeedbackCard,
  InterviewResult,
  InterviewScreenFeedback,
  ResumeResult,
} from '@/devlink';
import CustomProgress from '@/src/components/Common/CustomProgress';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import SidePanelDrawer from '@/src/components/Common/SidePanelDrawer';
import { getGravatar } from '@/src/components/JobApplicationsDashboard/ApplicationCard';
import {
  giveRateInWordToResume,
  handleDownload,
  Transcript,
} from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails';
import ResumePreviewer from '@/src/components/JobApplicationsDashboard/ApplicationCard/ApplicationDetails/ResumePreviewer';
import InterviewScoreCard from '@/src/components/JobApplicationsDashboard/Common/InreviewScoreCard';
import { pageRoutes } from '@/src/utils/pageRouting';
import { supabase } from '@/src/utils/supabaseClient';
import toast from '@/src/utils/toast';

function InterviewFeedbackPage() {
  const router = useRouter();

  const [applicationDetails, setApplicationDetails] = useState({});
  const [job, setJob] = useState({});
  const [openTranscript, setOpenTranscript] = useState(false);
  const [loader, setLoader] = useState(true);

  const [openResume, setOpenResume] = useState(false);

  const jdScore = applicationDetails?.jd_score?.over_all?.score ?? 0;

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
      setJob(data[0]);
    }
    setLoader(false);
  }
  const overAllScore = applicationDetails.feedback
    ? Math.floor(
        applicationDetails.feedback.reduce(
          (sum, entry) =>
            sum +
            Number(
              String(entry.rating).includes('/')
                ? entry.rating.split('/')[0]
                : entry.rating,
            ),
          0,
        ) / applicationDetails.feedback.length,
      )
    : 0;

  if (loader) {
    return (
      <Stack width={'100%'} height={'100vh'}>
        <Loader />
      </Stack>
    );
  } else
    return (
      <div>
        <Dialog
          sx={{
            '& .MuiDialog-paper': {
              borderRadius: '0px !important',
            },
          }}
          fullWidth
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
        <InterviewScreenFeedback
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
                textFeedback={giveRateInWordToResume(jdScore)}
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
          textName={
           capitalize( applicationDetails?.first_name + ' ' + applicationDetails?.last_name)
          }
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
        />
      </div>
    );
}

export default InterviewFeedbackPage;

InterviewFeedbackPage.getLayout = (page) => {
  return <>{page}</>;
};
