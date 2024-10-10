import { type CandReqSlotsType } from '@aglint/shared-types';
import { cn } from '@lib/utils';
import { Check } from 'lucide-react';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIDivider } from '@/components/Common/UIDivider';

import DayCardWrapper from '../../../../SelfSchedulingDrawer/_common/components/BodyDrawer/StepSlotOptions/DayCardWrapper';
import { setCalendarDate } from '../../contexts/AvailabilitySchedulingStore';
import { useAvailabilityContext } from '../../contexts/RequestAvailabilityContext';
import FinalScreen from '../FinalScreen';

function RequestAvailabilityBody({
  availableSlots,
}: {
  availableSlots: CandReqSlotsType[];
}) {
  const {
    selectedDayAvailableBlocks,
    selectedDateSlots,
    setSelectedDateSlots,
    selectedIndex,
    setSelectedIndex,
  } = useAvailabilityContext();
  const onClickSelect = (
    comb_id: string,
    item: CandReqSlotsType['selected_dates'][number],
  ) => {
    const selectedSlots = item.plans.filter(
      (ele) => ele.plan_comb_id === comb_id,
    );
    setSelectedDateSlots((prev: CandReqSlotsType[]) => {
      const round = selectedIndex + 1;
      const roundExists = prev.some((item) => item.current_round === round);

      if (roundExists) {
        return prev.map((ele) => {
          if (ele.current_round === round) {
            return {
              ...ele,
              selected_dates: [
                {
                  curr_date: item.curr_date,
                  plans: selectedSlots,
                },
              ],
            };
          }
          return ele;
        });
      } else {
        return [
          ...prev,
          {
            current_round: round,
            selected_dates: [
              {
                curr_date: item.curr_date,
                plans: selectedSlots,
              },
            ],
          },
        ];
      }
    });
  };
  const selectedIds = selectedDateSlots
    .map((ele) => ele.selected_dates)
    .flat()
    .map((ele) => ele.plans)
    .flat()
    .map((ele) => ele.plan_comb_id)
    .flat();

  return (
    <div className='flex w-[500px] flex-col gap-2 p-4'>
      <div className='mb-2 flex w-full'>
        {availableSlots &&
          [...availableSlots, {}].map((_, i) => {
            const firstIndex = 0;
            const lastIndex = [...availableSlots, {}].length - 1;
            return (
              <Stepper
                key={i}
                isLeftLine={i !== firstIndex}
                isRightLine={i !== lastIndex}
                textStepName={i === lastIndex ? 'Final' : `Day ${i + 1}`}
                isCurrent={selectedIndex === i}
                isCompleted={i < selectedIndex}
                onClickCompleted={() => {
                  if (i < lastIndex) {
                    setSelectedIndex(i);
                  }
                }}
              />
            );
          })}
      </div>
      <UIDivider />
      <div className='h-[calc(100vh - 123px)] flex flex-col gap-2 overflow-auto'>
        <ShowCode>
          <ShowCode.When isTrue={selectedIndex === availableSlots?.length}>
            <FinalScreen />
          </ShowCode.When>
          <ShowCode.Else>
            {selectedDayAvailableBlocks?.map((item, index) => {
              return (
                <DayCardWrapper
                  key={index}
                  isRadioNeeded={true}
                  selectedCombIds={selectedIds}
                  item={{
                    date_range: [item.curr_date],
                    plans: item.plans,
                  }}
                  onClickSelect={(id) => {
                    onClickSelect(id, item);
                  }}
                  isDisabled={false}
                  isDayCollapseNeeded={false}
                  index={index}
                  isSlotCollapseNeeded={true}
                  // eslint-disable-next-line @typescript-eslint/no-empty-function
                  setSelectedCombIds={() => {}}
                  isDayCheckboxNeeded={false}
                  isSlotCheckboxNeeded={false}
                  setCalendarDate={setCalendarDate}
                />
              );
            })}
          </ShowCode.Else>
        </ShowCode>
      </div>
    </div>
  );
}

export default RequestAvailabilityBody;

interface StepperProps {
  textStepName: string;
  isLeftLine?: boolean;
  isRightLine?: boolean;
  isCurrent?: boolean;
  isCompleted?: boolean;
  onClickCompleted?: () => void;
}

export function Stepper({
  textStepName,
  isLeftLine = true,
  isRightLine = true,
  isCurrent = false,
  isCompleted = false,
  onClickCompleted,
}: StepperProps) {
  return (
    <div
      className={`flex w-full flex-col ${!isLeftLine ? 'items-start' : !isRightLine ? 'items-end' : 'items-center'}`}
    >
      <div className='flex w-full items-center'>
        {isLeftLine && (
          <div
            className={cn(
              'h-0.5 w-full transition-all duration-200 ease-in-out',
              isCompleted || isCurrent ? 'bg-blue-500' : 'bg-gray-300',
            )}
          />
        )}
        <div
          className={cn(
            'flex h-8 min-w-8 items-center justify-center rounded-full border-2 transition-all duration-200 ease-in-out',
            isCompleted
              ? 'border-blue-500 bg-blue-500 text-white'
              : isCurrent
                ? 'border-blue-500 text-blue-500'
                : 'border-border text-gray-300',
          )}
          onClick={isCompleted ? onClickCompleted : undefined}
        >
          {isCompleted ? (
            <Check className='h-5 w-5' />
          ) : (
            <span>{/* You can add step number here if needed */}</span>
          )}
        </div>
        {isRightLine && (
          <div
            className={cn(
              'h-0.5 w-full transition-all duration-200 ease-in-out',
              isCompleted ? 'bg-blue-500' : 'bg-gray-300',
            )}
          />
        )}
      </div>
      <span
        className={cn(
          'mt-2 text-xs font-medium',
          isCurrent
            ? 'text-blue-500'
            : isCompleted
              ? 'text-blue-500'
              : 'text-muted-foreground',
        )}
      >
        {textStepName}
      </span>
    </div>
  );
}
