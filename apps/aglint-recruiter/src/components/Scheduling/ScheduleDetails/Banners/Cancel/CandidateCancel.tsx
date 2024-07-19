import { getFullName } from '@aglint/shared-utils';
import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { ButtonSolid } from '@/devlink/ButtonSolid';
import { GlobalBanner } from '@/devlink2/GlobalBanner';

import { useScheduleDetails } from '../../hooks';

function CandidateCancel({
  item,
  onClickReschedule,
}: {
  item: ReturnType<typeof useScheduleDetails>['data']['cancel_data'][0];
  onClickReschedule: (
    // eslint-disable-next-line no-unused-vars
    item: ReturnType<typeof useScheduleDetails>['data']['cancel_data'][0],
  ) => void;
}) {
  const isRescheduleVisible =
    item.interview_session_cancel.type === 'reschedule';
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
        textTitle={`${getFullName(
          item.candidate?.first_name,
          item.candidate?.last_name,
        )} ${
          item.interview_session_cancel.type === 'reschedule'
            ? 'requested a reschedule'
            : 'declined this schedule'
        }`}
        textDescription={`Reason: ${item.interview_session_cancel.reason}  ${item.interview_session_cancel?.other_details?.dateRange ? ` from ${dayjsLocal(item.interview_session_cancel.other_details.dateRange.start).format('DD MMM')} - ${dayjsLocal(item.interview_session_cancel.other_details.dateRange.end).format('DD MMM')}` : ''}`}
        slotButtons={
          <>
            {isRescheduleVisible && (
              <ButtonSolid
                size={'1'}
                textButton={'Reschedule Now'}
                onClickButton={{
                  onClick: () => {
                    onClickReschedule(item);
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

export default CandidateCancel;
