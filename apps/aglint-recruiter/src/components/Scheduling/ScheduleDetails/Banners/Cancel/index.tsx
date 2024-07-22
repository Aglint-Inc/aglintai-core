import { useRouter } from 'next/router';
import React from 'react';

import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import ROUTES from '@/src/utils/routing/routes';

import {
  setDateRange,
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../../CandidateDetails/SchedulingDrawer/store';
import { setRescheduleSessionIds } from '../../../CandidateDetails/store';
import { useScheduleDetails } from '../../hooks';
import { ScheduleMeeting } from '../../types';
import AdminCancel from './AdminCancel';
import CandidateCancel from './CandidateCancel';
import InterveiwerCancel from './InterveiwerCancel';

function CancelBannersScheduleDetails({
  cancelReasons,
  schedule,
  cancelUserId,
  setCancelUserId,
  setIsChangeInterviewerOpen,
}: {
  cancelReasons: ReturnType<typeof useScheduleDetails>['data']['cancel_data'];
  schedule: ScheduleMeeting;
  cancelUserId: string;
  setCancelUserId: React.Dispatch<React.SetStateAction<string>>;
  setIsChangeInterviewerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { userPermissions } = useAuthDetails();
  const onClickReschedule = (
    item: ReturnType<typeof useScheduleDetails>['data']['cancel_data'][0],
  ) => {
    setIsScheduleNowOpen(true);
    if (item.interview_session_cancel?.other_details?.dateRange?.start) {
      setDateRange({
        start_date: item.interview_session_cancel.other_details.dateRange.start,
        end_date: item.interview_session_cancel.other_details.dateRange.end,
      });
    }
    setRescheduleSessionIds([schedule.interview_session.id]);
    setStepScheduling('reschedule');
    router.push(
      ROUTES['/scheduling/application/[application_id]']({
        application_id: schedule.schedule.application_id,
      }),
    );
  };
  return (
    <>
      {userPermissions.permissions.scheduling_actions &&
        (schedule.interview_meeting.status === 'confirmed' ||
          schedule.interview_meeting.status === 'waiting' ||
          schedule.interview_meeting.status === 'cancelled') && (
          <>
            {cancelReasons?.map((item) => {
              if (item.interview_session_cancel?.cancel_user_id) {
                return (
                  <AdminCancel
                    key={item.interview_session_cancel.id}
                    item={item}
                    onClickReschedule={onClickReschedule}
                  />
                );
              }

              if (item.interview_session_cancel?.schedule_id) {
                return (
                  <CandidateCancel
                    key={item.interview_session_cancel.id}
                    item={item}
                    onClickReschedule={onClickReschedule}
                  />
                );
              }

              return (
                <InterveiwerCancel
                  key={item.interview_session_cancel.id}
                  cancelUserId={cancelUserId}
                  item={item}
                  schedule={schedule}
                  setCancelUserId={setCancelUserId}
                  setIsChangeInterviewerOpen={setIsChangeInterviewerOpen}
                />
              );
            })}
          </>
        )}
    </>
  );
}

export default CancelBannersScheduleDetails;
