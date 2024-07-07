import * as React from "react";
import * as Types from "./types";

declare function SessionDetails(props: {
  as?: React.ElementType;
  slotSessionIcon?: Types.Devlink.Slot;
  textSessionName?: React.ReactNode;
  textSessionTime?: React.ReactNode;
  textSessionDuration?: React.ReactNode;
  isMemberRow?: Types.Visibility.VisibilityConditions;
  slotMemberRow?: Types.Devlink.Slot;
  isTimingVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
