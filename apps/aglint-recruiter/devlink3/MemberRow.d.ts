import * as React from "react";
import * as Types from "./types";

declare function MemberRow(props: {
  as?: React.ElementType;
  isShadow?: Types.Visibility.VisibilityConditions;
  isReverseShadow?: Types.Visibility.VisibilityConditions;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  slotInterviewerImage?: Types.Devlink.Slot;
  textTime?: React.ReactNode;
  slotConflicts?: Types.Devlink.Slot;
  isInterviewerTime?: Types.Visibility.VisibilityConditions;
  textStandardTime?: React.ReactNode;
}): React.JSX.Element;
