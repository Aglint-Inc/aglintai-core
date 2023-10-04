import * as React from "react";
import * as Types from "./types";

declare function InboxTickets(props: {
  as?: React.ElementType;
  textIssues?: React.ReactNode;
  textTicketsId?: React.ReactNode;
  textPriority?: React.ReactNode;
  colorTextPriority?: Types.Devlink.RuntimeProps;
  slotPriorityIcon?: Types.Devlink.Slot;
  slotAssigneeImage?: Types.Devlink.Slot;
  textAssigneeName?: React.ReactNode;
  slotCandidateImage?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  textJobRole?: React.ReactNode;
  textCompanyLocations?: React.ReactNode;
  textStatus?: React.ReactNode;
  colorBgPropsStatus?: Types.Devlink.RuntimeProps;
  textDate?: React.ReactNode;
  onClickCheck?: Types.Devlink.RuntimeProps;
  isChecked?: Types.Visibility.VisibilityConditions;
  onClickArchive?: Types.Devlink.RuntimeProps;
  onClickCard?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
