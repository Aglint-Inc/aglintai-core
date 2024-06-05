import {
  APICandidateConfirmSlot,
  PlanCombinationRespType,
} from '@aglint/shared-types';
import { Drawer } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { SideDrawerLarge } from '@/devlink3/SideDrawerLarge';
import { ShowCode } from '@/src/components/Common/ShowCode';
import DynamicLoader from '@/src/components/Scheduling/Interviewers/DynamicLoader';
import { useAuthDetails } from '@/src/context/AuthContext/AuthContext';
import { userTzDayjs } from '@/src/services/CandidateScheduleV2/utils/userTzDayjs';
import { getFullName } from '@/src/utils/jsonResume';
import toast from '@/src/utils/toast';

import { useSchedulingApplicationStore } from '../../../store';
import { useAvailabilityContext } from '../RequestAvailabilityContext';
import FinalScreen from './ FinalScreen';
import RequestAvailabilityBody from './RequestAvailabilityBody';

function RequestAvailabilityDrawer() {
  const router = useRouter();
  const {
    // selectedRequestAvailability,
    setSelectedDayAvailableBlocks,
    selectedDateSlots,
    selectedIndex,
    setSelectedIndex,
    setSelectedDateSlots,
  } = useAvailabilityContext();
  const {
    data: availableSlots,
    isFetched,
    isLoading,
  } = useRequestAvailabilityDetails({
    request_id: router.query?.request_availability_id as string,
  });
  const { recruiter } = useAuthDetails();
  const { selectedSchedule, selectedApplication } =
    useSchedulingApplicationStore();

  function closeDrawer() {
    const currentPath = router.pathname; // Get current path
    const currentQuery = { ...router.query }; // Get current query parameters
    delete currentQuery.request_availability_id; // Remove the specific query parameter
    router.replace({
      pathname: currentPath,
      query: currentQuery,
    });
    setSelectedIndex(0);
    setSelectedDayAvailableBlocks(null);
    setSelectedDateSlots([]);
  }

  function handleClick(slots: PlanCombinationRespType[][]) {
    setSelectedDayAvailableBlocks(slots);
  }

  useEffect(() => {
    if (availableSlots) handleClick(availableSlots[Number(selectedIndex)]);
  }, [availableSlots, selectedIndex, router.query?.request_availability_id]);
  async function handleContinue() {
    if (selectedIndex !== availableSlots.length) {
      setSelectedIndex((pre) => pre + 1);
    } else {
      const selectedSessions = selectedDateSlots
        .map((ele) => ele.dateSlots)
        .flat()
        .map((ele) => {
          return {
            sessions: ele.sessions.map((ele) => {
              return {
                session_id: ele.session_id,
                start_time: ele.start_time,
                end_time: ele.end_time,
              };
            }),
          };
        });

      const bodyParams: APICandidateConfirmSlot = {
        candidate_plan: selectedSessions,
        recruiter_id: recruiter.id,
        user_tz: userTzDayjs.tz.guess(),
        schedule_id: selectedSchedule.id,
        is_debreif: false,
        agent_type: 'self',
        task_id: null,
        candidate_email: selectedApplication.candidates.email,
        candidate_id: selectedApplication.candidates.id,
        candidate_name: getFullName(
          selectedApplication.candidates.first_name,
          selectedApplication.candidates.last_name,
        ),
        filter_id: null,
      };

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_HOST_NAME}/api/scheduling/v1/confirm_interview_slot`,
          bodyParams,
        );

        if (res.status === 200) {
          toast.success('Booked sessions');
          closeDrawer();
        } else {
          throw new Error('Booking failed');
        }
      } catch (error) {
        toast.error(error.message);
      }
    }
  }
  function handleBack() {
    if (selectedIndex !== 0) setSelectedIndex((pre) => pre - 1);
  }

  const openAvailabilityDrawer = Boolean(router.query?.request_availability_id);
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
          !selectedDateSlots.find((ele) => ele.round === selectedIndex + 1) &&
          selectedIndex !== availableSlots?.length
        }
        textPrimaryButton={
          selectedIndex !== availableSlots?.length ? 'Continue' : 'Schedule Now'
        }
        isSelectedNumber={false}
        slotSideDrawerbody={
          <ShowCode>
            <ShowCode.When isTrue={isLoading && !isFetched}>
              <DynamicLoader />
            </ShowCode.When>
            <ShowCode.When isTrue={selectedIndex === availableSlots?.length}>
              <FinalScreen />
            </ShowCode.When>
            <ShowCode.Else>
              <RequestAvailabilityBody />
            </ShowCode.Else>
          </ShowCode>
        }
        isBottomBar={true}
      />
    </Drawer>
  );
}

export default RequestAvailabilityDrawer;

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
  // eslint-disable-next-line no-useless-catch
  try {
    const { data } = await axios.post(
      '/api/scheduling/v1/get-candidate-selected-slots',
      {
        cand_availability_id: request_id,
        user_tz: userTzDayjs.tz.guess(),
      },
    );
    return data as PlanCombinationRespType[][][];
  } catch (error) {
    throw error;
  }
}
