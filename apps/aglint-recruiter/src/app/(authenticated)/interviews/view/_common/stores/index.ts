import { create } from 'zustand';

import { type useScheduleDetails } from '../hooks/useScheduleDetails';

type ScheduleDetails = {
  isDeclineDialogOpen: boolean;
  isCancelDialogOpen: boolean;
  sessionUser:
    | ReturnType<typeof useScheduleDetails>['data']['schedule_data']['users'][0]
    | null;
};

export const initialeScheduleDetailsStore: ScheduleDetails = {
  isDeclineDialogOpen: false,
  isCancelDialogOpen: false,
  sessionUser: null,
};

export const useScheduleDetailsStore = create<ScheduleDetails>()(
  () => initialeScheduleDetailsStore,
);

export const setIsCancelDialogOpen = (isCancelDialogOpen: boolean) =>
  useScheduleDetailsStore.setState({ isCancelDialogOpen });

export const setIsDeclineDialogOpen = (isDeclineDialogOpen: boolean) =>
  useScheduleDetailsStore.setState({ isDeclineDialogOpen });

export const setSessionUser = (sessionUser: ScheduleDetails['sessionUser']) =>
  useScheduleDetailsStore.setState({ sessionUser });

export const resetScheduleDetailsStore = () =>
  useScheduleDetailsStore.setState(initialeScheduleDetailsStore);
