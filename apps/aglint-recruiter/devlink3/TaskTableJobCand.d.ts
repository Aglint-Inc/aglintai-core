import * as React from "react";
import * as Types from "./types";

declare function TaskTableJobCand(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  slotTaskJobCard?: Types.Devlink.Slot;
  slotCheckbox?: Types.Devlink.Slot;
  textStatusHeader?: React.ReactNode;
  textPriorityHeader?: React.ReactNode;
  textAssigneeHeader?: React.ReactNode;
  gridProps?: Types.Devlink.RuntimeProps;
  textCandidateHeader?: React.ReactNode;
  textJobHeader?: React.ReactNode;
}): React.JSX.Element;
