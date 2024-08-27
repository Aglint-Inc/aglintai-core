import {
  APIConfirmRecruiterSelectedOption,
  CandReqSlotsType,
  SessionCombinationRespType,
} from '@aglint/shared-types';
import { Drawer, Stack } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import { GlobalCta } from '@/devlink3/GlobalCta';
import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DayCardWrapper from '@/src/components/Scheduling/CandidateDetails/SchedulingDrawer/StepSlotOptions/DayCardWrapper';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import toast from '@/src/utils/toast';

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
    if (availableSlots && selectedIndex !== availableSlots.length) {
      handleClick(availableSlots[Number(selectedIndex)]?.selected_dates);
    }
  }, [availableSlots, selectedIndex]);

  async function handleContinue() {
    if (selectedIndex !== availableSlots.length) {
      setSelectedIndex((pre) => pre + 1);
      return null;
    }
    if (selectedIndex === availableSlots.length) {
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
      open={openAvailabilityDrawer}
    >
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
        onClickCancel={{
          onClick: closeDrawer,
        }}
        isDisabled={
          !selectedDateSlots.find(
            (ele) => ele.current_round === selectedIndex + 1,
          ) && selectedIndex !== availableSlots?.length
        }
        isLoading={loading}
        textPrimaryButton={
          selectedIndex !== availableSlots?.length ? 'Continue' : 'Schedule Now'
        }
        slotSideDrawerbody={
          <ShowCode>
            <ShowCode.When
              isTrue={selectedIndex === availableSlots?.length + 1}
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
                                date_range: [item.selected_dates[0].curr_date],
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
              <SelectAvailableOption availableSlots={availableSlots} />
            </ShowCode.Else>
          </ShowCode>
        }
        isBottomBar={selectedIndex !== availableSlots?.length + 1}
      />
    </Drawer>
  );
}

export default ConfirmAvailability;

export const useRequestAvailabilityDetails = ({
  request_id,
}: {
  request_id: string;
}) => {
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: ['get_request_availability_details', { request_id }],
    queryFn: () => getRequestAvailabilityDetails(request_id),
    // refetchInterval: 2000,
    enabled: true,
  });
  const refetch = () =>
    queryClient.invalidateQueries({
      queryKey: ['get_request_availability_details', { request_id }],
    });
  return { ...query, refetch };
};

async function getRequestAvailabilityDetails(request_id: string) {
  if (request_id) {
    // eslint-disable-next-line no-useless-catch
    try {
      const { data } = await axios.post(
        '/api/scheduling/v1/get-candidate-selected-slots',
        {
          cand_availability_id: request_id,
          user_tz: userTzDayjs.tz.guess(),
        },
      );
      return data as CandReqSlotsType[];
    } catch (error) {
      throw error;
    }
  }
}
