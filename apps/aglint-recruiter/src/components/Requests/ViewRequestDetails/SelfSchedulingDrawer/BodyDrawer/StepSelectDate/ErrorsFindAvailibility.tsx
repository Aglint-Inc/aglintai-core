import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';

import { GlobalInfo } from '@/devlink2/GlobalInfo';

import { useSelfSchedulingFlowStore } from '../../store';

function ErrorsFindAvailibility() {
  const { noOptions, noSlotReasons } = useSelfSchedulingFlowStore((state) => ({
    noOptions: state.noOptions,
    noSlotReasons: state.noSlotReasons,
  }));

  return (
    <>
      {noOptions && (
        <GlobalInfo
          color={'warning'}
          textTitle={
            'No available slots found. Please try expanding the date ranges.'
          }
          textDescription={null}
          showWidget={noSlotReasons.length > 0}
          slotWidget={
            <ul>
              {noSlotReasons.map((error) => {
                const formatDateTange = error.date_range.map((date) => {
                  return dayjsLocal(date).format('MMM DD');
                });
                const allReasons = error.plans
                  .flatMap((plan) => plan.no_slot_reasons)
                  .flatMap((reason) => reason.reason);
                return (
                  <li key={error.date_range.join()}>
                    {formatDateTange.join(', ')} : {allReasons.join(', ')}
                  </li>
                );
              })}
            </ul>
          }
        />
      )}
    </>
  );
}

export default ErrorsFindAvailibility;
