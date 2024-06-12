// import Feedback from './Feedback';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { ScheduleDetailTabs } from '@/devlink3/ScheduleDetailTabs';

import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';
import CancelReasonCards from './CancelReasonCards';
import CandidateInfo from './CandidateDetails';
import ChangeInterviewerDialog from './ChangeInterviewerDialog';
import FeedbackWindow from './Feedback';
import { useScheduleDetails } from './hooks';
import Instructions from './Instructions';
import JobDetails from './JobDetails';
import Overview from './Overview';
import RescheduleDialog from './RescheduleDialog';

function SchedulingViewComp() {
  const router = useRouter();
  const { data, isLoading, refetch } = useScheduleDetails();
  const [isChangeInterviewerOpen, setIsChangeInterviewerOpen] = useState(false);
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [cancelUserId, setCancelUserId] = useState('');
  const [range, setRange] = useState<{
    start_date: string;
    end_date: string;
  }>();

  const schedule = data?.schedule_data;
  const cancelReasons = data?.cancel_data?.filter(
    (item) => !item.interview_session_cancel.cancel_user_id,
  );

  const viewScheduleTabs = [
    { name: 'Candidate Details', tab: 'candidate_details', hide: false },
    { name: 'Job Details', tab: 'job_details', hide: false },
    { name: 'Instructions', tab: 'instructions', hide: false },
    {
      name: 'Feedback',
      tab: 'feedback',
      hide: false,
    },
  ];

  return (
    <ShowCode>
      <ShowCode.When isTrue={isLoading}>
        <Loader />
      </ShowCode.When>
      <ShowCode.Else>
        <RescheduleDialog
          schedule={schedule}
          isRescheduleOpen={isRescheduleOpen}
          setIsRescheduleOpen={setIsRescheduleOpen}
          cancelReasons={cancelReasons}
          dateRange={range}
          setDateRange={setRange}
        />
        <ChangeInterviewerDialog
          isChangeInterviewerOpen={isChangeInterviewerOpen}
          setIsChangeInterviewerOpen={setIsChangeInterviewerOpen}
          schedule={schedule}
          cancelUserId={cancelUserId}
          setCancelUserId={setCancelUserId}
        />
        <PageLayout
          onClickBack={{
            onClick: () => {
              window.history.back();
            },
          }}
          isBackButton={true}
          slotTopbarLeft={
            <>
              <Breadcrum textName={schedule?.schedule.schedule_name} />
            </>
          }
          slotBody={
            <ScheduleDetailTabs
              slotScheduleTabOverview={
                <Stack spacing={'var(--space-4)'}>
                  <CancelReasonCards
                    cancelReasons={cancelReasons}
                    schedule={schedule}
                    setCancelUserId={setCancelUserId}
                    setIsRescheduleOpen={setIsRescheduleOpen}
                    cancelUserId={cancelUserId}
                    setIsChangeInterviewerOpen={setIsChangeInterviewerOpen}
                    setRange={setRange}
                  />
                  <Overview
                    refetch={refetch}
                    cancelReasons={cancelReasons}
                    schedule={schedule}
                    isCancelOpen={isCancelOpen}
                    setIsCancelOpen={setIsCancelOpen}
                    setIsRescheduleOpen={setIsRescheduleOpen}
                  />
                </Stack>
              }
              slotDarkPills={viewScheduleTabs
                .filter(
                  (item) =>
                    !item.hide &&
                    (item.tab !== 'feedback' ||
                      schedule?.interview_meeting?.status === 'completed'),
                )
                .map((item, i: number) => {
                  return (
                    <NewTabPill
                      textLabel={item.name}
                      key={i}
                      isPillActive={router.query.tab === item.tab}
                      onClickPill={{
                        onClick: () => {
                          router.replace(
                            `/scheduling/view?meeting_id=${router.query.meeting_id}&tab=${item.tab}`,
                          );
                        },
                      }}
                    />
                  );
                })}
              slotTabContent={
                <ShowCode>
                  <ShowCode.When
                    isTrue={
                      router.query.tab === 'candidate_details' ||
                      !router.query.tab
                    }
                  >
                    <CandidateInfo
                      applications={schedule?.applications}
                      candidate={schedule?.candidates}
                      file={schedule?.file}
                    />
                  </ShowCode.When>
                  <ShowCode.When isTrue={router.query.tab === 'instructions'}>
                    <Instructions schedule={schedule} />
                  </ShowCode.When>
                  <ShowCode.When isTrue={router.query.tab === 'feedback'}>
                    <FeedbackWindow
                      interview_sessions={[
                        {
                          id: schedule?.interview_session.id,
                          title: schedule?.interview_session.name,
                          created_at: schedule?.interview_session.created_at,
                          time: {
                            start: schedule?.interview_meeting.start_time,
                            end: schedule?.interview_meeting.end_time,
                          },
                          status: schedule?.interview_meeting.status,
                        },
                      ]}
                      candidate={{
                        email: schedule?.candidates.email,
                        name: `${schedule?.candidates.first_name || ''} ${schedule?.candidates.last_name || ''}`.trim(),
                        job_id: schedule?.applications?.job_id,
                      }}
                    />
                  </ShowCode.When>
                  <ShowCode.When isTrue={router.query.tab === 'job_details'}>
                    <JobDetails schedule={schedule} />
                  </ShowCode.When>
                </ShowCode>
              }
            />
          }
        />
      </ShowCode.Else>
    </ShowCode>
  );
}

export default SchedulingViewComp;
