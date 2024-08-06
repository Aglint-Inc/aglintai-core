import * as React from "react";
import * as Types from "./types";

declare function RequestDashboard(props: {
  as?: React.ElementType;
  textGraphTitle?: React.ReactNode;
  slotGraph?: Types.Devlink.Slot;
  textProgressTitle?: React.ReactNode;
  slotProgressBar?: Types.Devlink.Slot;
  slotRequestList?: Types.Devlink.Slot;
  slotReqCompleted?: Types.Devlink.Slot;
}): React.JSX.Element;
