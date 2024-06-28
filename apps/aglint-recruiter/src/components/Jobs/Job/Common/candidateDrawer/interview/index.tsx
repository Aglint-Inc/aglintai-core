import { useRouter } from 'next/router';
import type React from 'react';

import { JobDetailInterview } from '@/devlink/JobDetailInterview';
import { Skeleton } from '@/devlink2/Skeleton';
import { StatusBadge } from '@/devlink2/StatusBadge';
import { NewInterviewPlanCard } from '@/devlink3/NewInterviewPlanCard';
import { SkeletonNewInterviewPlanCard } from '@/devlink3/SkeletonNewInterviewPlanCard';
import IconScheduleType from '@/src/components/Scheduling/Candidates/ListCard/Icon';
import {
  getScheduleBgcolor,
  getScheduleType,
} from '@/src/components/Scheduling/Candidates/utils';
import {
  getScheduleDate,
  ScheduleProgressPillProps,
} from '@/src/components/Scheduling/Common/ScheduleProgress/scheduleProgressPill';
import { useApplication } from '@/src/context/ApplicationContext';
import ROUTES from '@/src/utils/routing/routes';

import { getBreakLabel } from '../../../Interview-Plan/utils';
import { EmptyState, Loader } from '../common';
import { Actions } from './actions';

const Interview = () => {
  const {
    application_id,
    interview: { data: sessions, status },
  } = useApplication();

  const { push } = useRouter();

  if (status === 'success' && (sessions ?? []).length === 0)
    return <EmptyState tab='Interview' />;

  return (
    <JobDetailInterview
      slotNewInterviewPlanCard={
        <>
          <Actions />
          <Content />
        </>
      }
      onClickViewScheduler={{
        style: { display: status === 'success' ? 'flex' : 'none' },
        onClick: () =>
          push(`/scheduling/application/${application_id ?? null}`),
      }}
    />
  );
};

export { Interview };

const Content = () => {
  const {
    interview: { data: sessions, status },
  } = useApplication();

  if (status === 'pending')
    return (
      <Loader count={4}>
        <SkeletonNewInterviewPlanCard slotLoader={<Skeleton />} />
      </Loader>
    );

  if (status === 'error') return <>Something went wrong</>;

  if (sessions.length === 0) return <EmptyState tab='Interview' />;

  return sessions.map((session, i) => (
    <InterviewSessionCard key={i} session={session} />
  ));
};

const InterviewSessionCard = ({
  session: { date = null, ...props },
}: {
  session: Omit<ScheduleProgressPillProps, 'position'> & {
    location?: string;
    meeting_id?: string;
  };
}) => {
  const { push } = useRouter();
  const { application_id } = useApplication();
  const isScheduleDate =
    (props.status === 'completed' || props.status === 'confirmed') && !!date;
  const scheduleDate = getScheduleDate(date);
  const backgroundColor = getScheduleBgcolor(props.status);
  const schedule_type = getScheduleType(props.schedule_type);
  const session_duration = getBreakLabel(props.session_duration);
  return (
    <NewInterviewPlanCard
      slotPlatformIcon={<IconScheduleType type={props.schedule_type} />}
      isTimeVisible={isScheduleDate}
      textMeetingPlatform={schedule_type}
      textLocation={props.location ?? '---'}
      textMeetingTitle={props.session_name}
      textTime={session_duration}
      textDate={scheduleDate}
      propsBgColorStatus={{
        style: {
          backgroundColor,
        },
      }}
      slotStatus={
        <StatusBadge
          isCancelledVisible={props.status === 'cancelled'}
          isConfirmedVisible={props.status === 'confirmed'}
          isWaitingVisible={props.status === 'waiting'}
          isCompletedVisible={props.status === 'completed'}
          isNotScheduledVisible={props.status === 'not_scheduled' || false}
        />
      }
      isPanelIconVisible={props.session_type === 'panel'}
      isOnetoOneIconVisible={props.session_type === 'individual'}
      isDebriefIconVisible={props.session_type === 'debrief'}
      isLocationVisible={props.schedule_type === 'in_person_meeting'}
      isDurationVisible={!!session_duration}
      textDuration={session_duration}
      isNotScheduledIconVisible={false}
      isDateVisible={false}
      isScheduleNowButtonVisible={false}
      isCheckboxVisible={false}
      isSelected={false}
      isThreeDotVisible={false}
      onClickCard={{
        style: { cursor: 'pointer' },
        onClick: () =>
          props?.meeting_id
            ? push(
                `${ROUTES['/scheduling/view']()}?meeting_id=${props.meeting_id}`,
              )
            : push(
                ROUTES['/scheduling/application/[application_id]']({
                  application_id,
                }),
              ),
      }}
      onClickDots={null}
      textDay={null}
      textMonth={null}
      slotCheckbox={<></>}
      slotEditOptionModule={<></>}
      slotScheduleNowButton={<></>}
    />
  );
};
