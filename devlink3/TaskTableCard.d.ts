import * as React from "react";
import * as Types from "./types";

declare function TaskTableCard(props: {
  as?: React.ElementType;
  slotCheckbox?: Types.Devlink.Slot;
  slotStatus?: Types.Devlink.Slot;
  textTask?: React.ReactNode;
  isEmailAgentVisible?: Types.Visibility.VisibilityConditions;
  isPhoneAgentVisible?: Types.Visibility.VisibilityConditions;
  isAssignedtoVisible?: Types.Visibility.VisibilityConditions;
  slotAvatarWithName?: Types.Devlink.Slot;
  textJob?: React.ReactNode;
  slotCandidate?: Types.Devlink.Slot;
  isActiveCard?: Types.Visibility.VisibilityConditions;
  slotAssignedToCard?: Types.Devlink.Slot;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
