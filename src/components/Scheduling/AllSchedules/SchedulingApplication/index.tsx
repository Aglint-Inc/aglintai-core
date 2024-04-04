import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { ButtonPrimaryLarge } from '@/devlink';
import { Breadcrum, PageLayout } from '@/devlink2';
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
import DeleteScheduleDialog from './Common/CancelScheduleDialog';
import RescheduleDialog from './Common/RescheduleDialog';
import FullSchedule from './FullSchedule';
import { fetchInterviewSessionTask, useGetScheduleApplication } from './hooks';
import {
  resetSchedulingApplicationState,
  setIsScheduleNowOpen,
  setTab,
  useSchedulingApplicationStore,
} from './store';

function SchedulingApplication() {
  const router = useRouter();
  const selectedApplication = useSchedulingApplicationStore(
    (state) => state.selectedApplication,
  );
  const scheduleName = useSchedulingApplicationStore(
    (state) => state.scheduleName,
  );
  const fetchingSchedule = useSchedulingApplicationStore(
    (state) => state.fetchingSchedule,
  );
  const tab = useSchedulingApplicationStore((state) => state.tab);
  const selectedSessionIds = useSchedulingApplicationStore(
    (state) => state.selectedSessionIds,
  );

  const { fetchInterviewDataByApplication } = useGetScheduleApplication();

  useEffect(() => {
    if (router.isReady && router.query.application_id) {
      fetchInterviewDataByApplication();
      fetchInterviewSessionTask({
        application_id: router.query.application_id as string,
        job_id: '10bad981-e3b6-4ee8-9e12-9a0d72febc83',
      });
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
            {!fetchingSchedule ? (
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
                  ) : (
                    ''
                  )
                }
              />
            ) : (
              <Loader />
            )}
          </>
        }
        slotTopbarRight={''}
      />
    </>
  );
}

export default SchedulingApplication;
