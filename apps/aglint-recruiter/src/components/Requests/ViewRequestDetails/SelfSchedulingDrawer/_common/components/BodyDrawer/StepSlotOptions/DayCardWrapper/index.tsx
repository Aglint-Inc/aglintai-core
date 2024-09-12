import { type MultiDayPlanType } from '@aglint/shared-types';
import { Checkbox } from '@components/ui/checkbox';
import { Collapsible, CollapsibleContent } from '@components/ui/collapsible';
import { RadioGroup, RadioGroupItem } from '@components/ui/radio-group';
import dayjs from 'dayjs';
import { ChevronDown } from 'lucide-react';
import React, { type Dispatch, useEffect, useMemo, useState } from 'react';

import { UIButton } from '@/components/Common/UIButton';
import UITypography from '@/components/Common/UITypography';

import { DayCard } from '../../../ui/DayCard';
import { EmptySlotReason } from '../../../ui/EmptySlotReason';
import { ScheduleOption } from '../../../ui/ScheduleOption';
import SingleDayCard from '../SingleDayCard';
import DayCardConflicts from './DayCardConflicts';

const NUMBER_OF_SLOTS_TO_DISPLAY = 10;

function DayCardWrapper({
  isRadioNeeded = true,
  item,
  onClickSelect,
  selectedCombIds,
  isDayCollapseNeeded = true,
  isSlotCollapseNeeded = true,
  isDisabled = false,
  isDayCheckboxNeeded = true,
  isSlotCheckboxNeeded = true,
  index,
  setSelectedCombIds,
  isAutoCollapse = true,
  setCalendarDate,
}: {
  isRadioNeeded: boolean;
  item: MultiDayPlanType;
  onClickSelect?: (_comb_id: string) => void;
  selectedCombIds: string[];
  isDayCollapseNeeded?: boolean;
  isSlotCollapseNeeded?: boolean;
  isDisabled?: boolean;
  isDayCheckboxNeeded?: boolean;
  isSlotCheckboxNeeded?: boolean;
  index: number;
  setSelectedCombIds?: Dispatch<React.SetStateAction<string[]>>;
  isAutoCollapse?: boolean;
  setCalendarDate?: Dispatch<React.SetStateAction<string>>;
}) {
  const dates = item?.date_range || [];
  const header = dates
    .map((date) => dayjs(date).format('MMMM DD dddd'))
    .join(', ');
  const slots = item?.plans || [];
  const isMultiDay = dates.length > 1 ? true : false;

  const [collapse, setCollapse] = useState(false);
  const [displayedSlots, setDisplayedSlots] = useState(
    NUMBER_OF_SLOTS_TO_DISPLAY,
  );

  const loadMoreSlots = () => {
    setDisplayedSlots((prevCount) => prevCount + NUMBER_OF_SLOTS_TO_DISPLAY);
  };

  const slotsWithDaySessions = useMemo(() => {
    return slots.map((slot) => {
      const daySessions = dates.map((date) => {
        return {
          date: date,
          sessions: slot.sessions.filter(
            (session) =>
              dayjs(session.start_time).format('MMMM DD') ===
              dayjs(date).format('MMMM DD'),
          ),
        };
      });
      return {
        daySessions,
        plan_comb_id: slot.plan_comb_id,
      };
    });
  }, [slots, dates]);

  const isSelected = slotsWithDaySessions.some((slot) =>
    selectedCombIds.includes(slot.plan_comb_id),
  );

  const noOfTotalSlots = slotsWithDaySessions.length;

  const noOfSelectedSlots = slotsWithDaySessions.filter((slot) =>
    selectedCombIds.includes(slot.plan_comb_id),
  ).length;

  useEffect(() => {
    if (isAutoCollapse && index === 0) {
      setCollapse(true);
    }
  }, []);

  useEffect(() => {
    if (isAutoCollapse) {
      if (isSelected) {
        setCollapse(true);
      } else {
        setCollapse(false);
      }
    }
  }, [selectedCombIds]);

  const noSlotReasons = item.plans
    .flat()
    .flatMap((plan) => plan.no_slot_reasons.map((reason) => reason.reason));

  return (
    <>
      <DayCard
        slotLeftBlock={<UITypography type='small'>{header}</UITypography>}
        onClickDateOption={() => {
          setCollapse(!collapse);
        }}
        slotRightBlock={
          <>
            {!noSlotReasons.length && (
              <>
                <DayCardConflicts slotsWithDaySessions={slotsWithDaySessions} />
              </>
            )}

            {isDayCollapseNeeded && (
              <UIButton
                size='sm'
                variant='secondary'
                icon={<ChevronDown />}
                onClick={() => {
                  setCollapse(!collapse);
                }}
              />
            )}
          </>
        }
        isCheckboxVisible={isDayCheckboxNeeded && !noSlotReasons.length}
        isSelected={isSelected}
        slotCheckbox={
          <Checkbox
            checked={
              noOfSelectedSlots > 0 && noOfSelectedSlots < noOfTotalSlots
                ? 'indeterminate'
                : isSelected
            }
            onClick={() => {
              setSelectedCombIds(
                isSelected
                  ? selectedCombIds.filter((id) =>
                      slotsWithDaySessions.every(
                        (slot) => slot.plan_comb_id !== id,
                      ),
                    )
                  : [
                      ...selectedCombIds,
                      ...slotsWithDaySessions.map((slot) => slot.plan_comb_id),
                    ],
              );
              setCalendarDate(dayjs(dates[0]).toISOString());
            }}
          />
        }
        isDisabled={isDisabled}
        key={header}
        slotScheduleOption={
          !isDisabled && (
            <Collapsible open={isDayCollapseNeeded ? collapse : true}>
              <CollapsibleContent>
                <div className='flex flex-col gap-2 pt-2'>
                  {noSlotReasons.length === 0 ? (
                    <>
                      {slotsWithDaySessions
                        .slice(0, displayedSlots)
                        ?.map((slot) => {
                          return (
                            <ScheduleOption
                              slotCheckbox={
                                <>
                                  {isSlotCheckboxNeeded && (
                                    <Checkbox
                                      checked={selectedCombIds.includes(
                                        slot.plan_comb_id,
                                      )}
                                      onClick={() => {
                                        onClickSelect(slot.plan_comb_id);
                                        setCalendarDate(
                                          dayjs(dates[0]).toISOString(),
                                        );
                                        setTimeout(() => {
                                          const element =
                                            document.getElementById(
                                              slot.daySessions[0].sessions[0]
                                                .session_id +
                                                slot.daySessions[0].sessions[0]
                                                  .qualifiedIntervs[0].user_id,
                                            );
                                          if (element) {
                                            element.scrollIntoView({
                                              behavior: 'smooth',
                                              block: 'center',
                                            });
                                          }
                                        }, 1000);
                                      }}
                                    />
                                  )}
                                  {isRadioNeeded && (
                                    <RadioGroup
                                      defaultValue={
                                        selectedCombIds.includes(
                                          slot.plan_comb_id,
                                        )
                                          ? slot.plan_comb_id
                                          : undefined
                                      }
                                      onValueChange={(value) => {
                                        onClickSelect(value);
                                        setCalendarDate(
                                          dayjs(dates[0]).toISOString(),
                                        );
                                        setTimeout(() => {
                                          const element =
                                            document.getElementById(
                                              slot.daySessions[0].sessions[0]
                                                .session_id +
                                                slot.daySessions[0].sessions[0]
                                                  .qualifiedIntervs[0].user_id,
                                            );
                                          if (element) {
                                            element.scrollIntoView({
                                              behavior: 'smooth',
                                              block: 'center',
                                            });
                                          }
                                        }, 1000);
                                      }}
                                    >
                                      <RadioGroupItem
                                        value={slot.plan_comb_id}
                                        id={`radio-${slot.plan_comb_id}`}
                                      />
                                    </RadioGroup>
                                  )}
                                </>
                              }
                              key={slot.plan_comb_id}
                              isSelected={selectedCombIds.includes(
                                slot.plan_comb_id,
                              )}
                              isCheckbox={isSlotCheckboxNeeded || isRadioNeeded}
                              slotSingleDaySchedule={slot.daySessions?.map(
                                (item, ind) => {
                                  return (
                                    <SingleDayCard
                                      isAutoCollapse={isAutoCollapse}
                                      key={ind}
                                      item={item}
                                      ind={ind}
                                      isMultiDay={isMultiDay}
                                      isCollapseNeeded={isSlotCollapseNeeded}
                                      selectedCombIds={selectedCombIds}
                                      comb_id={slot.plan_comb_id}
                                    />
                                  );
                                },
                              )}
                            />
                          );
                        })}
                    </>
                  ) : (
                    noSlotReasons.map((reason, index) => (
                      <EmptySlotReason key={index} textMain={reason} />
                    ))
                  )}

                  {displayedSlots < slots.length && (
                    <div className='flex flex-row justify-center p-1'>
                      <UIButton
                        variant='secondary'
                        size='sm'
                        onClick={loadMoreSlots}
                      >
                        Load More
                      </UIButton>
                    </div>
                  )}
                </div>
              </CollapsibleContent>
            </Collapsible>
          )
        }
      />
    </>
  );
}

export default DayCardWrapper;
