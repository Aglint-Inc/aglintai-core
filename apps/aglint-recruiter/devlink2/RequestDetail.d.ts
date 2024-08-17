import * as React from "react";
import * as Types from "./types";

declare function RequestDetail(props: {
  as?: React.ElementType;
  slotInterview?: Types.Devlink.Slot;
  slotNewTask?: Types.Devlink.Slot;
  slotRequestDetailRight?: Types.Devlink.Slot;
}): React.JSX.Element;
