// import Feedback from './Feedback';
import { InterviewSessionRelationTypeDB } from '@aglint/shared-types';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Breadcrum, PageLayout } from '@/devlink2';
import { NewTabPill, ScheduleButton, ScheduleDetailTabs } from '@/devlink3';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';

import Loader from '../../Common/Loader';
import { ShowCode } from '../../Common/ShowCode';
import CancelScheduleDialog from './CancelScheduleDialog';
import CandidateInfo from './CandidateDetails';
import FeedbackWindow from './Feedback';
import { useScheduleDetails } from './hooks';
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
  const cancelReasons = data?.cancel_data;

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
      recruiterUser.user_id === schedule?.coordinator.id) &&
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
              meeting_id={schedule.interview_meeting.id}
              sessionRelation={sessionRelation}
              isDeclineOpen={isDeclineOpen}
              setIsDeclineOpen={setIsDeclineOpen}
              session_id={schedule.interview_session.id}
            />
            <CancelScheduleDialog
              schedule={schedule}
              isCancelOpen={isCancelOpen}
              setIsCancelOpen={setIsCancelOpen}
            />
            <RequestRescheduleDialog
              meeting_id={schedule.interview_meeting.id}
              isRequestRescheduleOpen={isRequestRescheduleOpen}
              setIsRequestRescheduleOpen={setIsRequestRescheduleOpen}
              sessionRelation={sessionRelation}
              session_id={schedule.interview_session.id}
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
                  slotIcon={
                    <svg
                      width='12'
                      height='14'
                      viewBox='0 0 12 14'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M0.351562 7.375C0.132813 7.34375 0.015625 7.21094 0 6.97656V6.78906C0.09375 5.66406 0.523437 4.73438 1.28906 4C2.05469 3.28125 3 2.90625 4.125 2.875H9.16406L7.80469 1.65625C7.64844 1.48438 7.64062 1.30469 7.78125 1.11719C7.95312 0.960937 8.13281 0.953125 8.32031 1.09375L10.3828 2.96875C10.4609 3.04687 10.5 3.14062 10.5 3.25C10.5 3.35938 10.4609 3.45313 10.3828 3.53125L8.32031 5.40625C8.13281 5.54688 7.95312 5.53906 7.78125 5.38281C7.64062 5.19531 7.64844 5.01562 7.80469 4.84375L9.16406 3.625H4.125C3.20312 3.64063 2.42969 3.95312 1.80469 4.5625C1.17969 5.15625 0.828125 5.91406 0.75 6.83594V7.02344C0.71875 7.24219 0.585938 7.35938 0.351562 7.375ZM11.6484 6.625C11.8672 6.65625 11.9844 6.78906 12 7.02344V7.21094C11.9062 8.33594 11.4766 9.26562 10.7109 10C9.94531 10.7188 9 11.0938 7.875 11.125H2.83594L4.19531 12.3438C4.35156 12.5156 4.35938 12.6953 4.21875 12.8828C4.04688 13.0391 3.86719 13.0469 3.67969 12.9062L1.61719 11.0312C1.53906 10.9531 1.5 10.8594 1.5 10.75C1.5 10.6406 1.53906 10.5469 1.61719 10.4688L3.67969 8.59375C3.86719 8.45312 4.04688 8.46094 4.21875 8.61719C4.35938 8.80469 4.35156 8.98438 4.19531 9.15625L2.83594 10.375H7.875C8.79688 10.3594 9.57031 10.0469 10.1953 9.4375C10.8203 8.84375 11.1719 8.08594 11.25 7.16406V6.97656C11.2812 6.75781 11.4141 6.64062 11.6484 6.625Z'
                        fill='#337FBD'
                      />
                    </svg>
                  }
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
                  slotIcon={
                    <svg
                      width='12'
                      height='12'
                      viewBox='0 0 12 12'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M3.75 0.375V1.5H8.25V0.375C8.26562 0.140625 8.39062 0.015625 8.625 0C8.85938 0.015625 8.98438 0.140625 9 0.375V1.5H9.75C10.1719 1.51563 10.5234 1.66406 10.8047 1.94531C11.0859 2.22656 11.2344 2.57812 11.25 3V3.75V4.5V10.5C11.2344 10.9219 11.0859 11.2734 10.8047 11.5547C10.5234 11.8359 10.1719 11.9844 9.75 12H2.25C1.82812 11.9844 1.47656 11.8359 1.19531 11.5547C0.914062 11.2734 0.765625 10.9219 0.75 10.5V4.5V3.75V3C0.765625 2.57812 0.914062 2.22656 1.19531 1.94531C1.47656 1.66406 1.82812 1.51563 2.25 1.5H3V0.375C3.01562 0.140625 3.14062 0.015625 3.375 0C3.60938 0.015625 3.73438 0.140625 3.75 0.375ZM1.5 4.5V10.5C1.5 10.7188 1.57031 10.8984 1.71094 11.0391C1.85156 11.1797 2.03125 11.25 2.25 11.25H9.75C9.96875 11.25 10.1484 11.1797 10.2891 11.0391C10.4297 10.8984 10.5 10.7188 10.5 10.5V4.5H1.5ZM2.25 2.25C2.03125 2.25 1.85156 2.32031 1.71094 2.46094C1.57031 2.60156 1.5 2.78125 1.5 3V3.75H10.5V3C10.5 2.78125 10.4297 2.60156 10.2891 2.46094C10.1484 2.32031 9.96875 2.25 9.75 2.25H2.25ZM7.75781 6.63281L6.53906 7.875L7.75781 9.11719C7.91406 9.28906 7.91406 9.46094 7.75781 9.63281C7.58594 9.78906 7.41406 9.78906 7.24219 9.63281L6 8.41406L4.75781 9.63281C4.58594 9.78906 4.41406 9.78906 4.24219 9.63281C4.08594 9.46094 4.08594 9.28906 4.24219 9.11719L5.46094 7.875L4.24219 6.63281C4.08594 6.46094 4.08594 6.28906 4.24219 6.11719C4.41406 5.96094 4.58594 5.96094 4.75781 6.11719L6 7.33594L7.24219 6.11719C7.41406 5.96094 7.58594 5.96094 7.75781 6.11719C7.91406 6.28906 7.91406 6.46094 7.75781 6.63281Z'
                        fill='#D93F4C'
                      />
                    </svg>
                  }
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
