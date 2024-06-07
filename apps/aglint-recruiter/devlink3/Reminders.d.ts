import * as React from "react";
import * as Types from "./types";

declare function Reminders(props: {
  as?: React.ElementType;
  slotCandidateReminder?: Types.Devlink.Slot;
  onClickAddCandidateReminder?: Types.Devlink.RuntimeProps;
  slotInterviewerReminder?: Types.Devlink.Slot;
  onClickAddInterviewerReminder?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
