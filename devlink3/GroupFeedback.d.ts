import * as React from "react";
import * as Types from "./types";

declare function GroupFeedback(props: {
  as?: React.ElementType;
  slotFeedbackTableRow?: Types.Devlink.Slot;
  textInterviewType?: React.ReactNode;
  textDate?: React.ReactNode;
  textTime?: React.ReactNode;
  slotStatusPill?: Types.Devlink.Slot;
}): React.JSX.Element;
