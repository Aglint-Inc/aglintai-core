import * as React from "react";
import * as Types from "./types";

declare function InboxListItem(props: {
  as?: React.ElementType;
  onClickCheckbox?: Types.Devlink.RuntimeProps;
  ticketId?: React.ReactNode;
  issue?: React.ReactNode;
  candidateImage?: Types.Devlink.Slot;
  candidateName?: React.ReactNode;
  role?: React.ReactNode;
  company?: React.ReactNode;
  priorityText?: React.ReactNode;
  slotPriorityIcon?: Types.Devlink.Slot;
  slotAssigneeImage?: Types.Devlink.Slot;
  assigneeName?: React.ReactNode;
  statusText?: React.ReactNode;
  assigneeProps?: Types.Devlink.RuntimeProps;
  createDate?: React.ReactNode;
  onClickArchiveBtn?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
