import * as React from "react";
import * as Types from "./types";

declare function ScheduleSelectPill(props: {
  as?: React.ElementType;
  slotIcons?: Types.Devlink.Slot;
  textScheduleName?: React.ReactNode;
  onClickClose?: Types.Devlink.RuntimeProps;
  textTime?: React.ReactNode;
}): React.JSX.Element;
