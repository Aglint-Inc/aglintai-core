import * as React from "react";
import * as Types from "./types";

declare function MemberListCard(props: {
  as?: React.ElementType;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textRole?: React.ReactNode;
  countUpcomingSchedule?: React.ReactNode;
  countCompletedSchedule?: React.ReactNode;
  countIncompleteSchedule?: React.ReactNode;
  isPauseResumeVisible?: Types.Visibility.VisibilityConditions;
  textPauseResumeDate?: React.ReactNode;
  onHoverDot?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
