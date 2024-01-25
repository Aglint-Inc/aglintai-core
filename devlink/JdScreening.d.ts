import * as React from "react";
import * as Types from "./types";

declare function JdScreening(props: {
  as?: React.ElementType;
  slotSubmitted?: Types.Devlink.Slot;
  onClickIcon?: Types.Devlink.RuntimeProps;
  slotQandA?: Types.Devlink.Slot;
  propsCollapse?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
