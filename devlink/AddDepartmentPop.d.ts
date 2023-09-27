import * as React from "react";
import * as Types from "./types";

declare function AddDepartmentPop(props: {
  as?: React.ElementType;
  slotDepartmentsPills?: Types.Devlink.Slot;
  slotInput?: Types.Devlink.Slot;
  onClickCancel?: Types.Devlink.RuntimeProps;
  onClickDone?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
