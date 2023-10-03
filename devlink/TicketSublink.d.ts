import * as React from "react";
import * as Types from "./types";

declare function TicketSublink(props: {
  as?: React.ElementType;
  isAllActive?: Types.Visibility.VisibilityConditions;
  isOpenActive?: Types.Visibility.VisibilityConditions;
  isInProgressActive?: Types.Visibility.VisibilityConditions;
  isResolvedActive?: Types.Visibility.VisibilityConditions;
  isOnHoldActive?: Types.Visibility.VisibilityConditions;
  onClickAll?: Types.Devlink.RuntimeProps;
  onClickOpen?: Types.Devlink.RuntimeProps;
  onClickInProgress?: Types.Devlink.RuntimeProps;
  onClickResolve?: Types.Devlink.RuntimeProps;
  onClickOnHold?: Types.Devlink.RuntimeProps;
  allCount?: React.ReactNode;
  openCount?: React.ReactNode;
  inProgressCount?: React.ReactNode;
  resolvedCount?: React.ReactNode;
  onHoldCount?: React.ReactNode;
}): React.JSX.Element;
