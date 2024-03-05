import * as React from "react";
import * as Types from "./types";

declare function InterviewPlanCard(props: {
  as?: React.ElementType;
  textTitle?: React.ReactNode;
  textDuration?: React.ReactNode;
  slotMemberList?: Types.Devlink.Slot;
  isMemberFromVisible?: Types.Visibility.VisibilityConditions;
  textMemberFrom?: React.ReactNode;
}): React.JSX.Element;
