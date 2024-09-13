import { dayjsLocal } from '@aglint/shared-utils/src/scheduling/dayjsLocal';
import { Lightbulb } from 'lucide-react';

import { useSelfSchedulingFlowStore } from '../../../store/store';

function ErrorsFindAvailibility() {
  const { noOptions, noSlotReasons } = useSelfSchedulingFlowStore((state) => ({
    noOptions: state.noOptions,
    noSlotReasons: state.noSlotReasons,
  }));

  return (
    <>
      {noOptions && (
        <div className='bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4'>
          <div className='flex'>
            <div className='flex-shrink-0'>
              <Lightbulb className='w-6 h-6 text-purple-500 flex-shrink-0' />
            </div>
            <div className='ml-3'>
              <p className='text-sm font-medium text-yellow-700'>
                No available slots found. Please try expanding the date ranges.
              </p>
              {noSlotReasons.length > 0 && (
                <ul className='mt-2 text-sm text-yellow-600'>
                  {noSlotReasons.map((error) => {
                    const formatDateTange = error.date_range.map((date) => {
                      return dayjsLocal(date).format('MMM DD');
                    });
                    const allReasons = error.plans
                      .flatMap((plan) => plan.no_slot_reasons)
                      .flatMap((reason) => reason.reason);
                    return (
                      <li key={error.date_range.join()} className='mb-1'>
                        <span className='font-semibold'>
                          {formatDateTange.join(', ')}:
                        </span>{' '}
                        {allReasons.join(', ')}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ErrorsFindAvailibility;
