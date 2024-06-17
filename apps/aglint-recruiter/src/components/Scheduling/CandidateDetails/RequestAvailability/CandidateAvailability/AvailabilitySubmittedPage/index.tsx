import { DatabaseTable } from '@aglint/shared-types';
import { useEffect, useState } from 'react';

import { AvailabilitySubmitted } from '@/devlink2/AvailabilitySubmitted';
import { TimePick } from '@/devlink2/TimePick';
import { ShowCode } from '@/src/components/Common/ShowCode';

import { useRequestAvailabilityContext } from '../../RequestAvailabilityContext';
import SlotColumn from '../AvailableSlots/SlotColumn';

function AvailabilitySubmittedPage() {
  const { candidateRequestAvailability } = useRequestAvailabilityContext();
  const [requestAvailabilitySlots, setRequestAvailabilitySlots] = useState<
    | DatabaseTable['candidate_request_availability']['slots'][number]['dates']
    | null
  >(null);

  useEffect(() => {
    if (candidateRequestAvailability?.slots) {
      setRequestAvailabilitySlots(
        candidateRequestAvailability?.slots
          .map((ele) => ele.dates)
          .flat()
          .filter(
            (v, i, a) => a.findIndex((v2) => v2.curr_day === v.curr_day) === i,
          ),
      );
    }
  }, [candidateRequestAvailability]);

  return (
    <>
      <AvailabilitySubmitted
        slotAvailbility={
          <>
            <TimePick
              onClickNext={{
                onClick: () => {
                  const TypoElement = document.getElementById('newTimePick');

                  TypoElement.scrollLeft = TypoElement.scrollLeft + 400;
                },
              }}
              onClickPrev={{
                onClick: () => {
                  const TypoElement = document.getElementById('newTimePick');
                  TypoElement.scrollLeft = TypoElement.scrollLeft - 400;
                },
              }}
              styleScrollProps={{
                id: 'newTimePick',
              }}
              slotSlotPicker={
                <ShowCode.When isTrue={requestAvailabilitySlots?.length > 0}>
                  {requestAvailabilitySlots &&
                    requestAvailabilitySlots.map((ele, i) => {
                      return <SlotColumn slotTime={ele} key={i} />;
                    })}
                </ShowCode.When>
              }
            />
          </>
        }
      />
    </>
  );
}

export default AvailabilitySubmittedPage;
