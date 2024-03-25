import * as React from "react";
import * as Types from "./types";

declare function ScheduleTabOverview(props: {
  as?: React.ElementType;
  slotAvatarWithName?: Types.Devlink.Slot;
  slotCandidateCard?: Types.Devlink.Slot;
  slotRelatedJobCard?: Types.Devlink.Slot;
  slotScheduleCard?: Types.Devlink.Slot;
}): React.JSX.Element;
