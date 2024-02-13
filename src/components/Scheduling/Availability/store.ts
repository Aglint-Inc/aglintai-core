/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { cloneDeep, get, set } from 'lodash';
import { create } from 'zustand';

import Availability from './Availability';
import {
  AvalabilitySlotType,
  InterviewerAvailabliity,
  StateAvailibility,
} from './availability.types';
import { initialiseCheckedInts } from './utils';

export let initialState: StateAvailibility = {
  isloading: true,
  interviewPanels: [],
  isPanelLoading: false,
  panelName: '',
  interviewers: [],
  timeSlot: 30,
  dateRangeView: {
    startDate: new Date(),
    endDate: dayjs(new Date()).add(5, 'day').toDate(),
  },
  checkedInterSlots: [],
};

export const useAvailableStore = create<StateAvailibility>()(() => ({
  ...initialState,
}));

export const setIsLoading = (isloading: boolean) =>
  useAvailableStore.setState({ isloading });

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
