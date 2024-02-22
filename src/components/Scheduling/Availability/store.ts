/* eslint-disable no-unused-vars */
import dayjs from 'dayjs';
import { cloneDeep } from 'lodash';
import { create } from 'zustand';

import { StateAvailibility } from './availability.types';
import { DAYS_LENGTH, getCurrentTimeZone } from './utils';
import {
  fetchAvailSlots,
  fetchSavedInts,
  mergeSavedAndAvailableSlots,
} from './utils2';

export let initialState: StateAvailibility = {
  isInitialising: true,
  isCalenderLoading: true,
  panelName: '',
  interviewers: [],
  timeSlot: 30,
  dateRangeView: {
    startDate: new Date(),
    endDate: dayjs(new Date())
      .add(DAYS_LENGTH - 1, 'day')
      .toDate(),
  },
  dateRangeTableView: {
    startDate: new Date(),
    endDate: dayjs(new Date())
      .add(DAYS_LENGTH - 1, 'day')
      .toDate(),
  },
  excludedDates: [],
  timeZone: getCurrentTimeZone(),
  timeRange: {
    start: new Date(2024, 1, 1, 9, 0),
    end: new Date(2024, 1, 1, 17, 0),
  },
};

export const useAvailableStore = create<StateAvailibility>()(() => ({
  ...initialState,
}));

export const setIsisInitialising = (isInitialising: boolean) =>
  useAvailableStore.setState({ isInitialising });
export const setTimeRange = (timeRange: StateAvailibility['timeRange']) =>
  useAvailableStore.setState({ timeRange });

export const setIsisCalenderLoading = (isCalenderLoading: boolean) =>
  useAvailableStore.setState({ isCalenderLoading });

export const setIntPanelName = (panelName: string) =>
  useAvailableStore.setState({ panelName });

export const setDateRangeTableView = (
  dateRangeTableView: StateAvailibility['dateRangeTableView'],
) => useAvailableStore.setState({ dateRangeTableView });

export const setInitInterviewers = (
  interviewers: StateAvailibility['interviewers'],
) => {
  useAvailableStore.setState({
    interviewers,
  });
};

export const setTimeZone = (timeZone: StateAvailibility['timeZone']) => {
  useAvailableStore.setState({
    timeZone,
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

// util
export const useSyncInterviewersCalender = () => {
  const initialiseAvailabilities = async (
    intervs: StateAvailibility['interviewers'],
    reqTimeSlot: number,
    dateRange: StateAvailibility['dateRangeView'],
    timeRange: StateAvailibility['timeRange'],
  ) => {
    let intSavedSlots = await fetchSavedInts(intervs);
    const clonedInters = cloneDeep(intervs);
    let intAvalableSlots = await fetchAvailSlots(
      clonedInters,
      reqTimeSlot,
      dateRange,
      timeRange,
    );
    const finalINts = mergeSavedAndAvailableSlots(
      intAvalableSlots,
      intSavedSlots,
      dateRange,
    );

    setInterviewers(finalINts);
  };

  return { initialiseAvailabilities };
};
