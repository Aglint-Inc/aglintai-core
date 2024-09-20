import {
  type APIConfirmRecruiterSelectedOption,
  type CandReqSlotsType,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { updateCandidateRequestAvailability } from '@requests/functions';
import { useRequestAvailabilityDetails } from '@requests/hooks';
import axios from 'axios';
import { Check, Loader2 } from 'lucide-react';
import { nanoid } from 'nanoid';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import { UIButton } from '@/components/Common/UIButton';
import UIDrawer from '@/components/Common/UIDrawer';
import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';
import toast from '@/utils/toast';

import DayCardWrapper from '../SelfSchedulingDrawer/_common/components/BodyDrawer/StepSlotOptions/DayCardWrapper';
import Calendar from './Calendar';
import { useAvailabilityContext } from './RequestAvailabilityContext';
import SelectAvailableOption from './SelectAvailableOption';
import {
  setApplicationIdForConfirmAvailability,
  setCandidateAvailabilityId,
  useConfirmAvailabilitySchedulingFlowStore,
} from './store';

function ConfirmAvailability() {
  const params = useParams();
  const {
    setSelectedDayAvailableBlocks,
    selectedDateSlots,
    selectedIndex,
    setSelectedIndex,
    selectedDayAvailableBlocks,
  } = useAvailabilityContext();
  const { candidateAvailabilityId } =
    useConfirmAvailabilitySchedulingFlowStore();
  const [loading, setLoading] = useState(false);
  const {
    data: availableSlots,
    isFetched,
    isLoading,
  } = useRequestAvailabilityDetails({
    availability_id: candidateAvailabilityId,
  });

  function closeDrawer() {
    setCandidateAvailabilityId('');
    setApplicationIdForConfirmAvailability('');
  }

  function handleClick(slots: CandReqSlotsType['selected_dates']) {
    setSelectedDayAvailableBlocks(slots);
  }

  useEffect(() => {
    if (availableSlots && selectedIndex !== availableSlots.slots.length) {
      handleClick(availableSlots.slots[Number(selectedIndex)]?.selected_dates);
    }
  }, [availableSlots, selectedIndex]);

  async function handleContinue() {
    if (selectedIndex !== availableSlots.slots.length) {
      setSelectedIndex((pre) => pre + 1);
      return null;
    }
    if (selectedIndex === availableSlots.slots.length) {
      setLoading(true);

      const allSessions: SessionCombinationRespType[] = selectedDateSlots
        .map((ele) => ele.selected_dates)
        .flat()
        .map((ele) => ele.plans)
        .flat()
        .map((ele) => ele.sessions)
        .flat();

      const bodyParams: APIConfirmRecruiterSelectedOption = {
        availability_req_id: candidateAvailabilityId,
        selectedOption: {
          plan_comb_id: nanoid(),
          sessions: allSessions, // sessions
          no_slot_reasons: [],
        },
        user_tz: userTzDayjs.tz.guess(),
        request_id: params.id as string,
      };

      try {
        const res = await axios.post(
          `/api/scheduling/v1/booking/confirm-recruiter-selected-option`,
          bodyParams,
        );

        if (res.status === 200) {
          await updateCandidateRequestAvailability({
            id: candidateAvailabilityId,
            data: {
              booking_confirmed: true,
            },
          });
        } else {
          throw new Error('Booking failed');
        }
      } catch (error) {
        toast.error(error.message);
      }
      setLoading(false);
      setSelectedIndex((pre) => pre + 1);
    }
  }

  const openAvailabilityDrawer = Boolean(candidateAvailabilityId);
  return (
    <UIDrawer
      size={!isLoading && selectedDayAvailableBlocks ? 'full' : 'sm'}
      title='Confirm Availability'
      onClose={closeDrawer}
      open={openAvailabilityDrawer && isFetched}
      slotBottom={
        selectedIndex !== availableSlots?.slots.length + 1 && (
          <>
            <UIButton
              variant='outline'
              onClick={() => {
                if (selectedIndex !== 0) setSelectedIndex((pre) => pre - 1);
                else closeDrawer();
              }}
              className='w-full'
            >
              {selectedIndex === 0 ? 'Close' : 'Back'}
            </UIButton>
            <UIButton
              disabled={
                !selectedDateSlots.find(
                  (ele) => ele.current_round === selectedIndex + 1,
                ) && selectedIndex !== availableSlots?.slots.length
              }
              isLoading={loading}
              onClick={handleContinue}
              className='w-full'
            >
              {selectedIndex !== availableSlots?.slots.length
                ? 'Continue'
                : 'Schedule Now'}
            </UIButton>
          </>
        )
      }
    >
      <div className={'flex w-full'}>
        <div className={'h-[calc(100vh-96px)] overflow-hidden'}>
          {!isLoading && selectedDayAvailableBlocks && <Calendar />}
        </div>
        <div>
          <ShowCode>
            <ShowCode.When
              isTrue={selectedIndex === availableSlots?.slots.length + 1}
            >
              <div
                className={
                  'h-[calc(100vh - 96px)] flex w-full flex-col gap-2 p-4'
                }
              >
                <div>
                  <div className='flex items-center gap-2'>
                    <Check className='h-4 w-4 text-blue-500' />
                    <h2 className='text-blue-500'>Interview Confirmed</h2>
                  </div>
                  <p>
                    The candidate and the interviewers received an email
                    containing a link to join to the interview on the specified
                    date and time
                  </p>
                </div>

                <div className={'flex flex-col gap-2'}>
                  {selectedDateSlots &&
                    selectedDateSlots?.map((item, index) => {
                      return (
                        <DayCardWrapper
                          key={index}
                          selectedCombIds={[]}
                          item={{
                            date_range: [item.selected_dates[0].curr_date],
                            plans: item.selected_dates[0].plans,
                          }}
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          onClickSelect={() => {}}
                          isDayCollapseNeeded={false}
                          isSlotCollapseNeeded={false}
                          isDayCheckboxNeeded={false}
                          isRadioNeeded={false}
                          isSlotCheckboxNeeded={false}
                          index={index}
                          // eslint-disable-next-line @typescript-eslint/no-empty-function
                          setSelectedCombIds={() => {}}
                        />
                      );
                    })}
                  {selectedDateSlots && (
                    <Link
                      href={`/interviews/view?meeting_id=${selectedDateSlots[0]?.selected_dates[0]?.plans[0]?.sessions[0]?.meeting_id}`}
                    >
                      <UIButton>View in schedules</UIButton>
                    </Link>
                  )}
                </div>
              </div>
            </ShowCode.When>
            <ShowCode.When isTrue={isLoading && !isFetched}>
              <div className='h-[calc(100vh - 96px)] flex items-center justify-center'>
                <Loader2 className='h-6 w-6 animate-spin text-primary' />
              </div>
            </ShowCode.When>
            <ShowCode.Else>
              <SelectAvailableOption
                availableSlots={availableSlots?.slots || []}
              />
            </ShowCode.Else>
          </ShowCode>
        </div>
      </div>
    </UIDrawer>
  );
}

export default ConfirmAvailability;
