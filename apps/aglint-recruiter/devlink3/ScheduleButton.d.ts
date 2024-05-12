import * as React from "react";
import * as Types from "./types";

declare function ScheduleButton(props: {
  as?: React.ElementType;
  textLabel?: React.ReactNode;
  textColorProps?: Types.Devlink.RuntimeProps;
  slotIcon?: Types.Devlink.Slot;
  onClickProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
