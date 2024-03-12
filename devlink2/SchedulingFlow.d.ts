import * as React from "react";
import * as Types from "./types";

declare function SchedulingFlow(props: {
  as?: React.ElementType;
  textRole?: React.ReactNode;
  textLocation?: React.ReactNode;
  slotPlanCard?: Types.Devlink.Slot;
  onClickJobSettings?: Types.Devlink.RuntimeProps;
  slotScheduleOptions?: Types.Devlink.Slot;
}): React.JSX.Element;
