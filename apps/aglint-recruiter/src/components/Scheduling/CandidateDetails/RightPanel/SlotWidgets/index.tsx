import { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { RescheduleCard } from '@/devlink3/RescheduleCard';
import ROUTES from '@/src/utils/routing/routes';

import {
  setDateRange,
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../SchedulingDrawer/store';
import {
  setMultipleCancelOpen,
  setRescheduleSessionIds,
  setSelectedApplicationLog,
  useSchedulingApplicationStore,
} from '../../store';
import BookingConfirmation from './BookingConfirmation';

function SlotContent({ act }: { act: DatabaseTable['application_logs'] }) {
  const router = useRouter();
  const { initialSessions } = useSchedulingApplicationStore((state) => ({
    selectedApplication: state.selectedApplication,
    initialSessions: state.initialSessions,
  }));

  if (act.metadata.type === 'booking_confirmation') {
    return <BookingConfirmation act={act} />;
  } else if (act.metadata.type === 'candidate_response_self_schedule') {
    const rescheduleDetails = {
      response_type: act.metadata.response_type,
      reason: act.metadata.reason,
      other_details: act.metadata.other_details,
      filter_id: act.metadata.filter_id,
      session_ids: act.metadata.session_ids,
    };

    const isButtonVisible = act.metadata.session_ids.every(
      (id) =>
        initialSessions.find((ses) => ses.interview_session.id === id)
          ?.interview_meeting?.status === 'confirmed',
    );
    const checkDate = dayjsLocal(
      act.metadata.other_details?.dateRange?.end,
    ).isBefore(dayjsLocal().add(-1, 'day'));

    return (
      <Stack spacing={2} width={'100%'}>
        <RescheduleCard
          slotAdditionalNotes={rescheduleDetails.other_details.note}
          isNotesVisible={Boolean(rescheduleDetails.other_details.note)}
          textReason={rescheduleDetails.reason}
          slotDateReason={
            <>
              {`${dayjsLocal(
                rescheduleDetails.other_details?.dateRange?.start,
              ).format('DD MMMM, YYYY')} - ${dayjsLocal(
                rescheduleDetails.other_details?.dateRange?.end,
              ).format('DD MMMM, YYYY')}`}
            </>
          }
        />
        {checkDate && (
          <GlobalBannerInline
            color={'warning'}
            textContent={'Proposed date is expired'}
            slotButton={<></>}
          />
        )}
        {!checkDate &&
          isButtonVisible &&
          rescheduleDetails?.filter_id &&
          act?.metadata?.action === 'waiting' && (
            <Stack direction={'row'} spacing={2}>
              {rescheduleDetails.response_type === 'reschedule' && (
                <ButtonSoft
                  size={1}
                  textButton={'Reschedule'}
                  onClickButton={{
                    onClick: () => {
                      setStepScheduling('reschedule');
                      setSelectedApplicationLog(act);
                      setRescheduleSessionIds(rescheduleDetails.session_ids);
                      setIsScheduleNowOpen(true);
                      setDateRange({
                        start_date:
                          rescheduleDetails.other_details.dateRange?.start,
                        end_date: rescheduleDetails.other_details.dateRange.end,
                      });
                    },
                  }}
                />
              )}
              {rescheduleDetails.response_type === 'cancel' && (
                <ButtonSoft
                  size={1}
                  color={'neutral'}
                  textButton={'Cancel Schedule'}
                  onClickButton={{
                    onClick: () => {
                      setSelectedApplicationLog(act);
                      setMultipleCancelOpen(true);
                    },
                  }}
                />
              )}
            </Stack>
          )}
      </Stack>
    );
  } else if (act.metadata.type === 'interviewer_decline') {
    const meeting_id = act.metadata.meeting_id;
    return (
      <Stack direction={'row'}>
        <ButtonSurface
          size={1}
          textButton={'View details'}
          onClickButton={{
            onClick: () => {
              router.push(
                ROUTES['/scheduling/view']() +
                  `?meeting_id=${meeting_id}&tab=candidate_details`,
              );
            },
          }}
        />
      </Stack>
    );
  } else {
    return null;
  }
}

export default SlotContent;
