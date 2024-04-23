import * as React from "react";
import * as Types from "./types";

declare function AssignedToTask(props: {
  as?: React.ElementType;
  isEmailAgentVisible?: Types.Visibility.VisibilityConditions;
  isPhoneAgentVisible?: Types.Visibility.VisibilityConditions;
  slotAvatarWithName?: Types.Devlink.Slot;
  isAvatarWithNameVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
