import * as React from "react";
import * as Types from "./types";

declare function DeleteAllTickets(props: {
  as?: React.ElementType;
  slotTicketList?: Types.Devlink.Slot;
  slotSearch?: Types.Devlink.Slot;
  onClickAllTicketCheck?: Types.Devlink.RuntimeProps;
  isAllTicketChecked?: Types.Visibility.VisibilityConditions;
  onClickPriority?: Types.Devlink.RuntimeProps;
  isSortPriorityArrowVisible?: Types.Visibility.VisibilityConditions;
  onClickSortAssignee?: Types.Devlink.RuntimeProps;
  isSortAssigneeArrowVisible?: Types.Visibility.VisibilityConditions;
  onClickSortCandidateName?: Types.Devlink.RuntimeProps;
  isSortCandidateArrowVisible?: Types.Visibility.VisibilityConditions;
  onClickSortJobInfo?: Types.Devlink.RuntimeProps;
  isSortJobArrowVisible?: Types.Visibility.VisibilityConditions;
  onClickSortStatus?: Types.Devlink.RuntimeProps;
  isSortStatusVisible?: Types.Visibility.VisibilityConditions;
  onClickSortLastUpdate?: Types.Devlink.RuntimeProps;
  isSortUpdateArrowVisible?: Types.Visibility.VisibilityConditions;
  textHeaderStatus?: React.ReactNode;
}): React.JSX.Element;
