import * as React from "react";
import * as Types from "./types";

declare function ScheduleOptions(props: {
  as?: React.ElementType;
  slotCandidateImage?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  slotInputName?: Types.Devlink.Slot;
  slotDateRangeInput?: Types.Devlink.Slot;
  slotPrimaryButton?: Types.Devlink.Slot;
  slotInterviewCordinator?: Types.Devlink.Slot;
  isNoOptionsFoundVisible?: Types.Visibility.VisibilityConditions;
  slotButtonLeft?: Types.Devlink.Slot;
  slotButtonRight?: Types.Devlink.Slot;
  textDuration?: React.ReactNode;
  textPlatformName?: React.ReactNode;
  slotPlatformIcon?: Types.Devlink.Slot;
  textSessionName?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  textPopHeader?: React.ReactNode;
  isBasicDetailsVisible?: Types.Visibility.VisibilityConditions;
  slotAvailableOptionsDate?: Types.Devlink.Slot;
  isMultipleOptionVisible?: Types.Visibility.VisibilityConditions;
  slotSendtoCandidateButton?: Types.Devlink.Slot;
  slotAvailableCard?: Types.Devlink.Slot;
}): React.JSX.Element;
