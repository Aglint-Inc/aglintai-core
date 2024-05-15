import * as React from "react";
import * as Types from "./types";

declare function Priority(props: {
  as?: React.ElementType;
  colorTextPriority?: Types.Devlink.RuntimeProps;
  textPriority?: React.ReactNode;
  slotPriorityIcon?: Types.Devlink.Slot;
}): React.JSX.Element;
