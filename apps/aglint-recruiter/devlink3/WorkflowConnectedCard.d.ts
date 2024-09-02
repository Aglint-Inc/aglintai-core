import * as React from "react";
import * as Types from "./types";

declare function WorkflowConnectedCard(props: {
  as?: React.ElementType;
  role?: React.ReactNode;
  slotBadges?: Types.Devlink.Slot;
  textRoleCategory?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickLinkOff?: Types.Devlink.RuntimeProps;
  isLinkOffVisible?: Types.Visibility.VisibilityConditions;
  jobLink?: Types.Basic.Link;
  onClickJob?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
