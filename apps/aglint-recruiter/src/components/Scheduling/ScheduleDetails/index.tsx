// import Feedback from './Feedback';
import { InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Breadcrum } from '@/devlink2/Breadcrum';
import { PageLayout } from '@/devlink2/PageLayout';
import { NewTabPill } from '@/devlink3/NewTabPill';
import { ScheduleButton } from '@/devlink3/ScheduleButton';
import { ScheduleDetailTabs } from '@/devlink3/ScheduleDetailTabs';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';
import CancelScheduleDialog from './CancelScheduleDialog';
import CandidateInfo from './CandidateDetails';
import FeedbackWindow from './Feedback';
import { useScheduleDetails } from './hooks';
import IconCancelSchedule from './Icons/IconCancelSchedule';
import Instructions from './Instructions';
import JobDetails from './JobDetails';
import Overview from './Overview';
import DeclineScheduleDialog from './Overview/DeclineScheduleDialog';
import RequestRescheduleDialog from './RequestRescheduleDialog';

function SchedulingViewComp() {
  const router = useRouter();
  const { recruiterUser } = useAuthDetails();
  const [isRequestRescheduleOpen, setIsRequestRescheduleOpen] = useState(false);
  const [isCancelOpen, setIsCancelOpen] = useState(false);
  const [isDeclineOpen, setIsDeclineOpen] = useState(false);
  const { data, isLoading } = useScheduleDetails();
  const schedule = data?.schedule_data;
  const cancelReasons = data?.cancel_data?.filter(
    (item) => !item.interview_session_cancel.cancel_user_id,
  );

  const [sessionRelation, setSessionRelation] =
    useState<InterviewSessionRelationTypeDB>();

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

  const isRescheduleButtonVisible =
    schedule?.users?.find(
      (user) =>
        user.interview_session_relation.is_confirmed &&
        user.email === recruiterUser.email &&
        user.interview_session_relation.training_type === 'qualified',
    ) &&
    !cancelReasons?.some(
      (item) =>
        item.recruiter_user.id === recruiterUser.user_id &&
        !item.interview_session_cancel.is_resolved,
    ) &&
    schedule?.interview_meeting?.status === 'confirmed';

  const isCancelButtonVisible =
    (recruiterUser.role === 'admin' ||
      recruiterUser.role === 'recruiter' ||
      recruiterUser.role === 'hiring_manager' ||
      recruiterUser.role === 'recruiting_coordinator' ||
      recruiterUser.user_id === schedule?.interview_coordinator?.id) &&
    schedule?.interview_meeting?.status === 'confirmed';

  useEffect(() => {
    if (schedule?.users) {
      setSessionRelation(
        schedule?.users?.find((user) => user.email === recruiterUser.email)
          ?.interview_session_relation,
      );
    }
  }, [schedule?.users]);

  return (
    <ShowCode>
      <ShowCode.When isTrue={isLoading}>
        <Loader />
      </ShowCode.When>
      <ShowCode.Else>
        {schedule && (
          <>
            <DeclineScheduleDialog
              sessionRelation={sessionRelation}
              isDeclineOpen={isDeclineOpen}
              setIsDeclineOpen={setIsDeclineOpen}
              schedule={schedule}
            />
            <CancelScheduleDialog
              sessionRelation={sessionRelation}
              isDeclineOpen={isCancelOpen}
              setIsDeclineOpen={setIsCancelOpen}
              schedule={schedule}
            />
            <RequestRescheduleDialog
              isRequestRescheduleOpen={isRequestRescheduleOpen}
              setIsRequestRescheduleOpen={setIsRequestRescheduleOpen}
              sessionRelation={sessionRelation}
              schedule={schedule}
            />
          </>
        )}
        <PageLayout
          onClickBack={{
            onClick: () => {
              window.history.back();
            },
          }}
          isBackButton={true}
          slotTopbarRight={
            <>
              {isRescheduleButtonVisible && (
                <ScheduleButton
                  textLabel={'Request Reschedule'}
                  slotIcon={<IconCancelSchedule />}
                  onClickProps={{
                    onClick: () => {
                      setIsRequestRescheduleOpen(true);
                    },
                  }}
                />
              )}
              {isCancelButtonVisible && (
                <ScheduleButton
                  textLabel={'Cancel Schedule'}
                  slotIcon={<IconCancelSchedule />}
                  textColorProps={{
                    style: {
                      color: '#D93F4C',
                    },
                  }}
                  onClickProps={{
                    style: { background: '#FFF0F1' },
                    onClick: () => {
                      setIsCancelOpen(true);
                    },
                  }}
                />
              )}
            </>
          }
          slotTopbarLeft={
            <>
              <Breadcrum textName={schedule?.schedule.schedule_name} />
            </>
          }
          slotBody={
            <ScheduleDetailTabs
              slotScheduleTabOverview={
                <Overview
                  cancelReasons={cancelReasons}
                  schedule={schedule}
                  setIsCancelOpen={setIsCancelOpen}
                  setIsDeclineOpen={setIsDeclineOpen}
                />
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
                    isTrue={router.query.tab === 'candidate_details'}
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
