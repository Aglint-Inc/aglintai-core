import { DatabaseTable } from '@aglint/shared-types';
import { Collapse } from '@mui/material';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { CandidateSubmitAvailability } from '@/devlink3/CandidateSubmitAvailability';
import { DateOption } from '@/devlink3/DateOption';
import { SingleDaySchedule } from '@/devlink3/SingleDaySchedule';

function RequestAvailabilityList({
  dateSlots,
}: {
  dateSlots: DatabaseTable['candidate_request_availability']['slots'];
}) {
  return (
    <CandidateSubmitAvailability
      slotList={
        dateSlots.length &&
        dateSlots.map((date, ind) => {
          return (
            <DateSlots
              key={ind}
              currDate={date.curr_day}
              dateSlots={date.slots}
            />
          );
        })
      }
    />
  );
}

export default RequestAvailabilityList;

function DateSlots({
  dateSlots,
  currDate,
}: {
  dateSlots: DatabaseTable['candidate_request_availability']['slots'][number]['slots'];
  currDate: string;
}) {
  const [openCollapse, setOpenCollapse] = useState(false);
  return (
    <DateOption
      textdate={dayjs(currDate).format('dddd, MMM DD')}
      textOptionCount={`${dateSlots.length} options`}
      slotScheduleOption={
        <Collapse in={openCollapse}>
          {dateSlots.map((slot, ind) => {
            return <SlotTime key={ind} slot={slot} />;
          })}
        </Collapse>
      }
      onClickDateOption={{
        onClick: () => {
          setOpenCollapse((pre) => !pre);
        },
      }}
    />
  );
}

function SlotTime({
  slot,
}: {
  slot: DatabaseTable['candidate_request_availability']['slots'][number]['slots'][number];
}) {
  return (
    <>
      <SingleDaySchedule
        slotSessionDetails={<></>}
        isRotateArrowVisible={false}
        isMultiDay={false}
        textDate={'asda'}
        textTotalTimeRange={`${dayjs(slot.startTime).format('hh:mm')} - ${dayjs(slot.endTime).format('hh:mm')}`}
      />
    </>
  );
}
