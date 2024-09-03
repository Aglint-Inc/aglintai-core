import type { DatabaseTable } from '@aglint/shared-types';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';

import { ButtonSurface } from '@/devlink/ButtonSurface';
import { GlobalBannerInline } from '@/devlink2/GlobalBannerInline';
import { RescheduleCard } from '@/devlink3/RescheduleCard';
import ROUTES from '@/src/utils/routing/routes';

import BookingConfirmation from './BookingConfirmation';

function SlotContent({ act }: { act: DatabaseTable['application_logs'] }) {
  const router = useRouter();

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
