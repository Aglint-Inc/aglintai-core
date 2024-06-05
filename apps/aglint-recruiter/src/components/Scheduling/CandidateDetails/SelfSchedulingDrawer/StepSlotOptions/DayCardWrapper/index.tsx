import { PlanCombinationRespType } from '@aglint/shared-types';
import { Collapse, Stack } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';

import { ButtonTextSmall } from '@/devlink/ButtonTextSmall';
import { DateOption } from '@/devlink3/DateOption';
import { ScheduleOption } from '@/devlink3/ScheduleOption';

import SingleDayCard from '../SingleDayCard';

const NUMBER_OF_SLOTS_TO_DISPLAY = 20;

function DayCardWrapper({
  isDebrief,
  item,
  onClickSelect,
  selectedCombIds,
}: {
  isDebrief: boolean;
  item: {
    dateArray: string[];
    plans: PlanCombinationRespType[];
  };
  // eslint-disable-next-line no-unused-vars
  onClickSelect: (comb_id: string) => void;
  selectedCombIds: string[];
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

  return (
    <>
      <DateOption
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
            transform: collapse ? 'rotate(180deg)' : '',
          },
        }}
        slotScheduleOption={
          <Collapse in={collapse}>
            {slots.slice(0, displayedSlots)?.map((slot) => {
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

              return (
                <ScheduleOption
                  key={slot.plan_comb_id}
                  isSelected={selectedCombIds.includes(slot.plan_comb_id)}
                  isCheckbox={!isDebrief}
                  onClickSelect={{
                    onClick: () => {
                      onClickSelect(slot.plan_comb_id);
                    },
                  }}
                  isRadio={isDebrief}
                  slotSingleDaySchedule={daySessions?.map((item, ind) => {
                    return (
                      <SingleDayCard
                        key={ind}
                        item={item}
                        ind={ind}
                        isMultiDay={isMultiDay}
                      />
                    );
                  })}
                />
              );
            })}
            {displayedSlots < slots.length && (
              <Stack direction={'row'} justifyContent={'center'} p={1}>
                <ButtonTextSmall
                  textLabel={'Load More'}
                  onClickButton={{
                    onClick: loadMoreSlots,
                  }}
                />
              </Stack>
            )}
          </Collapse>
        }
      />
    </>
  );
}

export default DayCardWrapper;
