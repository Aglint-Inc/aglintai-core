import * as React from "react";
import * as Types from "./types";

declare function ScheduleInfoPending(props: {
  as?: React.ElementType;
  onClickRequest?: Types.Devlink.RuntimeProps;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickViewProfile?: Types.Devlink.RuntimeProps;
  onClickCancelSchedule?: Types.Devlink.RuntimeProps;
  isCancelSheduleVisible?: Types.Visibility.VisibilityConditions;
  slotScheduleInfoPlan?: Types.Devlink.Slot;
  isConfirmedVisible?: Types.Visibility.VisibilityConditions;
  isPendingVisible?: Types.Visibility.VisibilityConditions;
  slotProvidedOption?: Types.Devlink.Slot;
  textCurrentRole?: React.ReactNode;
  textEmail?: React.ReactNode;
}): React.JSX.Element;
