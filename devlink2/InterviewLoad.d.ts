import * as React from "react";
import * as Types from "./types";

declare function InterviewLoad(props: {
  as?: React.ElementType;
  slotDailyLimit?: Types.Devlink.Slot;
  slotWeeklyLimit?: Types.Devlink.Slot;
}): React.JSX.Element;
