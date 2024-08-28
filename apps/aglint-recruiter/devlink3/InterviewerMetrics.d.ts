import * as React from "react";
import * as Types from "./types";

declare function InterviewerMetrics(props: {
  as?: React.ElementType;
  slotFilter?: Types.Devlink.Slot;
  slotMetrics?: Types.Devlink.Slot;
  slotFirstGrid?: Types.Devlink.Slot;
}): React.JSX.Element;
