import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { RescheduleCard } from '@/devlink3/RescheduleCard';
import { ScheduleButton } from '@/devlink3/ScheduleButton';
import CandidateDefaultIcon from '@/src/components/Common/Icons/CandidateDefaultIcon';
import ROUTES from '@/src/utils/routing/routes';

import IconCancelSchedule from '../../../ScheduleDetails/Icons/IconCancelSchedule';
import IconReschedule from '../../../ScheduleDetails/Icons/IconReschedule';
import {
  setDateRange,
  setIsScheduleNowOpen,
  setStepScheduling,
} from '../../SchedulingDrawer/store';
import {
  setMultipleCancelOpen,
  setRescheduleSessionIds,
  setSelectedApplicationLog,
  useSchedulingApplicationStore
} from '../../store';
import BookingConfirmation from './BookingConfirmation';

function SlotContent({ act }: { act: DatabaseTable['application_logs'] }) {
  const router = useRouter();
  const { selectedApplication,  } =
    useSchedulingApplicationStore((state) => ({
      selectedApplication: state.selectedApplication,
    }));

  if (act.metadata.type === 'booking_confirmation') {
    <BookingConfirmation act={act} />;
  } else if (act.metadata.type === 'candidate_response_self_schedule') {
    const rescheduleDetails = {
      response_type: act.metadata.response_type,
      reason: act.metadata.reason,
      other_details: act.metadata.other_details,
      filter_id: act.metadata.filter_id,
      session_ids: act.metadata.session_ids,
    };

    return (
      <Stack spacing={2} width={'100%'}>
        <RescheduleCard
          textColorProps={{
            style: {
              color:
                rescheduleDetails.response_type === 'reschedule'
                  ? '#703815'
                  : '#681219',
            },
          }}
          isButtonVisible={false}
          textName={selectedApplication?.candidates?.first_name}
          textReschedule={
            rescheduleDetails.response_type === 'reschedule'
              ? 'requested a reschedule'
              : 'cancelled this schedule'
          }
          slotProfileImage={<CandidateDefaultIcon size={20} />}
          isChangeInterviewerVisible={false}
          textReason={rescheduleDetails.reason}
          isRescheduleBtnVisible={false}
        />

        {rescheduleDetails?.filter_id &&
          act?.metadata?.action === 'waiting' && (
            <Stack direction={'row'} spacing={2}>
              {rescheduleDetails.response_type === 'reschedule' && (
                <ScheduleButton
                  textLabel={'Reschedule'}
                  slotIcon={<IconReschedule />}
                  onClickProps={{
                    onClick: () => {
                      setStepScheduling('reschedule');
                      setSelectedApplicationLog(act);
                      setRescheduleSessionIds(rescheduleDetails.session_ids);
                      setIsScheduleNowOpen(true);
                      setDateRange({
                        start_date:
                          rescheduleDetails.other_details.dateRange.start,
                        end_date: rescheduleDetails.other_details.dateRange.end,
                      });
                    },
                  }}
                />
              )}
              {rescheduleDetails.response_type === 'cancel' && (
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
