import * as React from "react";
import * as Types from "./types";

declare function InterviewPanelMember(props: {
  as?: React.ElementType;
  isConfirmed?: Types.Visibility.VisibilityConditions;
  textMemberName?: React.ReactNode;
  slotMemberAvatar?: Types.Devlink.Slot;
}): React.JSX.Element;
