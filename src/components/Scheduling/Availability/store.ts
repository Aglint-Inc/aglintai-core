/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { cloneDeep, get, set } from 'lodash';
import { create } from 'zustand';

import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
  InterviewerType,
  StateAvailibility,
} from './availability.types';
import {
  countSlotStatus,
  DAYS_LENGTH,
  getAvailability,
  initialiseCheckedInts,
} from './utils';

export let initialState: StateAvailibility = {
  isInitialising: false,
  isCalenderLoading: false,
  panelName: '',
  interviewers: [],
  timeSlot: 30,
  dateRangeView: {
    startDate: new Date(),
    endDate: dayjs(new Date())
      .add(DAYS_LENGTH - 1, 'day')
      .toDate(),
  },
  checkedInterSlots: [],
};

export const useAvailableStore = create<StateAvailibility>()(() => ({
  ...initialState,
}));

export const setIsisInitialising = (isInitialising: boolean) =>
  useAvailableStore.setState({ isInitialising });

export const setIsisCalenderLoading = (isCalenderLoading: boolean) =>
  useAvailableStore.setState({ isCalenderLoading });

export const setIntPanelName = (panelName: string) =>
  useAvailableStore.setState({ panelName });

export const setInitInterviewers = (
  interviewers: StateAvailibility['interviewers'],
) => {
  useAvailableStore.setState({
    interviewers,
    checkedInterSlots: initialiseCheckedInts(interviewers),
  });
};

export const setTimeSlot = (timeSlot: number) =>
  useAvailableStore.setState({ timeSlot });

export const resetState = () => useAvailableStore.setState({ ...initialState });

export const setDateRangeView = (
  dateRangeView: StateAvailibility['dateRangeView'],
) => useAvailableStore.setState({ dateRangeView });

export const setInterviewers = (
  interviewers: StateAvailibility['interviewers'],
) => useAvailableStore.setState({ interviewers });

export const setCheckedInterSlots = (
  checkedInterSlots: StateAvailibility['checkedInterSlots'],
) => useAvailableStore.setState({ checkedInterSlots });

export const checkSlot = (path: string, timeRange: AvalabilitySlotType) => {
  useAvailableStore.setState((prevState) => {
    let updatedState = cloneDeep(prevState);
    let newTimeRanges: AvalabilitySlotType[] = [
      ...get(updatedState, path, []),
      { ...timeRange },
    ];
    set(updatedState, path, newTimeRanges);
    const countCheckedSlotPath = `${path.substring(
      0,
      path.indexOf('.'),
    )}.countCheckedSlots`;
    // //interviewers[0].
    const prevCnt = get(updatedState, countCheckedSlotPath);
    set(updatedState, countCheckedSlotPath, prevCnt + 1);
    return updatedState;
  });
};

export const unCheckSlot = (path: string, timeRange: AvalabilitySlotType) => {
  useAvailableStore.setState((prevState) => {
    let updatedState = cloneDeep(prevState);
    let newTimeRanges: AvalabilitySlotType[] = (
      get(updatedState, path, []) as AvalabilitySlotType[]
    ).filter((t) => t.startTime !== timeRange.startTime);
    set(updatedState, path, newTimeRanges);
    const countCheckedSlotPath = `${path.substring(
      0,
      path.indexOf('.'),
    )}.countCheckedSlots`;
    const prevCnt = get(updatedState, countCheckedSlotPath);
    set(updatedState, countCheckedSlotPath, prevCnt - 1);
    return updatedState;
  });
};

export const uncheckAllSlots = () => {
  useAvailableStore.setState((prev) => {
    let updatedState = cloneDeep(prev);
    updatedState.checkedInterSlots = initialiseCheckedInts(
      updatedState.interviewers,
    );
    return updatedState;
  });
};

// util
export const useSyncInterviewersCalender = () => {
  const interviewers = useAvailableStore((state) => state.interviewers);
  const timeSlot = useAvailableStore((state) => state.timeSlot);

  const handleSync = async (reqTimeSlot: number, monthToSync: string) => {
    const clonedIntervs = cloneDeep(interviewers);
    const promises = clonedIntervs.map(async (int) => {
      if (int.isMailConnected) {
        return await createSingleInterviewPromise(
          int,
          reqTimeSlot,
          monthToSync,
        );
      }
      return int;
    });
    const newIntrs = await Promise.all(promises);
    setCheckedInterSlots(initialiseCheckedInts(newIntrs));
    setInterviewers(newIntrs);
  };

  const initCalenderAvails = async (
    intervs: StateAvailibility['interviewers'],
    timeSlot: number,
  ) => {
    const currentMonth = new Date().toISOString();
    const clonedInters = cloneDeep(intervs);
    let interviewersPromises = clonedInters.map(async (interW) => {
      let interviewer: InterviewerType = interW;
      try {
        interviewer = await createSingleInterviewPromise(
          interW,
          timeSlot,
          currentMonth,
        );
        interviewer.isMailConnected = true;
      } catch (error) {
        interviewer.isMailConnected = false;
        interviewer.slots = [];
      }
      return interviewer;
    });
    await Promise.all(interviewersPromises);
    setInitInterviewers(clonedInters);
  };

  const handleSyncMonthifNeeded = async (syncDateMonth: string) => {
    let newInterviewers = cloneDeep(interviewers);
    let interviewersPromises = [];
    for (let int of newInterviewers) {
      if (!int.isMailConnected) continue;
      for (let slotAvail of int.slots) {
        if (slotAvail.timeDuration !== timeSlot) continue;
        const isMonthSlotsExits = Object.keys(slotAvail.availability).some(
          (dayKey) => dayjs(dayKey).isSame(syncDateMonth, 'month'),
        );

        if (!isMonthSlotsExits) {
          interviewersPromises.push(
            createSingleInterviewPromise(int, timeSlot, syncDateMonth),
          );
        }
      }
    }
    await Promise.all(interviewersPromises);
    setInterviewers(newInterviewers);
    setCheckedInterSlots(initialiseCheckedInts(newInterviewers));
  };

  //util
  const createSingleInterviewPromise = async (
    interviewer: InterviewerType,
    timeSlot: number,
    monthToSync: string,
  ) => {
    let intAval: InterviewerAvailabliity = {
      timeDuration: timeSlot,
      availability: await getAvailability(
        monthToSync,
        interviewer.interviewerId,
        timeSlot,
      ),
      cntConfirmed: 0,
      cntRequested: 0,
    };
    const isTimeSlotExist = interviewer.slots.find(
      (slot) => slot.timeDuration === timeSlot,
    );
    if (!isTimeSlotExist) {
      interviewer.slots = [...interviewer.slots, intAval];
    } else {
      interviewer.slots = interviewer.slots.map((slot) => {
        if (slot.timeDuration === timeSlot) return intAval;
        return slot;
      });
    }

    intAval.cntConfirmed = countSlotStatus(
      interviewer.slots,
      'confirmed',
      timeSlot,
    );
    intAval.cntRequested = countSlotStatus(
      interviewer.slots,
      'requested',
      timeSlot,
    );
    return interviewer;
  };

  return { handleSyncMonthifNeeded, handleSync, initCalenderAvails };
};
