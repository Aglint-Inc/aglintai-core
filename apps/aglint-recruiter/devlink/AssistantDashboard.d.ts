import * as React from "react";
import * as Types from "./types";

declare function AssistantDashboard(props: {
  as?: React.ElementType;
  textTotalCandidateCount?: React.ReactNode;
  slotChat?: Types.Devlink.Slot;
  slotLeftDashboard?: Types.Devlink.Slot;
  textJob?: React.ReactNode;
  onClickJob?: Types.Devlink.RuntimeProps;
  textHeaderTitle?: React.ReactNode;
  slotStatus?: Types.Devlink.Slot;
  isLeftSideVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
