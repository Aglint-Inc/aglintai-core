import { PlanCombinationRespType } from '@aglint/shared-types';
import { Checkbox, Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import React, { Dispatch, useEffect, useMemo, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { IconButtonSoft } from '@/devlink/IconButtonSoft';
import { Text } from '@/devlink/Text';
import { DateOption } from '@/devlink3/DateOption';
import { ScheduleOption } from '@/devlink3/ScheduleOption';
import { TextWithIcon } from '@/devlink3/TextWithIcon';

import SingleDayCard from '../SingleDayCard';
import DayCardConflicts from './DayCardConflicts';

const NUMBER_OF_SLOTS_TO_DISPLAY = 10;

function DayCardWrapper({
  isDebrief,
  item,
  onClickSelect,
  selectedCombIds,
  isDayCollapseNeeded = true,
  isSlotCollapseNeeded = true,
  isDisabled = false,
  isCheckboxAndRadio = true,
  index,
  setSelectedCombIds,
}: {
  isDebrief: boolean;
  item: {
    dateArray: string[];
    plans: PlanCombinationRespType[];
  };
  // eslint-disable-next-line no-unused-vars
  onClickSelect: (comb_id: string) => void;
  selectedCombIds: string[];
  isDayCollapseNeeded?: boolean;
  isSlotCollapseNeeded?: boolean;
  isDisabled?: boolean;
  isCheckboxAndRadio?: boolean;
  index: number;
  setSelectedCombIds: Dispatch<React.SetStateAction<string[]>>;
}) {
  const dates = item?.dateArray || [];
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

  useEffect(() => {
    if (index === 0) {
      setCollapse(true);
    }
  }, []);

  const isSelected = slotsWithDaySessions.some((slot) =>
    selectedCombIds.includes(slot.plan_comb_id),
  );

  const noOfTotalSlots = slotsWithDaySessions.length;

  const noOfSelectedSlots = slotsWithDaySessions.filter((slot) =>
    selectedCombIds.includes(slot.plan_comb_id),
  ).length;

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
            <Text
              content={`${noOfTotalSlots} options, ${noOfSelectedSlots} selected`}
              color={isSelected ? 'accent' : 'neutral'}
            />
            <DayCardConflicts slotsWithDaySessions={slotsWithDaySessions} />

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
        isCheckboxVisible={isCheckboxAndRadio}
        isSelected={isSelected}
        slotCheckbox={
          <Checkbox
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
              <Stack spacing={1} pt={'var(--space-2)'}>
                {slotsWithDaySessions.slice(0, displayedSlots)?.map((slot) => {
                  return (
                    <ScheduleOption
                      slotCheckbox={
                        isCheckboxAndRadio && (
                          <Checkbox
                            checked={selectedCombIds.includes(
                              slot.plan_comb_id,
                            )}
                            onClick={() => onClickSelect(slot.plan_comb_id)}
                          />
                        )
                      }
                      isCheckboxAndRadio={isCheckboxAndRadio}
                      key={slot.plan_comb_id}
                      isSelected={selectedCombIds.includes(slot.plan_comb_id)}
                      isCheckbox={!isDebrief}
                      isRadio={isDebrief}
                      slotSingleDaySchedule={slot.daySessions?.map(
                        (item, ind) => {
                          return (
                            <SingleDayCard
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
