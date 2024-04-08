import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ButtonPrimaryLarge } from '@/devlink';
import { Breadcrum, InterviewPlanEmpty, PageLayout } from '@/devlink2';
import {
  CandidateCard,
  CandidateSchedule,
  DarkPill,
  JobCards,
} from '@/devlink3';
import Loader from '@/src/components/Common/Loader';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';

import CandidateInfo from '../../SchedulingView/CandidateDetails';
import FeedbackWindow from '../../SchedulingView/Feedback';
import DeleteScheduleDialog from './Common/CancelScheduleDialog';
import RescheduleDialog from './Common/RescheduleDialog';
import FullSchedule from './FullSchedule';
import { useGetScheduleApplication } from './hooks';
import {
  resetSchedulingApplicationState,
  setFetchingSchedule,
  setIsScheduleNowOpen,
  setTab,
  useSchedulingApplicationStore,
} from './store';

function SchedulingApplication() {
  const router = useRouter();
  const {
    fetchingSchedule,
    initialSessions,
    selectedSessionIds,
    selectedApplication,
    scheduleName,
    tab,
  } = useSchedulingApplicationStore((state) => ({
    fetchingSchedule: state.fetchingSchedule,
    initialSessions: state.initialSessions,
    selectedSessionIds: state.selectedSessionIds,
    selectedApplication: state.selectedApplication,
    scheduleName: state.scheduleName,
    tab: state.tab,
  }));

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  useEffect(() => {
    if (router.isReady && router.query.application_id) {
      setFetchingSchedule(true);
      fetchInterviewDataByApplication();
    }
    return () => {
      resetSchedulingApplicationState();
    };
  }, [router]);

  return (
    <>
      <DeleteScheduleDialog />
      <RescheduleDialog />
      <PageLayout
        onClickBack={{
          onClick: () => {
            window.history.back();
          },
        }}
        isBackButton={true}
        slotTopbarLeft={
          <>
            <Breadcrum textName={scheduleName} />
          </>
        }
        slotBody={
          <>
            {fetchingSchedule ? (
              <Loader />
            ) : initialSessions.length === 0 ? (
              <InterviewPlanEmpty
                onClickCreateInterviewPlan={{
                  onClick: () => {
                    router.push(
                      `/jobs/${selectedApplication.job_id}/interview-plan`,
                    );
                  },
                }}
              />
            ) : (
              <CandidateSchedule
                slotDarkPill={
                  <>
                    <DarkPill
                      textPill={'Full Schedule'}
                      isActive={tab === 'full_schedule'}
                      onClickPill={{
                        onClick: () => {
                          setTab('full_schedule');
                        },
                      }}
                    />
                    <DarkPill
                      textPill={'Candidate Info'}
                      isActive={tab === 'candidate_info'}
                      onClickPill={{
                        onClick: () => {
                          setTab('candidate_info');
                        },
                      }}
                    />
                    <DarkPill
                      textPill={'Feedback'}
                      isActive={tab === 'feedback'}
                      onClickPill={{
                        onClick: () => {
                          setTab('feedback');
                        },
                      }}
                    />
                  </>
                }
                slotScheduleNowButton={
                  <ButtonPrimaryLarge
                    textLabel={'Schedule Now'}
                    onClickButton={{
                      onClick: () => {
                        setIsScheduleNowOpen(true);
                      },
                    }}
                  />
                }
                isScheduleNowVisible={selectedSessionIds.length > 0}
                slotCandidateCard={
                  <>
                    <CandidateCard
                      slotProfileImage={
                        <MuiAvatar
                          level={getFullName(
                            selectedApplication.candidates.first_name,
                            selectedApplication.candidates.last_name,
                          )}
                          src={selectedApplication.candidates.avatar}
                          variant={'rounded'}
                          width={'74px'}
                          height={'74px'}
                          fontSize={'36px'}
                        />
                      }
                      textName={getFullName(
                        selectedApplication?.candidates.first_name,
                        selectedApplication?.candidates.last_name,
                      )}
                      textMail={selectedApplication?.candidates.email}
                      textRole={
                        selectedApplication?.candidate_files?.resume_json
                          ?.basics?.currentJobTitle || '--'
                      }
                    />
                    <JobCards
                      textLocation={selectedApplication.public_jobs.location}
                      textRole={selectedApplication.public_jobs.job_title}
                    />
                  </>
                }
                slotFullScheduleCard={
                  tab === 'candidate_info' ? (
                    <CandidateInfo
                      applications={selectedApplication}
                      candidate={selectedApplication.candidates}
                      file={selectedApplication.candidate_files}
                    />
                  ) : tab === 'full_schedule' ? (
                    <FullSchedule />
                  ) : tab === 'feedback' ? (
                    <FeedbackWindow
                      interview_sessions={initialSessions.map((item) => ({
                        id: item.id,
                        title: item.name,
                        created_at: item.created_at,
                      }))}
                      multiSession={true}
                    />
                  ) : (
                    ''
                  )
                }
              />
            )}
          </>
        }
        slotTopbarRight={''}
      />
    </>
  );
}

export default SchedulingApplication;
