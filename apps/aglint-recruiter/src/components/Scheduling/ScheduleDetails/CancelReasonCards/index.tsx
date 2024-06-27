import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { RescheduleCard } from '@/devlink3/RescheduleCard';
import MuiAvatar from '@/src/components/Common/MuiAvatar';
import { getFullName } from '@/src/utils/jsonResume';
import ROUTES from '@/src/utils/routing/routes';
import { supabase } from '@/src/utils/supabase/client';
import toast from '@/src/utils/toast';

import {
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../CandidateDetails/SelfSchedulingDrawer/store';
import { setRescheduleSessionIds } from '../../CandidateDetails/store';
import { useScheduleDetails } from '../hooks';
import { ScheduleMeeting } from '../types';

interface CancelReasonCardsProps {
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  schedule: ScheduleMeeting;
  setCancelUserId: React.Dispatch<React.SetStateAction<string>>;
  cancelUserId: string;
  setIsChangeInterviewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function CancelReasonCards({
  cancelReasons,
  schedule,
  setCancelUserId,
  cancelUserId,
  setIsChangeInterviewerOpen,
}: CancelReasonCardsProps) {
  const router = useRouter();
  const possibleUsers = schedule?.users.filter(
    (user) =>
      user.id !== cancelUserId && !user.interview_session_relation.is_confirmed,
  );
  const { refetch } = useScheduleDetails();

  const onClickIgnore = async (id: string) => {
    try {
      await supabase
        .from('interview_session_cancel')
        .update({ is_ignored: true })
        .eq('id', id);
      refetch();
    } catch {
      toast.error('Error ignoring cancel request');
    }
  };

  return (
    <Stack spacing={'var(--space-4)'}>
      {cancelReasons?.map((item) => {
        const isChangeInterviewerVisible =
          item.interview_session_cancel.session_relation_id &&
          schedule.interview_session.session_type != 'debrief' &&
          possibleUsers.length > 0;

        const isRescheduleVisible =
          item.interview_session_cancel.type === 'reschedule';

        return (
          <RescheduleCard
            textColorProps={{
              style: {
                color:
                  item.interview_session_cancel.type === 'reschedule'
                    ? '#703815'
                    : '#681219',
              },
            }}
            textName={
              item.interview_session_cancel.session_relation_id
                ? getFullName(
                    item.recruiter_user.first_name,
                    item.recruiter_user.last_name,
                  )
                : getFullName(
                    item.candidate?.first_name,
                    item.candidate?.last_name,
                  )
            }
            key={item.interview_session_cancel.id}
            slotProfileImage={
              item.interview_session_cancel.session_relation_id ? (
                <MuiAvatar
                  level={getFullName(
                    item.recruiter_user.first_name,
                    item.recruiter_user.last_name,
                  )}
                  src={item.recruiter_user.profile_image}
                  variant={'rounded-small'}
                />
              ) : (
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <rect width='16' height='16' rx='3' fill='#8D8D86' />
                  <rect
                    width='10.6667'
                    height='10.6667'
                    transform='translate(2.66666 2.66667)'
                    fill='white'
                    fill-opacity='0.01'
                  />
                  <path
                    fill-rule='evenodd'
                    clip-rule='evenodd'
                    d='M8 3.28889C6.57634 3.28889 5.42222 4.443 5.42222 5.86667C5.42222 7.04205 6.20888 8.03369 7.28443 8.34383C6.43534 8.4473 5.70707 8.74762 5.15845 9.2883C4.4602 9.97646 4.10668 11.0009 4.10668 12.3377C4.10668 12.5243 4.25791 12.6755 4.44446 12.6755C4.63101 12.6755 4.78224 12.5243 4.78224 12.3377C4.78224 11.1146 5.10426 10.2902 5.63265 9.76946C6.16203 9.24774 6.95235 8.97777 7.99997 8.97777C9.04759 8.97777 9.83794 9.24774 10.3674 9.76947C10.8957 10.2902 11.2178 11.1146 11.2178 12.3377C11.2178 12.5243 11.369 12.6755 11.5556 12.6755C11.7421 12.6756 11.8933 12.5243 11.8933 12.3378C11.8933 11.0009 11.5398 9.97646 10.8415 9.28829C10.2929 8.74763 9.56462 8.44731 8.71556 8.34384C9.79108 8.03371 10.5778 7.04206 10.5778 5.86667C10.5778 4.443 9.42367 3.28889 8 3.28889ZM6.09778 5.86667C6.09778 4.8161 6.94943 3.96444 8 3.96444C9.05057 3.96444 9.90222 4.8161 9.90222 5.86667C9.90222 6.91723 9.05057 7.76889 8 7.76889C6.94943 7.76889 6.09778 6.91723 6.09778 5.86667Z'
                    fill='white'
                  />
                </svg>
              )
            }
            onClickRescheduleNow={{
              onClick: () => {
                setIsScheduleNowOpen(true);
                setRescheduleSessionIds([schedule.interview_session.id]);
                setStepScheduling('reschedule');
                router.push(
                  ROUTES['/scheduling/application/[application_id]']({
                    application_id: schedule.schedule.application_id,
                  }),
                );
              },
            }}
            textReschedule={
              item.interview_session_cancel.schedule_id
                ? item.interview_session_cancel.type === 'reschedule'
                  ? 'requested a reschedule'
                  : 'cancelled this schedule'
                : item.interview_session_cancel.type === 'reschedule'
                  ? 'requested a reschedule'
                  : 'declined this schedule'
            }
            bgColorProps={{
              style: {
                backgroundColor:
                  item.interview_session_cancel.type === 'declined'
                    ? 'var(--error-3)'
                    : 'var(--accent-3)',
                borderColor:
                  item.interview_session_cancel.type === 'declined'
                    ? 'var(--error-6)'
                    : 'var(--accent-6)',
              },
            }}
            isButtonVisible={true}
            isChangeInterviewerVisible={isChangeInterviewerVisible}
            textReason={
              item.interview_session_cancel.reason +
              `${item.interview_session_cancel?.other_details?.dateRange ? item.interview_session_cancel.other_details.dateRange.start : ''}`
            }
            onClickChangeInterviewer={{
              onClick: () => {
                if (
                  dayjs().isBefore(dayjs(schedule.interview_meeting.start_time))
                ) {
                  setCancelUserId(item.recruiter_user.id);
                  setIsChangeInterviewerOpen(true);
                } else {
                  toast.warning(
                    'Cannot change interviewer after the meeting has started',
                  );
                }
              },
            }}
            isRescheduleBtnVisible={isRescheduleVisible}
            isIgnoreVisible={false}
            onClickIgnore={{
              onClick: () => {
                onClickIgnore(item.interview_session_cancel.id);
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export default CancelReasonCards;
