import * as React from "react";
import * as Types from "./types";

declare function CandidateSchedule(props: {
  as?: React.ElementType;
  slotDarkPill?: Types.Devlink.Slot;
  slotFullScheduleCard?: Types.Devlink.Slot;
  slotCandidateCard?: Types.Devlink.Slot;
  slotScheduleNowButton?: Types.Devlink.Slot;
  isScheduleNowVisible?: Types.Visibility.VisibilityConditions;
  onClickClose?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
