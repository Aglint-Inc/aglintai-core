import { PlanCombinationRespType } from '@aglint/shared-types';
import { Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { DateOption } from '@/devlink3/DateOption';
import { ScheduleOption } from '@/devlink3/ScheduleOption';

import SingleDayCard from '../SingleDayCard';

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

  return (
    <>
      <DateOption
        isDisabled={isDisabled}
        onClickDateOption={{
          onClick: () => {
            setCollapse(!collapse);
          },
        }}
        key={header}
        textdate={header}
        textOptionCount={`${slots.length} options`}
        rotateArrow={{
          style: {
            display: isDayCollapseNeeded ? 'flex' : 'none',
            transform: collapse ? 'rotate(180deg)' : '',
          },
        }}
        slotScheduleOption={
          !isDisabled && (
            <Collapse in={isDayCollapseNeeded ? collapse : true}>
              <Stack spacing={1} pt={'var(--space-2)'}>
                {slotsWithDaySessions.slice(0, displayedSlots)?.map((slot) => {
                  return (
                    <ScheduleOption
                      isCheckboxAndRadio={isCheckboxAndRadio}
                      key={slot.plan_comb_id}
                      isSelected={selectedCombIds.includes(slot.plan_comb_id)}
                      isCheckbox={!isDebrief}
                      onClickSelect={{
                        onClick: () => {
                          onClickSelect(slot.plan_comb_id);
                        },
                      }}
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
