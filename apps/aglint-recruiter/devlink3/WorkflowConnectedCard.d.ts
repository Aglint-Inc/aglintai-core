import * as React from "react";
import * as Types from "./types";

declare function WorkflowConnectedCard(props: {
  as?: React.ElementType;
  role?: React.ReactNode;
  slotBadges?: Types.Devlink.Slot;
  textRoleCategory?: React.ReactNode;
  textLocation?: React.ReactNode;
  onClickJob?: Types.Devlink.RuntimeProps;
  onClickLinkOff?: Types.Devlink.RuntimeProps;
  isLinkOffVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
