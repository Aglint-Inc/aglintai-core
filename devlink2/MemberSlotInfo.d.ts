import * as React from "react";
import * as Types from "./types";

declare function MemberSlotInfo(props: {
  as?: React.ElementType;
  isCalenderNotConnected?: Types.Visibility.VisibilityConditions;
  onClickConnectCalender?: Types.Devlink.RuntimeProps;
  onClickViewSlots?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
