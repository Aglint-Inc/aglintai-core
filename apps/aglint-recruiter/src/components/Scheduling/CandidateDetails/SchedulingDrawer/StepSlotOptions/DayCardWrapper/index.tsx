import { MultiDayPlanType } from '@aglint/shared-types';
import { Checkbox, Collapse, Radio, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { Dispatch, useEffect, useMemo, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { Text } from '@/devlink/Text';
import { DateOption } from '@/devlink3/DateOption';
import { EmptySlotReason } from '@/devlink3/EmptySlotReason';
import { ScheduleOption } from '@/devlink3/ScheduleOption';
import { TextWithIcon } from '@/devlink3/TextWithIcon';

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
}: {
  isRadioNeeded: boolean;
  item: MultiDayPlanType;
  // eslint-disable-next-line no-unused-vars
  onClickSelect: (comb_id: string) => void;
  selectedCombIds: string[];
  isDayCollapseNeeded?: boolean;
  isSlotCollapseNeeded?: boolean;
  isDisabled?: boolean;
  isDayCheckboxNeeded?: boolean;
  isSlotCheckboxNeeded?: boolean;
  index: number;
  setSelectedCombIds: Dispatch<React.SetStateAction<string[]>>;
  isAutoCollapse?: boolean;
}) {
  const dates = item?.date_range || [];
  const header = dates
    .map((date) => dayjs(date).format('MMMM DD dddd'))
    .join(' , ');
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
      <DateOption
        slotLeftBlock={
          <TextWithIcon
            iconName={'today'}
            textContent={header}
            iconSize={4}
            fontWeight={'medium'}
            iconWeight={'medium'}
            color={isSelected ? 'accent' : 'neutral'}
          />
        }
        slotRightBlock={
          <>
            {!noSlotReasons.length && (
              <>
                <Text
                  content={`${noOfTotalSlots} options, ${noOfSelectedSlots} selected`}
                  color={isSelected ? 'accent' : 'neutral'}
                />
                <DayCardConflicts slotsWithDaySessions={slotsWithDaySessions} />
              </>
            )}

            {isDayCollapseNeeded && (
              <IconButtonSoft
                size={1}
                color={'neutral'}
                iconName={'keyboard_double_arrow_down'}
                onClickButton={{
                  onClick: () => {
                    setCollapse(!collapse);
                  },
                }}
              />
            )}
          </>
        }
        isCheckboxVisible={isDayCheckboxNeeded && !noSlotReasons.length}
        isSelected={isSelected}
        slotCheckbox={
          <Checkbox
            indeterminate={
              noOfSelectedSlots > 0 && noOfSelectedSlots < noOfTotalSlots
            }
            checked={isSelected}
            onClick={() =>
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
              )
            }
          />
        }
        isDisabled={isDisabled}
        key={header}
        textOptionCount={`${slots.length} options`}
        rotateArrow={{
          style: {
            display: isDayCollapseNeeded ? 'flex' : 'none',
          },
        }}
        slotScheduleOption={
          !isDisabled && (
            <Collapse in={isDayCollapseNeeded ? collapse : true}>
              <Stack spacing={'var(--space-2)'} pt={'var(--space-2)'}>
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
                                    onClick={() =>
                                      onClickSelect(slot.plan_comb_id)
                                    }
                                  />
                                )}
                                {isRadioNeeded && (
                                  <Radio
                                    checked={selectedCombIds.includes(
                                      slot.plan_comb_id,
                                    )}
                                    onClick={() => {
                                      onClickSelect(slot.plan_comb_id);
                                    }}
                                  />
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
                    <EmptySlotReason
                      key={index}
                      textMain={reason}
                      iconName={'nightlife'}
                      color={'info'}
                      textSub={''}
                    />
                  ))
                )}

                {displayedSlots < slots.length && (
                  <Stack direction={'row'} justifyContent={'center'} p={1}>
                    <ButtonGhost
                      textButton='Load More'
                      size={2}
                      onClickButton={{ onClick: loadMoreSlots }}
                    />
                  </Stack>
                )}
              </Stack>
            </Collapse>
          )
        }
      />
    </>
  );
}

export default DayCardWrapper;
