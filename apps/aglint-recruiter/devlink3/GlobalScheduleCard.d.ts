import * as React from "react";
import * as Types from "./types";

declare function GlobalScheduleCard(props: {
  as?: React.ElementType;
  slotGlobalBadge?: Types.Devlink.Slot;
  textTime?: React.ReactNode;
  textDate?: React.ReactNode;
  slotRequestStatus?: Types.Devlink.Slot;
  isRequestStatusVisible?: Types.Visibility.VisibilityConditions;
  textPanelName?: React.ReactNode;
  iconPanel?: React.ReactNode;
  textDuration?: React.ReactNode;
  textPlaformName?: React.ReactNode;
  iconMeetingPlatform?: React.ReactNode;
  textRole?: React.ReactNode;
  textCandidateName?: React.ReactNode;
  iconAvatar?: React.ReactNode;
  slotButtonViewDetail?: Types.Devlink.Slot;
  onClickDropdown?: Types.Devlink.RuntimeProps;
  slotRequestDetail?: Types.Devlink.Slot;
  slotDropdownContent?: Types.Devlink.Slot;
  isDropdownContentVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
