import * as React from "react";
import * as Types from "./types";

declare function InboxTickets(props: {
  as?: React.ElementType;
  textIssues?: React.ReactNode;
  textTicketsId?: React.ReactNode;
  slotCandidateImage?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  textJobRole?: React.ReactNode;
  textCompanyLocations?: React.ReactNode;
  textDate?: React.ReactNode;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  onClickCard?: Types.Devlink.RuntimeProps;
  slotStatus?: Types.Devlink.Slot;
  slotPriority?: Types.Devlink.Slot;
  slotAssignee?: Types.Devlink.Slot;
}): React.JSX.Element;
