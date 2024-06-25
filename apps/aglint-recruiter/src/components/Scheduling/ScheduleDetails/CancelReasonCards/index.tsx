import { Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React from 'react';

import { GlobalIcon } from '@/devlink/GlobalIcon';
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
                <GlobalIcon iconName='account_circle' size={'6'} />
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
            textReason={item.interview_session_cancel.reason}
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
            isIgnoreVisible={true}
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
