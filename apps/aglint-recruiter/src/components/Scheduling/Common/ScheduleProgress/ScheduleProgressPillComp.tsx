import { type DB } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { type Ref, forwardRef, memo } from 'react';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GlobalIcon } from '@/devlink/GlobalIcon';
import { ProgressHoverCard } from '@/devlink/ProgressHoverCard';
import { ScheduleProgressPill as ScheduleProgressPillDev } from '@/devlink/ScheduleProgressPill';
import { StatusBadge } from '@/devlink2/StatusBadge';
import IconScheduleType from '@/src/components/Common/Icons/IconScheduleType';
import { getBreakLabel } from '@/src/components/Jobs/Job/Interview-Plan/utils';

import { getScheduleType } from '../../../../utils/scheduling/colors_and_enums';

type Enums = DB['public']['Enums'];

export type ScheduleProgressPillProps = {
  session_name: string;
  session_duration: number;
  status: Enums['interview_schedule_status'];
  session_type: Enums['session_type'];
  schedule_type: Enums['interview_schedule_type'];
  position?: 'starting' | 'ending' | 'middle' | 'lone';
  date?: {
    start_time: string;
    end_time: string;
  };
};

const ScheduleProgressPill = memo(
  forwardRef(
    (
      { date = null, position = 'middle', ...props }: ScheduleProgressPillProps,
      ref: Ref<HTMLDivElement>,
    ) => {
      const isStarting = position !== 'ending' && position !== 'lone';
      const isEnding = position !== 'starting' && position !== 'lone';
      const isScheduleDate =
        (props.status === 'completed' || props.status === 'confirmed') &&
        !!date;
      const scheduleDate = getScheduleDate(date);
      const backgroundColor = statusToColor(props.status);
      const scheduleType = getScheduleType(props.schedule_type);
      const duration = getBreakLabel(props.session_duration);
      return (
        <Stack ref={ref}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Stack>
                  <ScheduleProgressPillDev
                    isEnding={isEnding}
                    isStarting={isStarting}
                    styleBgColor={{ style: { backgroundColor } }}
                    slotProgressIcon={<ProgressIcon status={props.status} />}
                  />
                </Stack>
              </TooltipTrigger>
              <TooltipContent>
                <Stack>
                  <ProgressHoverCard
                    isScheduleDate={isScheduleDate}
                    textScheduleDate={scheduleDate}
                    slotInterviewTypeIcon={
                      <SessionIcon session_type={props.session_type} />
                    }
                    slotMeetingTypeIcon={
                      <IconScheduleType type={props.schedule_type} />
                    }
                    textMeetingType={scheduleType}
                    textScheduleName={props.session_name}
                    textDuration={duration}
                    slotScheduleStatus={
                      <ScheduleStatus status={props.status} />
                    }
                  />
                </Stack>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Stack>
      );
    },
  ),
);
ScheduleProgressPill.displayName = 'ScheduleProgressPill';
export default ScheduleProgressPill;

const ScheduleStatus = memo(
  ({ status }: Pick<ScheduleProgressPillProps, 'status'>) => {
    return (
      <StatusBadge
        isCancelledVisible={status === 'cancelled'}
        isConfirmedVisible={status === 'confirmed'}
        isWaitingVisible={status === 'waiting'}
        isCompletedVisible={status === 'completed'}
        isNotScheduledVisible={status === 'not_scheduled'}
      />
    );
  },
);
ScheduleStatus.displayName = 'ScheduleStatus';

export const ProgressIcon = ({
  status,
}: Pick<ScheduleProgressPillProps, 'status'>) => {
  switch (status) {
    case 'waiting':
      return (
        <Stack style={{ color: 'var(--warning-11)' }}>
          <WaitingIcon />
        </Stack>
      );
    case 'confirmed':
      return (
        <Stack style={{ color: 'var(--blue-11)' }}>
          <ConfirmedIcon />
        </Stack>
      );
    case 'completed':
      return (
        <Stack style={{ color: 'var(--success-11)' }}>
          <CompletedIcon />
        </Stack>
      );
    case 'cancelled':
      return (
        <Stack style={{ color: 'var(--error-11)' }}>
          <CancelledIcon />
        </Stack>
      );
    default:
      return (
        <Stack style={{ color: 'var(--neutral-9)' }}>
          <NotScheduledIcon />
        </Stack>
      );
  }
};
ProgressIcon.displayName = 'ProgressIcon';

export const SessionIcon = ({
  session_type,
}: Pick<ScheduleProgressPillProps, 'session_type'>) => {
  switch (session_type) {
    case 'debrief':
      return <DebriefSessionIcon />;
    case 'individual':
      return <IndividualSessionIcon />;
    case 'panel':
      return <PanelSessionIcon />;
  }
};
SessionIcon.displayName = 'SessionIcon';

const CompletedIcon = () => {
  return <GlobalIcon iconName='event_available' weight={'medium'} />;
};

const WaitingIcon = () => {
  return <GlobalIcon iconName='calendar_clock' weight={'medium'} />;
};

const ConfirmedIcon = () => {
  return <GlobalIcon iconName='event_upcoming' weight={'medium'} />;
};

const CancelledIcon = () => {
  return <GlobalIcon iconName='event_busy' weight={'medium'} />;
};

const NotScheduledIcon = () => {
  return <GlobalIcon iconName='hourglass_empty' weight={'medium'} />;
};

const IndividualSessionIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.5 4H19.5C20.2083 4.02083 20.8021 4.26042 21.2812 4.71875C21.7396 5.19792 21.9792 5.79167 22 6.5V17.5C21.9792 18.2083 21.7396 18.8021 21.2812 19.2812C20.8021 19.7396 20.2083 19.9792 19.5 20H4.5C3.79167 19.9792 3.19792 19.7396 2.71875 19.2812C2.26042 18.8021 2.02083 18.2083 2 17.5V6.5C2.02083 5.79167 2.26042 5.19792 2.71875 4.71875C3.19792 4.26042 3.79167 4.02083 4.5 4ZM3 6.5V17.5C3.02083 17.9167 3.16667 18.2708 3.4375 18.5625C3.72917 18.8333 4.08333 18.9792 4.5 19H19.5C19.9167 18.9792 20.2708 18.8333 20.5625 18.5625C20.8333 18.2708 20.9792 17.9167 21 17.5V6.5C20.9792 6.08333 20.8333 5.72917 20.5625 5.4375C20.2708 5.16667 19.9167 5.02083 19.5 5H4.5C4.08333 5.02083 3.72917 5.16667 3.4375 5.4375C3.16667 5.72917 3.02083 6.08333 3 6.5ZM11 10C11 10.2917 11.0938 10.5312 11.2812 10.7188C11.4688 10.9062 11.7083 11 12 11C12.2917 11 12.5312 10.9062 12.7188 10.7188C12.9062 10.5312 13 10.2917 13 10C13 9.70833 12.9062 9.46875 12.7188 9.28125C12.5312 9.09375 12.2917 9 12 9C11.7083 9 11.4688 9.09375 11.2812 9.28125C11.0938 9.46875 11 9.70833 11 10ZM14 10C13.9792 10.75 13.6458 11.3229 13 11.7188C12.3333 12.0938 11.6667 12.0938 11 11.7188C10.3542 11.3229 10.0208 10.75 10 10C10.0208 9.25 10.3542 8.67708 11 8.28125C11.6667 7.90625 12.3333 7.90625 13 8.28125C13.6458 8.67708 13.9792 9.25 14 10ZM13.25 14H10.75C10.1042 14.0417 9.69792 14.375 9.53125 15H14.4688C14.3021 14.375 13.8958 14.0417 13.25 14ZM10.75 13H13.25C13.8958 13.0208 14.4271 13.2396 14.8438 13.6562C15.2604 14.0729 15.4792 14.6042 15.5 15.25C15.4583 15.7083 15.2083 15.9583 14.75 16H9.25C8.79167 15.9583 8.54167 15.7083 8.5 15.25C8.52083 14.6042 8.73958 14.0729 9.15625 13.6562C9.57292 13.2396 10.1042 13.0208 10.75 13Z'
        fill='#2F3941'
      ></path>
    </svg>
  );
};

const PanelSessionIcon = () => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M4.5 4H19.5C20.2083 4.02083 20.8021 4.26042 21.2812 4.71875C21.7396 5.19792 21.9792 5.79167 22 6.5V17.5C21.9792 18.2083 21.7396 18.8021 21.2812 19.2812C20.8021 19.7396 20.2083 19.9792 19.5 20H4.5C3.79167 19.9792 3.19792 19.7396 2.71875 19.2812C2.26042 18.8021 2.02083 18.2083 2 17.5V6.5C2.02083 5.79167 2.26042 5.19792 2.71875 4.71875C3.19792 4.26042 3.79167 4.02083 4.5 4ZM3 6.5V17.5C3.02083 17.9167 3.16667 18.2708 3.4375 18.5625C3.72917 18.8333 4.08333 18.9792 4.5 19H19.5C19.9167 18.9792 20.2708 18.8333 20.5625 18.5625C20.8333 18.2708 20.9792 17.9167 21 17.5V6.5C20.9792 6.08333 20.8333 5.72917 20.5625 5.4375C20.2708 5.16667 19.9167 5.02083 19.5 5H4.5C4.08333 5.02083 3.72917 5.16667 3.4375 5.4375C3.16667 5.72917 3.02083 6.08333 3 6.5ZM11 10C11 10.2917 11.0938 10.5312 11.2812 10.7188C11.4688 10.9062 11.7083 11 12 11C12.2917 11 12.5312 10.9062 12.7188 10.7188C12.9062 10.5312 13 10.2917 13 10C13 9.70833 12.9062 9.46875 12.7188 9.28125C12.5312 9.09375 12.2917 9 12 9C11.7083 9 11.4688 9.09375 11.2812 9.28125C11.0938 9.46875 11 9.70833 11 10ZM14 10C13.9792 10.75 13.6458 11.3229 13 11.7188C12.3333 12.0938 11.6667 12.0938 11 11.7188C10.3542 11.3229 10.0208 10.75 10 10C10.0208 9.25 10.3542 8.67708 11 8.28125C11.6667 7.90625 12.3333 7.90625 13 8.28125C13.6458 8.67708 13.9792 9.25 14 10ZM13.25 14H10.75C10.1042 14.0417 9.69792 14.375 9.53125 15H14.4688C14.3021 14.375 13.8958 14.0417 13.25 14ZM10.75 13H12H13.25C13.8958 13.0208 14.4271 13.2396 14.8438 13.6562C15.2604 14.0729 15.4792 14.6042 15.5 15.25C15.4583 15.7083 15.2083 15.9583 14.75 16H9.25C8.79167 15.9583 8.54167 15.7083 8.5 15.25C8.52083 14.6042 8.73958 14.0729 9.15625 13.6562C9.57292 13.2396 10.1042 13.0208 10.75 13ZM7 9.5C7.02083 9.8125 7.1875 9.97917 7.5 10C7.79167 9.97917 7.95833 9.8125 8 9.5C7.95833 9.1875 7.79167 9.02083 7.5 9C7.1875 9.02083 7.02083 9.1875 7 9.5ZM9 9.5C8.97917 10.0625 8.72917 10.5 8.25 10.8125C7.75 11.0625 7.25 11.0625 6.75 10.8125C6.27083 10.5 6.02083 10.0625 6 9.5C6.02083 8.9375 6.27083 8.5 6.75 8.1875C7.25 7.9375 7.75 7.9375 8.25 8.1875C8.72917 8.5 8.97917 8.9375 9 9.5ZM6 13.75V14C5.97917 14.3125 5.8125 14.4792 5.5 14.5C5.1875 14.4792 5.02083 14.3125 5 14V13.75C5.02083 13.25 5.1875 12.8333 5.5 12.5C5.83333 12.1875 6.25 12.0208 6.75 12H8.5C8.8125 12.0208 8.97917 12.1875 9 12.5C8.97917 12.8125 8.8125 12.9792 8.5 13H6.75C6.29167 13.0417 6.04167 13.2917 6 13.75ZM16.5 9C16.2083 9.02083 16.0417 9.1875 16 9.5C16.0417 9.8125 16.2083 9.97917 16.5 10C16.8125 9.97917 16.9792 9.8125 17 9.5C16.9792 9.1875 16.8125 9.02083 16.5 9ZM16.5 11C15.9375 10.9792 15.5104 10.7292 15.2188 10.25C14.9479 9.75 14.9479 9.25 15.2188 8.75C15.5104 8.27083 15.9375 8.02083 16.5 8C17.0625 8.02083 17.5 8.27083 17.8125 8.75C18.0833 9.25 18.0833 9.75 17.8125 10.25C17.5 10.7292 17.0625 10.9792 16.5 11ZM17.25 13H15.5C15.1875 12.9792 15.0208 12.8125 15 12.5C15.0208 12.1875 15.1875 12.0208 15.5 12H17.25C17.75 12.0208 18.1667 12.1875 18.5 12.5C18.8125 12.8333 18.9792 13.25 19 13.75V14C18.9792 14.3125 18.8125 14.4792 18.5 14.5C18.1875 14.4792 18.0208 14.3125 18 14V13.75C17.9583 13.2917 17.7083 13.0417 17.25 13Z'
        fill='#2F3941'
      ></path>
    </svg>
  );
};

const DebriefSessionIcon = () => {
  return <GlobalIcon iconName='text_snippet' />;
};

export const statusToColor = (status: ScheduleProgressPillProps['status']) => {
  switch (status) {
    case 'waiting':
      return 'var(--warning-4)';
    case 'confirmed':
      return 'var(--blue-4)';
    case 'completed':
      return 'var(--success-4)';
    case 'cancelled':
      return 'var(--error-4)';
    default:
      return 'var(--neutral-4)';
  }
};

export const getScheduleDate = (date: ScheduleProgressPillProps['date']) => {
  if (!date) return '---';
  const start_time = `${dayjs(date.start_time).format('MMM')} ${dayjs(
    date.start_time,
  ).format('DD')}, ${dayjs(date.start_time).format('YYYY')}, ${dayjs(
    date.start_time,
  ).format('hh:mm A')}`;
  const end_time = `${dayjs(date.end_time).format('MMM')} ${dayjs(
    date.end_time,
  ).format('DD')}, ${dayjs(date.end_time).format('YYYY')}, ${dayjs(
    date.end_time,
  ).format('hh:mm A')}`;
  return `${start_time} - ${end_time}`;
};
