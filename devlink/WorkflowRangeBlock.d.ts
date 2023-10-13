import * as React from "react";
import * as Types from "./types";

declare function WorkflowRangeBlock(props: {
  as?: React.ElementType;
  slotRange?: Types.Devlink.Slot;
  rangeText?: React.ReactNode;
  rangeTextProps?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
