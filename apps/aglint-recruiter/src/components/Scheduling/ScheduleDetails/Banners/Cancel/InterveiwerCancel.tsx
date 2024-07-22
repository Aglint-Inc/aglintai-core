import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { useRouter } from 'next/router';
import React from 'react';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';
import ROUTES from '@/src/utils/routing/routes';
import toast from '@/src/utils/toast';

import {
  setDateRange,
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../../CandidateDetails/SchedulingDrawer/store';
import { setRescheduleSessionIds } from '../../../CandidateDetails/store';
import { useScheduleDetails } from '../../hooks';
import { ScheduleMeeting } from '../../types';

function InterveiwerCancel({
  item,
  schedule,
  cancelUserId,
  setCancelUserId,
  setIsChangeInterviewerOpen,
}: {
  item: ReturnType<typeof useScheduleDetails>['data']['cancel_data'][0];
  schedule: ScheduleMeeting;
  cancelUserId: string;
  setCancelUserId: React.Dispatch<React.SetStateAction<string>>;
  setIsChangeInterviewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();

  const possibleUsers = schedule?.users.filter(
    (user) =>
      user.id !== cancelUserId && !user.interview_session_relation.is_confirmed,
  );

  const isRescheduleVisible =
    item.interview_session_cancel.type === 'reschedule';

  const isChangeInterviewerVisible =
    item.interview_session_cancel.session_relation_id &&
    schedule.interview_session.session_type != 'debrief' &&
    possibleUsers.length > 0;

  return (
    <>
      <GlobalBanner
        isAdditionalNotes={!!item.interview_session_cancel.other_details?.note}
        textNotes={item.interview_session_cancel.other_details?.note}
        color={
          item.interview_session_cancel.type === 'reschedule'
            ? 'warning'
            : item.interview_session_cancel.type === 'declined'
              ? 'error'
              : 'neutral'
        }
        textTitle={`${
          item.interview_session_cancel.session_relation_id
            ? getFullName(
                item.recruiter_user.first_name,
                item.recruiter_user.last_name,
              )
            : getFullName(item.candidate?.first_name, item.candidate?.last_name)
        } ${
          item.interview_session_cancel.schedule_id
            ? item.interview_session_cancel.type === 'reschedule'
              ? 'requested a reschedule'
              : 'cancelled this schedule'
            : item.interview_session_cancel.type === 'reschedule'
              ? 'requested a reschedule'
              : 'declined this schedule'
        }`}
        textDescription={`Reason: ${item.interview_session_cancel.reason}  ${item.interview_session_cancel?.other_details?.dateRange ? ` from ${dayjsLocal(item.interview_session_cancel.other_details.dateRange.start).format('DD MMM')} - ${dayjsLocal(item.interview_session_cancel.other_details.dateRange.end).format('DD MMM')}` : ''}`}
        slotButtons={
          <>
            {isChangeInterviewerVisible && (
              <ButtonSolid
                size={'1'}
                color={'error'}
                textButton={'Change Interviewer'}
                onClickButton={{
                  onClick: () => {
                    if (
                      dayjsLocal().isBefore(
                        dayjsLocal(schedule.interview_meeting.start_time),
                      )
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
              />
            )}
            {isRescheduleVisible && (
              <ButtonSolid
                size={'1'}
                textButton={'Reschedule Now'}
                onClickButton={{
                  onClick: () => {
                    setIsScheduleNowOpen(true);
                    if (
                      item.interview_session_cancel?.other_details?.dateRange
                        ?.start
                    ) {
                      setDateRange({
                        start_date:
                          item.interview_session_cancel.other_details.dateRange
                            .start,
                        end_date:
                          item.interview_session_cancel.other_details.dateRange
                            .end,
                      });
                    }
                    setRescheduleSessionIds([schedule.interview_session.id]);
                    setStepScheduling('reschedule');
                    router.push(
                      ROUTES['/scheduling/application/[application_id]']({
                        application_id: schedule.schedule.application_id,
                      }),
                    );
                  },
                }}
              />
            )}
          </>
        }
        iconName={
          item.interview_session_cancel.type === 'declined'
            ? 'event_busy'
            : item.interview_session_cancel.type === 'reschedule'
              ? 'event_repeat'
              : ''
        }
      />
    </>
  );
}

export default InterveiwerCancel;
