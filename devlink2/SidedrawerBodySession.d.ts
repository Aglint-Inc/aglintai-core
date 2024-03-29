import * as React from "react";
import * as Types from "./types";

declare function SidedrawerBodySession(props: {
  as?: React.ElementType;
  slotSessionNameInput?: Types.Devlink.Slot;
  slotDurationDropdown?: Types.Devlink.Slot;
  slotScheduleTypeDropdown?: Types.Devlink.Slot;
  slotModuleDropdown?: Types.Devlink.Slot;
  slotInterviewModePill?: Types.Devlink.Slot;
  slotInterviewersAvatarSelectionPill?: Types.Devlink.Slot;
  slotInterviewersDropdown?: Types.Devlink.Slot;
  slotMemberCountDropdown?: Types.Devlink.Slot;
  isPanel?: Types.Visibility.VisibilityConditions;
  isIndividual?: Types.Visibility.VisibilityConditions;
  slotTraineeAvatarSelectionPill?: Types.Devlink.Slot;
  slotTraineesDropdown?: Types.Devlink.Slot;
  isTraining?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
