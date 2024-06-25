import * as React from "react";
import * as Types from "./types";

declare function ScheduleReasonSection(props: {
  as?: React.ElementType;
  slotReasonList?: Types.Devlink.Slot;
  textHeading?: React.ReactNode;
  textDesc?: React.ReactNode;
  onClickAdd?: Types.Devlink.RuntimeProps;
  slotAddButton?: Types.Devlink.Slot;
}): React.JSX.Element;
