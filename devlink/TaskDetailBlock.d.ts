import * as React from "react";
import * as Types from "./types";

declare function TaskDetailBlock(props: {
  as?: React.ElementType;
  slotIcon?: Types.Devlink.Slot;
  textName?: React.ReactNode;
  slotStatus?: Types.Devlink.Slot;
  textDesc?: React.ReactNode;
}): React.JSX.Element;
