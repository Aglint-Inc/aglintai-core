import * as React from "react";
import * as Types from "./types";

declare function ScheduleCardSmall(props: {
  as?: React.ElementType;
  textMonth?: React.ReactNode;
  textDate?: React.ReactNode;
  textDay?: React.ReactNode;
  textScheduleName?: React.ReactNode;
  textTimeRange?: React.ReactNode;
  textPlatformName?: React.ReactNode;
  slotPlatformLogo?: Types.Devlink.Slot;
  textCandidateName?: React.ReactNode;
  slotCandidatePic?: Types.Devlink.Slot;
}): React.JSX.Element;
