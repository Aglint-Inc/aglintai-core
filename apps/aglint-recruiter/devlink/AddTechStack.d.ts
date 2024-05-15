import * as React from "react";
import * as Types from "./types";

declare function AddTechStack(props: {
  as?: React.ElementType;
  slotTechPills?: Types.Devlink.Slot;
  slotInput?: Types.Devlink.Slot;
  onClickDone?: Types.Devlink.RuntimeProps;
  onClickCancel?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
