import * as React from "react";
import * as Types from "./types";

declare function ScheduleInfoPlan(props: {
  as?: React.ElementType;
  textTime?: React.ReactNode;
  textTitle?: React.ReactNode;
  slotProfileImage?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  textDuration?: React.ReactNode;
}): React.JSX.Element;
