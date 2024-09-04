import {
  type APIConfirmRecruiterSelectedOption,
  type CandReqSlotsType,
  type SessionCombinationRespType,
} from '@aglint/shared-types';
import { ButtonSoft } from '@devlink/ButtonSoft';
import { ButtonSolid } from '@devlink2/ButtonSolid';
import { GlobalCta } from '@devlink3/GlobalCta';
import { SideDrawerLarge } from '@devlink3/SideDrawerLarge';
import { Drawer, Stack } from '@mui/material';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ShowCode } from '@/components/Common/ShowCode';
import DynamicLoader from '@/components/Scheduling/Interviewers/DynamicLoader';
import { userTzDayjs } from '@/services/CandidateScheduleV2/utils/userTzDayjs';
import toast from '@/utils/toast';

import DayCardWrapper from '../SelfSchedulingDrawer/BodyDrawer/StepSlotOptions/DayCardWrapper';
import Calendar from './Calendar';
import { useRequestAvailabilityDetails } from './hooks';
import { useAvailabilityContext } from './RequestAvailabilityContext';
import SelectAvailableOption from './SelectAvailableOption';
import {
  setApplicationIdForConfirmAvailability,
  setCandidateAvailabilityId,
  useConfirmAvailabilitySchedulingFlowStore,
} from './store';
import { updateCandidateRequestAvailability } from './utils';

function ConfirmAvailability() {
  const router = useRouter();

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
    request_id: candidateAvailabilityId,
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

      const task_id = null;
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
        task_id,
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
  function handleBack() {
    if (selectedIndex !== 0) setSelectedIndex((pre) => pre - 1);
  }
  const openAvailabilityDrawer = Boolean(candidateAvailabilityId);
  return (
    <Drawer
      onClose={closeDrawer}
      anchor={'right'}
      open={openAvailabilityDrawer && isFetched}
    >
      <Stack direction={'row'}>
        {!isLoading && selectedDayAvailableBlocks && <Calendar />}

        <SideDrawerLarge
          onClickBack={{
            onClick: handleBack,
          }}
          textDrawertitle={'Schedule Now'}
          onClickPrimary={{
            onClick: () => {
              handleContinue();
            },
          }}
          drawerSize={'medium'}
          onClickCancel={{
            onClick: closeDrawer,
          }}
          textPrimaryButton={
            selectedIndex !== availableSlots?.slots.length
              ? 'Continue'
              : 'Schedule Now'
          }
          slotButtons={
            <>
              <ButtonSoft
                onClickButton={{
                  onClick: () => {
                    if (selectedIndex !== 0) setSelectedIndex((pre) => pre - 1);
                    else closeDrawer();
                  },
                }}
                textButton={selectedIndex === 0 ? 'Close' : 'Back'}
              />
              <ButtonSolid
                isDisabled={
                  !selectedDateSlots.find(
                    (ele) => ele.current_round === selectedIndex + 1,
                  ) && selectedIndex !== availableSlots?.slots.length
                }
                isLoading={loading}
                onClickButton={{ onClick: handleContinue }}
                textButton={
                  selectedIndex !== availableSlots?.slots.length
                    ? 'Continue'
                    : 'Schedule Now'
                }
              />
            </>
          }
          slotSideDrawerbody={
            <ShowCode>
              <ShowCode.When
                isTrue={selectedIndex === availableSlots?.slots.length + 1}
              >
                <Stack p={2} height={'calc(100vh - 96px)'}>
                  <GlobalCta
                    iconName={'event_upcoming'}
                    color={'info'}
                    textTitle={'Interview Confirmed'}
                    textDescription={
                      'The candidate and the interviewers received an email containing a link to join to the interview on the specified date and time'
                    }
                    slotButton={
                      <Stack direction={'column'} spacing={2}>
                        {selectedDateSlots &&
                          selectedDateSlots?.map((item, index) => {
                            return (
                              <DayCardWrapper
                                key={index}
                                selectedCombIds={[]}
                                item={{
                                  date_range: [
                                    item.selected_dates[0].curr_date,
                                  ],
                                  plans: item.selected_dates[0].plans,
                                }}
                                onClickSelect={() => {}}
                                isDayCollapseNeeded={false}
                                isSlotCollapseNeeded={false}
                                isDayCheckboxNeeded={false}
                                isRadioNeeded={false}
                                isSlotCheckboxNeeded={false}
                                index={index}
                                setSelectedCombIds={() => {}}
                              />
                            );
                          })}
                        <Stack
                          direction={'row'}
                          justifyItems={'center'}
                          justifyContent={'center'}
                        >
                          <ButtonSoft
                            size={2}
                            color={'accent'}
                            onClickButton={{
                              onClick: () => {
                                router.replace(
                                  `/scheduling/view?meeting_id=${selectedDateSlots[0].selected_dates[0].plans[0].sessions[0].meeting_id}`,
                                );
                              },
                            }}
                            textButton={'View in schedules'}
                          />
                        </Stack>
                      </Stack>
                    }
                  />
                </Stack>
              </ShowCode.When>
              <ShowCode.When isTrue={isLoading && !isFetched}>
                <Stack height={'calc(100vh - 96px)'}>
                  <DynamicLoader />
                </Stack>
              </ShowCode.When>

              <ShowCode.Else>
                <SelectAvailableOption
                  availableSlots={availableSlots?.slots || []}
                />
              </ShowCode.Else>
            </ShowCode>
          }
          isBottomBar={selectedIndex !== availableSlots?.slots.length + 1}
        />
      </Stack>
    </Drawer>
  );
}

export default ConfirmAvailability;
